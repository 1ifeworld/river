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
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  Input,
  FormLabel,
  FormMessage,
  Toast,
} from '@/design-system'
import { uploadBlob } from '@/lib'
import { relayPost } from '@/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAlchemyContext } from 'context/AlchemyProviderContext'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { toast } from 'sonner'
import { usePrivy } from '@privy-io/react-auth'
import { useConnectedUser } from 'hooks/useConnectedUser'
import { encodePost, encodeMessage, encodeUriAndAccess } from 'scrypt'
import { Hash, keccak256, hashMessage, encodeAbiParameters } from 'viem'

interface ChannelDialogProps {
  triggerChildren: React.ReactNode
  onSelect: () => void
  onOpenChange: (open: boolean) => void
  userId: bigint
}

const ChannelNameSchema = z.object({
  channelName: z.string().min(2, {
    message: 'Channel name must be at least 2 characters.',
  }),
})

export const ChannelDialog = React.forwardRef<
  HTMLDivElement,
  ChannelDialogProps
>(({ triggerChildren, onSelect, onOpenChange, userId }, forwardedRef) => {
  const { alchemyProvider } = useAlchemyContext()
  const { signMessage } = usePrivy()
  const { userId: targetUserId } = useConnectedUser()

  const form = useForm<z.infer<typeof ChannelNameSchema>>({
    resolver: zodResolver(ChannelNameSchema),
    defaultValues: {
      channelName: '',
    },
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
                <Typography>Add New Item</Typography>
              </DialogTitle>
            </DialogHeader>
            <Separator />
            {/* Channel form */}
            <Form {...form}>
              <form
                action={async () => {
                  // add this in to prevent non authd in user from signing msg
                  if (!targetUserId) return  

                  // Create an IPFS pointer containing the name of the channel
                  const channelUri = await uploadBlob({
                    dataToUpload: {
                      name: form.getValues().channelName,
                      description: 'This time its happening',
                      image:
                        // harcoded cover image uri
                        'ipfs://bafkreiamfxbkndyuwkw4kutjcfcitozbtzrvqneryab2njltiopsfjwt6a', 
                    },
                  })                  

                  // Declare constants/params
                  const sigType = 1
                  const version = 1;
                  const expiration: bigint = BigInt(Math.floor(Date.now() / 1000) + 600);
                  const msgType = 210 // createChannel
                  const admins = [targetUserId]
                  const members = [BigInt(29)]
                  // generate encoded msgBody
                  const msgBody = encodeUriAndAccess({
                    uri: channelUri,
                    adminIds: admins,
                    memberIds: members
                  })                
                  // add this in to prevent msgBody from being null
                  if (!msgBody) return 
                  console.log("msgBody: ", msgBody)
                  console.log("encoded msgBody correctly")
                  // generate encodedMessage by packing msgType + msgBody together
                  const encodedMessage = encodeMessage({
                    msgType: msgType,
                    msgBody: msgBody.msgBody
                  })
                  // add this in to prevent encodedMessage being null
                  if (!encodedMessage) return               
                  console.log("encoded message correctly")   
                  console.log("encodedMessage: ", encodedMessage)
                  // generate the bytes[] messageArray
                  const messageArray: Hash[] = [encodedMessage?.encodedMessage]
                  // NOTE: this encoding step should be a scrypt export as well
                  // bytes32 messageToBeSigned = keccak256(abi.encode(version, expiration, msgArray)).toEthSignedMessageHash();                  
                  const messageToBeSigned: Hash = hashMessage(keccak256(
                    encodeAbiParameters(
                      [
                        { name: "version", type: "uint16" },
                        { name: "expiration", type: "uint64" },
                        { name: "messageArray", type: "bytes[]" },
                      ],
                      [version, expiration, messageArray]
                    ),
                  ))
                  console.log("messageToBe signed hash genereated correctly") 
                  // Get signature from user over signed hash of encodePacked version + expiration + messages                  
                  const sig = await signMessage(messageToBeSigned);
                  console.log("sig generated correctly") 
                  console.log("signature: ", sig) 
                  // Generate encodedPost bytes data -- this is the input to the `post` function`
                  const postInput = encodePost({
                    userId: targetUserId,
                    sigType: sigType,
                    // @ts-ignore
                    sig: sig,
                    version: version,
                    expiration: expiration,
                    messageArray: messageArray                  
                  })
                  // add this in to prevent postInputs being null
                  if (!postInput) return       
                  console.log("postInput encoded correctly")   
                  console.log("postInput: ", postInput)   
                  // pass postInputs into the createPost server action
                  await relayPost({postInput: postInput})
                  // close the modal post success
                  onOpenChange(false)
                  // Render a toast with the name of the channel
                  toast.custom((t) => (
                    <Toast>
                      {'Successfully created '}
                      <span className="font-bold">
                        {form.getValues().channelName}
                      </span>
                    </Toast>
                  ))
                }}
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="channelName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter channel name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" variant="link" disabled={!userId}>
                  Create
                </Button>
              </form>
            </Form>
          </Stack>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
})
