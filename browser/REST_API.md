# REST API

<br>

- Resource는 URI를 통해서 표현된다. 여러개의 정보를 식별할때는 복수형으로 사용하며 Collection이라고한다 하나하의 정보는 Element
- Representational state transfer의 약자로 백엔드와 클라이언트에서 어떤 방법으로 커뮤니케이션할지 결정해 놓은 것
- 웹통신규약인 HTTP를 이용해서 통신할때 필요한 형식이나 형태일뿐!
- REST API 또는 RESTful Web services라고도 불림
- URI는 동사가아니라 명사로 이루어져야함

  - 부모가되는것 앞/id값/종속된 리소스 순서로 URI로 표현

  <br>

- 대표 메소드 :
  - GET : 정보를 읽을때 (정보를 서버에서부터 받아올때, 이미 존재하는 사용자의 정보를 받아올때) -Read
    - collection을 읽어오는 방법
    - element를 읽어오는 방법
  - POST : 새로운 사용자를 만들때 - Create
  - PUT : 이미 있는 사용자의 정보를 업데이트 (통짜로) - Update
    - (PATCH는 부분적으로 사용자 정보 업데이트하는데, REST API에 포함되어지지않고 잘 쓰이지 않음)
  - DELETE : 사용자의 정보 업데이트 - Delete
