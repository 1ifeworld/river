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
  setUsername,
  registerAndDelegate,
  checkUsernameAvailability,
  usernameSchema,
} from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { publicClient } from '@/config/publicClient'
import React, { useState, useEffect } from 'react'
import { useDebounce } from 'usehooks-ts'
import { addresses } from 'scrypt'
import { AlchemyProvider } from '@alchemy/aa-alchemy'
import { useUserContext } from '@/context'
import { SubmitButton } from '@/client'
import { type Hex } from 'viem'
import { toast } from 'sonner'
import * as z from 'zod'

interface UsernameDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function UsernameDialog({ open, setOpen }: UsernameDialogProps) {
  const form = useForm<z.infer<typeof usernameSchema>>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: '',
    },
  })

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

  const { alchemyProvider, smartAccountAddress } = useUserContext()

  async function onSubmit(data: z.infer<typeof usernameSchema>) {
    alchemyProvider?.withAlchemyGasManager({
      policyId: process.env.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY as string,
      entryPoint: addresses.entryPoint.opGoerli,
    })

    const transactionHash = await registerAndDelegate({
      from: smartAccountAddress as Hex,
      provider: alchemyProvider as AlchemyProvider,
    })

    const transaction = await publicClient.waitForTransactionReceipt({
      hash: transactionHash,
    })

    const userIdRegistered = parseInt(
      transaction.logs[6].topics[2] as string,
      16,
    )

    await setUsername({
      registrationParameters: {
        id: String(userIdRegistered),
        name: `${form.getValues().username}.sbvrsv.eth`,
        owner: String(smartAccountAddress),
      },
    })

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
