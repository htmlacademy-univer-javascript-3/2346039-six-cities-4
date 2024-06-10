import { State } from '../types/state';

export const selectCurrentCity = (state: State) => state.city;
export const selectCurrentOffers = (state: State) => state.offers;
export const selectCurrentSortMethod = (state: State) => state.sortMethod;
export const selectLoading = (state: State) => state.isLoading;
export const selectAuthStatus = (state: State) => state.authStatus;
export const selectUser = (state: State) => state.user;
export const selectFavorites = (state: State) => state.favorites;
export const selectFavoritesLoadingStatus = (state: State) => state.favoritesLoading;
export const selectFavoritesLength = (state: State) => state.favorites.length;
