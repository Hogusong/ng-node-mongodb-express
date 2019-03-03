export interface POST {
  id?: string,
  title: string,
  content: string,
  imagePath: string,
  creator: string
}

export interface AUTH {
  id?: string,
  email: string,
  password: string
}