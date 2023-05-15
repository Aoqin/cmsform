/*
 * @Author: aoqing
 * @Date: 2023-05-15 10:24:49
 * @Last Modified by: aoqing
 * @Last Modified time: 2023-05-15 10:26:58
 */
type ImageType = 'jpg' | 'jpeg' | 'png' | 'gif' | 'bmp'
type AudioType = 'mp4'
type VedioType = 'mp3'
type DocumentType = 'xls' | 'xlsx' | 'docx' | 'txt' | 'doc' | 'xml'
type FileType = 'zip' | 'rar'

type FileTypes = ImageType | AudioType | VedioType | DocumentType | FileType

export const imageTypes: ImageType[] = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
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
