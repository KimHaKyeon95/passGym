import React from "react";
// import { render } from "react-dom";
import { Tab, Tabs } from "react-bootstrap";
import SearchId from "./SearchId";
import SearchPwd from "./SearchPwd";

function SearchIdPwd() {
  const [key, setKey] = React.useState("searchId");

  function onTabHandler(k) {
    setKey(k);
  }

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={onTabHandler}
      className="mb-3"
      style={{ width: "460px" }}
    >
      <Tab eventKey="searchId" title="아이디 찾기">
        <SearchId />
      </Tab>
      {/* <Tab eventKey="searchPwd" title="비밀번호 찾기">
        <SearchPwd />
      </Tab> */}
    </Tabs>
  );
}
// render(<SearchIdPwd />);
export default SearchIdPwd;
