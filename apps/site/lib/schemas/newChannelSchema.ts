import * as z from 'zod'

export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
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
    .min(2, {
      message: 'Channel name must be at least 2 characters',
    })
    .max(30, {
      message: 'Channel name must not be longer than 30 characters',
    }),
  description: z.string().max(160).min(4).optional(),
  cover: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE
    }, 'Max image size is 5MB.')
    .refine(
      (files) => {
        // Check if the file type matches the accepted types for images
        const fileType = files?.[0]?.type;
        return ACCEPTED_IMAGE_MIME_TYPES.images.includes(fileType);
      },
      'Please use one of the following image formats: .jpg, .jpeg, .png, .webp, .heic, .gif, .bmp, .tiff',
    )})
