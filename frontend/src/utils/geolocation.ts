export  interface UserGeolocation{
    userLongitude: number | null;
    userLatitude: number | null;
    userLongitudePerIp: number | null;
    userLatitudePerIp: number | null;
  }
  
  export const geolocation = async (): Promise<UserGeolocation> => {
    const userLocation: UserGeolocation = {
      userLongitude: null,
      userLatitude: null,
      userLongitudePerIp: null,
      userLatitudePerIp: null
    }
    
    try {
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
            const { longitude, latitude } = position.coords;
            userLocation.userLongitude = longitude;
            userLocation.userLatitude = latitude;
        },
        (error) => {
            console.error('Error al obtener la ubicación:', error);
        }
      );
  
        const IPINFO_TOKEN: string = import.meta.env.VITE_IPINFO_TOKEN;
        const request = await fetch(`https://ipinfo.io?token=${IPINFO_TOKEN}`)  // revisar
        const jsonResponse = await request.json();
  
        const divideCoordinates = jsonResponse.loc.split(',');
        const [ latitude , longitude ] = divideCoordinates;
        
        if(request.ok){
          userLocation.userLongitudePerIp = longitude;
          userLocation.userLatitudePerIp = latitude;
        }
        else{
            console.error('No se puedieron obtener los datos:', jsonResponse.message)
        }
        
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
  
  
    return userLocation;
  };