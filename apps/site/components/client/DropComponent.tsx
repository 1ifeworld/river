import * as React from 'react'
import { useDropzone } from 'react-dropzone'
import { Typography, Button } from '@/design-system'
import { getStatusProperties, type FileWithStatus } from './UploadStatus'
import { X } from 'lucide-react'

type DropzoneComponentProps = {
  filesToUpload: FileWithStatus[]
  setFilesToUpload: React.Dispatch<React.SetStateAction<FileWithStatus[]>>
  showFileList: boolean
  setShowFileList: React.Dispatch<React.SetStateAction<boolean>>
  handleRemoveFile: (index: number) => void
};


export const DropzoneComponent: React.FC<DropzoneComponentProps> = ({
  filesToUpload,
  setFilesToUpload,
  showFileList,
  setShowFileList,
  handleRemoveFile,
}) => {

const onDrop = React.useCallback((acceptedFiles: File[]) => {
  setShowFileList(true)

  const filesWithStatus: FileWithStatus[] = acceptedFiles.map(file => ({
    ...(file as Object),
    status: 'Pending'
  }) as FileWithStatus)

  setFilesToUpload(currentFiles => [...currentFiles, ...filesWithStatus]);
}, [setShowFileList, setFilesToUpload])


const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: filesToUpload.length > 0,
    multiple: true,
  });

  const filesDisplay = filesToUpload.map((file, index) => {
    const statusProps = getStatusProperties(file.status)
    return (
      <div key={file.name} className="flex items-center justify-between p-4 rounded-lg mb-2">
        <div className="flex items-center">
          <span className="text-sm font-semibold text-gray-800 mr-3 truncate" title={file.name}>
            {file.name}
          </span>
          <div className="flex items-center px-2 py-1">
            <span className={`text-xs font-small truncate mr-2`} style={{ color: statusProps.color }}>
              {statusProps.label}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => handleRemoveFile(index)}
          className="text-gray-500 hover:text-red-500 hover:bg-gray-100 rounded-full p-2"
          aria-label={`Remove ${file.name}`}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    )
  })

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {showFileList ? (
        <div className="files-list">
          {filesDisplay}
        </div>
      ) : (
        <div className="dropzone-message">
          {isDragActive ? (
            <Typography className="text-muted-foreground min-h-[35px]">Drop your files here</Typography>
          ) : (
            <Typography className="hover:cursor-pointer text-muted-foreground leading-1">
              Drag and drop your file here <br /> or click to select files
            </Typography>
          )}
        </div>
      )}
    </div>
  )
}
