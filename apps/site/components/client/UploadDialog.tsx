
import * as React from 'react'
import {
  Button,
  Typography,
  Stack,
  Separator,
  Dialog,
  DialogPortal,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogClose,
  Toast,
} from '@/design-system'
import {
  processCreatePubPost,
  sendToDb,
  isText,
  isGLB,
  isPdf,
  isVideo,
  isAudio,
  determineContentType,
} from '@/lib'
import { useUserContext } from '@/context'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { SubmitButton } from '@/client'
import { useParams } from 'next/navigation'
import { usePrivy } from '@privy-io/react-auth'
import { X } from 'lucide-react'
import { uploadToMux, type MetadataObject } from '@/lib'
import { useWeb3Storage } from '@/hooks'

export function UploadDialog() {
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const { authenticated, login } = usePrivy()
  const [showFileList, setShowFileList] = React.useState<boolean>(false)
  const [filesToUpload, setFilesToUpload] = React.useState<FileWithStatus[]>([]);
  const { signMessage, userId: targetUserId } = useUserContext()
  const params = useParams()
  

  interface FileWithStatus extends File {
    status: 'QUEUED' | 'UPLOADING' | 'UPLOADED' | 'ERROR';
  }

function getStatusProperties(status: FileWithStatus['status']) {
  switch (status) {
    case 'QUEUED':
      return { label: 'Queued', color: 'gray' };
    case 'UPLOADING':
      return { label: 'Uploading', color: 'blue' };
    case 'UPLOADED':
      return { label: 'Uploaded', color: 'green' };
    case 'ERROR':
      return { label: 'Error', color: 'red' };
    default:
      return { label: 'Unknown', color: 'black' };
  }
}
  
  // const onDrop = React.useCallback((acceptedFiles: File[]) => {
  //   // Map over acceptedFiles and add the 'status' property
  //   const filesWithStatus = acceptedFiles.map(file => Object.assign(file, { status: 'QUEUED' as const }));
  
  //   setFilesToUpload(currentFiles => [...currentFiles, ...filesWithStatus]);
  //   setShowFileList(true);
  // }, [setFilesToUpload]);

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    setShowFileList(true)
  
    const filesWithStatus = acceptedFiles.map(file => Object.assign(file, { status: 'QUEUED' as const }));
    setFilesToUpload(currentFiles => [...currentFiles, ...filesWithStatus])
  }, [])
  

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: filesToUpload.length > 0, 
    multiple: true  
  })

  const { client } = useWeb3Storage()

  const handleRemoveFile = (index: number) => {
    setFilesToUpload(currentFiles => {
      const newFiles = [...currentFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  
    if (filesToUpload.length === 1) {
      setShowFileList(false);
    }
  };

  
  const resetUploadState = () => {
    setFilesToUpload([]);
    setShowFileList(false);
  }

  const filesDisplay = filesToUpload.map((file, index) => {
    const statusProps = getStatusProperties(file.status);
    return (
      <div key={file.name} className="flex items-center justify-between p-4 rounded-lg mb-2">
        <div className="flex items-center">
          <span className="text-sm font-semibold text-gray-800 mr-3 truncate" title={file.name}>
            {file.name}
          </span>
          <div className="flex items-center px-2 py-1">
            <span className={`text-xs font-small truncate mr-2`} style={{ color: statusProps.color }}>
          {statusProps.label}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => handleRemoveFile(index)}
          className="text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full p-2"
          aria-label={`Remove ${file.name}`}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    );
  });
  
  

  const updateFileStatus = (fileName: string, newStatus: FileWithStatus['status']) => {
    setFilesToUpload(currentFiles => 
      currentFiles.map(file => {
        if (file.name === fileName) {
          return {
            ...file,
            status: newStatus,
          } as FileWithStatus
        } else {
          return file
        }
      })
    )
  }
  

  const uploadAndProcessFile = async (file: File) => {
    try {
    const uploadedFileName = file.name || 'unnamed'
    const contentType = determineContentType(file)
    const uploadedFileCid = await client?.uploadFile(file)

    const contentTypeKey =
      isVideo({ mimeType: contentType }) || isAudio({ mimeType: contentType })
        ? 2
        : isPdf({ mimeType: contentType }) || isGLB(file) || isText(file)
        ? 1
        : 0

    const animationUri =
      contentTypeKey === 2 || contentTypeKey === 1 ? uploadedFileCid : ''
    const imageUri = contentTypeKey === 0 ? uploadedFileCid : ''

    const metadataObject: MetadataObject = {
      name: uploadedFileName,
      description: 'Dynamic metadata based on timestamp',
      image: imageUri?.toString() as string,
      animationUri: animationUri?.toString() as string,
    }

    const pubUri = await client?.uploadFile(
      new Blob(
        [
          JSON.stringify(metadataObject),
        ],
        { type: 'application/json' },
      ),
    )

    let muxAssetId = ''
    let muxPlaybackId = ''

    if (contentTypeKey === 2) {
      updateFileStatus(file.name, 'UPLOADING')

      const muxUploadResult = await uploadToMux(contentType, animationUri?.toString() as string)
      muxAssetId = muxUploadResult.muxAssetId
      muxPlaybackId = muxUploadResult.muxPlaybackId
    }

    updateFileStatus(file.name, 'UPLOADING')


    await sendToDb({
      key: pubUri?.toString() as string,
      value: {
        ...metadataObject,
        contentType: contentType,
        muxAssetId: muxAssetId,
        muxPlaybackId: muxPlaybackId,
      },
    })

    updateFileStatus(file.name, 'UPLOADED')

    if (signMessage && targetUserId) {
      await processCreatePubPost({
        pubUris: [pubUri?.toString() as string],
        targetChannelId: BigInt(params.id as string),
        targetUserId: BigInt(targetUserId),
        privySignMessage: signMessage,
      })
    }
  } catch (error) {
  updateFileStatus(file.name, 'ERROR');
}
}


  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {!authenticated ? (
        <div>
          <Button variant="link" onClick={login}>
            +&nbsp;Item
          </Button>
        </div>
      ) : (
        <div>
          <DialogTrigger asChild>
            <Button variant="link">+&nbsp;Item</Button>
          </DialogTrigger>
        </div>
      )}
      <DialogPortal>
        <DialogContent className="sm:max-w-[425px] aspect-square focus:outline-none">
          <Stack className="items-center gap-4">
            <DialogHeader>
              <DialogTitle>
                <Typography>Add item</Typography>
              </DialogTitle>
            </DialogHeader>
            <DialogClose asChild className="absolute right-4 top-8">
              <Button variant="link">
                <Typography>close</Typography>
              </Button>
            </DialogClose>
            <form
              id="newUpload"
              className="focus:outline-none text-center h-full w-full"
              action={async () => {
                if (!targetUserId || filesToUpload.length === 0) return;
                await Promise.all(filesToUpload.map(uploadAndProcessFile));
                setDialogOpen(false);
                filesToUpload.forEach((file, index) => {
                  toast.custom((t) => (
                    <Toast key={index}>{`Successfully uploaded ${file.name}`}</Toast>
                  ));
                });
                resetUploadState();
              }}
              {...getRootProps()}
            >
              <Stack className="gap-[132px]">
                <Separator />
                {showFileList ? filesDisplay : (
                  <>
                    <input {...getInputProps()} />

                    {isDragActive ? (
                      <Typography className="text-muted-foreground min-h-[35px]">Drop your files here</Typography>
                    ) : (
                      <Typography className="hover:cursor-pointer text-muted-foreground leading-1">
                        Drag and drop your file here <br /> or click to select files
                      </Typography>
                    )}

                  </>
                )}
                <Separator />
              </Stack>
              <DialogFooter className="pt-4">
                <SubmitButton
                  form="newUpload"
                  type="submit"
                  variant="link"
                  disabled={!targetUserId || filesToUpload.length === 0}
                >
                  Confirm
                </SubmitButton>
              </DialogFooter>
            </form>
          </Stack>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}