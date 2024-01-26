import { createSchema } from '@ponder/core'

export default createSchema((p) => ({

  /* ************************************************

                        GENERIC

  ************************************************ */  

  Txn: p.createTable({
    id: p.bytes(),
  }),

  /* ************************************************

                        ID REGISTRY

  ************************************************ */

  User: p.createTable({
    id: p.bigint(),
    userId: p.bigint(),
    to: p.bytes(),
    recovery: p.bytes(),
    from: p.bytes(),
  }),
}))
