import { Container, Row, Spinner, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import Gymcard from "./Gymcard";
import axios from "axios";
function Gymcards(props) {

  const [loading, setLoading] = useState(true);
  const [gyms, setGyms] = useState({data : []});

  const getGyms = () => {
    let findGymUrl = "http://localhost:9999/passgym/gym/sort-gym-star";
    axios.get(findGymUrl, {
      params : {
        lat : props.lat,
        lon : props.lon
      }
    }).then((response) => {
      setGyms({data: response.data});
    }).catch((error) => {
      alert(error.status);
    })
    
    setLoading(false);
  };

  useEffect(() => {
    getGyms();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <>
          <div style={{ margin: "10px", fontSize: "24px" }}>별점순</div>
          <div>
            {gyms.data.map((gym, i) => (
                  <Gymcard
                    key={i}
                    num={i+1}
                    ownerNo={gym.ownerNo}
                    name={gym.name}
                    addr={gym.addr}
                    avgStar={gym.avgStar}
                    distance={gym.distance}
                  />
                ))}
          </div>  
        </>      
      )}
    </>
  );
}

export default Gymcards;
