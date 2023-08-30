import { ponder } from "@/generated";

ponder.on(
  "LogicTransmitterMerkleAdmin:AccountRolesSet",
  async ({ event, context }) => {
    const { LogicTransmitterMerkleAdmin } = context.entities;

    const { accounts, roles, press } = event.params;

    const existingAdmin = await LogicTransmitterMerkleAdmin.findUnique({
      id: press,
    });

    if (existingAdmin) {
      const newAccounts = existingAdmin.accounts
        ? existingAdmin.accounts.concat(accounts)
        : accounts;
      const newRoles = existingAdmin.roles
        ? existingAdmin.roles.concat(roles)
        : roles;
      await LogicTransmitterMerkleAdmin.update({
        id: press,
        data: {
          accounts: [...newAccounts],
          roles: [...newRoles],
        },
      });
    } else {
      await LogicTransmitterMerkleAdmin.create({
        id: press,
        data: {
          press: press,
          accounts: [...accounts],
          roles: [...roles],
        },
      });
    }
  }
);


// Logic Merkle Root Set // alternative functionality we may find use for

// ponder.on("LogicTransmitterMerkleAdmin:AccountRolesSet", async ({event, context}) => {
//   const {LogicTransmitterMerkleAdmin} = context.entities;
//   console.log(event.params)

//   const accounts = event.params.accounts;
//   const roles = event.params.roles;
//   const press = event.params.press;

//   for (let i = 0; i < accounts.length; i++) {
//     const account = accounts[i];
//     const role = roles[i];

//     if (role) {
//       const existingAdmin = await LogicTransmitterMerkleAdmin.findUnique({ id: account });

//       if (!existingAdmin) {
//         await LogicTransmitterMerkleAdmin.create({
//           id: press,
//           data: {
//             press: press,
//             accounts: [account],
//             roles: [role],
//           }
//         });
//       }
//     }
//   }
// });
