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
  /**
   * Return the cid
   */
  return { uploadedFileCid: uploadedFileCid.toString() }
}
