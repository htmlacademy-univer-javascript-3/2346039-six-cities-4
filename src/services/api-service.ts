import axios, { AxiosInstance } from 'axios';
import { API_ENDPOINT, TOKEN_HEADERNAME, getToken } from '../const';

const REQUEST_TIMEOUT = 5000;

export const createApiService = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_ENDPOINT,
    timeout: REQUEST_TIMEOUT
  });

  api.interceptors.request.use((request) => {
    request.headers.set(TOKEN_HEADERNAME, getToken());
    return request;
  });

  return api;
};

export const ApiService = createApiService();
