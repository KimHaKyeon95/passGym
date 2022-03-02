import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../routes/css/passList.css"
const PassListModify = (props) => {
  

    const onChange = (e) => {
      const index = e.target.parentNode.getAttributeNode("class").value;
      const { name, value } = e.target;   
      props.countList[index][name] = value;
    }

     

    const inNumber= (event) => {
      const {value} = event.target;
      let regexp = RegExp(/^[0-9]*$/);
        if( !regexp.test(value) ) {
          alert("숫자만 입력하세요");
          value = 0;
      }
    }


    return (
      <div>
        {
        props.countList && props.countList.map((item, i) => (
          <div key={i} className={i} >
            <InputGroup >
              <InputGroup.Text id="basic-addon1">회원권 번호</InputGroup.Text>
              <Form.Control
                name="passNo" 
                className="gym__pass-no" 
                placeholder="회원권 번호"
                onChange={onChange} 
                // value={i} 
                value = {item.passNo}
                />
            </InputGroup>
            {/*  */}
            <InputGroup>
              <InputGroup.Text>회원권 이름</InputGroup.Text>
              <Form.Control 
              name="passName" 
              className="gym__pass-name" 
              placeholder="회원권 이름" 
              
              onChange={onChange} 
              value={item.passName}
              required
              />
            </InputGroup>
            {/*  */}
            <InputGroup>
              <InputGroup.Text>회원권 가격</InputGroup.Text>
              <Form.Control 
              name="passPrice" 
              className="gym__pass-price" 
              type="text" 
              placeholder="(단위는 제외하고 입력하세요.)" 
              onChange={onChange}  
              onInput={inNumber}
              value={item.passPrice}
              required
              />
            </InputGroup>     
            {/*  */}       
            <InputGroup>
              <InputGroup.Text>생성일자</InputGroup.Text>
              <Form.Control name="passDate" className="gym__pass-date" placeholder="(YYYY-MM-DD)" 
                onBlur={(event) => {
                let regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
                if(!regex.test(event.target.value)){
                  alert("'연도-월-일'의 형식으로 입력해주세요");
                  event.target.value = "";
                }
              }} onChange={onChange} 
              value={item.passDate}
              required />
            </InputGroup>
            {/*  */}                               
            <InputGroup>
              <InputGroup.Text>회원권 기간</InputGroup.Text>
              <Form.Control 
              name="passMonth"
              className="gym__pass-month" 
              placeholder="개월수 입력" 
              onChange={onChange} 
              value={item.passMonth}
              required />
            </InputGroup> 
            {/*  */}
            <InputGroup>
              <InputGroup.Text>일시정지 가능 횟수</InputGroup.Text>
              <Form.Control 
              name="pauseCount" 
              className="gym__pass-pause-count" 
              placeholder="일시정지 가능 횟수" 
              onChange={onChange} 
              value={item.pauseCount}
              required />
            </InputGroup> 
            {/*  */}
            
            <InputGroup>
              <InputGroup.Text>일시정지 가능 일수</InputGroup.Text>
              <Form.Control 
              name="pauseDate" 
              className="gym__pass-pause-date" 
              placeholder="일시정지 가능 일수" 
              onChange={onChange} 
              value={item.pauseDate}
              required /> 
            </InputGroup> 
            {/*  */}
            
          </div>
        )
        )}
      </div>
    )
  }
  
  export default PassListModify