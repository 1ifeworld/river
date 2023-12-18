import { Stack, Typography } from '@/design-system'
import { getDataForUsername } from 'lib/username/getDataForUsername'

export async function ActivityBanner({
  user,
}: {
  /* biome-ignore lint: */
  user: any
}) {
  const userData = await getDataForUsername({
    username: `${user.name}.sbvrsv.eth`,
  })

  return (
    <Stack>
      <Typography variant="h1">{userData?.name}</Typography>
      <Typography variant="h1" className="text-secondary-foreground">
        {user?.desc}
      </Typography>
    </Stack>
  )
}
