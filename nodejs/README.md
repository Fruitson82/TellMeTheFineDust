사용방법
========

1.	참고사항
	-	Node.js의 'request' 모듈이 필요하기 때문에 아래와 같이 npm을 이용하여 해당 모듈을 다운로드 받고, 해당 소스와 함께 zip 파일로 압축 후 Lambda에 업로드 해야 함.

```
npm install request
```

2.	소스 수정 부분

	1.	(Line 7) {service_key} : 미세먼지 측정 데이터 요청 key

		-	공공 데이터 포털을 통해 key를 할당 받아서 입력.<p>

	2.	(Line 54) {image_url}: 호출될 Image URL

		-	0~4까지의 임의의 숫자로 Image URL을 생성하여 임의로 Image가 조회되도록 함.<p>

	3.	(Line 31) {image_url}: github 이동 메시지 표시 시 나타나는 이미지.<p>

	4.	Node.js는 'request'라는 모듈이 필요하기 때문에 npm을 통하여 모듈 다운로드 및 프로젝트를 생성하여, 현재 파일과 함께 zip 파일로 압축하여 업로드. (Lambda에서 설정 시 Handler 부분은 'Node.js 소스 파일명.handler'가 되어야 함.) ![configuration](http://i.imgur.com/DvOWkJr.jpg)
