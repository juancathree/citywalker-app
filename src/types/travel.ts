import type { Place } from './place';

export type Travel = {
  _id: string;
  city: string;
  schedule: Schedule;
  discardedCategories: string[];
  placesToEnter: string[];
  itinerary: Itinerary[][];
  geometry: string[];
  expenses: Expenses;
};

export type Schedule = {
  initialDate: Date;
  endDate: Date;
  hourInitialDate: Date;
  hourEndDate: Date;
  hourStart: Date;
  hourEnd: Date;
};

export type Itinerary = {
  place: Place;
  date: Date;
};

export type Expenses = {
  total: number;
  all: Expense[];
};

export type Expense = {
  price: number;
  description: string;
  category: Categories;
};

export enum Categories {
  RESTAURANT = 'restaurant',
  HOTEL = 'hotel',
  TRANSPORT = 'transport',
  ATTRACTION = 'attractions',
  OTHER = 'other',
}
