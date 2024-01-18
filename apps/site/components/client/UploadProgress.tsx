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
    <Stack className="bg-background border-[0.5px] border-secondary-foreground gap-1 px-4 py-3 text-primary-foreground tracking-tight font-sans text-base leading-[14px] fixed bottom-4 left-4 right-4 mx-auto w-auto md:left-auto md:w-80 md:mx-0 z-50">
      <Typography className="leading-0">
        {statusHeader} {fileIndex}/{totalFiles}
      </Typography>
      <Typography as="div" className="leading-0">
        <Flex className="text-secondary-foreground">
          {statusMessage}
          <div
            className={`${!showLoadingIcon ? 'opacity-0' : ''} pt-[3px] h-0`}
          >
            <Loading />
          </div>
        </Flex>
      </Typography>
    </Stack>
  )
}
