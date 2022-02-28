import React, { useState, useEffect } from 'react';
import DetailItem from "../../components/owner/DetailItem";

const OwnerBoard = () => {

    const [books, setbooks] = useState([]);    

    useEffect(()=> {
    fetch("http://localhost:9990/book")
    .then(res => res.json())
    .then(res => {
      console.log(1, res);
      setbooks(res);
    }); //비동기함수
  }, [])
    return (
         
        <div>
             {books.map((b) => 
             (<DetailItem key= {b.id}
                b = {b}
          />)) }
      </div>
    );
};

export default OwnerBoard;