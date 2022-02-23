import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
const PassList = (props) => {

    const onChange = (e) => {
      const index = e.target.parentNode.getAttributeNode("class").value;
      const { name, value } = e.target;   
      props.countList[index][name] = value;
    }
    return (
      <div>
        {
        props.countList && props.countList.map((item, i) => (
          <div key={i} className={i}>
            <Form.Control name="passNo" className="gym__pass-no" placeholder="회원권 번호" onChange={onChange} value={i} />
            <Form.Control name="passName" className="gym__pass-name" placeholder="회원권 이름" onChange={onChange} required />
            <Form.Control name="passPrice" className="gym__pass-price" placeholder="회원권 가격" onChange={onChange} required />
            <Form.Control name="pauseDate" className="gym__pass-date" placeholder="생성 일자" onChange={onChange} required />
            <Form.Control name="passMonth"className="gym__pass-month" placeholder="회원권 기간" onChange={onChange} required />
            <Form.Control name="pauseCount" className="gym__pass-pause-count" placeholder="일시정지 가능 횟수" onChange={onChange} required />
            <Form.Control name="pauseDate" className="gym__pass-pause-date" placeholder="일시정지 가능 일수" onChange={onChange} required /> 
          </div>
        )
        )}
      </div>
    )
  }
  
  export default PassList