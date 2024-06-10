import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { SortMethod } from '../types/sort-method';
import { ThunkConfig } from './helpers';

export const updateCity = createAction<City>('offers/updateCity');
export const updateOffers = createAction<Offer[]>('offers/updateOffersList');
export const updateSortMethod = createAction<SortMethod>('offers/updateSortMethod');
export const updateLoading = createAction<boolean>('offers/changeLoading');
export const fetchOffersAsync = createAsyncThunk<void, undefined, ThunkConfig>('offers/fetchOffersAsync', async (_,{extra, dispatch}) => {
  dispatch(updateLoading(true));
  const response = await extra.get<Offer[]>('/offers');
  dispatch(updateOffers(response.data));
  dispatch(updateLoading(false));
});
