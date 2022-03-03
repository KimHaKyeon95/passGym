import React, { useEffect, useState } from "react";
import axios from "axios";
import PassItem from "../../components/owner/PassItem";
const PassInfo = () => {
  const [pass, setPass] = useState([]);

  const getPass = () => {
    const url = "http://localhost:9999/passgym/gym/gympass/user";
    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        console.log(response);
        setPass(response.data);
      })
      .catch((error) => {
        alert(error.response.status);
      });
  };
  sessionStorage.setItem("ownerNo", pass.ownerNo);

  useEffect(() => {
    getPass();
  }, []);

  return (
    <div>
      <div>
        {pass.map((p) => (
          <PassItem key={p.passName} p={p} />
        ))}
      </div>
    </div>
  );
};

export default PassInfo;
