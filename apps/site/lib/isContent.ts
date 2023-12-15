export function isVideo({ mimeType }: { mimeType: string }) {
  return [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/avi',
    'video/quicktime',
  ].includes(mimeType)
}

export function isAudio({ mimeType }: { mimeType: string }) {
  return [
    'audio/mpeg',
    'audio/aac',
    'audio/midi',
    'audio/x-midi',
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

export function isPDF({ mimeType }: { mimeType: string }) {
  return ['application/pdf'].includes(mimeType)
}

export function isFont(file: File) {
  return ['font/woff']
}

export function isText(file: File) {
  return [
    'text/html',
    'text/csv',
    'application/rtf',
    'text/plain',
    'text/markdown', // might not be part of IANA
  ]
}
