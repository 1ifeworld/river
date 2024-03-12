import * as z from 'zod'

export type NewChannelSchemaValues = z.infer<typeof newChannelSchema>

export const newChannelSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Channel name must be at least 2 characters',
    })
    .max(30, {
      message: 'Channel name must not be longer than 30 characters',
    }),
  description: z.string().max(330).min(4).optional(),
})
