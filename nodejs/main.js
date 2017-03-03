var request = require('request');


exports.handler = function(event, context) {
    
    var url = "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty";
    var queryParams  = '?' + encodeURIComponent('ServiceKey')   + '=' + '${ServiceKey}'; // Service Key
    	queryParams += '&' + encodeURIComponent('stationName')  + '=' + encodeURIComponent('성북구');   // 측정소
    	queryParams += '&' + encodeURIComponent('dataTerm')     + '=' + encodeURIComponent('month');    // 데이터
    	queryParams += '&' + encodeURIComponent('pageNo')       + '=' + encodeURIComponent('1');        // 페이지 수
    	queryParams += '&' + encodeURIComponent('numOfRows')    + '=' + encodeURIComponent('10');       // 표시 Rows
    	queryParams += '&' + encodeURIComponent('ver')          + '=' + encodeURIComponent('1.3');      // 버전
    	queryParams += '&' + encodeURIComponent('_returnType')  + '=' + encodeURIComponent('json');     // Return Type
    
    request({
        url: url + queryParams,
        method: 'GET'
    }, function (error, response, body) {
    
    	var returnJson = "";
    	var buttonArr = ["미세먼지", "가족소개","Let's go github..."];
		var body_json = JSON.parse(body);
		
    	//console.log(displayData(body_json['list'][0]));	

    	if(event.content == "미세먼지") {
    	    returnJson = {"message": {"text": displayData(body_json['list'][0])}, "keyboard": {"type": "buttons", "buttons": buttonArr}};    
    	}else if(event.content == "가족소개") {
    	    returnJson = {"message": {"text": "멋진 우리 가족입니다", "photo": {"url": getRandomImage(), "width": 640, "height": 450}}, "keyboard": {"type": "buttons", "buttons": buttonArr}};
    	}else {
    	    returnJson = {"message": {"photo": {"url": "${image_url}", "width": 640, "height": 450}, "message_button": {"label": "Let's go github...", "url": "https://github.com/Fruitson82/KakaoYellowIDByFruitson"}}, "keyboard": {"type": "buttons", "buttons": buttonArr}};
    	}
        context.succeed(returnJson);
        
    });
};

function displayData(data) {
    
	var str = "nodejs ver.\n";
	    str += "측정시간: " + data['dataTime'] + "\n";
        str += "미세먼지(PM10) 농도 : "		+ getPM10Show(data['pm10Value']) + "\n";
        str += "초미세먼지(PM2.5) 농도: "	+ getPM25Show(data['pm25Value']) + "\n";
        str += "오존 농도      : "			+ getO3Show(data['o3Value']) + "\n";
        str += "이산화질소 농도: "			+ getNO2Show(data['no2Value']) + "\n";
        str += "일산화탄소 농도: "			+ getCOShow(data['coValue']) + "\n";
        str += "아황산가스 농도: "			+ getSO2Show(data['so2Value']);

	return str;
}

function getRandomImage() {
    var randomStr = Math.floor(Math.random() * 5);
    return "${image_url}" + randomStr + ".JPG";
}

// Null 체크
function isNull(value) {
	if(null === value || "" === value || "-" == value) {
		return true; 
	}else {
		return false;
	}
}

// 미세먼지(PM10) 표시
function getPM10Show(pm10Value) {
	var tmpStr;
    if(isNull(pm10Value)){
        tmpStr = "측정값 없음.";
    }else {
        if(0 <= pm10Value && pm10Value <= 30){
            tmpStr = "좋음";
        }else if(30 < pm10Value && pm10Value <= 80){
            tmpStr = "보통";
        }else if(80 < pm10Value && pm10Value <= 150){
            tmpStr = "나쁨";
        }else{
            tmpStr = "매우나쁨";
        }
    }
    return pm10Value + "(" + tmpStr + ")";
}

// 초미세먼지(PM2.5) 표시
function getPM25Show(pm25Value){
    var tmpStr;
    if(isNull(pm25Value)){
    	tmpStr = "측정값 없음.";
    }else {
        if(0 <= pm25Value && pm25Value <= 15){
        	tmpStr = "좋음";
        }else if(15 < pm25Value && pm25Value <= 50){
            tmpStr = "보통";
        }else if(50 < pm25Value && pm25Value <= 100){
            tmpStr = "나쁨";
        }else{
            tmpStr = "매우나쁨";
        }
    }
    return pm25Value + "(" + tmpStr + ")";
}

// O3 표시
function getO3Show(o3Value){
    var tmpStr;
    if(isNull(o3Value)){
        tmpStr = "측정값 없음.";
    }else{
        if(0 <= o3Value && o3Value <= 0.03){
            tmpStr = "좋음";
        }else if(0.03 < o3Value && o3Value <= 0.09){
            tmpStr = "보통";
        }else if(0.09 < o3Value && o3Value <= 0.15){
            tmpStr = "나쁨";
        }else {
            tmpStr = "매우나쁨";
        }
    }
    return o3Value + "(" + tmpStr + ")";
}

// NO2 표시
function getNO2Show(no2Value) {
	var tmpStr;
    if (isNull(no2Value)){
        return "측정값 없음";
    }else{
        if(0 <= no2Value && no2Value <= 0.03){
            tmpStr = "좋음";
        }else if(0.03 < no2Value && no2Value <= 0.06){
            tmpStr = "보통";
        }else if(0.06 < no2Value && no2Value <= 0.2){
            tmpStr = "나쁨";
        }else{
            tmpStr = "매우나쁨";
        }
    }
    return no2Value + "(" + tmpStr + ")";
}

// CO 표시
function getCOShow(coValue) {
	var tmpStr;
    if (isNull(coValue)){
        return "측정값 없음";
    }else{
        if(0 <= coValue && coValue<= 2){
            tmpStr = "좋음";
        }else if(2 < coValue && coValue<= 9){
            tmpStr = "보통";
        }else if(9 < coValue && coValue<= 15){
            tmpStr = "나쁨";
        }else{
            tmpStr = "매우나쁨";
        }
    }
    return coValue + "(" + tmpStr + ")";
}

// SO2 표시
function getSO2Show(so2Value){
	var tmpStr;
    if (isNull(so2Value)){
        return "측정값 없음";
    }else {
    	if(0 <= so2Value && so2Value <= 0.02){
            tmpStr = "좋음";
    	}else if(0.02 < so2Value && so2Value <= 0.05){
            tmpStr = "보통";
    	}else if(0.05 < so2Value && so2Value<= 0.15){
            tmpStr = "나쁨";
    	}else{
            tmpStr = "매우나쁨";       
    	}
    }
    return so2Value + "(" + tmpStr + ")";
}