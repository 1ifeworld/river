export function isVideo({ mimeType }: { mimeType: string }) {
  return [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/avi',
    'video/quicktime',
    'video/x-msvideo',
  ].includes(mimeType)
}

export function isAudio({ mimeType }: { mimeType: string }) {
  return [
    'audio/mpeg',
    'audio/aac',
    'audio/midi',
    'audio/x-midi',
    'audio/x-m4a',
    'audio/mp3',
    'audio/ogg',
    'audio/opus',
    'audio/wav',
    'audio/webm',
    'audio/3gpp',
    'audio/3gpp2',
  ].includes(mimeType)
}

export function isImage({ mimeType }: { mimeType: string }) {
  return ['image/jpeg', 'image/png'].includes(mimeType)
}

export function isGLB(file: File) {
  const extension = file.name.split('.').pop()?.toLowerCase()
  return extension === 'glb' || extension === 'gltf'
}

export function isPdf({ mimeType }: { mimeType: string }) {
  return ['application/pdf'].includes(mimeType)
}

export function isFont(file: File) {
  return ['font/woff']
}

export function isText(file: File) {
  const extension = file.name?.split('.').pop()?.toLowerCase()
  if (typeof extension === 'string') {
    return [
      'html',
      'csv',
      'rtf',
      'plain',
      'markdown',
      'md',
      'txt',
      'docx',
    ].includes(extension)
  }
  return false
}
