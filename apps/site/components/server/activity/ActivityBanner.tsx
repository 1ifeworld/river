import { Stack, Typography } from '@/design-system'

export async function ActivityBanner({
  user,
}: {
  /* biome-ignore lint: */
  user: any
}) {
  return (
    <Stack className="gap-[10px]">
      <Typography variant="smallText">{user.name}</Typography>
      <Typography variant="smallText" className="text-[#747474]">
        {user.desc}
      </Typography>
    </Stack>
  )
}
