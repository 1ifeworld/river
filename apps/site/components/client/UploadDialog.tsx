import * as React from 'react';
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
} from '@/design-system';
import {
  uploadFile,
  uploadBlob,
  processCreatePubPost,
  ipfsUrlToCid,
  pinataUrlFromCid,
  DataObject,
  sendToDb,
  isImage,
  isGLB,
  isVideo,
  isAudio,
} from '@/lib';
import { useUserContext } from '@/context';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { usePrivy } from '@privy-io/react-auth';
import { muxClient } from '@/config/muxClient';
import { FileList } from '@/server';

export function UploadDialog() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { authenticated, login } = usePrivy();
  const [showFileList, setShowFileList] = React.useState<boolean>(false);
  const [filesToUpload, setFilesToUpload] = React.useState<File[]>([]);
  const { signMessage, userId: targetUserId } = useUserContext();
  const params = useParams();

  const onDrop = React.useCallback((filesToUpload: File[]) => {
    setShowFileList(true);
    setFilesToUpload(filesToUpload);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: showFileList,
  });

  const determineContentType = (file: File) => {
    if (isGLB(file)) return 'model/gltf-binary';
    if (isVideo({ mimeType: file.type })) return file.type ;
    if (isAudio({ mimeType: file.type })) return file.type ;
    if (isImage({ mimeType: file.type })) return file.type ;
    return file.type;
  };

  const uploadAndProcessFile = async (file: File) => {
    const uploadedFileName = file.name || 'unnamed';
    const contentType = determineContentType(file);
    const uploadedFileCid = await uploadFile({ filesToUpload: [file] });
    let pubUri;

    if (isVideo({ mimeType: contentType }) || isAudio({ mimeType: contentType }) || isGLB(file)) {
      pubUri = await uploadBlob({
        dataToUpload: {
          name: uploadedFileName,
          description: 'What did you think this was going to be?',
          image: '',
          animationUri: uploadedFileCid,
        },
      });
    } else {
      pubUri = await uploadBlob({
        dataToUpload: {
          name: uploadedFileName,
          description: 'What did you think this was going to be?',
          image: uploadedFileCid,
          animationUri: '',
        },
      });
    }

    await sendToDb({
      key: pubUri,
      value: {
        name: uploadedFileName,
        description: 'What did you think this was going to be?',
        image: isImage({ mimeType: contentType }) ? uploadedFileCid : '',
        animationUri: isImage({ mimeType: contentType }) ? '' : uploadedFileCid,
        contentType: contentType,
      },
    } as DataObject);

    if (signMessage && targetUserId !== undefined) {  
      await processCreatePubPost({
        pubUri: pubUri,
        targetChannelId: BigInt(params.id as string),
        targetUserId: BigInt(targetUserId), 
        privySignMessage: signMessage,
      });
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {!authenticated ? (
        <div>
          <Button variant="link" onClick={login}>
            Add item
          </Button>
        </div>
      ) : (
        <div>
          <DialogTrigger asChild>
            <Button variant="link">Add item</Button>
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
                    <Toast key={index}>
                      {'Successfully uploaded '}
                      <span className="font-bold">{file.name}</span>
                    </Toast>
                  ));
                });
              }}
              {...getRootProps()}
            >
              <Stack className="gap-[132px]">
                <Separator />
                {!showFileList ? (
                  <>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <Typography className="text-secondary-foreground min-h-[35px]'">
                        Drop your files here
                      </Typography>
                    ) : (
                      <Typography className="hover:cursor-pointer text-secondary-foreground leading-1">
                        Drag and drop your files here <br /> or click here to{' '}
                        <span className="underline">browse</span>
                      </Typography>
                    )}
                  </>
                ) : (
                  <FileList filesToUpload={filesToUpload} />
                )}
                <Separator />
              </Stack>
              <DialogFooter className="pt-4">
                <Button
                  form="newUpload"
                  type="submit"
                  variant="link"
                  disabled={!targetUserId || !showFileList}
                >
                  <Typography>Confirm</Typography>
                </Button>
              </DialogFooter>
            </form>
          </Stack>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}


// import * as React from 'react'
// import {
//   Button,
//   Typography,
//   Stack,
//   Separator,
//   Dialog,
//   DialogPortal,
//   DialogTrigger,
//   DialogContent,
//   DialogTitle,
//   DialogHeader,
//   DialogFooter,
//   DialogClose,
//   Toast,
// } from '@/design-system'
// import {
//   uploadFile,
//   uploadBlob,
//   processCreatePubPost,
//   ipfsUrlToCid,
//   pinataUrlFromCid,
//   DataObject,
//   sendToDb,
//   isImage,
//   isGLB,
//   isVideo,
// } from '@/lib'
// import { useUserContext } from '@/context'
// import { useDropzone } from 'react-dropzone'
// import { toast } from 'sonner'
// import { useParams } from 'next/navigation'
// import { usePrivy } from '@privy-io/react-auth'
// import { muxClient } from '@/config/muxClient'
// import { FileList } from '@/server'

// export function UploadDialog() {
//   const [dialogOpen, setDialogOpen] = React.useState(false)

//   const { authenticated, login } = usePrivy()

//   /**
//    * Dropzone hooks
//    */
//   const [showFileList, setShowFileList] = React.useState<boolean>(false)
//   const [filesToUpload, setFilesToUpload] = React.useState<File[]>([])
//   const onDrop = React.useCallback((filesToUpload: File[]) => {
//     setShowFileList(true)
//     setFilesToUpload(filesToUpload)
//   }, [])
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     disabled: showFileList,
//   })

//   const params = useParams()

//   const { signMessage, userId: targetUserId } = useUserContext()

//   return (
//     <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//       {/* TODO: Determine if this is the best way to uncenter this `Button` instance */}
//       {!authenticated ? (
//         <div>
//           <Button variant="link" onClick={login}>
//             Add item
//           </Button>
//         </div>
//       ) : (
//         <div>
//           <DialogTrigger asChild>
//             <Button variant="link">Add item</Button>
//           </DialogTrigger>
//         </div>
//       )}
//       <DialogPortal>
//         <DialogContent className="sm:max-w-[425px] aspect-square focus:outline-none">
//           <Stack className="items-center gap-4">
//             <DialogHeader>
//               <DialogTitle>
//                 <Typography>Add item</Typography>
//               </DialogTitle>
//             </DialogHeader>
//             <DialogClose asChild className="absolute right-4 top-8">
//               <Button variant="link">
//                 <Typography>close</Typography>
//               </Button>
//             </DialogClose>
//             {/* Upload form */}
//             <form
//               id="newUpload"
//               className="focus:outline-none text-center h-full w-full"
//               action={async () => {
//                 // Prevent non-authenticated users from proceeding
//                 if (!targetUserId) return
//                 // Set file name, type, and description values
//                 const uploadedFileName = filesToUpload[0]?.name || 'unnamed'
//                 const uploadedFileType = filesToUpload[0].type
//                 let GLBFileContentType = uploadedFileType // Default to the uploaded file's type

//                 if (isGLB(filesToUpload[0])) {
//                   GLBFileContentType = 'model/gltf-binary' // If it's a GLB file, set the content type accordingly
//                 }

//                 const hardcodedDescription =
//                   'What did you think this was going to be?'
//                 // Determine if file is image or video or other
//                 const fileIsImage = isImage({ mimeType: uploadedFileType })
//                 const fileIsVideo = fileIsImage
//                   ? false
//                   : isVideo({ mimeType: uploadedFileType })

//                 // Upload file to ipfs
//                 const uploadedFileCid = await uploadFile({ filesToUpload })
//                 // set dynamic variable to be updated
//                 let pubUri
//                 // process metadata json upload, redis update, and (if applicable) mux
//                 if (fileIsImage) {
//                   pubUri = await uploadBlob({
//                     dataToUpload: {
//                       name: uploadedFileName,
//                       description: hardcodedDescription,
//                       image: uploadedFileCid,
//                       animationUri: '',
//                     },
//                   })
//                   await sendToDb({
//                     key: pubUri,
//                     value: {
//                       name: uploadedFileName,
//                       description: hardcodedDescription,
//                       image: uploadedFileCid,
//                       animationUri: '',
//                       contentType: uploadedFileType,
//                     },
//                   } as DataObject)
//                 } else if (fileIsVideo) {
//                   const assetEndpointForMux = pinataUrlFromCid({
//                     cid: ipfsUrlToCid({ ipfsUrl: uploadedFileCid }),
//                   })
//                   const asset = await muxClient.Video.Assets.create({
//                     input: assetEndpointForMux,
//                     playback_policy: 'public',
//                     encoding_tier: 'baseline',
//                   })
//                   pubUri = await uploadBlob({
//                     dataToUpload: {
//                       name: uploadedFileName,
//                       description: hardcodedDescription,
//                       image: '',
//                       animationUri: uploadedFileCid,
//                     },
//                   })
//                   await sendToDb({
//                     key: pubUri,
//                     value: {
//                       name: uploadedFileName,
//                       description: hardcodedDescription,
//                       image: '',
//                       animationUri: uploadedFileCid,
//                       contentType: uploadedFileType,
//                       muxAssetId: asset.source_asset_id,
//                       muxPlaybackId: asset.playback_ids?.[0]?.id,
//                     },
//                   } as DataObject)
//                 } else {
//                   // processOther
//                   pubUri = await uploadBlob({
//                     dataToUpload: {
//                       name: uploadedFileName,
//                       description: hardcodedDescription,
//                       image: '',
//                       animationUri: uploadedFileCid,
//                     },
//                   })
//                   await sendToDb({
//                     key: pubUri,
//                     value: {
//                       name: uploadedFileName,
//                       description: hardcodedDescription,
//                       image: '',
//                       animationUri: uploadedFileCid,
//                       contentType: uploadedFileType,
//                     },
//                   } as DataObject)
//                 }
//                 // Generate create channel post for user and post transaction
//                 if (signMessage) {
//                   await processCreatePubPost({
//                     pubUri: pubUri,
//                     targetChannelId: BigInt(params.id as string),
//                     targetUserId: targetUserId,
//                     privySignMessage: signMessage,
//                   })
//                 }
//                 setDialogOpen(false)
//                 // Render a toast with the name of the uploaded item(s)
//                 for (const [index, file] of filesToUpload.entries()) {
//                   toast.custom((t) => (
//                     <Toast key={index}>
//                       {'Successfully uploaded '}
//                       <span className="font-bold">{file.name}</span>
//                     </Toast>
//                   ))
//                 }
//               }}
//               {...getRootProps()}
//             >
//               <Stack className="gap-[132px]">
//                 <Separator />
//                 {!showFileList ? (
//                   <>
//                     <input {...getInputProps()} />
//                     {isDragActive ? (
//                       <Typography className="text-secondary-foreground min-h-[35px]'">
//                         Drop your files here
//                       </Typography>
//                     ) : (
//                       <Typography className="hover:cursor-pointer text-secondary-foreground leading-1">
//                         Drag and drop your files here <br /> or click here to{' '}
//                         <span className="underline">browse</span>
//                       </Typography>
//                     )}
//                   </>
//                 ) : (
//                   <FileList filesToUpload={filesToUpload} />
//                 )}
//                 <Separator />
//               </Stack>
//               <DialogFooter className="pt-4">
//                 <Button
//                   form="newUpload"
//                   type="submit"
//                   variant="link"
//                   disabled={!targetUserId || !showFileList}
//                 >
//                   <Typography>Confirm</Typography>
//                 </Button>
//               </DialogFooter>
//             </form>
//           </Stack>
//         </DialogContent>
//       </DialogPortal>
//     </Dialog>
//   )
// }