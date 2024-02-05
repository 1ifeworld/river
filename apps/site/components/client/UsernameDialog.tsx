import { SubmitButton } from '@/client'
import { useUserContext } from '@/context'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Separator,
  Stack,
  Toast,
  Typography,
} from '@/design-system'
import {
  type UsernameSchemaValues,
  checkUsernameAvailability,
  processRegisterFor,
  usernameSchema,
  signForUsername,
} from '@/lib'
import { addresses } from 'scrypt'
import { SignMessageModalUIOptions } from '@privy-io/react-auth'
import { zodResolver } from '@hookform/resolvers/zod'
import debounce from 'debounce'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
  Hex,
  createWalletClient,
  custom,
  EIP1193Provider,
  zeroAddress,
} from 'viem'
import { arbitrumNova, optimism } from 'viem/chains'
import { getExpiration } from 'scrypt'

interface UsernameDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function UsernameDialog({ open, setOpen }: UsernameDialogProps) {
  const form = useForm<UsernameSchemaValues>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: '',
    },
  })

  const { signMessage, embeddedWallet, fetchUserData } = useUserContext()

  const [usernameExists, setUsernameExists] = useState(false)
  const [validationComplete, setValidationComplete] = useState(false)
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false)

  // Subscribe to changes to the username input
  const watchUsername = debounce(() => form.watch('username'), 500)

  const triggerValidation = React.useMemo(
    () =>
      debounce(() => {
        form.trigger('username')
        setValidationComplete(true)
      }, 500),
    [form],
  )

  useEffect(() => {
    if (form.formState.isValid && validationComplete) {
      checkUsernameAvailability(form.getValues().username).then((result) => {
        setUsernameExists(result.exists)
        setIsCheckingAvailability(false)
      })
      return () => {
        setValidationComplete(false)
      }
    }
  }, [validationComplete, watchUsername])

  // async function registerUsername(
  //   username: string,
  //   privySignMessage: (
  //     message: string,
  //     uiOptions?: SignMessageModalUIOptions | undefined,
  //   ) => Promise<string>, // Updated type
  //   embeddedWalletAddress: string,
  //   fetchUserData: () => Promise<void>,
  // ) {
  // Check if the necessary conditions are met using the passed parameters
  //   if (privySignMessage && embeddedWalletAddress) {
  //     const userId = await processRegisterFor({
  //       privySignerAddress: embeddedWalletAddress,
  //       privySignMessage: privySignMessage, // Pass the function
  //       username: username,
  //     })

  //     if (userId) {
  //       const success = await signForUsername(
  //         String(userId),
  //         username,
  //         embeddedWalletAddress as Hex,
  //         privySignMessage,
  //       )
  //       if (success) {
  //         await fetchUserData()
  //         return true // Indicate success
  //       } else {
  //         console.error('Failed to prepare and set username.')
  //         return false // Handle failure here
  //       }
  //     } else {
  //       console.log('User ID not obtained from processRegisterFor.')
  //       return false // Indicate failure to obtain userId
  //     }
  //   } else {
  //     console.log('Required conditions not met for registerUsername.')
  //     return false // Indicate failure due to unmet conditions
  //   }
  // }

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <Stack className="items-center gap-5">
          <DialogTitle>
            <Typography>Choose a username</Typography>
          </DialogTitle>
          <Form {...form}>
            <form
              action={async () => {
                if (!embeddedWallet || !signMessage || !fetchUserData) return
                const eip1193Provider =
                  await embeddedWallet.getEthereumProvider()
                const customEip1193Client = createWalletClient({
                  chain: optimism,
                  transport: custom(eip1193Provider as EIP1193Provider),
                })
                const deadline = getExpiration()
                const ID_REGISTRY_EIP_712_DOMAIN = {
                  name: 'River IdRegistry',
                  version: '1',
                  chainId: 10,
                  verifyingContract: addresses.idRegistry.optimism,
                } as const
                const REGISTER_TYPE = [
                  { name: 'to', type: 'address' },
                  { name: 'recovery', type: 'address' },
                  { name: 'nonce', type: 'uint256' },
                  { name: 'deadline', type: 'uint256' },
                ] as const
                const sig = await customEip1193Client.signTypedData({
                  account: embeddedWallet.address as Hex,
                  domain: ID_REGISTRY_EIP_712_DOMAIN,
                  types: { Register: REGISTER_TYPE },
                  primaryType: 'Register',
                  message: {
                    to: embeddedWallet.address as Hex,
                    recovery: addresses.riverRecovery.optimism,
                    nonce: BigInt(0), // this is assumes all wallets calling this have NO previous tx's
                    deadline: deadline,
                  },
                })
                await processRegisterFor({
                  signer: embeddedWallet.address as Hex,
                  recovery: addresses.riverRecovery.optimism,
                  deadline: deadline,
                  sig: sig,
                  username: form.getValues().username,
                })
                await fetchUserData()
                // Close the dialog
                setOpen(false)
                // Render a toast
                toast.custom((t) => (
                  <Toast>
                    Welcome to River{' '}
                    <span className="font-bold">
                      {form.getValues().username}
                    </span>
                  </Toast>
                ))
              }}
              className="w-full"
            >
              <Stack className="gap-8">
                <Separator />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="mx-5 text-center">
                      <FormControl>
                        <Input
                          placeholder="Enter username..."
                          {...field}
                          onChange={(e) => {
                            field.onChange(e)
                            setIsCheckingAvailability(true)
                            triggerValidation()
                          }}
                        />
                      </FormControl>
                      <div className="h-3">
                        {usernameExists ? (
                          <FormMessage className="pt-2 text-red-500">
                            Username not available, please try another
                          </FormMessage>
                        ) : (
                          <FormMessage className="pt-2 text-red-500" />
                        )}
                      </div>
                    </FormItem>
                  )}
                />
                <Separator className="-mt-3" />
              </Stack>
              <DialogFooter className="text-center pt-[18px]">
                <SubmitButton
                  type="submit"
                  variant="link"
                  // disabled={
                  //   !form.formState.isValid ||
                  //   usernameExists ||
                  //   isCheckingAvailability
                  // }
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
