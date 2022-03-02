import "../../css/owner/ownersignup.css";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import OwnerNoChkModal from "../../components/owner/OwnerNoChkModal";
import PostcodeModal from "../../components/owner/PostcodeModal";

function Ownersignup() {
  const [values, setValues] = useState({
    id: "",
    pwd: "",
    pwdChk: "",
  });

  const [ownerInfo, setOwnerInfo] = useState({
    ownerNo: "",
    ownerName: "",
  });

  const [ownerAddr, setOwnerAddr] = useState({
    zipcode: "",
    addr: "",
    addrDetail: "",
    lat: "",
    lon: "",
  });

  const [chkResults, setResults] = useState({
    idDupChkResult: 0,
    pwdChkResult: 0,
  });

  const [ownerNoChkResult, setOwnerNoChkResult] = useState({
    ownerNoChkResult: 0,
  });

  //비밀번호 형식 체크의 결과
  const [chkPwdResult, setChkPwdResult] = useState({
    result: false,
    resultMsg: "",
  });

  const [pwdChkMsg, setPwdChkMsg] = useState({
    msg: "비밀번호를 입력해주세요",
  });

  const onIdChange = (event) => {
    const nextValues = {
      ...values,
      id: event.target.value,
    };
    setValues(nextValues);
  };

  const chkId = (event) => {
    const regExp = /^[A-Za-z0-9]{4,10}$/;
    //알파벳 대소문자 또는 숫자로 시작하고 끝나며 4~10자리
    setChkIdResult({ result: regExp.test(event.target.value) });
  };

  const [chkIdResult, setChkIdResult] = useState({
    result: false
  })
    
    const idDupChk = () => {
      let idDupChkUrl = "http://localhost:9999/passgym/owner/iddupchk";
      if(!(chkIdResult.result)){
        setValues({...values, id: ""})
        alert("4~10자리의 영문과 숫자조합을 입력해주세요.");
      }else{
        axios.get(idDupChkUrl, {
          params: {
            id: values.id,
          },
        })
        .then((response) => {
          if (response.data === "ok") {
            alert("사용가능한 아이디입니다.");
          } else {
            setValues({ ...values, id: "" });
            alert("이미 존재하는 아이디입니다.");
          }
        })
        .catch((error) => {
          alert(error.status);
        });
    }
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
      ...values,
      [name]: value,
    };
    setValues(nextValues);

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
    if (name === "pwd") {
      if (value !== nextValues.pwdChk) {
        setPwdChkMsg({ msg: "비밀번호가 일치하지 않습니다." });
      } else if (value === "") {
        setPwdChkMsg({ msg: "비밀번호를 입력해주세요." });
      } else {
        setPwdChkMsg({ msg: "비밀번호가 일치합니다." });
        setResults({ ...chkResults, pwdChkResult: 1 });
      }
    }
    if (name === "pwdChk") {
      if (value !== nextValues.pwd) {
        setPwdChkMsg({ msg: "비밀번호가 일치하지 않습니다." });
      } else if (value === "") {
        setPwdChkMsg({ msg: "비밀번호를 입력해주세요." });
      } else {
        setPwdChkMsg({ msg: "비밀번호가 일치합니다." });
        setResults({ ...chkResults, pwdChkResult: 1 });
      }
    }
    if (nextResult.result && nextValues.pwdChk === nextValues.pwd) {
      setResults({ ...chkResults, pwdChkResult: 1 });
    } else {
      setResults({ ...chkResults, pwdChkResult: 0 });
    }
  };

  const onAddrDetailChange = (event) => {
    const nextAddrValues = {
      ...ownerAddr,
      addrDetail: event.target.value,
    };
    setOwnerAddr(nextAddrValues);
  };

  function onSubmit(event) {
    const submitInfo = Object.assign(values, ownerInfo, ownerAddr); //Object.assign(): 객체 합치기
    const forSubmitConfirm = Object.assign(chkResults, ownerNoChkResult);
    let submitUrl = "http://localhost:9999/passgym/owner/signup";
    if (
      (forSubmitConfirm.idDupChkResult,
      forSubmitConfirm.ownerNoChkResult,
      forSubmitConfirm.pwdChkResult === 1)
    ) {
      axios
        .post(submitUrl, submitInfo)
        .then((response) => {
          //session에 주소정보를 갖고 헬스장 등록페이지에서 session의 정보를 꺼내쓰도록 함
          if (response.data === "OwnerNo is exists") {
            alert("이미 존재하는 사업자입니다.");
            event.preventDefault();
          } else {
            sessionStorage.setItem("ownerNo", submitInfo.ownerNo);
            sessionStorage.setItem("zipcode", submitInfo.zipcode);
            sessionStorage.setItem("addr", submitInfo.addr);
            sessionStorage.setItem("addrDetail", submitInfo.addrDetail);
            sessionStorage.setItem("lat", submitInfo.lat);
            sessionStorage.setItem("lon", submitInfo.lon);
            window.location.href = "../ownersignup/gymregist";
          }
        })
        .catch((error) => {
          if (error.response) {
            event.preventDefault(); //새로고침 막음
          }
        });
    } else {
      alert("가입 실패");
    }
    event.preventDefault();
  }

  const [ownerNoChkodalShow, setOwnerNoChkModalShow] = useState(false);
  const [postcodeModalShow, setPostcodeModalShow] = useState(false);

  return (
    <div>
      <div className="ownersignup">
        <Form className="ownersignup__form">
          <h3 className="title">판매자 회원가입</h3>
          <div className="ownersignup__id">
            <Form.Group
              className="ownersignup__id-input"
              controlId="ownersignup__id-input"
            >
              <Form.Control
                name="id"
                onChange={(event) => {
                  onIdChange(event);
                  chkId(event);
                }}
                value={values.id}
                placeholder="아이디"
                autoComplete="off"
                required
              />
            </Form.Group>
            <Button onClick={idDupChk} className="ownersignup_iddupchk-btn">
              중복체크
            </Button>
          </div>
          <Form.Group className="ownersignup__pwd" controlId="ownersignup__pwd">
            <Form.Control
              name="pwd"
              type="password"
              value={values.pwd}
              onChange={onPwdChange}
              placeholder="비밀번호"
              required
            />
          </Form.Group>

          <Form.Group
            className="ownersignup__pwd-chk"
            controlId="ownersignup__pwd-chk"
          >
            <Form.Control
              name="pwdChk"
              type="password"
              value={values.pwdChk}
              onChange={onPwdChange}
              placeholder="비밀번호 확인"
              required
            />
            <div className="msg">{pwdChkMsg.msg}</div>
            <div className="msg">{chkPwdResult.resultMsg}</div>
          </Form.Group>
          <div className="ownersignup__ownerno">
            <Button
              className="ownersignup_ownerno-chk__btn"
              onClick={() => setOwnerNoChkModalShow(true)}
              variant="primary"
            >
              사업자 인증
            </Button>
            <OwnerNoChkModal
              show={ownerNoChkodalShow}
              onHide={() => {
                setOwnerNoChkModalShow(false);
              }}
              setResults={setOwnerNoChkResult}
              setValues={setOwnerInfo}
            />
          </div>
          <div className="ownersignup__owneraddr">
            <div className="ownersignup__search-owneraddr">
              <Form.Group
                className="ownersignup__search-owneraddr-no"
                controlId="ownersignup__search-owneraddr-no"
              >
                <Form.Control
                  placeholder="우편번호"
                  value={ownerAddr.zipcode}
                  readOnly
                  required
                />
              </Form.Group>
              <PostcodeModal
                show={postcodeModalShow}
                onHide={() => {
                  setPostcodeModalShow(false);
                }}
                setValues={setOwnerAddr}
              />
              <Button
                className="ownersignup__search-owneraddr-btn"
                onClick={() => setPostcodeModalShow(true)}
                variant="primary"
              >
                검색
              </Button>
            </div>
            <Form.Group
              className="ownersignup__owneraddr1"
              controlId="ownersignup__owneraddr1"
            >
              <Form.Control
                placeholder="주소"
                value={ownerAddr.addr}
                readOnly
                required
              />
            </Form.Group>
            <Form.Control
              className="ownersignup__owneraddr2"
              placeholder="상세주소"
              name="addrDetail"
              autoComplete="off"
              onChange={onAddrDetailChange}
              required
            />
          </div>

          <Button
            className="ownersignup__submit"
            variant="primary"
            onClick={onSubmit}
            type="submit"
          >
            회원가입
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Ownersignup;
