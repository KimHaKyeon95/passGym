import React from 'react';
import { Card, Table } from 'react-bootstrap';
 
const PassItem = (props) => {
    const {passName,  passMonth,pauseCount, passDate,pauseDate, passPrice, remarks,
    gymPasses
} = props.p;

    return (
        <div> 
        <br/>
        <Card >
            
            <Card.Body>
                <Card.Title className="btn btn-primary"> {passName}</Card.Title>
         <Table responsive="md"> 
             <br/>
        <thead>
            <tr>
            <th>#</th>
            <th>회원권생성일자</th>
            <th>회원권 개월수</th>
            <th>일시정지 기능횟수</th> 
            <th>일시정지 가능일수</th> 
            <th>회원권 가격</th> 
            <th>비고</th> 
          </tr>
        </thead>
       
        <tbody >
           <tr>
            <td>#</td>
            <td>{passMonth}</td>
            <td>{pauseCount}</td>
            <td>{passDate}</td>
            <td>{pauseDate}</td>
            <td>{passPrice}</td>
            <td>{remarks}</td>
          </tr>
        </tbody>
            </Table>
            <br/>
        <Table responsive="md">
          <thead>
          <tr>
              <th></th>
              <th>회원아이디</th>
              <th>이름</th>
              <th>번호</th> 
              <th>주소</th> 
              <th>상세주소</th> 
              <th>결제은행</th> 
              <th>결제날짜</th> 
              <th>결제가격</th> 
          </tr>
          </thead>
        <tbody>
            
    {gymPasses.map(gp =>( 
           <tr key= {gp.userNo}  gp={gp}  >
              <td></td>
              <td>{gp.userNo}</td>
              <td>test1</td>  
              <td>test1</td>
              <td>test1</td>
              <td>test1</td>
              <td>test1</td>
              <td>test1</td>
              <td>test1</td>
          </tr>
            ))}
          </tbody>
            </Table>       
            </Card.Body>
        </Card>
        </div>
    );
};

export default PassItem;