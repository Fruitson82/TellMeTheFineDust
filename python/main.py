#-*- coding: utf-8 -*-
from __future__ import print_function
import urllib
import json
import random

print('Loading function')

def lambda_handler(event, context):
    
    str = ""
    randomInt = random.randint(1, 5)
    
    if "양한나" == event.get('content'):
        
        if randomInt == 1:
            str = "안녕! 한나야!"
        elif randomInt == 2:
            str = "아프지 말아요ㅠㅠ!"
        elif randomInt == 3:
            str = "당신은 아름다워요!"
        elif randomInt == 4:
            str = "용돈 많이 주세요!!"
        else:    
            str = "맛난거 사주세요!"
            
    elif "한소망" == event.get('content'):
        if randomInt == 1:
            str = "안녕! 소망아!"
        elif randomInt == 2:
            str = "말 좀 들어라!"
        elif randomInt == 3:
            str = "딸기 안녕~?"
        elif randomInt == 4:
            str = "아빠한테 뽀뽀!!"
        else:    
            str = "엄마 사랑해요!"
            
    else :
        url = "http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=성북구&dataTerm=month&pageNo=1&numOfRows=10&ServiceKey=${service_key}&ver=1.3&_returnType=json"
        
        f = urllib.urlopen(url)
        encoding = f.headers['content-type'].split('charset=')[-1]
        r = unicode(f.read(), encoding)
        
        dict = json.loads(r)
        data = dict['list'][0]
        
        str = "측정시간: " + data.get('dataTime') + "\n"
        str += "미세먼지(PM10) 농도 : " + getPM10Show(data.get('pm10Value')) + "\n"
        str += "미세먼지(PM2.5) 농도: " + getPM25Show(data.get('pm25Value')) + "\n"
        str += "오존 농도      : " + getO3Show(data.get('o3Value')) + "\n"
        str += "이산화질소 농도: " + getNO2Show(data.get('no2Value')) + "\n"
        str += "일산화탄소 농도: " + getCOShow(data.get('coValue')) + "\n"
        str += "아황산가스 농도: " + getSO2Show(data.get('so2Value'))
    
    return {'message': {'text': str},'keyboard': {'type': 'buttons', 'buttons': ["미세먼지","가족소개","Let's go Github..."]}}

def getPM10Show(value):
    tmpStr = ""
    if("-" == value):
        tmpStr = "측정값 없음."
    else:
        tmpValue = int(value)
        if(0 <= tmpValue <= 30):
            tmpStr = "좋음"
        elif(30 < tmpValue <= 80):
            tmpStr = "보통"
        elif(80 < tmpValue <= 150):
            tmpStr = "나쁨"
        else:
            tmpStr = "매우나쁨"
    return value + "(" + tmpStr + ")"

def getPM25Show(value):
    tmpStr = ""
    if("-" == value):
        tmpStr = "측정값 없음."
    else:
        tmpValue = int(value)
        if(0 <= tmpValue <= 15):
            tmpStr = "좋음"
        elif(15 < tmpValue <= 50):
            tmpStr = "보통"
        elif(50 < tmpValue <= 100):
            tmpStr = "나쁨"
        else:
            tmpStr = "매우나쁨"
    return value + "(" + tmpStr + ")"

def getO3Show(value):
    tmpStr = ""
    if("-" == value):
        tmpStr = "측정값 없음."
    else:
        tmpValue = float(value)
        if(0 <= tmpValue <= 0.03):
            tmpStr = "좋음"
        elif(0.03 < tmpValue <= 0.09):
            tmpStr = "보통"
        elif(0.09 < tmpValue <= 0.15):
            tmpStr = "나쁨"
        else:
            tmpStr = "매우나쁨"
    return value + "(" + tmpStr + ")"

def getNO2Show(value):
    tmpStr = ""
    if ("-" == value):
        return "측정값 없음"
    else:
        tmpValue = float(value)
        if(0 <= tmpValue <= 0.03):
            tmpStr = "좋음"
        elif(0.03 < tmpValue <= 0.06):
            tmpStr = "보통"
        elif(0.06 < tmpValue <= 0.2):
            tmpStr = "나쁨"
        else:
            tmpStr = "매우나쁨"
    return value + "(" + tmpStr + ")"

def getCOShow(value):
    tmpStr = ""
    if ("-" == value):
        return "측정값 없음"
    else:
        tmpValue = float(value)
        if(0 <= tmpValue <= 2):
            tmpStr = "좋음"
        elif(2 < tmpValue <= 9):
            tmpStr = "보통"
        elif(9 < tmpValue <= 15):
            tmpStr = "나쁨"
        else:
            tmpStr = "매우나쁨"
    return value + "(" + tmpStr + ")"

def getSO2Show(value):
    tmpStr = ""
    if ("-" == value):
        return "측정값 없음"
    else:
        tmpValue = float(value)
        if(0 <= tmpValue <= 0.02):
            tmpStr = "좋음"
        elif(0.02 < tmpValue <= 0.05):
            tmpStr = "보통"
        elif(0.05 < tmpValue <= 0.15):
            tmpStr = "나쁨"
        else:
            tmpStr = "매우나쁨"       
    return value + "(" + tmpStr + ")"