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
  DialogTitle,
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
        <DialogClose asChild className="flex justify-end">
          <Button variant="link">
            <Typography>close</Typography>
          </Button>
        </DialogClose>
      )}
      <DialogPortal>
        <DialogContent
          overlayClassName="bg-none"
          className="flex flex-col items-start h-full w-full px-4 border-none focus:outline-none"
        >
          <DialogHeader className="flex w-full h-fit justify-end">
            <DialogClose asChild >
              <Button variant="link">
                <Typography>close</Typography>
              </Button>
            </DialogClose>
          </DialogHeader>           
          <Stack className="h-full w-full pt-12 items-start gap-2">           
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
                  <Link href={'/directory'} className='flex w-full justify-between items-center'>
                    <Typography className="text-primary-foreground">
                      Directory
                    </Typography>
                    <Typography className="text-secondary-foreground text-[20px] p-0 m-0">
                      ›
                    </Typography>                                        
                  </Link>
                </DialogClose>
                <DialogClose asChild>
                  <Link 
                    href="/channel/bafyreihuskbd64blgyd6lkx7es4boxljbdqp3w5s5d2sym5ovbergxjlna"
                    className='flex w-full justify-between items-center'
                  >
                    <Typography className="text-primary-foreground">
                      Feedback
                    </Typography>
                    <Typography className="text-secondary-foreground text-[20px] p-0 m-0">
                      ›
                    </Typography>                       
                  </Link>
                </DialogClose>
                <DialogClose asChild>
                  <Link href={`/${username}`} className='flex w-full justify-between items-center'>
                    <Typography className="text-primary-foreground">
                      Profile
                    </Typography>
                    <Typography className="text-secondary-foreground text-[20px] p-0 m-0">
                      ›
                    </Typography>                         
                  </Link>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="link" onClick={logout} className='w-full pt-8 justify-start h-8 rounded-none '>
                    <Typography className="text-secondary-foreground">
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
