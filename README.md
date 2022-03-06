# passGym
passgymBack  
백엔드프로젝트입니다.  
프론트엔드 프로젝트: https://github.com/shiningUnderstanding/passgymFront

## [What is PassGym?](#what-is-passgym)
PassGym 프로젝트는 사용자와 피트니스, 헬스장 등을 연결해주는 플랫폼 프로젝트입니다.

#### 1. [Project planning(Project topic selection, functional design, water fall) 프로젝트 기획](#project-planning)
#### 2. [Development implementation (frontend, backend, unit test) 개발 구현](#development-implementation)
#### 3. [Data Base design(from requirements specification) 데이터 베이스 설계](#data-base-design)
#### 4. [Functional Specification 기능명세서](#functional-specification)
#### 5. [VO(Value Object) Class](#value-object-class)
#### 6. [Layout Design 화면설계](#layout-design)

---------------------------------------------------------
## What is PassGym    

- **프로젝트 소개**  
  피트니스에 대한 수요층은 계속해서 증가하고 있습니다. 하지만 아직도 직접 연락을 통해 원하는 시설의 이용가격을 물어봐야하고 방문을 통해서 결제해야하는 불편함이 산재해 있습니다. 최근 많은 서비스가 사용자의 손안에서 결제되고 이를 통해 직접 대면을 통해 서비스를 결제해야하는 많은 불편함이 해소되어 왔습니다. 이런 플랫폼 서비스를 피트니스에도 적용하면 어떨까라는 생각과 함께 프로젝트를 시작하였습니다.
  
  사용자는 거리순, 별점순으로 헬스장을 조회할 수 있고 조회된 헬스장에서 등록한 회원권의 종류에 따라서 결제를 할 수 있습니다. 마이페이지에서 본인의 정보를 관리할 수 있고 결제했던 내역을 볼 수 있습니다
  
  판매자는 본인의 시설을 쉽게 등록하고 관리할 수 있어야 한다고 생각했습니다. 그렇기 때문에 주요 사용층을 구매자 뿐만 아니라 판매자도 추가를 하였습니다. 판매자는 본인의 시설에 관한 정보, 회원들을 판매자 전용페이지에서 관리, 조회할 수 있습니다.
  
  이처럼 두종류의 사용자가 프로젝트에 존재하고 사용자의 종류에 따라 다른 서비스 로직을 구현했습니다.
  
- **기술스택**
   - Java
   - Spring Boot, JPA
   - Oracle Data Base
   - JavaScript
   - HTML/CSS
   - BootStrap
   - React.js
   - GitHub(프로젝트 버전 관리)
   - Docker
   
- **프로젝트에 사용된 Open API**
  - geoLocation API (사용자의 현재 좌표를 반환하기 위해 사용)
  - 카카오맵 API (주소를 통해 좌표를 구하기 위해 사용)
  - 사업자번호 인증 API (국세청 API 사용)
  
--------------------------------------------------------

## Development implementation

프로젝트는 **RESTful API**로 설계됐습니다.

- **프로젝트 아키텍쳐**
    ![image](https://user-images.githubusercontent.com/81364044/156688406-31c02cd2-a26d-4932-847e-0e7df50e9b75.png)

- **기능적 요구사항**   
- 사용자  
  1. 사용자는 회원가입을 하고 이를 통한 로그인을 할 수 있다. 아이디를 찾는 기능을 제공한다.   
  2. 로그인 후에는 해당 회원의 정보를 토대로 마이페이지 기능을 이용할 수 있다.  
  3. 마이페이지에서는 사용자의 프로필을 수정할 수 있다. 프로필 수정 시에는 아이디를 제외한 정보의 수정이 가능하다.  
  4. 사용자가 결제한 헬스장의 목록을 볼 수 있으며 어떤 종류의 회원권을 결제하였는지 정보를 확인할 수 있다. 또한, 해당 헬스장에 별점을 매길 수 있다. 별점은 이용한 이력이 있는 헬스장에서 대해서만 남길 수 있으며, 별점은 전체 서비스에 적용된다.  
  5. 메인화면에서는 헬스장이 사용자의 위치 기준으로 가까운 거리순, 별점순으로 정렬되며 현재 사용자의 위치는 geoLocation API를 통해 구한다.
  6. 각 헬스장의 상세페이지에는 판매자가 등록한 헬스장의 정보를 확인할 수 있고 회원권을 선택해 결제페이지로 넘어갈 수 있다.
  7. 결제페이지에서는 회원권에 등록한 기간에 따라 현재일로부터 만기일이 정해지고 결제하게 되면 사용자가 결제한 정보를 판매자가 확인할 수 있게 된다.
  8. 1:1문의를 남기고 관리자가 답변을 남겼을 시 답변을 확인할 수 있다.

- 판매자
  1. 판매자는 사용자와 마찬가지로 회원가입, 로그인이 가능하고 회원가입시에 바로 본인의 헬스장에 대한 정보를 저장해야한다.
  2. 정보를 저장하지 않고 회원가입과정이 비정상적으로 끝날 시에 로그인을 하면 헬스장에 대한 정보를 기입하는 화면으로 넘어간다.
  3. 로그인 후에는 사용자와는 다른 판매자 전용페이지로 이동한다.
  4. 판매자 전용페이지에서는 등록한 헬스장 정보, 헬스장 회원권에 대한 정보를 관리/수정 할 수 있다.
  5. 등록한 헬스장의 회원권을 어떤 사용자가 구매했는지, 회원권은 어떤 종류가 있는지 한눈에 확인할 수 있는 페이지를 제공한다.
  6. 1:1문의를 남기고 관리자가 답변을 남겼을 시 답변을 확인할 수 있다.

### Front-End
프레임워크는 React.js를 사용하였습니다. 화면인 Route단위와 Route를 이루는 Component단위를 나누어 작업하였습니다. Component는 전부 함수형 Component로 구현하였습니다. useState를 사용하여 중요한 값을 관리하고 useEffect를 사용하여 함수들을 제어하였습니다. CSS는 디자인을 위한 시간을 단축하기 위해 BootStrap을 사용하여 구현하였습니다.

### Back-End
Spring Boot, JPA를 사용하였고 DB는 ORACLE DB를 사용함. 사용 용도에 맞게 각 Entity의 연관관계를 맺고 이를 이용해서 SQL문을 따로 만들지 않고 데이터를 다뤘습니다. Junit을 사용하여 테스트 코드를 작성하였고 이를 통해서 범용성이 높은 테스트 코드를 작성하기 위해 노력하였습니다. MSA를 위한 Spring Cloud, Kafka는 이번 프로젝트에 적용되지 않았지만 추후 기능추가를 쉽게 하기 위해 서비스를 분리했습니다.

---------------------------------------------------------

## Project planning   

- **프로젝트 진행과정: 전체기간 30일**
  - 1 ~ 14일: 프론트엔드 작업
  - 15 ~ 16일: Entity간의 연관관계 매핑
  - 17 ~ 30일: 백엔드작업, Docker 컨테이너에서 프로젝트가 작동할 수 있도록 작업
---------------------------------------------------------
## Data Base design

- **데이터베이스 설계 과정** 
  Has a 관계에 중점을 두고 설계를 진행하였습니다. Owner와 User는 서로 다른 정보를 필요로 하지만 서로 완벽하게 독립적인 관계는 아니기 때문에 각 테이블간의 연결성을 우선적으로 고려하였습니다. MyBatis를 사용하기 위해 프로젝트에 추가를 했지만 JPA를 실습하는 의미를 크게 두기 위해 최대한 쿼리를 쓰지않도록 연관관계를 매핑하는 것이 중요했습니다.

- **DB ERD**
![DB-ERD](https://user-images.githubusercontent.com/95994880/156577437-4b38bbca-e20d-4a49-9587-9e79dadacbc3.PNG)

--------------------------------------------------------
## Functional Specification

- **기술명세서 작성**
  - https://docs.google.com/spreadsheets/d/1KWoKs7q8w8CywX_KmKA10uDT3iW2dMSPw1QK_EhPTA8/edit#gid=0

- **UseCase Diagram**
<img width="80%" src="https://user-images.githubusercontent.com/95994880/156565179-1436a943-31a3-4cea-96d9-5f180a2b6317.PNG"/>



--------------------------------------------------------

## Value Object Class

- **Class Diagram**
<img width="80%" src="https://user-images.githubusercontent.com/95994880/156576038-23004ea1-e925-4ea9-ace0-0a99995efa2f.jpg"/>

---------------------------------------------------------
## Layout Design
- 판매자와 사용자가 사용하는 화면이 다르므로 이용자에 맞는 화면을 설계

### 사용자 화면
   
  <p align="center">1. 거리순/별점순 헬스장 정렬</p>
<p align="center"><img width="45%" src="https://user-images.githubusercontent.com/81364044/156921291-ffb53e93-cc78-4d12-b58c-a76b12039767.png"/><img width="45%" src="https://user-images.githubusercontent.com/81364044/156921346-5813e404-a9ce-4297-9046-920259fc7956.png"/></p>  
  <p><br/></p>
  <p align="center">2. 사용자 회원가입, 로그인, 아이디(이메일 찾기)</p>
<p align="center"><img width="33%" src="https://user-images.githubusercontent.com/81364044/156921413-9fc93e51-12f3-4995-aff1-21d4abd00a71.png"/><img width="33%" src="https://user-images.githubusercontent.com/81364044/156921429-7843cfc8-b881-4952-8bf2-525c2c60f138.png"/><img width="33%" src="https://user-images.githubusercontent.com/81364044/156921460-831e751f-4e8f-45ef-9cb5-7b80dadb26ae.png"/></p>  
<p><br/></p>

   <p align="center">3. 마이페이지, 정보수정, 1대1문의</p>
 <p align="center"><img width="40%" src="https://user-images.githubusercontent.com/81364044/156921538-70ec155e-1ef8-49c1-b53c-277538e0d2d2.png"/><img width="40%" src="https://user-images.githubusercontent.com/81364044/156921560-3d5aeae1-38ea-4b8f-a000-6c4ef66435ff.png"/><img width="40%" src="https://user-images.githubusercontent.com/81364044/156921580-1b521d70-058f-4b5d-931a-22e150b4e487.png"/></p>  
 <p><br/></p>

   <p align="center">4. 헬스장 상세페이지, 결제페이지</p>
 <p align="center"><img width="40%" src="https://user-images.githubusercontent.com/81364044/156921626-9dcf941d-ce0d-4916-8271-f94d3d5289e2.png"/><img width="40%" src="https://user-images.githubusercontent.com/81364044/156921676-8ab85633-dcf1-46aa-a27e-1b5469218971.png"/></p>  
 <p><br/></p>

### 판매자 화면

<p align="center">1. 판매자 로그인, 회원가입</p>
<p align="center"><img width="40%" src="https://user-images.githubusercontent.com/81364044/156921884-56b17b0f-f587-4021-836d-f93a3739c3d6.png"/><img width="40%" src="https://user-images.githubusercontent.com/81364044/156921939-5c85ec5f-89ab-4b9b-a55d-2b20edcb7bab.png"/></p>

 - 판매자 메인 페이지
 <img width="40%" src="https://user-images.githubusercontent.com/92718453/156766872-fafda82f-46df-4807-b93e-255c331ccda9.png"/>
 
 - 판매자 회원조회 페이지  
 
<img width="40%" src="https://user-images.githubusercontent.com/92718453/156762183-7c620b18-93af-4b65-b009-20175834ec3d.png"/>

 - 이용권별 회원조회 
<img width="40%" src="https://user-images.githubusercontent.com/92718453/156762730-52432362-9481-4e4d-8cee-503cbd9597a7.png"/>

- 헬스장 정보 등록/수정 페이지
- 기본 정보 조회

<img width="40%"  src="https://user-images.githubusercontent.com/92718453/156765537-5935b3b8-9031-4157-977e-f0f2fc96aad3.png"/>

- 기본 정보 조회 후 수정
<img width="40%" src="https://user-images.githubusercontent.com/92718453/156765586-51f2c0bd-8295-4dd5-a39e-8904029b5567.png"/>

- 이용권 정보 추가
<img width="40%" src="https://user-images.githubusercontent.com/92718453/156765608-d7bf2f9a-21f0-4609-b31b-9d082de4be64.png"/>

- 1:1 문의
<img width="40%" src="https://user-images.githubusercontent.com/95994880/156485449-978ab3a2-37ce-4a68-9180-092520089e6e.png"/>


