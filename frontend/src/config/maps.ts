import axios from 'axios';
import { KEY_MAPS } from '../constants/key';
import { URL_MAPS } from '../constants/mapsApi';

export const geo = axios.create({
  baseURL: URL_MAPS,
});

geo.interceptors.request.use((config) => {

    config.params={
      'key': KEY_MAPS
    };

  return config;
});
