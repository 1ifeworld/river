import { Stack, Typography } from '@/design-system'

function extractFileExtension(mimeType: string): string {
  const lastSlashIndex = mimeType.lastIndexOf('/')
  if (lastSlashIndex !== -1) {
    return `.${mimeType.substring(lastSlashIndex + 1)}`
  }
  return ''
}

export function GenericThumbnailLarge({ text }: { text: string }) {
  return (
    <Stack className="bg-[#E9E9E9] justify-center items-center aspect-square w-full">
      <Typography className="text-secondary-foreground text-2xl">
        {extractFileExtension(text)}
      </Typography>
    </Stack>
  )
}

export function GenericThumbnailSmall({ text }: { text?: string }) {
  return (
    <Stack className="bg-[#E9E9E9] justify-center items-center w-[38px] h-[38px]">
      <Typography className="text-secondary-foreground text-[10px]">
        {text
          ? text === 'image/jpeg'
            ? `${text.slice(-5).toLowerCase()}`
            : `${text.slice(-4).toLowerCase()}`
          : ''}
      </Typography>
    </Stack>
  )
}
