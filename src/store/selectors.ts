import { State } from '../types/state';

export const selectCurrentCity = (state: State) => state.city;
export const selectCurrentOffers = (state: State) => state.offers;
export const selectCurrentSortMethod = (state: State) => state.sortMethod;
