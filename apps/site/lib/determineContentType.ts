import { isGLB, isAudio, isImage, isVideo, isText } from './isContent'

export const determineContentType = (file: File): string => {
  if (isGLB(file)) {
    return 'model/gltf-binary'
  } else if (isText(file)) {
    const extension = file.name.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'md':
      case 'markdown':
        return 'text/markdown'
      case 'txt':
        return 'text/plain'
      case 'html':
        return 'text/html'
      case 'csv':
        return 'text/csv'
      case 'rtf':
        return 'application/rtf'
      default:
        return 'text/plain'
    }
  }

  const mimeType = file.type
  if (isVideo({ mimeType }) || isAudio({ mimeType }) || isImage({ mimeType })) {
    return mimeType
  }
  return mimeType
}
