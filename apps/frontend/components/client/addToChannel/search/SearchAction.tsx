import { Button, Body, Debug } from '@river/estuary'

interface SearchActionProps {
  addReady: boolean
  addTrigger?: () => void
  nameOfAdd?: string
}

const SearchAction = ({
  addReady,
  addTrigger,
  nameOfAdd,
}: SearchActionProps) => {
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

export default SearchAction
