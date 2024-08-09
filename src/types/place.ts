export type Place = {
  city: string;
  lng: string;
  uuid: string;
  name: string;
  image: {
    credits: string;
    license: string;
  };
  location: {
    type: string;
    coordinates: number[];
  };
  website: string;
  visit: {
    all: number;
    outside: number;
    schedule: string[][];
  };
  price: number;
  category: string;
  information: string;
  description: string;
  priority: number;
};
