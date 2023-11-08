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
import { AlchemyProvider } from '@alchemy/aa-alchemy'
import { zeroAddress, Hex, parseAbiItem } from 'viem'
import {
  entryPoint,
  idRegistry,
  idRegistryABI,
  lightAccountFactory,
} from 'offchain-schema'
import * as z from 'zod'
import { publicClient } from 'config/clients'
import { lightAccountAbi } from 'abi/lightAccountAbi'

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
    // Username not available, please try another
  }),
})

export function UsernameDialog({ open }: { open: boolean }) {
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

    console.log('LOGS', logs)
    console.log('ID', logs[0].args?.id)

    await setUsername({
      registrationParameters: {
        // TODO: Pass the appropriate user id
        id: '23',
        name: `${data.username}.sbvrsv.eth`,
        // TODO: Pass the appropriate smart account address
        owner: String(zeroAddress),
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
