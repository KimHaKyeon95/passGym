import React, { useEffect, useState } from 'react';
import { Card, CardGroup, Carousel, Col} from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Home = () => {
 
    
  return (
             <div> 
        <Container> 
            <Carousel fade  style={{ marginTop: "-50px" }}>
                <Carousel.Item interval={3000}
                >
                    <img
                    style={{ height: "350px" }}
                    className="d-block w-100"
                    src={require("../../images/gym3.jpg")}
                    alt="첫번째사진"
                    />
                    <Carousel.Caption>
                <h1 style={{fontSize: "30px"}}>6개월 할인시 30% 할인 </h1>
                <p>00 헬스장  </p>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                    style={{ height: "350px" }}
                    className="d-block w-100"
                   src={require("../../images/gym2.jpg")}
                    alt="두번째사진"
                    />
                    <Carousel.Caption>
                <h1 style={{fontSize: "25px"}}>00헬스장 수능 할인 20%</h1>
                <p>00 헬스장 바로가기</p>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                    style={{  height: "350px"}}
                    className="d-block w-100"
                    src={require("../../images/gym3.jpg")}
                    alt="두번째사진"
                    />
                    <Carousel.Caption>
               <h1 style={{fontSize: "25px"}}>이용권 30% 특가</h1>
                <p> 00휘트니스클럽  </p>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={3000}>
                    <img
                    style={{ height: "350px" }} 
                    className="d-block w-100"
                    src={require("../../images/gym5.jpg")}
                    alt="두번째사진"
                    />
                    <Carousel.Caption>
                <h1 style={{fontSize: "25px"}}>추천 헬스장 보러가기</h1>
                <p>오늘의 추천 헬스장은?</p>
                </Carousel.Caption>
                </Carousel.Item>
                </Carousel>
                  
                        {/* 박스시작 */}
            <br/>

            <CardGroup>
            <Card>
                <Link to="/owner/passInfo" style={{textDecoration:"none", color: "black"}}> 
                <Card.Img variant="top" 
                src={require("../../images/gym4.jpg")}
                style={{ height: "285px"   }} />
                <Card.Body>
                <Card.Title > 회원조회 </Card.Title>
                <Card.Text>
                    *이용권별 회원조회
                </Card.Text> 
                </Card.Body>
                </Link>
            </Card>
            <Card>
                <Link to="/owner/modify" style={{textDecoration:"none", color: "black"}}> 
                <Card.Img variant="top"
                 src={require("../../images/gym2.jpg")} 
                 style={{ height: "285px"  }}/>
                <Card.Body>
                <Card.Title>마이페이지</Card.Title>
                <Card.Text>
                    *개인정보 수정
                </Card.Text>
                </Card.Body>
                </Link>
            </Card>
            <Card>
                <Card.Img variant="top" 
               src={require("../../images/gym1.jpg")} 
                style={{ height: "285px"  }}/>
                <Card.Body>
                <Card.Title>문의하기</Card.Title>
                <Card.Text>
                   *1대1 문의
                </Card.Text>
                </Card.Body>
                
            </Card>
            </CardGroup>
            </Container>
            </div>
         
    );
};

export default Home; 