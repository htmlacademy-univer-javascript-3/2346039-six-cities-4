import axios, { AxiosInstance } from 'axios';
import { API_ENDPOINT } from '../const';

const REQUEST_TIMEOUT = 5000;

export const createApiService = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_ENDPOINT,
    timeout: REQUEST_TIMEOUT
  });

  return api;
};

export const ApiService = createApiService();
