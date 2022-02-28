import GymCardsDistance from "../../components/gym/GymCardsDistance";
import React, { useEffect, useState } from 'react';
import "../css/home.css";

function Home() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  const getLocation= () => {
    if (navigator.geolocation) { // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
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
  useEffect(() => {
    getLocation();
  }, [])

  return (
    <>
    {
        lat !== "" && lon !== "" ? 
        (<div className="distance-card">
          <GymCardsDistance lat={lat} lon={lon} />
        </div>)
        : <></>
      }
    </>
      
      
  );
}

export default Home;
