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
} from '@/lib'
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
import { arbitrumNova } from 'viem/chains'
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
                  chain: arbitrumNova,
                  transport: custom(eip1193Provider as EIP1193Provider),
                })
                const deadline = getExpiration()
                const ID_REGISTRY_EIP_712_DOMAIN = {
                  name: 'River IdRegistry',
                  version: '1',
                  chainId: 42170,
                  verifyingContract:
                    '0x339513226Afd92B309837Bad402c6D3ADDE9Ad24', // arb nova
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
                    recovery: zeroAddress,
                    nonce: BigInt(0),
                    deadline: deadline,
                  },
                })
                await processRegisterFor({
                  signer: embeddedWallet.address as Hex,
                  recovery: zeroAddress,
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
                    <span className="font-medium">
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
                  disabled={
                    !form.formState.isValid ||
                    usernameExists ||
                    isCheckingAvailability
                  }
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
