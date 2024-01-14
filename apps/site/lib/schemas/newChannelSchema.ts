import * as z from 'zod'

export const CHANNEL_MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ACCEPTED_IMAGE_MIME_TYPES = {
  images: [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
  ]
}

export const newChannelSchema = z.object({
  name: z
    .string()
    .min(2, 'Channel name must be at least 2 characters')
    .max(30, 'Channel name must not be longer than 30 characters'),
  description: z.string().max(160).min(4).optional(),
  cover: z
    .any()
    .refine((file) => {
      // Check if file is undefined or null
      if (!file) return true // Pass validation if no file is uploaded
      // Ensure file size is within the limit
      return file.size <= CHANNEL_MAX_FILE_SIZE
    }, 'Max image size is 5MB.')
    .refine((file) => {
      // Check if file type matches the accepted types for images
      if (!file) return true // Pass validation if no file is uploaded
      return ACCEPTED_IMAGE_MIME_TYPES.images.includes(file.type)
    }, 'Please use one of the following image formats: .jpg, .jpeg, .png, .webp, .heic'),
})