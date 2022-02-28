import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
 
const DetailItem = (props) => {
     const {id,title,author} = props.b;
    return (
        <div> 
        <Card >
            <Card.Body>
                <Card.Title>제목: {title}
                </Card.Title>
                <Link to = {'/book/'+id}   //-> ownerDetail 
                className="btn btn-primary"  >
                    상세보기
                    </Link>
            </Card.Body>
        </Card>
        </div>
    );
};

export default DetailItem;