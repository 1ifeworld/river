import { Flex } from '@river/design-system'

export default function ViewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Flex className="w-full h-screen">{children}</Flex>
}
