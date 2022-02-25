import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "../css/GymRegist.css";
import { useState } from "react";
import axios from "axios";
import PassList from "../../components/owner/PassList";

function GymRegist(){

    const [fileState, setFileState] = useState({
        refFile: "",
        previewUrl: ""
    });

    const [gymInfo, setGymInfo] = useState({
        ownerNo: sessionStorage.getItem("ownerNo"),
        phoneNo: "",
        name: "",
        zipcode: sessionStorage.getItem("zipcode"),
        addr: sessionStorage.getItem("addr"),
        addrDetail: sessionStorage.getItem("addrDetail"),
        introduce: "",
        notice: "",
        startHour: "00",
        startMinute: "00",
        endHour: "00",
        endMinute: "00",
        program: "",
        etc: "",
        lat: sessionStorage.getItem("lat"),
        lon: sessionStorage.getItem("lon")
    })

    const [countList, setCountList] = useState([]);

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

    const onChange = (event) => {
        const {name, value} = event.target;
        let nextGymValue = {
            ...gymInfo,
            [name] : value
        }
        setGymInfo(nextGymValue);
        event.preventDefault();
    }

    const onSubmit = (event) =>{ //일반적인 방법으로는 console에서 formData를 확인할 수 없음
        let uploadRefFile = fileState.refFile;
        console.log(uploadRefFile);
        console.log(fileState);
        formData.append("files", uploadRefFile);
        formData.append("gymInfo", JSON.stringify(gymInfo));
        formData.append("passes", JSON.stringify(countList)); 
       let submitUrl = "http://localhost:8082/passgym/gym/gymregist";
       axios.post(submitUrl, formData, {
           headers: {
               "Content-Type": "multipart/form-data"
           }
       }).then((response) => {
            console.log(response);
            event.preventDefault();
       }).catch((error) => {
            alert(error.response.status);
       });
        event.preventDefault();
    }

    
    const passComponentPlus = () => {
        let countArr = [...countList]
        let idx = countArr.length;
        let data = {
                    passNo: idx, 
                    passName: "", 
                    passPrice: 0, 
                    passDate: "", 
                    passMonth: 0, 
                    pauseCount: 0, 
                    pauseDate: 0
                    }; 
        countArr[idx] = data;
        console.log(countArr);
        setCountList(countArr);
    }

    const passComponentMinus = () => {
        let countArr = [...countList]
        let idx = countArr.length;
        idx--;
        countArr.pop(idx);
        console.log(countArr);
        setCountList(countArr);
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

    const TimeStartHour = () => {
        let hourHtml = "";
        for(let i = 0; i <= 9; i++){
            hourHtml += `<option value=${i}>0${i}</option>`;
        }
        for(let i = 10; i <= 23; i++){
            hourHtml += `<option value=${i}>${i}</option>`;
        }
        return (<Form.Select name="startHour"
                            onChange={onChange}
                            className="gym__operationtimes-start-hour" 
                            aria-label="Default select example" 
                            value={gymInfo.startHour}
                            dangerouslySetInnerHTML={{__html: hourHtml}}>
                </Form.Select>);
    }

    const TimeStartMinute = () => {
        let minuteHtml = "";
        for(let i = 0; i <= 1; i++){
            minuteHtml += `<option value=${i*5}>0${i*5}</option>`;
        }
        for(let i = 2; i <= 11; i++){
            minuteHtml += `<option value=${i*5}>${i*5}</option>`;
        }
        return (<Form.Select name="startMinute"
                            onChange={onChange}
                            className="gym__operationtime-start-minute" 
                            aria-label="Default select example" 
                            value={gymInfo.startMinute}
                            dangerouslySetInnerHTML={{__html: minuteHtml}} >
                </Form.Select>);
    }

    const TimeEndHour = () => {
        let hourHtml = "";
        for(let i = 0; i <= 9; i++){
            hourHtml += `<option value=${i}>0${i}</option>`;
        }
        for(let i = 10; i <= 23; i++){
            hourHtml += `<option value=${i}>${i}</option>`;
        }
        return (<Form.Select name="endHour" 
                            onChange={onChange}
                            className="gym__operationtimes-end-hour" 
                            aria-label="Default select example" 
                            value={gymInfo.endHour}
                            dangerouslySetInnerHTML={{__html: hourHtml}}>
                </Form.Select>);
    }

    const TimeEndMinute = () => {
        let minuteHtml = "";
        for(let i = 0; i <= 1; i++){
            minuteHtml += `<option value=${i*5}>0${i*5}</option>`;
        }
        for(let i = 2; i <= 11; i++){
            minuteHtml += `<option value=${i*5}>${i*5}</option>`;
        }
        return (<Form.Select name="endMinute"
                            onChange={onChange}
                            className="gym__operationtime-end-minute" 
                            aria-label="Default select example" 
                            value={gymInfo.endMinute}
                            dangerouslySetInnerHTML={{__html: minuteHtml}}>
                </Form.Select>);

    }

    if(!sessionStorage.getItem("ownerNo") && !sessionStorage.getItem("addr")){
        return(           
            <Container>
                <Row className="justify-content-md-center">
                    접근할 수 없는 페이지입니다.
                </Row>
                <Row>
                    <br/>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs lg="2">
                    </Col>
                    <Col xs="auto">
                        <Button href="/">홈으로</Button>
                    </Col>
                    <Col xs lg="2">
                    </Col>                    
                </Row>
            </Container>  
        )
    }
    return(
        <div>
            <h3 className="title">헬스장 정보 등록</h3>
            <div className="gym__regist">
            <Form className="gym__regist-form">
            <h5>대표사진 등록</h5>
            <Form.Group className="gym__regist-represent-img" >
                <Form.Control type="file" className="gym__regist-represent-img-upload" onChange={onRefFileChange}/>
            </Form.Group>
                {fileState.refFile == "" ? <div></div> : <RenderRepImg />}
            <h5>세부사진 등록</h5>
            <Form.Group className="gym__regist-detail-img">
                <Form.Control type="file" className="gym__regist-detail-img" onChange={onDetailFileChange} multiple/>
            </Form.Group> 
            <div className="img__box"></div>
            <Form.Control name="phoneNo" onChange={onChange} className="gym__regist-phone-no" placeholder="전화번호" />                 
            <Form.Label>주소</Form.Label>            
            <Form.Control name="addr" onChange={onChange} className="gym__addr" value={sessionStorage.getItem("addr")} required readOnly/>       
            <Form.Control name="addrDetail" onChange={onChange} className="gym__addr-detail" value={sessionStorage.getItem("addrDetail")} required readOnly/>        
            <Form.Control name="name" onChange={onChange} className="gym__name" as="textarea" row={2} placeholder="업체 이름" required />
            <Form.Control name="introduce" onChange={onChange} className="gym__info" as="textarea" row={2} placeholder="업체 소개" required />
            <Form.Control name="notice" onChange={onChange} className="gym__notice" as="textarea" row={2} placeholder="공지 사항"/>
            <Form.Label>회원권 입력</Form.Label>           
            <PassList countList={countList}/>
                <Button className="pass__plus" 
                        onClick={passComponentPlus}>+</Button>
                <Button className="pass__minus"
                        onClick={passComponentMinus}>-</Button>
            <Form.Group className="gym__operating-time">
                <Form.Label>운영시간</Form.Label>
                <Row>
                    <Col><TimeStartHour /></Col>:<Col><TimeStartMinute/></Col>
                    ~
                    <Col><TimeEndHour /></Col>:<Col><TimeEndMinute/></Col>
                </Row>
            </Form.Group>
            <Form.Control name="program" onChange={onChange} className="gym__operating-program" as="textarea" row={2} placeholder="운영 프로그램"/>
            <Form.Control name="etc" onChange={onChange} className="gym__etc" placeholder="기타 사항" />
            <Button className="gym__submit-btn" onClick={onSubmit} type="submit">등록</Button>
            </Form>
            </div>
        </div>
    )
}
export default GymRegist;