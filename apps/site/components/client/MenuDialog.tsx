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
  DialogHeader,
  Stack,
  Typography,
  Separator,
  Flex,
} from '@/design-system'

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
      <DialogTrigger asChild>
        <Button variant="link" onClick={() => setDialogOpen(false)}>
          <Typography>Menu</Typography>
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent
          overlayClassName="bg-none"
          className="flex flex-col items-start h-full w-full px-4 border-none focus:outline-none"
        >
          <DialogHeader className="flex w-full h-fit justify-end">
            <DialogClose asChild>
              <Button variant="link">
                <Typography>Close</Typography>
              </Button>
            </DialogClose>
          </DialogHeader>
          <Stack className="h-full w-full pt-[52px] items-start gap-y-6">
            {!authenticated ? (
              <>
                <DialogClose>
                  <Button variant="link" className="w-full h-5 justify-start">
                    <Link
                      href={'/directory'}
                      className="rounded-none flex w-full"
                    >
                      <Flex className="w-full justify-between items-center">
                        <Typography className="text-primary-foreground">
                          Directory
                        </Typography>
                        <Typography className="text-secondary-foreground text-[14px]">
                          ›
                        </Typography>
                      </Flex>
                    </Link>
                  </Button>
                </DialogClose>
                <DialogClose>
                  <Button variant="link" className="w-full h-5 justify-start">
                    <Link
                      href="/channel/bafyreihuskbd64blgyd6lkx7es4boxljbdqp3w5s5d2sym5ovbergxjlna"
                      className="rounded-none flex w-full"
                    >
                      <Flex className="w-full justify-between items-center">
                        <Typography className="text-primary-foreground">
                          Feedback
                        </Typography>
                        <Typography className="text-secondary-foreground text-[14px]">
                          ›
                        </Typography>
                      </Flex>
                    </Link>
                  </Button>
                </DialogClose>
                <Separator orientation="vertical" className="h-4 border-none" />
                <DialogClose asChild>
                  <Button
                    variant="link"
                    onClick={login}
                    className="w-full justify-start h-6 rounded-none items-center"
                  >
                    <Typography className="text-[#999999] w-full text-left">
                      Login
                    </Typography>
                  </Button>
                </DialogClose>
              </>
            ) : (
              <>
                <DialogClose asChild>
                  <Link
                    href={'/directory'}
                    className="flex w-full justify-between rounded-none items-center"
                  >
                    <Typography className="text-primary-foreground">
                      Directory
                    </Typography>
                    <Typography className="text-secondary-foreground text-[13px] p-0 m-0">
                      ›
                    </Typography>
                  </Link>
                </DialogClose>
                <DialogClose asChild>
                  <Link
                    href="/channel/bafyreihuskbd64blgyd6lkx7es4boxljbdqp3w5s5d2sym5ovbergxjlna"
                    className="flex w-full justify-between rounded-none items-center"
                  >
                    <Typography className="text-primary-foreground">
                      Feedback
                    </Typography>
                    <Typography className="text-secondary-foreground text-[13px] p-0 m-0">
                      ›
                    </Typography>
                  </Link>
                </DialogClose>
                <DialogClose asChild>
                  <Link
                    href={`/${username}`}
                    className="flex w-full justify-between rounded-none items-center"
                  >
                    <Typography className="text-primary-foreground">
                      Profile
                    </Typography>
                    <Typography className="text-secondary-foreground text-[13px] p-0 m-0">
                      ›
                    </Typography>
                  </Link>
                </DialogClose>
                <Separator
                  orientation="vertical"
                  className="h-4 border-none bg-0"
                />
                <DialogClose asChild>
                  <Button
                    variant="link"
                    onClick={logout}
                    className="w-full justify-start h-6 rounded-none items-center"
                  >
                    <Typography className="text-[#999999] w-full text-left">
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
