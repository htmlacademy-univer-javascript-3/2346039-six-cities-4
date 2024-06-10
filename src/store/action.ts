import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Offer } from '../types/offer';
import { SortMethod } from '../types/sort-method';
import { ThunkConfig } from './helpers';
import { User } from '../types/user';
import { AuthStatus } from '../types/auth-status';
import { LOCAL_STORAGE_TOKEN } from '../const';

export const updateCity = createAction<City>('offers/updateCity');
export const updateOffers = createAction<Offer[]>('offers/updateOffersList');
export const updateSortMethod = createAction<SortMethod>('offers/updateSortMethod');
export const updateLoading = createAction<boolean>('offers/changeLoading');
export const updateAuthStatus = createAction<AuthStatus>('auth/updateAuthStatus');
export const signIn = createAction<User>('auth/signIn');
export const signOut = createAction('auth/signOut');

export const addToFavorites = createAction<Offer>('favorites/add');
export const removeFromFavorites = createAction<string>('favorites/remove');
export const updateFavorites = createAction<Offer[]>('favorites/change');
export const updateFavoritesLoadingStatus = createAction<boolean>('favorites/loading_status');

export const fetchOffersAsync = createAsyncThunk<void, undefined, ThunkConfig>('offers/fetchOffersAsync', async (_,{extra, dispatch}) => {
  dispatch(updateLoading(true));
  const response = await extra.get<Offer[]>('/offers');
  dispatch(updateOffers(response.data));
  dispatch(updateLoading(false));
});

export const fetchAuth = createAsyncThunk<void, undefined, ThunkConfig>('auth/fetchAuth', async (_, {extra, dispatch}) => {
  const response = await extra.get<User>('/login');
  if (response.status === 401) {
    dispatch(signOut());
    dispatch(updateAuthStatus(AuthStatus.NO_AUTH));
  } else {
    dispatch(signIn(response.data));
    dispatch(updateAuthStatus(AuthStatus.LOGGED_IN));
  }
});

export const login = createAsyncThunk<void, { email: string; password: string }, ThunkConfig>('auth/login', async (
  { email, password },
  { extra, dispatch }
) => {
  dispatch(updateAuthStatus(AuthStatus.LOADING));
  const response = await extra.post<User>('/login', { email, password });
  if (response.status === 201) {
    dispatch(signIn(response.data));
    if (response.data.token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.token);
    }
    dispatch(updateAuthStatus(AuthStatus.LOGGED_IN));
  }
});

export const logout = createAsyncThunk<void, undefined, ThunkConfig>('auth/logout', async (_, { extra, dispatch }) => {
  const response = await extra.delete('/logout');
  if (response.status === 204) {
    dispatch(signOut());
  }
  localStorage.removeItem(LOCAL_STORAGE_TOKEN);
});


export const fetchFavorites = createAsyncThunk<void, undefined, ThunkConfig>('favorites/fetchFavorites', async (
  _,
  { extra, dispatch }
) => {
  dispatch(updateFavoritesLoadingStatus(true));
  const response = await extra.get<Offer[]>('/favorite');
  dispatch(updateFavoritesLoadingStatus(false));
  if (response.status === 200) {
    dispatch(updateFavorites(response.data));
  }
});

export const updateOfferFavoriteStatus = createAsyncThunk<boolean, { id: string; status: boolean}, ThunkConfig>('favorites/changeOfferFavoriteStatus', async (
  { id, status },
  { extra, dispatch }
) => {
  const response = await extra.post<Offer>(`/favorite/${id}/${status ? 1 : 0}`, {});
  if (response.status === 201) {
    dispatch(addToFavorites(response.data));
    return true;
  }
  if (response.status === 200) {
    dispatch(removeFromFavorites(response.data.id));
    return false;
  }
  return status;
});
