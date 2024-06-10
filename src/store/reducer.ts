import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../const';
import { Offer } from '../types/offer';
import { City } from '../types/city';
import { addToFavorites, removeFromFavorites, signIn, signOut, updateAuthStatus, updateCity, updateFavorites, updateFavoritesLoadingStatus, updateLoading, updateOffers, updateSingleOfferFavorite, updateSortMethod } from './action';
import { SortMethod } from '../types/sort-method';
import { AuthStatus } from '../types/auth-status';
import { User } from '../types/user';

type StoreState = {
    city: City;
    offers: Offer[];
    sortMethod: SortMethod;
    isLoading: boolean;
    user?: User;
    authStatus: AuthStatus;
    favorites: Offer[];
    favoritesLoading: boolean;
}

const initState: StoreState = {
  city: CITIES[3],
  offers: [],
  sortMethod: SortMethod.POPULAR,
  isLoading: true,
  user: undefined,
  authStatus: AuthStatus.LOADING,
  favorites: [],
  favoritesLoading: true
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
    })
    .addCase(updateAuthStatus, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(signIn, (state, action) => {
      state.user = action.payload;
      state.authStatus = AuthStatus.LOGGED_IN;
    })
    .addCase(signOut, (state) => {
      state.user = undefined;
      state.authStatus = AuthStatus.NO_AUTH;
    })
    .addCase(addToFavorites, (state, action) => {
      const offer = state.favorites.find((it) => it.id === action.payload.id);
      if (offer) {
        offer.isFavorite = action.payload.isFavorite;
      } else {
        state.favorites.push(action.payload);
      }
    })
    .addCase(removeFromFavorites, (state, action) => {
      state.favorites = state.favorites.filter((offer) => offer.id !== action.payload);
    })
    .addCase(updateFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(updateFavoritesLoadingStatus, (state, action) => {
      state.favoritesLoading = action.payload;
    })
    .addCase(updateSingleOfferFavorite, (state, action) => {
      const offer = state.offers.find((item) => item.id === action.payload.id);
      if (offer) {
        offer.isFavorite = action.payload.status;
      }
    });
});
