import { User } from '../types/user.ts';
import { City } from '../types/city.ts';

export type Offer = {
    id: string;
    image: string;
    city: City;
    title: string;
    description: string;
    isPremium: boolean;
    type: string;
    rating: number;
    bedrooms: number;
    maxAdults: number;
    price: number;
    owner: User;
    isFavorite: boolean;
};
