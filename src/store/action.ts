import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { SortMethod } from '../types/sort-method';

export const updateCity = createAction<City>('offers/updateCity');
export const updateOffers = createAction<Offer[]>('offers/updateOffersList');
export const updateSortMethod = createAction<SortMethod>('offers/updateSortMethod');
