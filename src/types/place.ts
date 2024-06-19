export type Place = {
  city: string
  name: string
  lng: string
  uuid: string
  image: Image
  location: Location
  website: string
  visit: Visit
  price: number
  category: string
  information: string
  description: string
}

export const PlaceCategories = [
  { label: 'museum', value: 'museum' },
  { label: 'park', value: 'park' },
  { label: 'market', value: 'market' },
  { label: 'church', value: 'church' },
  { label: 'monument', value: 'monument' },
  { label: 'tourist attraction', value: 'tourist attraction' },
  { label: 'street', value: 'street' },
  { label: 'neighborhood', value: 'neighborhood' }
]

type Image = {
  credits: string[]
  license: string
}

type Location = {
  type: string
  coordinates: number[]
}

type Visit = {
  all: number
  outside: number
  schedule: Schedule
}

type Schedule = {
  [key: string]: string[]
}
