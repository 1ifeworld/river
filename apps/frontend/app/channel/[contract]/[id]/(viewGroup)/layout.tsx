import { Flex } from '@river/estuary'

export default function ViewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Flex className="w-full h-screen">{children}</Flex>
}
