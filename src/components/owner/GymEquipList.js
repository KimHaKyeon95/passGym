import { Col, Dropdown, Form, Row, Stack } from "react-bootstrap";

function GymEquipList(){
    const expectedResponse = [{
        "ownerNo": "1",
        "equip": [{
            "equipNo": "0",
            "equipName": "덤벨",
            "equipCount": "3"
            },
            {
            "equipNo": "1",
            "equipName": "스쿼트렉",
            "equipCount": "2"
            }]      
    },
    {
        "ownerNo": "2",
        "equip": [{
            "equipNo": "0",
            "equipName": "덤벨",
            "equipCount": "1"
            },
            {
            "equipNo": "1",
            "equipName": "스쿼트렉",
            "equipCount": "4"
            }] 
    }];

    return(
        <Form style={{marginBottom:"10px"}}>
            
        {/* {['checkbox'].map((type) => (
          <div key={`default-${type}`} className="mb-3">
            <Form.Check 
              type={type}
              id={`default-${type}`}
              label={`default ${type}`}
              onChange={(e)=>{console.log(e.target.id)}}
            />
          </div>
        ))} */}
        <Row className="equip" style={{marginBottom: "5px"}}>
            <Col>
                <div>
                    <Form.Check 
                    type="checkbox"
                    id="equipNo"
                    label="equipName"
                    />
                </div>
            </Col>
            <Col>
            <Form.Group className="equip__count">
                <Form.Control className="equip__count"  placeholder="개수" style={{fontSize: "13px"}} />
            </Form.Group>
            </Col>
        </Row>
        <Row className="equip" style={{marginBottom: "5px"}}>
            <Col>
                <div>
                    <Form.Check 
                    type="checkbox"
                    id="equipNo"
                    label="equipName"
                    />
                </div>
            </Col>
            <Col>
            <Form.Group className="equip__count">
                <Form.Control className="equip__count"  placeholder="개수" style={{fontSize: "13px"}} />
            </Form.Group>
            </Col>
        </Row>      
      </Form> 
    );
}

export default GymEquipList;