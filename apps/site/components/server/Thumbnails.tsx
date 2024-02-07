import { cn, Stack, Typography } from '@/design-system'
import { truncateText } from '@/utils'

function extractFileExtension(mimeType: string): string {
  if (!mimeType) {
    return ''
  }
  const lastSlashIndex = mimeType.lastIndexOf('/')
  if (lastSlashIndex !== -1) {
    return `.${mimeType.substring(lastSlashIndex + 1)}`
  }
  return ''
}

export function GenericThumbnailLarge({
  text,
  className,
}: { text: string; className?: string }) {
  return (
    <Stack
      className={cn(
        'bg-[#E9E9E9] justify-center items-center aspect-square w-full',
        className,
      )}
    >
      <Typography className="text-secondary-foreground md:text-2xl">
        {extractFileExtension(text)}
      </Typography>
    </Stack>
  )
}

export function GenericThumbnailSmall({ text, className }: { text: string, className?: string }) {
  return (
    <Stack className={cn('bg-[#E9E9E9] justify-center items-center w-[38px] h-[38px]')}>
      <Typography className="text-secondary-foreground text-[10px]">
        {truncateText(extractFileExtension(text), 5, false)}
      </Typography>
    </Stack>
  )
}
