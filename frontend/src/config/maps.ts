import axios from 'axios';
import { URL_MAPS, KEY_MAPS } from '../constants/mapsApi';

export const geo = axios.create({
  baseURL: URL_MAPS,
});

geo.interceptors.request.use((config) => {
  config.params = {
    key: KEY_MAPS,
  };

  return config;
});
