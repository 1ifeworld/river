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
import { useAlchemyContext } from '@/context'
import { usePrivy } from '@privy-io/react-auth'
import { AlchemyProvider } from '@alchemy/aa-alchemy'
import { Hex } from 'viem'
import { getUserId } from '@/gql'
import React, { useState, useEffect } from 'react'
import { useDebounce } from 'usehooks-ts'
import { addresses } from 'scrypt'
import * as z from 'zod'

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

export function UsernameDialog({ open }: { open: boolean }) {
  const { ready, authenticated, user } = usePrivy()
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

  const { alchemyProvider, smartAccountAddress } = useAlchemyContext()
  alchemyProvider?.withAlchemyGasManager({
    policyId: process.env.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY as string,
    entryPoint: addresses.entryPoint.opGoerli,
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      // Execute the registerAndDelegate function
      const hash = await registerAndDelegate({
        from: smartAccountAddress as Hex,
        provider: alchemyProvider as AlchemyProvider,
      })

      if (hash && smartAccountAddress) {
        // If a hash is returned, proceed to get the userId
        const { userId } = await getUserId({
          custodyAddress: smartAccountAddress,
        })

        if (userId) {
          await setUsername({
            registrationParameters: {
              id: userId,
              name: `${data.username}.sbvrsv.eth`,
              owner: String(smartAccountAddress),
              email: user?.email?.address as string,
              signer: user?.wallet?.address as string,
            },
          })
        } else {
          console.error('No valid user ID found for the given address.')
        }
      } else {
        console.error('No transaction hash returned from registerAndDelegate.')
      }
    } catch (error) {
      console.error('An error occurred during the registration process:', error)
    }
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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-2/3 space-y-6"
            >
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
            </form>
          </Form>
          {canSubmit && (
            <Button
              onClick={form.handleSubmit(onSubmit)}
              type="submit"
              variant="link"
            >
              Complete
            </Button>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
