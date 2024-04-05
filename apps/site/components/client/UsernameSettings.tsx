import { EditMembersInput, EditUsernameDialog } from '@/client'
import { useUserContext } from '@/context'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Flex,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Loading,
  Separator,
  Stack,
  StatusEmpty,
  StatusFilled,
  Toast,
  Typography,
} from '@/design-system'
import type { Channel, ChannelRoles } from '@/gql'
import {
  checkUsernameAvailability,
  getDataForUsername,
  getUsername,
  processEditRolesPost,
  usernameSchema,
} from '@/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@privy-io/react-auth'
import debounce from 'debounce'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { Hex } from 'viem'

interface UserSettingsProps {
  user: RiverUser
}

interface RiverUser {
    rid: bigint
}

export function UserSettings({ user }: UserSettingsProps) {
  const { signMessage, userId, embeddedWallet } = useUserContext()
  const [isConfiguring, setIsConfiguring] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [open, setOpen] = useState<boolean>(false)

  function isUser({ userRid }: { userRid: bigint }) {
    const rid = userId 
    return rid === userRid;
  }

  const enableEditMembers =
    !embeddedWallet?.address || !userId 
      ? false
      : isUser({
          userRid: userId,
        })

  const form = useForm({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: '',
    },
  })


  const [isValidUser, setIsValidUser] = useState<0 | 1 | 2 | 3>(0) // 0 = null state, 1 = valid, 2 = invalid, 3 = already added
  const [validationComplete, setValidationComplete] = useState(false)
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)

  // Subscribe to changes to the username input
  const watchUsername = debounce(() => form.watch('username'), 500)

  // username checkibng
  const triggerValidation = useMemo(
    () =>
      debounce(() => {
        form.trigger('username')
        setValidationComplete(true)
      }, 500),
    [form],
  )


  /* NOTE: probably should add a check to ensure that number of admins/members works nice in UI */
  async function addUsernameHandler() {
    const username = form.getValues().username
    if (username) {
      const dataForUsername = await getDataForUsername({
        username: form.getValues().username,
      })
      if (dataForUsername) {
        setIsValidUser(0)
        form.reset()
      }
    }
  }

  function clearUsernameHandler() {
    setIsValidUser(0)
    form.reset()
  }

  return (
    <Dialog>
      {/* Dropdown logic */}
      <DropdownMenu>
        {enableEditMembers && (
          <DropdownMenuTrigger
            disabled={isConfiguring}
            className="focus:outline-none mb-1"
          >
            <Typography className="hover:font-bold" variant="h2">
              {isConfiguring ? <Loading /> : '...'}
            </Typography>
          </DropdownMenuTrigger>
        )}
        <DropdownMenuContent side="bottom" align="start">
          <DropdownMenuGroup className="flex flex-col gap-3">
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Typography>Edit Username</Typography>
          </DropdownMenuItem>
          <div className="-mx-4">
            <Separator />
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>

      {/* Dialog logic */}
      <EditUsernameDialog open={open} setOpen={setOpen} />

    </Dialog>
  )
}
