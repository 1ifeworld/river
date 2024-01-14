import * as z from 'zod'

export const ITEM_MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024 // 2GB in bytes
export const ACCEPTED_ITEM_MIME_TYPES = {
  images: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/gif',
    'image/bmp',
  ],
  videos: [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/mkv',
    'video/avi',
    'video/mov',
  ],
  texts: [
    'text/plain',
    'text/csv',
    'text/html',
    'text/markdown',
  ],
  models: [
    'model/gltf-binary',
    'model/gltf+json',
  ],
  pdfs: ['application/pdf'],
};

export const newItemSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Item name must be at least 1 character',
    })
    .max(30, {
      message: 'Item name must not be longer than 30 characters',
    }),
  item: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= ITEM_MAX_FILE_SIZE
    }, 'Max image size is 2GB.')
    .refine(
      (files) => {
        // Check if the file type matches the accepted types for images
        const fileType = files?.[0]?.type;
        return ACCEPTED_ITEM_MIME_TYPES.images.includes(fileType);
      },
      'File type not supported yet',
    )})
