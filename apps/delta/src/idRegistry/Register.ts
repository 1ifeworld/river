import { ponder } from '@/generated'

// should we assume backup is always us? should folks be able to update this
ponder.on('IdRegistry:Register', async ({ event, context }) => {
  const { IdRegistry } = context.entities
  const { to, id, backup, data } = event.params

  // // Retrieve or create a User entity with the given userId
  // let userEntity = await User.findUnique({ id: `RIVER_USER_${id}` });
  // if (!userEntity) {
  //   userEntity = await User.create({
  //     id: `${id}`,
  //     data: {
  //       userId: id,
  //     }
  //   });
  // }

  await IdRegistry.create({
    id: `420/${to}/${id}`,
    data: {
      to: to,
      userId: id,
      backup: backup,
      data: data,
    },
  })
})
