import { ponder } from "@/generated";

interface RoleDelta {
  userId: bigint;
  role: bigint;
}


ponder.on("RoleBasedAccess:RolesSet", async ({ event, context }) => {
  const { RoleBasedAccess, Txn } = context.db;
  const { sender, userId, userIds, channelHash, roles } = event.args;
  const roleDeltas: RoleDelta[] = [];

  roles.forEach((role, index) => {
    // retrieve userId if there
    const userId = userIds[index];
    // Check if there's an existing entry for the user
    const existingDeltaIndex = roleDeltas.findIndex(
      (delta) => delta.userId === userId
    );
    if (existingDeltaIndex !== -1) {
      // If an entry exists, update the role
      roleDeltas[existingDeltaIndex].role = BigInt(role);
    } else {
      // If no entry exists, add a new entry
      roleDeltas.push({ userId, role: BigInt(role) });
    }
  });

  // Perform lookup for existing roles
  const existingRoles = await RoleBasedAccess.findUnique({
    id: `${event.log.address}/${sender}/${channelHash}`,
  });

  // If existingRoles is null, provide default values
  let admins = existingRoles?.admins ?? [];
  let members = existingRoles?.members ?? [];

  // if role delta for userId = 2: remove it from members array. and add it to admin array if not already there
  // if role delta for userId = 1: remove it from admub array. and add it to member array if not already there
  // if role delta for userId = 0: remove it from admin array if its there. remove from member array if its there

  // Iterate through roleDeltas and adjust admins and members arrays
  roleDeltas.forEach((roleDelta) => {
    const isUserAdmin = admins.includes(roleDelta.userId);
    const isUserMember = members.includes(roleDelta.userId);

    if (roleDelta.role === BigInt(2)) {
      // Admin role
      members = members.filter((id) => id !== roleDelta.userId);
      if (!isUserAdmin) {
        admins.push(roleDelta.userId);
      }
    } else if (roleDelta.role === BigInt(1)) {
      // Member role
      admins = admins.filter((id) => id !== roleDelta.userId);
      if (!isUserMember) {
        members.push(roleDelta.userId);
      }
    } else if (roleDelta.role === BigInt(0)) {
      // No role
      admins = admins.filter((id) => id !== roleDelta.userId);
      members = members.filter((id) => id !== roleDelta.userId);
    }
  });

  // Update or create the RoleBasedAccess model
  await RoleBasedAccess.upsert({
    id: `${event.log.address}/${sender}/${channelHash}`,
    create: {
      createdTimestamp: event.block.timestamp,
      createdBy: userId,
      admins: roleDeltas
        .filter((delta) => delta.role === BigInt(2))
        .map((delta) => delta.userId),
      members: roleDeltas
        .filter((delta) => delta.role === BigInt(1))
        .map((delta) => delta.userId),
    },
    update: ({ current }) => ({
      admins: existingRoles?.admins ?? current.admins,
      members: existingRoles?.members ?? current.members,
    }),
  });

  // record every transaction that has entered the crud cycle
  const txnReceipt = await Txn.findUnique({ id: event.transaction.hash });
  if (!txnReceipt) {
    await Txn.create({ id: event.transaction.hash });
    console.log(
      "processing complete. processed txn hash: ",
      event.transaction.hash
    );
  }
});
