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
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { publicClient } from '@/config/publicClient'
import { getUserId } from '@/gql'
import React, { useState, useEffect } from 'react'
import { useDebounce } from 'usehooks-ts'
import { addresses } from 'scrypt'
import * as z from 'zod'
import { AlchemyProvider } from '@alchemy/aa-alchemy'
import { useAlchemyContext } from 'context/AlchemyProviderContext'
import { type Hex } from 'viem'

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

export function UsernameDialog({ open }: { open: boolean }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
    },
  })

  const [usernameExists, setUsernameExists] = useState<boolean | null>(null)
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const username = form.watch('username')
  const debouncedUsername = useDebounce(username, 500)
  const [checkState, setCheckState] = useState({
    isChecking: false,
    debounceFinished: false,
  })
  const [canSubmit, setCanSubmit] = useState(false)

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

  const { alchemyProvider } = useAlchemyContext()

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const smartAccountAddress = await alchemyProvider?.getAddress()
    console.log('SMART', smartAccountAddress)

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
