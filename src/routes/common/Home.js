import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import { useEffect, useState } from "react";
function Home() {
  const [loading, setLoading] = useState(true);
  const [gyms, setGyms] = useState([]);
  const getGyms = () => {
    setGyms([
      {
        ownerNo: 1,
        name: "체육관 이름",
        addr: "목포시 연산동",
        avgStar: 2.0,
        distance: 1.5,
      },
      {
        ownerNo: 2,
        name: "체육관 이름",
        addr: "목포시 연산동",
        avgStar: 2.0,
        distance: 1.5,
      },
      {
        ownerNo: 1,
        name: "체육관 이름",
        addr: "목포시 연산동",
        avgStar: 2.0,
        distance: 1.5,
      },
    ]);
    setLoading(false);
  };
  useEffect(() => {
    getGyms();
  }, []);
  return (
    <div>
      <Header />
      <section>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            {gyms.map((gym) => (
              <div>
                <div>ownerNo : {gym.ownerNo}</div>
                <div>name : {gym.name}</div>
                <div>addr : {gym.addr}</div>
                <div>avgStar : {gym.avgStar}</div>
                <div>distance : {gym.distance}</div>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default Home;
