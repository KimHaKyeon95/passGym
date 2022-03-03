import {
  Col,
  Container,
  Row,
  Spinner,
  Image,
  Button,
  Form,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import PostcodeModal from "../../components/owner/PostcodeModal";
import { useNavigate } from "react-router";

function Useredit() {
  const [loading, setLoading] = useState(true);
  const [User, setUser] = useState({});

  const [chkResults, setResults] = useState({
    idDupChkResult: 0,
    pwdChkResult: 0,
  });
  //비밀번호 형식 체크의 결과
  const [chkPwdResult, setChkPwdResult] = useState({
    result: false,
    resultMsg: "",
  });

  const [postcodeModalShow, setPostcodeModalShow] = useState(false);

  const navigate = useNavigate();
  const getUser = () => {
    const url = "http://localhost:9999/passgym/user/";
    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert(error.response.status);
      });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    const nextValues = {
      ...User,
      [name]: value,
    };
    setUser(nextValues);
  };

  const changeAddress = (value) => {
    console.log(value);
    const nextValues = {
      ...User,
      addr: value.addr,
      zipcode: value.zipcode,
    };
    setUser(nextValues);
  };

  //비밀번호 형식 체크
  const checkPassword = (value) => {
    //  8 ~ 10자 영문, 숫자 조합
    const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
    // 형식에 맞는 경우 true 리턴
    setChkPwdResult({ result: regExp.test(value) });
    return regExp.test(value);
  };
  //비밀번호 실시간체크
  const onPwdChange = (event) => {
    const { name, value } = event.target;
    const nextValues = {
      ...User,
      [name]: value,
    };
    setUser(nextValues);

    const nextResult = {
      result: checkPassword(value),
      resultMsg: "",
    };
    if (!nextResult.result) {
      setChkPwdResult({
        resultMsg: "비밀번호는 8~10자리 숫자와 영어 조합으로 입력해주세요.",
      });
      setResults({ ...chkResults, pwdChkResult: 0 });
    }
  };

  const onSubmitHandler = (event) => {
    const url = "http://localhost:9999/passgym/user/";
    axios
      .put(url, User, { withCredentials: true })
      .then((response) => {
        if (response.data.status === 1) {
          navigate("/mypage");
        } else {
          alert(response.data.msg);
        }
      })
      .catch((error) => {
        alert(error.response.status);
      });
    event.preventDefault();
  };

  const withdrawal = (event) => {
    const url = "http://localhost:9999/passgym/user/withdrawal";
    axios
      .put(url, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        //navigate("/mypage");
      })
      .catch((error) => {
        alert(error.response.status);
      });
    event.preventDefault();
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <Container style={{ border: "1px solid" }}>
          <Row style={{ padding: "10px 0" }}>
            <Col>
              <h3 style={{ textAlign: "center" }}>사용자정보 수정</h3>
            </Col>
          </Row>
          <Row>
            <Col style={{ textAlign: "center" }}>
              {User.userImg == null ? <></> 
              : <Image
              fluid
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                overflow: "hidden",
                borderRadius: "50%",
                padding: "10px 0",
              }}
              src={`data:image/jpeg;base64,${User.userImg}`}
            ></Image>
              }
              
            </Col>
          </Row>
          <Row
            className="justify-content-md-center"
            style={{ padding: "10px 0 40px 0" }}
          >
            <Col md="5">
              <Form.Group controlId="formFileMultiple">
                <Form.Control type="file" multiple />
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md="5">
              <Form>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextEmail"
                >
                  <Form.Label column lg="3" md="4" sm="2">
                    아이디
                  </Form.Label>
                  <Col lg="9" md="8" sm="10">
                    <Form.Control plaintext readOnly defaultValue={User.id} />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column lg="3" md="4" sm="2">
                    이름
                  </Form.Label>
                  <Col lg="9" md="8" sm="10">
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={User.name}
                      onChange={onChangeHandler}
                      required
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column lg="3" md="4" sm="2">
                    비밀번호
                  </Form.Label>
                  <Col lg="9" md="8" sm="10">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="pwd"
                      value={User.pwd}
                      onChange={onPwdChange}
                      required
                    />
                    <div className="msg">{chkPwdResult.resultMsg}</div>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column lg="3" md="4" sm="2">
                    전화번호
                  </Form.Label>
                  <Col lg="9" md="8" sm="10">
                    <Form.Control
                      type="text"
                      placeholder="Phone No"
                      name="phoneNo"
                      value={User.phoneNo}
                      onChange={onChangeHandler}
                      required
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column lg="3" md="4" sm="2">
                    우편번호
                  </Form.Label>
                  <Col lg="5" md="4" sm="7">
                    <Form.Control
                      type="text"
                      placeholder="zipcode"
                      name="zipcode"
                      value={User.zipcode}
                      onChange={onChangeHandler}
                      required
                    />
                  </Col>
                  <PostcodeModal
                    show={postcodeModalShow}
                    onHide={() => {
                      setPostcodeModalShow(false);
                    }}
                    setValues={changeAddress}
                  />
                  <Col>
                    <Button onClick={() => setPostcodeModalShow(true)}>
                      검색
                    </Button>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column lg="3" md="4" sm="2">
                    주소
                  </Form.Label>
                  <Col lg="9" md="8" sm="10">
                    <Form.Control
                      type="text"
                      placeholder="address"
                      name="addr"
                      value={User.addr}
                      onChange={onChangeHandler}
                      required
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="mb-3"
                  controlId="formPlaintextPassword"
                >
                  <Form.Label column lg="3" md="4" sm="2">
                    상세주소
                  </Form.Label>
                  <Col lg="9" md="8" sm="10">
                    <Form.Control
                      type="text"
                      placeholder="detail address"
                      name="addrDetail"
                      value={User.addrDetail}
                      onChange={onChangeHandler}
                      required
                    />
                  </Col>
                  <Col style={{ textAlign: "center", margin: "40px 0 20px 0" }}>
                    <Button type="submit" onClick={onSubmitHandler}>
                      저장하기
                    </Button>
                  </Col>
                </Form.Group>
                <Row style={{ margin: "40px 0 20px 0" }}>
                  <Col style={{ textAlign: "center" }}>
                    <Button onClick={withdrawal}>탈퇴하기</Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Useredit;
