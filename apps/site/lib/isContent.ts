export function isVideo({ mimeType }: { mimeType: string }) {
<<<<<<< HEAD
  return ['video/mp4', 'video/webm', 'video/ogg', 'video/avi'].includes(
    mimeType,
  )
=======
  return ["video/mp4", "video/webm", "video/ogg", "video/avi", "video/quicktime"].includes(
    mimeType
  );
>>>>>>> main
}

export function isImage({ mimeType }: { mimeType: string }) {
  return ['image/jpeg', 'image/png'].includes(mimeType)
}
