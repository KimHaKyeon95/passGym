import { Button, Col, Form, Row } from "react-bootstrap";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import "../css/GymRegist.css";
import { useEffect,useState } from "react";
import axios from "axios";
import GymEquipList from "../../components/owner/GymEquipList";

function OwnerModify(props){
    sessionStorage.setItem("id", "id123");
    sessionStorage.setItem("addr", "테스트 주소");
    sessionStorage.setItem("addrDetail", "테스트 상세주소");
    sessionStorage.setItem("ownerNo", "100000001");
        
     const ownerNo = props.match.params.ownerNo;

    const [fileState, setFileState] = useState({
        refFile: "",
        previewUrl: ""
    });
    const [gymInfo, setGymInfo] = useState({
        phoneNo: "",
        introduce: "",
        notice: "",

    })

    const [passInfo, setPassInfo] = useState({

    })

    let uploadFile;
    const formData = new FormData();
    const onRefFileChange = (event) => {
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            setFileState({
                refFile: file,
                previewUrl: reader.result
            })
        }
        reader.readAsDataURL(file);
    }

    const onDetailFileChange = (event) => {
        let fileData = event.target.files;
        let file = null;
        let name = "";
        let newValues = {...fileState};
        for(let i = 0; i < fileData.length; i++){
            file = fileData[i];
            name = "detailImg" + i;
            newValues = {
                ...newValues,
                [name] : file
            }
            setFileState(newValues);
        }
    }


    const onSubmit = (event) =>{ //일반적인 방법으로는 console에서 formData를 확인할 수 없음
        uploadFile = fileState.refFile;
        formData.append('files', uploadFile);

        //formData내부 확인
        for (let key of formData.keys()) {
            console.log(key);
        }
        for (let value of formData.values()) {
            console.log(value);
        }
        
        event.preventDefault();
    }

    const RenderRepImg = () => {
        let profilePreview = null;
        if(fileState.refFile !== ""){
            profilePreview = <img className="profile__preview" src={fileState.previewUrl}></img>
        }
        return(
            <div className="profile__preview">{profilePreview}</div>
        );
    }

    const TimeHour = () => {
        let hourHtml = "";
        for(let i = 0; i <= 9; i++){
            hourHtml += `<option value=${i}>0${i}</option>`;
        }
        for(let i = 10; i <= 23; i++){
            hourHtml += `<option value=${i}>${i}</option>`;
        }
        return (<Form.Select className="gym__operationtime-hour" aria-label="Default select example" 
                            dangerouslySetInnerHTML={{__html: hourHtml}}>
                </Form.Select>);
    }

    const TimeMinute = () => {
        let minuteHtml = "";
        for(let i = 0; i <= 9; i++){
            minuteHtml += `<option value=${i}>0${i}</option>`;
        }
        for(let i = 10; i <= 59; i++){
            minuteHtml += `<option value=${i}>${i}</option>`;
        }
        return (<Form.Select className="gym__operationtime-minute" aria-label="Default select example" 
                            dangerouslySetInnerHTML={{__html: minuteHtml}} >
                </Form.Select>);
    }


    

 const submitBook = (e) => {
    e.preventDefault(); // submit이 action을 안타고 자기 할일을 그만함.
    fetch('http://localhost:9990/gym/modify/'+ ownerNo,  {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(gymInfo),
    }) 
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then((res) => {
        if (res !== null) {
          props.history.push('/OwnerHome' );
        } else {
          alert('책 수정에 실패하였습니다.');
        }
      });
  };





    return(
        <div>
            <h3 className="title">헬스장 정보 수정</h3>
            <div className="gym__regist">
            <Form className="gym__regist-form">
            <h5>대표사진 </h5>
            <Form.Group className="gym__regist-represent-img" >
                <Form.Control type="file" className="gym__regist-represent-img-upload" onChange={onRefFileChange}/>
            </Form.Group>
                {fileState.refFile == "" ? <div></div> : <RenderRepImg />}
            <h5>세부사진 </h5>
            <Form.Group className="gym__regist-detail-img">
                <Form.Control type="file" className="gym__regist-detail-img" onChange={onDetailFileChange} multiple/>
            </Form.Group> 
            <div className="img__box"></div>
            <Form.Group controlId="gym__regist-phone-no">
                <Form.Control className="gym__regist-phone-no" placeholder="전화번호" />
            </Form.Group>          
            <Form.Label>주소</Form.Label>
            <Form.Group className="gym__addr">   
                <Form.Control className="gym__addr" value={sessionStorage.getItem("addr")} readOnly/>
            </Form.Group>
            <Form.Group className="gym__addr-detail">
                <Form.Control className="gym__addr-detail" value={sessionStorage.getItem("addrDetail")} readOnly/>
            </Form.Group>
            <Form.Group className="gym__info">
                <Form.Control className="gym__info" as="textarea" row={2} placeholder="업체 소개" />
            </Form.Group>
            <Form.Group className="gym__notice">
                <Form.Control className="gym__notice" as="textarea" row={2} placeholder="공지 사항" />
            </Form.Group>
            <Form.Label>회원권 </Form.Label>
            <Form.Group className="gym__pass">
                <Form.Group className="gym__pass-no">
                    <Form.Control className="gym__pass-no" placeholder="회원권 번호" />
                </Form.Group>
                <Form.Group className="gym__pass-name">
                    <Form.Control className="gym__pass-name" placeholder="회원권 이름" />
                </Form.Group>
                <Form.Group className="gym__pass-price">
                    <Form.Control className="gym__pass-price" placeholder="회원권 가격" />
                </Form.Group>
                <Form.Group className="gym__pass-date">
                    <Form.Control className="gym__pass-date" placeholder="생성 일자" />
                </Form.Group>
                <Form.Group className="gym__pass-month">
                    <Form.Control className="gym__pass-month" placeholder="회원권 기간" />
                </Form.Group>
                <Form.Group className="gym__pause-count">
                    <Form.Control className="gym__pass-pause-count" placeholder="일시정지 가능 횟수" />
                </Form.Group>
                <Form.Group className="gym__pause-date">
                    <Form.Control className="gym__pass-pause-date" placeholder="일시정지 가능 일수" />
                </Form.Group>
            </Form.Group>
            <div className="pass__btn">
                <Button className="pass__plus">+</Button>
                <Button className="pass__minus">-</Button>
            </div>
            <Form.Group className="gym__operating-time">
                <Form.Label>운영시간</Form.Label>
                <Row>
                    <Col><TimeHour /></Col>:<Col><TimeMinute/></Col>
                    ~
                    <Col><TimeHour /></Col>:<Col><TimeMinute/></Col>
                </Row>
            </Form.Group>
            <Form.Group className="gym__operating-program">
                <Form.Control className="gym__operating-program" as="textarea" row={2} placeholder="운영 프로그램" />
            </Form.Group>
            <Form.Label column sm={4}>운동기구 선택</Form.Label>
            <Form.Group className="gym__equip-list" >
                <Col sm={6} >   
                <GymEquipList/>
                </Col>
            </Form.Group>
            <Form.Group className="gym__etc">
                <Form.Control className="gym__etc" placeholder="기타 사항" />
            </Form.Group>
            <Button className="gym__submit-btn" onClick={onSubmit} >등록</Button>
            </Form>
            </div>
        </div>
    )
}
export default OwnerModify;