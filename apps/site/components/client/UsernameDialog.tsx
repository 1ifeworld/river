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
import { Email } from '@privy-io/react-auth'
import { useForm } from 'react-hook-form'
import { useAlchemyContext } from 'context/AlchemyProviderContext'
import { useUserContext } from 'context/UserContext'
import { UserContext } from 'context/UserContext'
import { AlchemyProvider } from '@alchemy/aa-alchemy'
import { zeroAddress, Hex, parseAbiItem } from 'viem'
import { useContext } from 'react'
import {
  entryPoint,
  idRegistry,
  idRegistryABI,
  lightAccountFactory,
} from 'offchain-schema'
import * as z from 'zod'
import { publicClient } from 'config/clients'

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
    // Username not available, please try another
  }),
})

export function UsernameDialog({ open }: { open: boolean }) {
  const { email, signer } = useContext(UserContext)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
    },
  })

  const alchemyProvider = useAlchemyContext()
  alchemyProvider?.withAlchemyGasManager({
    policyId: process.env.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY as string,
    entryPoint: entryPoint,
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const emailObj: Email = {
      address: email?.address as string,
    }

    const smartAccountAddress = (await alchemyProvider?.getAddress()) as Hex

    await registerAndDelegate({
      from: smartAccountAddress,
      provider: alchemyProvider as AlchemyProvider,
    })

    const logs = await publicClient.getLogs({
      address: idRegistry,
      event: parseAbiItem(
        'event Register(address indexed to, uint256 indexed id, address backup, bytes data)',
      ),
    })

    const userId: string = (logs[0]?.args?.id as bigint).toString()

    await setUsername({
      registrationParameters: {
        id: userId,
        name: `${data.username}.sbvrsv.eth`,
        owner: String(smartAccountAddress),
        email: emailObj.address,
        signer: String(signer),
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
