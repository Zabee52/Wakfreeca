<p align="center">
  <img src="https://github.com/Zabee52/Twiraforming/assets/93498724/97d139c0-aeaa-43c3-96ca-6b43925ba9da" height="96">
  <h3 align="center">Wakfreeca</h3>
</p>

<p align="center">
  아프리카TV에 조금 더 일찍 적응하기 위한 작은 도구
</p>

<br/>

## Wakfreeca

![image](https://github.com/Zabee52/Twiraforming/assets/93498724/17520c05-643b-4408-bb04-eefef74844e5)

아프리카TV의 채팅창 레이아웃을 트위치처럼 변경해주는 chrome extension입니다.

## 사용 방법

#### 1. 크롬 익스텐션 다운로드
- [크롬 웹 스토어에서 추가하기](https://chromewebstore.google.com/u/2/detail/wakfreeca/ppiicfcfonlkjdenhjblpdlniehkpalf?hl=ko)
<!--
- 미리 사용해보는 방법
  - Wakfreeca.zip 다운로드 : [링크](https://github.com/Zabee52/Wakfreeca/raw/main/Wakfreeca.zip)
  - 내려받은 파일의 압축을 해제
  - Google chrome
    1. 주소창에 `chrome://extensions/` 를 입력하여 확장 프로그램 관리 탭에 접속
    2. `개발자 모드`를 활성화한 후, `압축 해제된 확장 프로그램을 로드합니다.`를 클릭하여 압축 해제된 Wakfreeca 폴더를 선택
      ![image](https://github.com/Zabee52/Wakfreeca/assets/93498724/e75ba036-ecda-4293-b851-264e66e77a28)
    3. 활성화 완료! 🥳
      ![image](https://github.com/Zabee52/Wakfreeca/assets/93498724/33041871-902c-4ee3-9508-67466792ac6c)
-->

#### 2. 채팅 레이아웃 설정
![image](https://github.com/Zabee52/Twiraforming/assets/93498724/e59f6831-04ac-4c1a-b610-8bb185fd4e1c)
![image](https://github.com/Zabee52/Twiraforming/assets/93498724/7a4ecb4b-d34c-4257-917e-a1e20a308433)
![image](https://github.com/Zabee52/Wakfreeca/assets/93498724/4db2accf-5713-41e0-88c6-4700def8f181)


## 기술의 범위
- Javascript만으로 작성된 내용으로, 모든 설정은 사용자의 브라우저 로컬에 저장되며, __외부 저장 공간에 대한 어떠한 액세스도 수행하지 않습니다.__
- 레이아웃의 변경과 관련한 작업만 수행하는 크롬 익스텐션으로, __어떠한 정보도 외부에 수집되지 않습니다.__

## 업데이트 기록
### v1.1.0
다음 기능이 추가되었습니다.
- 알림 표시 설정 기능: 열혈팬 입장, 탄생, 팬클럽 가입, 서포터 가입 표시 설정
  - 아프리카TV의 알림 종류를 제가 잘 몰라서 일단 확인되는 대로 추가했는데, 더 있다면 제보해주시면 처리하겠습니다 (__)

### v1.1.0
다음 기능이 추가되었습니다.
- 닉네임 색상 변경 활성화 기능
- 별풍선/구독, 애드벌룬, 스티커 별 감추기 기능
- BJ, 매니저, 열혈팬, 팬클럽, 구독자, 일반 사용자 별 퍼스나콘 감추기 기능
- BJ, 매니저, 열혈팬, 팬클럽, 구독자, 퀵뷰 사용자, 서포터 별 아이콘 감추기 기능

아래 기능을 적용하기 위하여 UI가 소폭 수정되었습니다.
- BJ, 매니저, 열혈팬, 팬클럽, 구독자, 일반 사용자 별 퍼스나콘 감추기 기능
- BJ, 매니저, 열혈팬, 팬클럽, 구독자, 퀵뷰 사용자, 서포터 별 아이콘 감추기 기능

다음 문제가 수정되었습니다.
- 얼리기 상태인 채팅창에서 한 줄로 보기 설정 시 설정 기록이 최하단에 고정되는 문제
- 글꼴 크기를 변경해도 닉네임 및 채팅에 반영되지 않는 문제
- 글꼴 색상이 너무 어둡거나 너무 밝아서 잘 보이지 않는 문제

### v1.0.0
AfreecaTV의 채팅창 레이아웃 개선을 돕는 무료 유틸리티 플러그인입니다.
Wakfreeca는 다음과 같은 기능을 제공합니다.
- 채팅창을 한 줄로 표시하는 기능
- 채팅창의 성별 아이콘을 제거하는 기능
- 후원 채팅을 표시하지 않는 기능
