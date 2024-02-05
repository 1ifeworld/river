import { Stack, Typography, Flex, Loading } from '@/design-system'

interface UploadProgressProps {
  fileIndex: number
  totalFiles: number
  statusHeader: string
  statusMessage: string
  showLoadingIcon: boolean
}

export function UploadProgress({
  fileIndex,
  totalFiles,
  statusHeader,
  statusMessage,
  showLoadingIcon,
}: UploadProgressProps) {
  return (
    <Stack className="bg-background border-[0.5px] border-secondary-foreground gap-1 px-4 py-3 text-primary-foreground tracking-tight font-sans text-base fixed bottom-4 left-4 right-4 mx-auto w-auto md:left-auto md:w-80 md:mx-0 z-50">
      <Typography>
        {`${statusHeader} ${fileIndex}/${totalFiles} ${
          totalFiles > 1 ? 'items' : 'item'
        }`}
      </Typography>
      <Flex>
        <Typography
          as="div"
          className="text-secondary-foreground whitespace-nowrap"
        >
          {statusMessage.substring(0, 35)}
        </Typography>
        <div
          className={`${
            !showLoadingIcon ? 'opacity-0' : ''
          } pt-[3px] h-0 text-secondary-foreground`}
        >
          <Loading />
        </div>
      </Flex>
    </Stack>
  )
}
