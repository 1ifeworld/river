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

  function onSubmit(data: z.infer<typeof FormSchema>) {}
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
