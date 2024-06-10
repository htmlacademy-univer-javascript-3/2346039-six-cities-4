import { City } from "./types/city";

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const DEFAULT_CITY: City = {
    name: 'Amsterdam',
    location: {
        latitude: 52.38333,
        longitude: 4.9,
        zoom: 12,
    },
};