import { Button, Body } from '../../../../../../../packages/estuary/src'

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
      className="rounded w-full mb-4"
    >
      <Body>{nameOfAdd ? `Add "${nameOfAdd}"` : 'Add'}</Body>
    </Button>
  )
}

export default SearchAction
