import * as z from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
]

export const newChannelSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Channel name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Channel name must not be longer than 30 characters.',
    }),
  description: z.string().max(160).min(4).optional(),
  cover: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE
    }, 'Max image size is 5MB.')
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      'Please use either .jpg, .jpeg, .png, .webp, or .heic format.',
    ),
})
