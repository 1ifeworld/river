import { Button, Body } from '@river/design-system';

export function CreateChannelButton({
  createReady,
  // handleUriUpload,
  createTrigger,
}: {
  createReady: boolean;
  // handleUriUpload: () => Promise<void>;
  createTrigger?: () => void;
}) {

  // const handleClick = async () => {
  //   if (handleUriUpload) {
  //     await handleUriUpload(); // Call handleUriUpload first
  //   }
  //   if (createTrigger) {
  //     createTrigger(); // Then call createTrigger
  //   }
  // };  

  return (
    <Button
      disabled={!createReady}
      onClick={createTrigger}
      className='rounded w-full mb-4'
    >
      <Body>{'Create'}</Body>
    </Button>
  );
}
