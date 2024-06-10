import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../const';
import { Offer } from '../types/offer';
import { City } from '../types/city';
import { updateCity, updateLoading, updateOffers, updateSortMethod } from './action';
import { SortMethod } from '../types/sort-method';

type StoreState = {
    city: City;
    offers: Offer[];
    sortMethod: SortMethod;
    isLoading: boolean;
}

const initState: StoreState = {
  city: CITIES[3],
  offers: [],
  sortMethod: SortMethod.POPULAR,
  isLoading: true
};

export const reducer = createReducer(initState, (builder) => {
  builder.addCase(updateCity, (state, action) => {
    state.city = action.payload;
  })
    .addCase(updateOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(updateSortMethod, (state, action) => {
      state.sortMethod = action.payload;
    })
    .addCase(updateLoading, (state, action) => {
      state.isLoading = action.payload;
    });
});
