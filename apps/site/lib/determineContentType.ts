import { isGLB, isAudio, isImage, isVideo } from './isContent'

export const determineContentType = (file: File): string => {
  if (isGLB(file)) {
    return 'model/gltf-binary'
  }
  const mimeType = file.type
  if (isVideo({ mimeType }) || isAudio({ mimeType }) || isImage({ mimeType })) {
    return mimeType
  }
  return mimeType
}
