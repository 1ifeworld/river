'use client'

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
  DropdownMenuItem,
  Form,
  Toast,
} from '@/design-system'
import { uploadFile, uploadBlob } from '@/lib'
// import { getChannels, type Channel } from '@/gql'
import { relayPost } from '@/actions'
import { useDropzone } from 'react-dropzone'
import { toast } from 'sonner'
import { usePrivy } from '@privy-io/react-auth'
import { useConnectedUser } from 'hooks/useConnectedUser'
import { processCreatePubAndAddItemPost } from '@/lib'

interface UploadDialogProps {
  triggerChildren: React.ReactNode
  onSelect: () => void
  onOpenChange: (open: boolean) => void
  userId: bigint
}

export const UploadDialog = React.forwardRef<HTMLDivElement, UploadDialogProps>(
  ({ triggerChildren, onSelect, onOpenChange, userId }, forwardedRef) => {
    const [showFilesToUpload, setShowFilesToUpload] =
      React.useState<boolean>(false)
    const [filesToUpload, setFilesToUpload] = React.useState<File[]>([])
    const onDrop = React.useCallback((filesToUpload: File[]) => {
      setShowFilesToUpload(true)
      setFilesToUpload(filesToUpload)
    }, [])

    // const [allChannels, setAllChannels] = React.useState<Channel[]>()
    const [uriSet, setUriSet] = React.useState<boolean>(false)

    const { signMessage } = usePrivy()
    const { userId: targetUserId } = useConnectedUser()    

    React.useEffect(() => {
      const fetchChannels = async () => {
        // const channelData = await getChannels()
        // setAllChannels(channelData.channels)
      }

      fetchChannels()
    }, [uriSet])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    })

    return (
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <DropdownMenuItem
            ref={forwardedRef}
            onSelect={(event) => {
              event.preventDefault()
              onSelect && onSelect()
            }}
          >
            {triggerChildren}
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogPortal>
          <DialogContent className="sm:max-w-[425px] focus:outline-none">
            <Stack className="items-center gap-4">
              <DialogHeader>
                <DialogTitle>
                  <Typography>New item</Typography>
                </DialogTitle>
              </DialogHeader>
              <Separator />
              {/* Upload form */}
              <Stack className="py-[8rem]">
                <form
                  action={async () => {
                    // add this in to prevent non authd in user from signing msg
                    if (!targetUserId) return                      
                    // Create an IPFS pointer for the uploaded item
                    const pubUri = await uploadBlob({
                      dataToUpload: {
                        name: filesToUpload[0]?.name || 'unnamed',
                        description: 'What did you think this was going to be?',
                        image: await uploadFile({ filesToUpload }),
                      },
                    })
                    setUriSet(true)
                    // Generate create channel post for user and post transaction
                    await processCreatePubAndAddItemPost({
                      pubUri: pubUri,
                      targetChannelId: BigInt(1), // update this so it can be inputted 
                      targetUserId: targetUserId,
                      privySignMessage: signMessage                      
                    })                    
                    onOpenChange(false)
                    // Render a toast with the name of the uploaded item(s)
                    for (const [index, file] of filesToUpload.entries()) {
                      toast.custom((t) => (
                        <Toast key={index}>
                          {'Successfully uploaded '}
                          <span className="font-bold">{file.name}</span>
                        </Toast>
                      ))
                    }
                  }}
                  {...getRootProps()}
                  className="focus:outline-none text-center"
                >
                  {!showFilesToUpload ? (
                    <>
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Drop the files here...</p>
                      ) : (
                        <Typography className="hover:cursor-pointer">
                          Drag and drop your files here or click here to{' '}
                          <span className="underline">browse</span>
                        </Typography>
                      )}
                    </>
                  ) : (
                    <Stack className="gap-4">
                      {/* <ChannelList channels={allChannels as Channel[]} /> */}
                      <FileList filesToUpload={filesToUpload} />
                      <Button type="submit" variant="link" disabled={!userId}>
                        Next
                      </Button>
                    </Stack>
                  )}
                </form>
              </Stack>
            </Stack>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    )
  },
)

// const ChannelList = ({ channels }: { channels: Channel[] }) => {
//   return (
//     <>
//       <ul>
//         {channels &&
//           channels.slice(0, 5).map((channel: Channel) => (
//             <li key={channel.id}>
//               <Typography>
//                 {`${channel.uri?.name} - ${channel.items.length} items`}
//               </Typography>
//             </li>
//           ))}
//       </ul>
//     </>
//   )
// }

const FileList = ({ filesToUpload }: { filesToUpload: File[] }) => {
  return (
    <ul>
      {filesToUpload.map((file: File) => (
        <li key={file.size}>
          {file.name} - {file.size} bytes
        </li>
      ))}
    </ul>
  )
}
