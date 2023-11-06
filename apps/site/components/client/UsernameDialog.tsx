import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Separator,
  Stack,
  Typography,
} from '@/design-system'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useAlchemyContext } from '@/context'
import { useEffect, useState } from 'react'
import { Hex } from 'viem'
import { operator } from '@/constants'

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

  // id
  // name
  // owner

  const [smartAccountAddress, setSmartAccountAddress] = useState<Hex>()

  const alchemyProvider = useAlchemyContext()

  console.log('Alchemy provider', alchemyProvider)

  useEffect(() => {
    const fetchAddress = async () => {
      const address = await alchemyProvider?.getAddress()
      setSmartAccountAddress(address as Hex)
    }
    fetchAddress()
  }, [alchemyProvider])

  interface nameRegistration {
    id: string
    name: string
    owner: string
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const registerField: nameRegistration = {
      id: '10',
      name: `${data.username}.sbvrsv.eth`,
      // owner: String(smartAccountAddress),
      owner: String(operator)
    }
    const headers = getCORSHeaders()

    // Helper function to set CORS headers
    function getCORSHeaders() {
      return new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      })
    }
    // await fetch('https://server.talktomenice.workers.dev/set', {
    //   method: 'POST',
    //   headers: headers,
    //   body: JSON.stringify(registerField),
    // })
    await fetch('https://server.talktomenice.workers.dev/set', {
      method: 'POST',
      // headers: headers,
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify(registerField),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.success) {
          console.log('Name set successfully')
        } else {
          alert(data.error)
          console.error('Error:', data.error)
        }
      })
      .catch((error) => {
        alert('wahhh')
        console.error('Fetch error:', error)
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
