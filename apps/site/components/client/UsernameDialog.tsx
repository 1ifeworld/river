import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Stack,
  Typography,
} from '@/design-system'
import {
  setUsername,
  registerAndDelegate,
  checkUsernameAvailability,
} from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { publicClient } from '@/config/publicClient'
import React, { useState, useEffect } from 'react'
import { useDebounce } from 'usehooks-ts'
import { addresses } from 'scrypt'

import { AlchemyProvider } from '@alchemy/aa-alchemy'
import { useUserContext } from '@/context'
import { type Hex } from 'viem'
import * as z from 'zod'

interface UsernameDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function UsernameDialog({ open, setOpen }: UsernameDialogProps) {


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

  const { alchemyProvider, smartAccountAddress } = useUserContext()

  async function onSubmit(data: z.infer<typeof UsernameSchema>) {
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
        name: `${data.username}.sbvrsv.eth`,
        owner: String(smartAccountAddress),
      },
    })

    setOpen(false)
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
          {/* <Separator /> */}
          <Form {...form}>
            <form className="w-2/3 space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="username"
                        {...field}
                        disabled={isCheckingUsername}
                      />
                    </FormControl>
                    {usernameExists && checkState.debounceFinished && (
                      <FormMessage>Username already exists!</FormMessage>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                onClick={form.handleSubmit(onSubmit)}
                type="submit"
                variant="link"
                disabled={!canSubmit}
              >
                Complete
              </Button>
            </form>
          </Form>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
