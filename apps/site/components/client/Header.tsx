import { Flex, Button } from '@/design-system'
import { usePrivy } from '@privy-io/react-auth'

export function Header() {
  const { login } = usePrivy()
  return (
    <Flex className="w-full items-center justify-end">
      <Button variant="link" onClick={login}>
        Login
      </Button>
    </Flex>
  )
}
