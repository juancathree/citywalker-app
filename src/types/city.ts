import type { Place } from './place';

export type City = {
  id: string;
  uuid: string;
  city: string;
  continent: string;
  language: string;
  lngSpoken: string;
  country: string;
  countryCode: string;
  currency: string;
  visa: string;
  adapterPlug: string;
  places: Place[];
};
