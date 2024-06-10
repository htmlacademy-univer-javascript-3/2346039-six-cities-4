import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';

export const updateCity = createAction<City>('offers/updateCity');
export const updateOffers = createAction<Offer[]>('offers/updateOffersList');
