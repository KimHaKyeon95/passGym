import React from "react";
// import { render } from "react-dom";
import { Tab, Tabs } from "react-bootstrap";
import FindId from "./FindId";
import ResetPwd from "./ResetPwd";

function SearchIdPwd() {
  const [key, setKey] = React.useState("findId");

  function onTabHandler(k) {
    setKey(k);
  }

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={onTabHandler}
      className="mb-3"
      // style={{ width: "460px" }}
    >
      <Tab
        eventKey="findId"
        title="아이디 찾기"
        // style={{ width: "230px" }}
      >
        <FindId />
      </Tab>
      <Tab
        eventKey="resetPwd"
        title="비밀번호 재설정"
        // style={{ width: "230px" }}
      >
        <ResetPwd />
      </Tab>
    </Tabs>
  );
}
// render(<SearchIdPwd />);
export default SearchIdPwd;
