import type { Place } from './place'

export type Travel = {
  city: string
  startDay: Date
  endDay: Date
  itineraryStartTime: Date
  itineraryEndTime: Date
  numDays: number
  placesToEnter: PlacesToEnter
  discardedPlaces: string[]
  discardedCategories: string[]
  journeys: Itinerary[][]
  users: string[]
}

type PlacesToEnter = {
  [key: string]: boolean
}

type Itinerary = {
  place: Place
  hour: string
}
