import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../css/owner/passList.css"
const PassListModify = (props) => {
   //console.log("1",props.countList.length)
    // const [test, setTest] =useState([]);
    
    const inNumber= (event) => {
      const {value} = event.target;
      let regexp = RegExp(/^[0-9]*$/);
        if( !regexp.test(value) ) {
          alert("숫자만 입력하세요");
          value = 0;
      }
    }
  
    return (
      <>
      <div>
        {
             
        
       props.passes && props.passes.map((item, i) => (
        <div  id="pass__form" key={i} className={i} >
          { item.passNo !== 0 &&
            <InputGroup >
              <InputGroup.Text id="basic-addon1">회원권 번호</InputGroup.Text>
              <Form.Control
                name="passNo" 
                className="gym__pass-no" 
                placeholder="회원권 번호"
                value = {item.passNo}
                autoComplete="off"
                readOnly
                />
            </InputGroup>
          }
            {/*  */}
              <InputGroup > 
                <Form.Label className="pass__label">회원권 이름</Form.Label>   
                <Form.Control 
                name="passName" 
                className="gym__pass-name" 
                autoComplete="off"
                placeholder="회원권 이름" 
                onChange={props.changePass} 
                value={item.passName}
                required
                />
              </InputGroup>
            {/*  */}
          <InputGroup > 
              <Form.Label>회원권 가격</Form.Label>
              <Form.Control 
              name="passPrice" 
              className="gym__pass-price" 
              type="number"
              autoComplete="off"
              placeholder="(단위는 제외하고 입력하세요.)" 
              onChange={props.changePass} 
              value={item.passPrice}
              required
              />
            </InputGroup>  
             {/*  */}     
            <InputGroup >    
            <Form.Label>회원권 기간(월단위)</Form.Label>
              <Form.Control 
              name="passMonth"
              type="number"
              className="gym__pass-month" 
              placeholder="개월수 입력" 
              autoComplete="off"
              onChange={props.changePass} 
              value={item.passMonth}
              required />
            </InputGroup>
            {/*  */}
            <InputGroup > 
               <Form.Label>일시정지 가능 횟수</Form.Label>
              <Form.Control 
              name="pauseCount" 
              type="number" 
              className="gym__pass-pause-count" 
              placeholder="일시정지 가능 횟수"
              autoComplete="off" 
              onChange={props.changePass} 
              value={item.pauseCount}
              required />
            </InputGroup>
            {/*  */}
            <InputGroup > 
              <Form.Label>일시정지 가능 일수</Form.Label>
              <Form.Control 
              name="pauseDate" 
              className="gym__pass-pause-date" 
              type="number" 
              placeholder="일시정지 가능 일수" 
              onChange={props.changePass} 
              autoComplete="off"
              value={item.pauseDate}
              required /> 
            </InputGroup>
            {/*  */}
            
          </div>
      ))
        }
      </div>
       </>
    )
  }
  
  export default PassListModify