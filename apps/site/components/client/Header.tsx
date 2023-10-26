import { Flex, Button, Typography } from '@/design-system'
import { usePrivy } from '@privy-io/react-auth'

export function Header() {
  const { login, ready, authenticated, user } = usePrivy()

  // Show nothing if user is not authenticated or data is still loading
  if (!(ready && authenticated) || !user) {
    return null;
  }

  return (
    <Flex className="w-full items-center justify-end">
      {authenticated ? <Typography>{user.id}</Typography> :
        <Button variant="link" onClick={login}>
          Login
        </Button>}
    </Flex>
  )
}
