import { CITIES } from '../const';

export const getCityByName = (name: string) =>
  CITIES.findLast((city) => city.name === name);
