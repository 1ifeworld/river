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
import { addresses } from 'scrypt'
import * as z from 'zod'
import { publicClient } from 'config/clients'

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
    // Username not available, please try another
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

  const { alchemyProvider, smartAccountAddress } = useAlchemyContext()
  alchemyProvider?.withAlchemyGasManager({
    policyId: process.env.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY as string,
    entryPoint: addresses.entryPoint.opGoerli,
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      // const smartAccountAddress = (await alchemyProvider?.getAddress()) as Hex
      const hash = await registerAndDelegate({
        from: smartAccountAddress as Hex,
        provider: alchemyProvider as AlchemyProvider,
      })

      if (hash) {
        // Only proceed if a hash value was returned
        const logs = await publicClient.getLogs({
          address: addresses.idRegistry.opGoerli,
          event: parseAbiItem(
            'event Register(address indexed to, uint256 indexed id, address backup, bytes data)',
          ),
        })

        console.log(logs)
        console.log(data.username)
        console.log(smartAccountAddress)
        console.log(user?.email?.address)
        console.log(user?.wallet?.address)

        // Ensure logs array is not empty and has the expected structure
        if (logs.length > 0 && logs[0].args.id !== undefined) {
          const userId: string = (logs[0].args.id as bigint).toString()

          console.log('User id in username dialog', userId)

          await setUsername({
            registrationParameters: {
              id: userId,
              name: `${data.username}.sbvrsv.eth`,
              owner: String(smartAccountAddress),
              signer: user?.wallet?.address as string,
              email: user?.email?.address as string,
            },
          })
        } else {
          console.error('No logs found for the transaction.')
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
          >
            Complete
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
