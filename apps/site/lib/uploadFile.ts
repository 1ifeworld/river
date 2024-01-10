import { w3sUpload } from '@/lib'

export async function uploadFile({ fileOrBlob }: { fileOrBlob: File | Blob }) {
  /**
   * Create a new form data instance
   */
  const formData = new FormData()
  formData.append('fileOrBlob', fileOrBlob)
  /**
   * Pass the form data to the server
   */
  const uploadedFileCid = await w3sUpload({ formData: formData })
  const uploadedFileType = fileOrBlob.type
  /**
   * Return the cid and file type
   */
  return { uploadedFileCid, uploadedFileType }
}
