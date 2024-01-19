import { SubmitButton } from '@/client'
import { useUserContext } from '@/context'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Separator,
  Stack,
  Toast,
  Typography,
} from '@/design-system'
import {
  checkUsernameAvailability,
  getDataForUsername,
  processEditChannelAccessPost,
  usernameSchema,
} from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useDebounce } from 'usehooks-ts'
import * as z from 'zod'

interface AddMembersFormProps {
  targetChannelId: bigint
}

export function AddMembersForm({ targetChannelId }: AddMembersFormProps) {
  const form = useForm<z.infer<typeof usernameSchema>>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: '',
    },
  })

  const [usernameExists, setUsernameExists] = useState<boolean | null>()
  const [usernameId, setUsernameId] = useState<bigint | null>()
  const [checkState, setCheckState] = useState({
    isChecking: false,
    debounceFinished: false,
  })
  const [canSubmit, setCanSubmit] = useState(false)

  console.log('usernameId: ', usernameId)
  console.log('can submit: ', canSubmit)

  const username = form.watch('username')
  const debouncedUsername = useDebounce(username, 500)

  useEffect(() => {
    let isMounted = true
    setCheckState({ isChecking: true, debounceFinished: false })

    if (debouncedUsername) {
      //   checkUsernameAvailability(debouncedUsername).then((result) => {
      getDataForUsername({ username: debouncedUsername }).then((result) => {
        if (isMounted) {
          setUsernameExists(result ? true : false)
          setUsernameId(result.id)
          setCheckState({ isChecking: false, debounceFinished: true })
          setCanSubmit(result ? true : false)
        }
      })
    } else {
      setUsernameExists(null)
      setUsernameId(null)
      setCheckState({ isChecking: false, debounceFinished: true })
      setCanSubmit(false)
    }

    return () => {
      isMounted = false
    }
  }, [debouncedUsername])

  const { signMessage, embeddedWallet, userId } = useUserContext()

  async function onSubmit(data: z.infer<typeof usernameSchema>) {
    // initialize bool for txn success check
    let txSuccess: boolean = false
    if (signMessage && embeddedWallet?.address && usernameId) {
      txSuccess = await processEditChannelAccessPost({
        targetUserId: userId as bigint,
        targetChannelId: targetChannelId,
        admins: [], // hardcoded as empty
        members: [usernameId], // only supports one at a time for now
        privySignMessage: signMessage,
      })
    }
    if (txSuccess) {
      toast.custom((t) => (
        <Toast>
          You added{' '}
          <span className="font-bold">{form.getValues().username}</span> to this
          channel
        </Toast>
      ))
    } else {
      toast.custom((t) => <Toast>Error adding new member</Toast>)
    }
  }

  return (
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
              {!usernameExists && checkState.debounceFinished && (
                <FormMessage>
                  User does not exist, please try another
                </FormMessage>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <SubmitButton type="submit" variant="link" disabled={!canSubmit}>
          {'Add'}
        </SubmitButton>
      </form>
    </Form>
  )
}
