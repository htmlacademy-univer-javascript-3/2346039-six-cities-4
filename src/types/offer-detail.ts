import { Offer } from './offer';

export type OfferDetail = Omit<Offer, 'previewImage'> & {
    images: string[];
    description: string;
    goods: string[];
    host: {
      avatarUrl: string;
      isPro: boolean;
      name: string;
    };
    bedrooms: number;
    maxAdults: number;
};
