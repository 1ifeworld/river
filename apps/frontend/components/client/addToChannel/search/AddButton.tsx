import { Button } from '@river/estuary'

interface AddButtonProps {
  addReady: boolean
  addTrigger?: () => void
  nameOfAdd?: string
}

export function AddButton({ addReady, addTrigger, nameOfAdd }: AddButtonProps) {
  return (
    <Button
      disabled={!addReady}
      onClick={addTrigger}
      className="w-full"
      variant="secondary"
    >
      {nameOfAdd ? `Add "${nameOfAdd}"` : 'Add'}
    </Button>
  )
}
