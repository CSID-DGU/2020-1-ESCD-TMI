# ESCD-TMI
## 학생회비 관리 시스템

### 목표 
기존의 학생회비 관리시스템은 장부의 관리자라면 누구나 손쉽게 수기로 장부를 수정할 수 있기 때문에 안정성이 떨어지고, 장부의 내역과 영수증의 내역은 학생들이 요청을 해야 공개하기 때문에 투명성이 떨어진다는 두 가지의 문제점이었습니다.
그렇기에 저희 팀은 새로운 개념의 학생회비 관리시스템으로 이 두가지 문제점을 해결할 방안을 제시할 것입니다.

### 보안요소
- 개발 보안 가이드와 OWASP top 10을 참고 
- 라우터마다 사용자 인증 미들웨어를 심어서 정해진 사용자가 아니면 디비접근 및 서비스 사용을 못하게 막음
- 한 관리자가 다른 관리자의 장부에 접근하는 것을 막기 위해 관리자 고유 아이디를 항상 검증
- Oauth방식을 참고해 클라이언트가 Authorizationserver에 인증 요청 하면 Authorization code를 클라이언트에게 발급
- 해당 Access token을 이용하여 장부에 접근할 수 있고 토큰이 만료된다면 refresh token을 이용하여 토큰을 재발급 
- OWASP ZAP(오와스프 잽)를 사용해 웹사이트가 시큐어 한지 분석하고 검증 하였습니다. 
