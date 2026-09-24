export type bani684_society_comments = {
  id: number
  thread_id: number
  parent: number | null
  text: string
  raw_text: string
  ip: string
  createdon: Date
  createdby: string
  editedon: Date | null
  editedby: number | null
  published: string
  deleted: string
  deletedon: Date | null
  deletedby: number | null
  comments_count: number
  properties: string | null
}

export type bani684_society_threads = {
  id: number
  target_id: number | null
  target_class: string
}

export type bani684_site_content = {
  id: number
  pagetitle: string
}
