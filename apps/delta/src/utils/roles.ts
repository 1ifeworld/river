import { ChannelRoleTypes } from 'scrypt'
import { USER_ID_ZERO } from './constants'
import type { Context } from '@/generated';

export async function roleCheck({context, rid, role}: {context: Context, rid: bigint, role: bigint}): Promise<boolean> {
    // Check that corresponding role is valid (NONE or MEMBER or ADMIN)
    if (!Object.values(ChannelRoleTypes).includes(Number(role))) return false
    //
    const { User: UserTable } = context.db
    //
    console.log("user table in roles check: ", UserTable)
    // Check to make sure user exists or is USER_ID_ZERO
    const user = await UserTable.findUnique({ id: rid})
    //
    console.log("result of user lookup in roles: ", user)
    // Check if user exists
    if (!user) {
        // Check if rid is USER_ID_ZERO
        if (rid !== USER_ID_ZERO) return false
        // USER_ID_ZERO cannot have ADMIN role
        if (role === BigInt(ChannelRoleTypes.ADMIN)) false
    }
    //
    return true
}