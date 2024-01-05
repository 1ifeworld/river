import * as z from 'zod'

export type UsernameSchemaValues = z.infer<typeof usernameSchema>

export const usernameSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(20, { message: 'Username must be at most 20 characters' })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: 'Username can only contain alphanumeric characters',
    }),
})
