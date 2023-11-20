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
import { setUsername } from '@/lib'
import { registerAndDelegate } from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAlchemyContext } from 'context/AlchemyProviderContext'
import { usePrivy } from '@privy-io/react-auth'
import { AlchemyProvider } from '@alchemy/aa-alchemy'
import { Hex, parseAbiItem } from 'viem'
import { getUserId } from 'gql/requests/getUserId'
import React, { useState, useEffect, useCallback } from 'react'

import { addresses } from 'scrypt'
import * as z from 'zod'

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
    // Username not available, please try another
  }),
})

function debounce(func: (...args: any[]) => void, wait: number): (...args: any[]) => void {
  let timeout: NodeJS.Timeout | null = null

  return function executedFunction(...args: any[]) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

interface CheckUsernameResponse {
  exists: boolean
}

async function checkUsernameAvailability(username: string): Promise<CheckUsernameResponse> {
  try {
    const response = await fetch(`https://server.talktomenice.workers.dev/get/${`${username}.sbvrsv.eth`}`)
    if (response.status === 200) {
      return { exists: true }
    } else if (response.status === 404) {
      return { exists: false }
    }
    throw new Error('Unexpected response from the server')
  } catch (error) {
    console.error('Error checking username:', error)
    throw error
  }
}

export function UsernameDialog({ open }: { open: boolean }) {
  const { ready, authenticated, user } = usePrivy()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
    },
  })

  const [usernameExists, setUsernameExists] = useState<boolean | null>(null)
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  const debouncedCheckUsername = useCallback(
    debounce(async (username: string) => {
      setIsCheckingUsername(true); // Start checking username
      const result = await checkUsernameAvailability(username);
      setUsernameExists(result.exists);
      setIsCheckingUsername(false); // Done checking username
    }, 500),
    [],
  );

  useEffect(() => {
    const username = form.watch('username');
    if (username) {
      debouncedCheckUsername(username);
    } else {
      setUsernameExists(null); // Reset when the field is cleared
      setIsCheckingUsername(false);
    }
  }, [form.watch('username'), debouncedCheckUsername]);


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
        const userIdResponse = await getUserId({
          custodyAddress: smartAccountAddress,
        })

        if (userIdResponse?.userId) {
          const userId = userIdResponse.userId

          // Now call setUsername with the obtained userId

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
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    {usernameExists && <FormMessage>Username already exists!</FormMessage>}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            type="submit"
            variant="link"
            disabled={usernameExists || isCheckingUsername || !form.watch('username')}
          >
            Complete
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
