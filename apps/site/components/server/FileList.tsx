import { Typography } from '@/design-system'

export const FileList = ({ filesToUpload }: { filesToUpload: File[] }) => {
  return (
    // TODO: Adjust to have dynamic minimum heights, or ignore because this might be a temporary component
    <ul>
      {filesToUpload.map((file: File) => (
        <li key={file.size}>
          <Typography className="text-primary-foreground">
            {file.name}
          </Typography>
        </li>
      ))}
    </ul>
  )
}
}

