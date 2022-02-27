import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const Detail = (props) => {
  console.log('detail', props);
  const id = props.match.params.id;

  const [book, setBook] = useState({
    id: '',
    title: '',
    author: '',
  });

  useEffect(() => {     //다운받기 => updateForm 에서 재사용
    fetch('http://localhost:9990/book/' + id)
      .then((res) => res.json())
      .then((res) => {
        setBook(res);
      });
  }, []);

  };

    return (
        <div>
            <h1> 상세보기</h1>
            <Button variant="primary">수정</Button>
            <h3>{book.author}</h3>
            <h1>{book.title}</h1>
        </div>
    );
 

export default Detail; 