import * as z from 'zod'

const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024 // 2GB in bytes
const ACCEPTED_ITEM_MIME_TYPES = [
    // Images
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/gif',
    'image/bmp',
    'image/tiff',
    // Videos
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/mkv',
    'video/avi',
    'video/mov',
    // Texts
    'text/plain',
    'text/csv',
    'text/html',
    'text/markdown',
    // 3D Models
    'model/gltf-binary',
    'model/gltf+json',
    // PDF
    'application/pdf'
]

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
      return files?.[0]?.size <= MAX_FILE_SIZE
    }, 'Max image size is 2GB.')
    .refine(
      (files) => ACCEPTED_ITEM_MIME_TYPES.includes(files?.[0]?.type),
      'Please use one of the following formats: .jpg, .jpeg, .png, .webp, .heic, .gif, .bmp, .tiff, .mp4, .webm, .ogg, .mkv, .avi, .mov, .txt, .csv, .html, .md, .glb, .gltf, or .pdf',    ),
})
