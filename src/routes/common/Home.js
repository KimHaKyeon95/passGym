import Gymcards from "../../components/gym/Gymcards";
import React, { useEffect, useState } from 'react';

function Home() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const getLocation= () => {
    if (navigator.geolocation) { // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude)
          }, 
          (error) => {
            console.error(error);
          }, 
          { enableHighAccuracy: true,
            maximumAge: 0,
            timeout: Infinity
          });
    } else {
        alert('GPS를 지원하지 않습니다');
        return;
    }
}

  const ShowLatLon = () => {
    getLocation();
    return <div>{lat}, {lon}</div>
  }
  useEffect(() => {
    getLocation();
    console.log(lat + ", " + lon);
  }, []);

  return (
    <>
      <Gymcards type="star" lat={lat} lon={lon}/>
      <Gymcards type="distance" lat={lat} lon={lon} />
    </>
  );
}

export default Home;
