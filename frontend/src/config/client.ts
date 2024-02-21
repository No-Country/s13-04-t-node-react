import axios from 'axios';
import { API_URL } from '../constants/api';
import { appStorage } from './storage';

export const client = axios.create({
  baseURL: API_URL,
});

client.interceptors.request.use((config) => {
  const token = appStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
