import { Stack, Typography } from '@/design-system'

export async function ActivityBanner({
  user,
}: {
  /* biome-ignore lint: */
  user: any
}) {
  return (
    <Stack>
      <Typography variant="h1">{user.name}</Typography>
      <Typography variant="h1" className="text-secondary-foreground">
        {user.desc}
      </Typography>
    </Stack>
  )
}
