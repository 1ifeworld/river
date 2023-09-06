import { SvgLoader, Button, Body } from '@river/design-system';

interface SearchActionProps {
  addReady: boolean;
  addTrigger?: () => void;
  nameOfAdd?: string;
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
      className='rounded w-full bg-accent hover:bg-accentHover mb-4'
    >
      <Body>{nameOfAdd ? 'Add ' + `"${nameOfAdd}"` : 'Add'}</Body>
    </Button>
  );
};

export default SearchAction;
