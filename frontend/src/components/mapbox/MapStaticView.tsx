import { type FC, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { geolocation, type UserGeolocation } from '../../utils/geolocation';

const MAPBOX_TOKEN: string =
  'pk.eyJ1IjoieWVpbndpbGxpZSIsImEiOiJjbGx2bzVianAxY3VyM2ZwaDAwc2dyd2lyIn0._qZShL6XUUYlIQ_km2IUDg';

export const MapStaticView: FC = () => {
  const [userLocation, setUserLocation] = useState<UserGeolocation | null>(
    null
  );

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const userGeolocation = await geolocation();
        setUserLocation(userGeolocation);
      } catch (error) {
        console.error('Error al obtener la geolocalización:', error);
      }
    };

    if (!userLocation) {
      void fetchData();
    } else {
      mapboxgl.accessToken = MAPBOX_TOKEN;

      const centerCoordinates: [number, number] = userLocation.userLongitude
        ? [userLocation.userLongitude ?? 0, userLocation.userLatitude ?? 0]
        : [
            userLocation.userLongitudePerIp ?? 0,
            userLocation.userLatitudePerIp ?? 0,
          ];

      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: centerCoordinates,
        zoom: 13,
      });

      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserLocation: true,
      });

      map.addControl(geolocate);

      map.on('load', async () => {
        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${centerCoordinates[0]},${centerCoordinates[1]}.json?access_token=${MAPBOX_TOKEN}`
          );
          const data = await response.json();
          if (data.features && data.features.length > 0) {
            const locationName = data.features[0].place_name;
            localStorage.setItem('startLocation', locationName);
          } else {
            console.error('No se encontraron resultados de geocodificación.');
          }
        } catch (error) {
          console.error('Error de geocodificación:', error);
        }
      });

      return () => {
        if (map) {
          map.remove();
        }
      };
    }
  }, [userLocation]);

  return (
    <div
      id='map'
      style={{ position: 'absolute', top: 30, bottom: 50, width: '96%' }}
    />

    //  <div id="map" style={{ position: 'relative', width: '96%', margin: '0 auto 30px' }} />
  );
};
