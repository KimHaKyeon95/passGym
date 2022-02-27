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
            let lat = position.coords.latitude;
            setLon(position.coords.longitude)
            let long = position.coords.longitude;
          }, 
          (error) => {
            console.error(error);
          }, 
          { enableHighAccuracy: false,
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
    return <div>lat = {lat} : lon = {lon}</div>
  }

  return (
    <>
      <ShowLatLon/>
      <Gymcards type="star" />
      <Gymcards type="distance" />
    </>
  );
}

export default Home;
