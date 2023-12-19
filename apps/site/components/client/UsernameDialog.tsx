import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Stack,
  Typography,
  Separator,
  Toast,
} from '@/design-system'
import {
  checkUsernameAvailability,
  processRegisterFor
} from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { publicClient } from '@/config/publicClient'
import React, { useState, useEffect } from 'react'
import { useDebounce } from 'usehooks-ts'
import { addresses } from 'scrypt'
import { AlchemyProvider } from '@alchemy/aa-alchemy'
import { useUserContext } from '@/context'
import { type Hex, createWalletClient, custom, getAddress, encodeFunctionData, Address } from 'viem'
import { usePrivy, useWallets } from '@privy-io/react-auth';
import { river_j5bpjduqfv } from '@/config/customChainConfig'
import { postGatewayABI, idRegistryABI } from 'scrypt'
import { SubmitButton } from '@/client'
import { type Hex } from 'viem'
import { toast } from 'sonner'
import * as z from 'zod'

interface UsernameDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function UsernameDialog({ open, setOpen }: UsernameDialogProps) {

  // import user embedded wallet
  // const { user, sendTransaction } = usePrivy();
  // const { wallets } = useWallets();
  // const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
  // const { eth } = usePrivyWagmi()
  // const active = await yo.setActiveWallet

// Retrieve Account from an EIP-1193 Provider.
// const [account] = await window.ethereum.request({ 
//   method: 'eth_requestAccounts' 
// })

// export const walletClient = createWalletClient({
//   account,
//   transport: custom(window.ethereum)
// })  

  // embeddedWallet?.getEthersProvider()

  const UsernameSchema = z.object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
  })

  const form = useForm<z.infer<typeof UsernameSchema>>({
    resolver: zodResolver(UsernameSchema),
    defaultValues: {
      username: '',
    },
  })

  // Unused
  const [isCheckingUsername, setIsCheckingUsername] = useState<boolean>(false)
  const [usernameExists, setUsernameExists] = useState<boolean | null>()
  const [checkState, setCheckState] = useState({
    isChecking: false,
    debounceFinished: false,
  })
  const [canSubmit, setCanSubmit] = useState(false)

  const username = form.watch('username')
  const debouncedUsername = useDebounce(username, 500)

  useEffect(() => {
    let isMounted = true
    setCheckState({ isChecking: true, debounceFinished: false })

    if (debouncedUsername) {
      checkUsernameAvailability(debouncedUsername).then((result) => {
        if (isMounted) {
          setUsernameExists(result.exists)
          setCheckState({ isChecking: false, debounceFinished: true })
          setCanSubmit(!result.exists)
        }
      })
    } else {
      setUsernameExists(null)
      setCheckState({ isChecking: false, debounceFinished: true })
      setCanSubmit(false)
    }

    return () => {
      isMounted = false
    }
  }, [debouncedUsername])

  const { signMessage, embeddedWallet } = useUserContext()

  async function onSubmit(data: z.infer<typeof UsernameSchema>) {

    if (signMessage && embeddedWallet?.address) {
      console.log("running processRegisterFor")
      await processRegisterFor({
        privySignerAddress: embeddedWallet.address,
        privySignMessage: signMessage,
        username: `${data.username}.sbvrsv.eth`
      })
      console.log("finished processRegisterFor")
    }

    setOpen(false)    
            
    toast.custom((t) => (
      <Toast>
        {'Welcome to River'}
        <span className="font-bold">{form.getValues().username}</span>
      </Toast>
    ))            
  }

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <Stack className="items-center gap-4">
          <DialogHeader>
            <DialogTitle>
              <Typography>Choose a username</Typography>
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col justify-center w-full gap-6"
            >
              <Separator />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="mx-5 text-center">
                    <FormControl>
                      <Input placeholder="Enter username..." {...field} />
                    </FormControl>
                    {usernameExists && checkState.debounceFinished && (
                      <FormMessage>
                        Username not available, please try another
                      </FormMessage>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator />
              <DialogFooter className="flex flex-col py-2">
                <SubmitButton
                  type="submit"
                  variant="link"
                  disabled={!canSubmit}
                >
                  Complete
                </SubmitButton>
              </DialogFooter>
            </form>
          </Form>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
