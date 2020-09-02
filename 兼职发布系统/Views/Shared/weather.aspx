<%@ Page Language="C#" Inherits="System.Web.Mvc.ViewPage<dynamic>" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>获取天气状况</title>
    <style>
        *{
            margin:0;
            padding: 0;
            list-style: none;
        }
        html{
            width: 100%;
            height: 100%;
            background: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592476406744&di=69d7e242d077c1707513ca9dbe003394&imgtype=0&src=http%3A%2F%2Fpic25.nipic.com%2F20121116%2F9252150_144336550000_2.jpg);
            background-size: 100% 100%;
            background-repeat: no-repeat
        }
        .wrapper{
            /* height: 100%; */
            width: 80%;
            /* border: 1px solid #000; */
            margin: 50px auto;
        }
        .wrapper .nav{
            width: 80%;
            /* border: 1px solid #000; */
            margin: 50px auto 0;
            position: relative;
        }
        .wrapper .title{
            position: relative;
            width: 200px;
            font-size: 40px;
            font-weight: bold;
            display: block;
            color: #f40;
            opacity: 0.7;
            top: 0;
            left: 50%;
            margin-left: -100px
        }
        .wrapper .nav .se{
            width: 390px;
            position: relative;
            left: 50%;
            margin-top: 50px;
            margin-left: -195px;
            /* border: 1px solid #000 */
        }
        .wrapper input{
            display: inline-block;
            padding-left: 10px;
            outline: none;
            width: 300px;
            height: 30px;
            border: 2px solid 000;
            border-radius: 10px 0 0 10px;
            vertical-align: bottom;
        }
        .wrapper .search{
            display: inline-block;
            height: 32px;
            width: 60px;
            text-align: center;
            line-height: 30px;
            font-size: 20px;
            color: #fff;
            background: #f40;
            padding: 1px 8px;
            border-radius: 0 10px 10px 0;
            vertical-align: bottom;
            cursor: pointer;
        }
        .wrapper .op{
            position: absolute;
            width: 312px;
            border: 1px solid #999;
            display: none;
            left: 50%;
            margin-left: -194px
        }
        .wrapper .op li{
            padding: 5px 10px;
            cursor: pointer;
        }
        .wrapper .op li:hover{
            background-color: #ccc
        }
        .wrapper .weaCon{
            margin-top: 30px;
            /* border: 1px solid #ccc; */
        }
        .weaCon .da{
            background: rgba(9, 24, 240, 0.1);
            border-radius: 10px;
            opacity: 1;
            z-index: 10;
        }
        .weaCon .da li{
            height: 40px;
            padding: 5px 10px;
            color: rgb(248, 247, 245);
            font-size: 18px
        }
        .da li span{
            font-size: 20px;
        }
    </style>
</head>

<body>
    <div class="wrapper">
        <div class="nav">
            <span class="title">查询天气</span>
            <div class="se">
                <input type="text" placeholder="请输入城市编号"><span class="search">查询</span>
                <ul class="op"></ul>
            </div>
        </div>
        <div class="weaCon">
            <ul class="da"></ul>
        </div>


    </div>
    <script src="/Scripts/xiaohongxin.js"></script>
    <script src="/Scripts/myCookie.js"></script>
    <script>
        var oCity = ["北京 : 101010100", "天津 : 101030100", "济南 : 101120101", "德州 : 101120401", "哈尔滨 : 101050101"];
        var oUl = document.getElementsByClassName('op')[0];
        var oInput = document.getElementsByTagName('input')[0];
        var oLi = oUl.children;
        var sear = document.getElementsByClassName('search')[0];
        var da = document.getElementsByClassName('da')[0];
        myCookie.getCookie('CCCC', function (data) {
            if (data != undefined) {
                oInput.value = data;
            }
        })
        sear.onclick = function () {
            var oScript = document.createElement('script');
            oScript.src = 'http://api.k780.com:88/?app=weather.today&weaid=' + oInput.value.trim() + '&&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json&jsoncallback=data';
            document.body.appendChild(oScript);
            document.body.removeChild(oScript);
            console.log(oInput.value);
            myCookie.setCookie('USERNAME', oInput.value, '10000', '/');
            // document.body.removeChild('oScript');
        }
        function data(a) {
            var str = '';
            var obj = a['result'];
            str += '<li><span>城市：' + obj.citynm + '</span></li>';
            str += '<li><span>日期：' + obj.week + '</span></li>';
            str += '<li><span>天气：<img src=' + obj.weather_icon + '></img>' + obj.weather + '</span></li>';
            str += '<li><span>温度：' + obj.temperature + '</span></li>';
            str += '<li><span>风向：' + obj.wind + '</span></li>';
            str += '<li><span>风速：' + obj.winp + '</span></li>'
            da.innerHTML = str;
        }
        oInput.onfocus = function (e) {
            addCity();
            oUl.style.display = 'block';
            for (var prop in oLi) {
                (function (prop) {
                    oLi[prop].onclick = function () {
                        var n = oLi[prop].innerText.split(":");
                        oInput.value = n[1];
                        oUl.style.display = 'none';
                    }
                }(prop))
            }
        }
        oInput.onclick = function (e) {
            stopBubble(e);
        }
        document.onclick = function () {
            oUl.style.display = 'none';
        }
        function addCity() {
            var str = '';
            oCity.forEach(function (ele, index) {
                str += '<li>' + ele + '</li>';
            })
            oUl.innerHTML = str;
        }
        function stopBubble(event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        }
    </script>
</body>
<!-- http://t.weather.sojson.com/api/weather/city/101030100 -->
<!-- http://api.k780.com:88/?app=weather.today&weaid=412&&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json&jsoncallback=data -->

</html>
