export interface FileWithStatus extends File {
    status: 'Pending' | 'Adding' | 'Complete!' | 'ERROR!'
  }

export function getStatusProperties(status: FileWithStatus['status']) {
  switch (status) {
    case 'Pending':
        return { label: 'Pending', color: 'black' }
    case 'Adding':
      return { label: 'Adding', color: 'black' }
    case 'Complete!':
      return { label: 'Complete!', color: 'black' }
    case 'ERROR!':
      return { label: 'ERROR!', color: 'red' }
    default:
      return { label: 'Unknown', color: 'black' }
  }
}
