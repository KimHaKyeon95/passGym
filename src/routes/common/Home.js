
import React, { useEffect, useState } from 'react';
import GymCards from "../../components/gym/GymCards";

function Home() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const getLocation = () => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        (error) => {
          console.error(error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: Infinity }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
      return;
    }
  };
  useEffect(() => {
    getLocation();
  }, []);

  if(lat !== "" && lon !== ""){
    return(
      <>
        <GymCards type="distance" lat={lat} lon={lon} />
        <GymCards type="star" lat={lat} lon={lon}/>  
      </>
    )
  }else{
    return <></>;
  }
}

export default Home;
