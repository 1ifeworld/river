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
      className='rounded w-full bg-[#3F8AE2] hover:bg-[#1456A4] mb-4'
    >
      <Body>{nameOfAdd ? 'Add ' + `"${nameOfAdd}"` : 'Add'}</Body>
    </Button>
  );
};

export default SearchAction;
