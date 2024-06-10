import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../const';
import { MOCK_OFFERS } from '../mock/offers';
import { Offer } from '../types/offer';
import { City } from '../types/city';
import { updateCity, updateOffers } from './action';

type StoreState = {
    city: City;
    offers: Offer[];
}

const initState: StoreState = {
  city: CITIES[3],
  offers: MOCK_OFFERS
};

export const reducer = createReducer(initState, (builder) => {
  builder.addCase(updateCity, (state, action) => {
    state.city = action.payload;
  })
    .addCase(updateOffers, (state, action) => {
      state.offers = action.payload;
    });
});
