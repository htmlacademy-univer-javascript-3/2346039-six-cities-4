import { City } from './city';
import { LocationType } from './location';

export type Offer = {
    id: string;
    title: string;
    type: string;
    price: number;
    city: City;
    location: LocationType;
    isFavorite: boolean;
    isPremium: boolean;
    rating: number;
    previewImage: string;
}
