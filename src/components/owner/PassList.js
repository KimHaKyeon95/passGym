import { Form} from "react-bootstrap";
import "../../css/owner/passList.css"
const PassList = (props) => {

    const onChange = (event) => {
      const index = event.target.parentNode.getAttributeNode("class").value;
      const { name, value } = event.target;   
        props.passInfoList[index][name] = value;
    }

    return (
      <div>
        {
        props.passInfoList && props.passInfoList.map((item, i) => (
          <div key={i} className={i} id="pass__form">
            <Form.Label className="pass__label">회원권번호</Form.Label>          
            <Form.Control name="passNo" className="gym__pass-no" onChange={onChange} value={i} readOnly/>
            <Form.Label className="pass__label">회원권 이름</Form.Label>           
            <Form.Control name="passName" className="gym__pass-name"  autoComplete="off" onChange={onChange} required />     
            <Form.Label className="pass__label">회원권 가격</Form.Label>       
            <Form.Control name="passPrice" className="gym__pass-price" type="number" autoComplete="off" placeholder="(단위는 제외하고 숫자만 입력하세요.)" 
                          onChange={onChange} required />
            <Form.Label className="pass__label">회원권 기간(월단위)</Form.Label>              
            <Form.Control name="passMonth"className="gym__pass-month" type="number" autoComplete="off" placeholder="개월수 입력" onChange={onChange} required /> 
            <Form.Label className="pass__label">일시정지 가능 횟수</Form.Label>          
            <Form.Control name="pauseCount" className="gym__pass-pause-count" type="number" autoComplete="off" onChange={onChange} required />
            <Form.Label className="pass__label">일시정지 가능 일수</Form.Label>           
            <Form.Control name="pauseDate" className="gym__pass-pause-date" type="number" autoComplete="off" onChange={onChange} required />             
          </div>
        )
        )}
      </div>
    )
  }
  
  export default PassList
