type ImageType = 'jpg' | 'jpeg' | 'png' | 'gif'
type AudioType = 'mp4'
type VedioType = 'mp3'
type DocumentType = 'xls' | 'xlsx' | 'docx' | 'txt' | 'doc' | 'xml'
type FileType = 'zip' | 'rar'

type FileTypes = ImageType | AudioType | VedioType | DocumentType | FileType

export const imageTypes: ImageType[] = ['jpg', 'jpeg', 'png', 'gif']
export const audioTypes: AudioType[] = ['mp4']
export const vedioTypes: VedioType[] = ['mp3']
export const documentTypes: DocumentType[] = ['xls', 'xlsx', 'docx', 'txt', 'doc', 'xml']
export const fileTypes: FileType[] = ['zip', 'rar']

const allfileTypes: FileTypes[] = [
  ...imageTypes,
  ...audioTypes,
  ...vedioTypes,
  ...documentTypes,
  ...fileTypes
]

export default allfileTypes
