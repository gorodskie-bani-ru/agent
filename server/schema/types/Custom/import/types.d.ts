export const CompanyType: {
  PublicBath: 'PublicBath'
  Bathhouse: 'Bathhouse'
  Sauna: 'Sauna'
  SpaCenter: 'SpaCenter'
  Resort: 'Resort'
  GuestHouse: 'GuestHouse'
  HolidayHome: 'HolidayHome'
  HotelWithBathhouse: 'HotelWithBathhouse'
  PrivateBathRental: 'PrivateBathRental'
  MobileSauna: 'MobileSauna'
  WellnessCenter: 'WellnessCenter'
  SteamRoomStudio: 'SteamRoomStudio'
  EcoRetreat: 'EcoRetreat'
  OutdoorHotTubRental: 'OutdoorHotTubRental'
}

export type CompanyType = (typeof CompanyType)[keyof typeof CompanyType]

export const CompanyStatus: {
  draft: 'draft'
  review: 'review'
  active: 'active'
  closed: 'closed'
  blocked: 'blocked'
}

export type CompanyStatus = (typeof CompanyStatus)[keyof typeof CompanyStatus]

export type Company = {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string | null
  description: string | null
  dataSource: string | null
  data: string | null
  intro: string | null
  type: CompanyType | null
  status: CompanyStatus
  lat: number | null
  lng: number | null
  alt: number | null
  image: string | null
  url: string | null
  processed: boolean
  ownerId: string | null
  createdBy: string
  reviews: string | null
  rating: number | null
}

export type bani684_site_content = {
  id: number
  type: string
  contentType: string
  pagetitle: string
  longtitle: string
  description: string
  alias: string | null
  link_attributes: string
  published: boolean
  pub_date: number
  unpub_date: number
  parent: number
  isfolder: boolean
  introtext: string | null
  content: string | null
  richtext: boolean
  template: number
  menuindex: number
  searchable: boolean
  cacheable: boolean
  createdby: string
  createdon: number
  editedby: number
  editedon: number
  deleted: boolean
  deletedon: number
  deletedby: number
  publishedon: number
  publishedby: number
  menutitle: string
  donthit: boolean
  privateweb: boolean
  privatemgr: boolean
  content_dispo: boolean
  hidemenu: boolean
  class_key: string
  context_key: string
  content_type: number
  uri: string | null
  uri_override: boolean
  hide_children_in_tree: boolean
  show_in_tree: boolean
  properties: string | null
  companyId: string | null
}

export type Resource = bani684_site_content

export type User = {
  id: string
  username: string | null
  password: string
  active: boolean
  sudo: boolean
  createdon: number
  updatedAt: Date | null
  delegate: boolean | null
  offer: string | null
  offer_date: number | null
  contract_date: number | null
  createdby: number | null
  approved: boolean
  type: userType
  fullname: string | null
  photo: string | null
  email: string | null
  phone: string | null
  data: Prisma.JsonValue | null
  intro: string | null
  content: string | null
}

export type bani684_user_attributes = {
  id: number
  internalKey: string
  fullname: string
  email: string
  phone: string
  mobilephone: string
  blocked: boolean
  logincount: number
  lastlogin: number
  dob: number
  gender: number
  address: string
  country: string
  city: string
  photo: string
  comment: string
  website: string
  extended: string | null
}

export type bani684_site_tmplvar_contentvalues = {
  id: number
  tmplvarid: number
  contentid: number
  value: string
}

export type bani684_site_tmplvar_templates = {
  tmplvarid: number
  templateid: number
  rank: number
}

export type bani684_society_blog_attributes = {
  id: number
  resourceid: number
  content_hash: string | null
}
export type File = {
  id: string
  path: string
  name: string | null
  filename: string | null
  mimetype: string
  encoding: string
  hash: string | null
  size: Prisma.Decimal | null
  createdBy: string | null
  createdAt: Date
  updatedAt: Date
}

export type CompanyFile = {
  id: string
  companyId: string
  fileId: string
  rank: number
}

export const GeoObjectType: {
  City: 'City'
  Company: 'Company'
}

export type GeoObjectType = (typeof GeoObjectType)[keyof typeof GeoObjectType]

export type GeoObject = {
  id: string
  lat: number
  lng: number
  alt: number | null
  type: GeoObjectType
  resourceId: number | null
}
