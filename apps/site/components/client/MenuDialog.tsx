import * as React from 'react'
import Link from 'next/link'
import { usePrivy, useLogout } from '@privy-io/react-auth'
import { useUserContext } from '@/context'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogPortal,
  DialogTrigger,
  Stack,
  Typography,
} from '@/design-system'
import { UserDropdown } from '@/client'

export function MenuDialog() {
  const { login, authenticated } = usePrivy()
  const { username, clearUserData } = useUserContext()
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const { logout } = useLogout({
    onSuccess: () => {
      if (clearUserData) {
        clearUserData()
      }
    },
  })

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {!dialogOpen ? (
        <DialogTrigger asChild>
          <Button variant="link" onClick={() => setDialogOpen(false)}>
            <Typography>menu</Typography>
          </Button>
        </DialogTrigger>
      ) : (
        <DialogClose asChild className="flex-1 justify-end">
          <Button variant="link">
            <Typography>close</Typography>
          </Button>
        </DialogClose>
      )}
      <DialogPortal>
        <DialogContent
          overlayClassName="bg-none"
          className=" h-full w-full mt-[38px] pt-[60px] px-5 border-none focus:outline-none"
        >
          <Stack className="items-end gap-6">
            {!authenticated ? (
              <>
                <DialogClose asChild>
                  <Link href={'/directory'}>
                    <Typography className="text-primary-foreground">
                      Directory
                    </Typography>
                  </Link>
                </DialogClose>
                <DialogClose asChild>
                  <Link href="/channel/bafyreihuskbd64blgyd6lkx7es4boxljbdqp3w5s5d2sym5ovbergxjlna">
                    <Typography className="text-primary-foreground">
                      Feedback
                    </Typography>
                  </Link>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="link" onClick={login}>
                    <Typography className="text-primary-foreground">
                      Profile - login
                    </Typography>
                  </Button>
                </DialogClose>
              </>
            ) : (
              <>
                <DialogClose asChild>
                  <Link href={'/directory'}>
                    <Typography className="text-primary-foreground">
                      Directory
                    </Typography>
                  </Link>
                </DialogClose>
                <DialogClose asChild>
                  <Link href="/channel/bafyreihuskbd64blgyd6lkx7es4boxljbdqp3w5s5d2sym5ovbergxjlna">
                    <Typography className="text-primary-foreground">
                      Feedback
                    </Typography>
                  </Link>
                </DialogClose>
                <DialogClose asChild>
                  <Link href={`/${username}`}>
                    <Typography className="text-primary-foreground">
                      Profile
                    </Typography>
                  </Link>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="link" onClick={logout}>
                    <Typography className="text-primary-foreground">
                      Logout
                    </Typography>
                  </Button>
                </DialogClose>
              </>
            )}
          </Stack>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
