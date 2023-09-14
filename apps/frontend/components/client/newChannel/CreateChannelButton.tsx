import { Button, Body } from '@river/design-system'

export function CreateChannelButton({
  createReady,

  createTrigger,
}: {
  createReady: boolean

  createTrigger?: () => void
}) {
  return (
    <Button disabled={!createReady} onClick={createTrigger}>
      <Body className="font-medium">Create</Body>
    </Button>
  )
}
