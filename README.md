# passGym
passgymBack

## [What is PassGym?](#what-is-passgym)
PassGym 프로젝트는 사용자와 피트니스, 헬스장 등을 연결해주는 플랫폼 프로젝트입니다.

#### 1. [Project planning(Project topic selection, functional design, water fall) 프로젝트 기획](#project-planning)
#### 2. [Layout Design 화면설계](#layout-design)
#### 3. [Data Base design(from requirements specification) 데이터 베이스 설계](#data-base-design)
#### 4. [Functional Specification 기능명세서](#functional-specification)
#### 5. [VO(Value Object) Class](#value-object-class)
#### 6. [Development implementation (frontend, backend, unit test) 개발 구현](#development-implementation)

---------------------------------------------------------
## What is PassGym       

- 프로젝트 소개
  PassGym 프로젝트는 사용자와 피트니스, 헬스장을 연결해주는 플랫폼 프로젝트입니다.  
  사용자는 자신의 위치와 가까운 헬스장, 본인이 찜한 헬스장 등을 한눈에 파악할 수 있습니다. 사용자는 각 헬스장의 상세페이지에 접속하여 해당 헬스장의 상세정보를 확인하고 회원권을 결제하고 맘에 드는 헬스장을 본인의 찜목록에 추가할 수 있습니다. 이렇게 찜하고 결제한 목록은 마이페이지에서 확인이 가능합니다.  
  
  헬스장 운영자 측은 사업자 회원가입이라는 다른 경로로 회원가입을 하며 회원가입시에 헬스장에 관한 정보를 등록하도록합니다. 헬스장에 관한 정보는 이용권의 종류와 상세설명, 헬스장 사용 정보 등이 있습니다. 회원가입 후 사업자로 로그인을 하게 되면 판매자 전용페이지로 접속이 됩니다. 회원권 조회를 통해 각 회원권을 이용하는 회원들의 목록을 확인할 수 있습니다.
  
- 기술스택
   - Java, SpringBoot
   - JPA
   - Oracle Data Base
   - JavaScript
   - React.js
   - jQuery
   - HTML/CSS
   - GitHub(프로젝트 버전 관리)
   - Docker

- 프로젝트에 사용한 디자인 패턴
  - MVC 패턴 사용
   
- 프로젝트에 사용된 Open API
  - geoLocation API (사용자의 현재 좌표를 반환하기 위해 사용)
  - 카카오맵 API (주소를 통해 좌표를 구하기 위해 사용)
  - 사업자번호 인증 API (국세청 API 사용)

- 추후 추가될 사항들
  - 사용자의 위치를 입력하여 가까운 순서대로 헬스장을 보여줌
  - 결제 API 사용
  - 회원권 일시정지, 연장기능
  - 헬스장 정보 수정 페이지
  - 핸드폰번호 입력시 인증번호 발송 및 입력 
  - SNS아이디를 통한 빠른 로그인, 회원가입

---------------------------------------------------------
## Project planning   

- 프로젝트 계획 과정
  - 총 프로젝트 기간 30일  
  - 프로젝트 기획 4일 
  - 요구사항 정의 3일 
  - 데이터베이스 설계 7일 
  - 기술명세서 작성 7일
---------------------------------------------------------
## Layout Design
- 판매자와 사용자가 사용하는 화면이 다르므로 이용자에 맞는 화면을 설계

- 사용자 화면
  - 홈
  - 거리순 헬스장 정렬
<img width="40%" src="https://user-images.githubusercontent.com/95994880/156579409-3e00a994-8672-4a8d-a317-97a2d42debe1.PNG"/>
  - 별점순 헬스장 정렬
<img width="40%" src="https://user-images.githubusercontent.com/95994880/156579375-63ada371-2a4e-40c9-99b6-4e1053131975.PNG"/>
  - 사용자 회원가입
<img width="40%" src="https://user-images.githubusercontent.com/95994880/156485454-c4ea527e-35a2-4407-981b-037b1eb351b9.png"/>
  - 사용자 로그인
<img width="40%" src="https://user-images.githubusercontent.com/95994880/156484863-5c031ea4-b8d7-4907-8d2a-c1edd0f895d7.png"/>
  - 사용자 아이디(이메일) 찾기
<img width="40%" src="https://user-images.githubusercontent.com/95994880/156485452-2e65406c-9419-4afd-8c9f-c4a23692980a.png"/>
  - 마이페이지
<img width="40%" src="https://user-images.githubusercontent.com/95994880/156485456-71caddb5-95ce-4d47-8cd6-151169caca7f.png"/>
  - 정보 수정
<img width="40%" src="https://user-images.githubusercontent.com/95994880/156485460-5e5edf0f-5d97-40e6-8bbf-b976deca8245.png"/>
  - 1:1 문의
<img width="40%" src="https://user-images.githubusercontent.com/95994880/156485463-77ed12e1-c1e8-4aef-b247-ddfba9a9d583.png"/>
  - 헬스장 상세페이지
<img width="40%" src="https://user-images.githubusercontent.com/95994880/156506419-4774a7e1-4f4a-4c4a-8176-b621ccc3d3ca.png"/>
  - 결제페이지
<img width="40%" src="https://user-images.githubusercontent.com/95994880/156506659-e0c46209-ad35-4d6b-b136-7b8c048cec74.png"/>

- 판매자 화면
  - 메인
<img width="40%" src="https://user-images.githubusercontent.com/95994880/156485444-c9c6920f-fcb0-4547-b184-65f50c8225c4.png"/>
  - 판매자 로그인
<img width="40%" src="https://user-images.githubusercontent.com/95994880/156485341-840656d8-0d7d-4d52-859c-575315bedf05.png"/>
  - 헬스장 정보 등록/수정
<img width="40%" src="https://user-images.githubusercontent.com/95994880/156485447-e45b8e48-d4c0-4e2b-9a13-1c0e26ff3cce.png"/>
  - 1:1 문의
<img width="40%" src="https://user-images.githubusercontent.com/95994880/156485449-978ab3a2-37ce-4a68-9180-092520089e6e.png"/>
  
---------------------------------------------------------
## Data Base design

- 데이터베이스 설계 과정  
  Has a 관계에 중점을 두고 설계를 진행하였습니다. Owner와 User는 서로 다른 정보를 필요로 하지만 서로 완벽하게 독립적인 관계는 아니기 때문에 각 테이블간의 연결성을 우선적으로 고려하였습니다.
  
- initial DB design
![디비 설계]()

- DB ERD
![DB-ERD](https://user-images.githubusercontent.com/95994880/156577437-4b38bbca-e20d-4a49-9587-9e79dadacbc3.PNG)

--------------------------------------------------------
## Functional Specification

- 기술명세서 작성
  - https://docs.google.com/spreadsheets/d/1KWoKs7q8w8CywX_KmKA10uDT3iW2dMSPw1QK_EhPTA8/edit#gid=0

- UseCase Diagram
<img width="80%" src="https://user-images.githubusercontent.com/95994880/156565179-1436a943-31a3-4cea-96d9-5f180a2b6317.PNG"/>

--------------------------------------------------------

## Value Object Class

- Class Diagram
<img width="80%" src="https://user-images.githubusercontent.com/95994880/156576038-23004ea1-e925-4ea9-ace0-0a99995efa2f.jpg"/>
--------------------------------------------------------
## Development implementation

