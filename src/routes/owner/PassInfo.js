import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

const PassInfo = () => {
     const [gymPass, setGymPass] = useState([
    ]);
    
    return (
        <div>
        <Card>
        <Card.Body>
        <Table responsive="md">
        <thead>
            <tr>
            <th></th>
            <th>회원권이름: passName</th>
            <th>회원권생성일자: passMonth</th>
            <th>회원권 개월수: pauseCount</th>
            <th>일시정지 기능횟수: pauseCount</th> 
            <th>일시정지 가능일수:pauseDate</th> 
            <th>회원권 가격: passPrice</th> 
            <th>비고:remarks</th> 
          </tr>
        </thead>

          {/* {gymPass.map(gympass =>( 
        <tbody>
           <tr key= {gympass.gymPasses}  gympass={gympass}  >
            <td></td>
            <td>{gympass.passName}</td>
            <td>{gympass.passMonth}</td>
            <td>{gympass.pauseCount}</td>
            <td>{gympass.pauseDate}</td>
            <td>{gympass.pauseDate}</td>
            <td>{gympass.passPrice}</td>
            <td>{gympass.remarks}</td>
          </tr>
        </tbody>
        ))} */}
      </Table>  


      <Table responsive="md">
          <thead>
          <tr>
              <th></th>
              <th>회원아이디: userid</th>
              <th>이름: userName</th>
              <th>번호: phoneNo</th> 
              <th>주소: addr</th> 
              <th>상세주소: addrDetail</th> 
              <th>결제은행: bankName</th> 
              <th>결제날짜: paymentDate</th> 
              <th>결제가격: paymentPrice</th> 
          </tr>
          </thead>
    {/* {gymPass.map(gympass =>( 
        <tbody>
           <tr key= {gympass.userNo}  gympass={gympass}  >
              <td></td>
              <td>test1</td>
              <td>test1</td>  
              <td>test1</td>
              <td>test1</td>
              <td>test1</td>
              <td>test1</td>
              <td>test1</td>
              <td>test1</td>
          </tr>
          </tbody>
            ))} */}
      </Table>
          
      </Card.Body>
      </Card>
        </div>
    );
};

export default PassInfo;
