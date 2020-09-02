//根据ip获取当前城市名称
function getCity() {
    var myCity = new BMap.LocalCity();
    myCity.get(function (data) {
        $("#Mcity").remove();
        $(".navbar-header").prepend("<span class='navbar-brand' id='Mcity'>" + data['name'] + "</span>");
    });
    // getPositon.city = $("#Mcity").html();
}
// console.log(window.city);
// console.log(my_ci);
function IndexCity(Oid) {
    function G(id) {
        return document.getElementById(id);
    }
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {
            "input": Oid
        });
}
//点击选择输入城市
function in_city(city) {
    function G(id) {
        return document.getElementById(id);
    }
    var map = new BMap.Map("l-map");
    map.centerAndZoom("山东建筑大学", 12);                   // 初始化地图,设置城市和地图级别。

    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {
            "input": "suggestId"
            , "location": map
        });
    var myValue;
    ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
        _value = e.item.value;
        myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
        G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
        setPlace();
    });
    function setPlace() {
        map.clearOverlays();    //清除地图上所有覆盖物
        function myFun() {
            var pp = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
            map.centerAndZoom(pp, 18);
            map.addOverlay(new BMap.Marker(pp));    //添加标注
        }
        var local = new BMap.LocalSearch(map, { //智能搜索
            onSearchComplete: myFun
        });
        local.search(myValue);
        // console.log(myValue);
    }
}
//获取兼职信息
var works_u;
function getWork() {
    var works_u;
    $.ajax({
        url: "/Shared/Work_all",
        type: 'GET',
        async: false,
        success: function (res) {
            works_u = res;
        }
    })
    return works_u;
}
works_u = eval('(' + getWork() + ')');
var works_u1 = time_r(works_u.slice());
// 点击登陆注册
function sub() {
    $("#Msubmit").on("click", function () {
        $(".model_all").show();
        $(".model_border").show();
    })
    $(".model_close1").on("click", function () {
        $(".model_all").hide();
        $(".model_border").hide();
        $(".reg_tishi").remove();
        $(".us_tishi").remove();
        $("#us").val("");
        $("#pw").val("");
    })
    $("#reg").on("click", function () {
        $(".reg_tishi").remove();
        $(".us_tishi").remove();
        $(".model_border2").show();
    })
    $(".model_close2").on("click", function () {
        $(".model_border2").hide();
        $(".reg_tishi").remove();
        $(".us_tishi").remove();
        $(".model_reg").find("input").val("");
    })
}
//按距离进行排序
function dis_r(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
            if (arr[j]['dis'] > arr[j + 1]['dis']) {
                var b = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = b;
            }
        }
    }
    return arr;
}
//按时间进行排序
function time_r(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - i - 1; j++) {
            var time = arr[j]['work_start'].split(" ");
            var time1 = arr[j + 1]['work_start'].split(" ");
            if (Date.parse(time[0]) > Date.parse(time1[0])) {
                var b = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = b;
            }
        }
    }
    return arr;
}
//兼职信息按顺序排序
function order() {
    $("#order_time").on("click", function () {
        $(".dropdown-menu").find(".sel-item").attr("class", "sel-item");
        $(".cha_order").html($(this).html());
        $(".sel-r").find(".row").remove();
        $("#dropdownMenu2").attr("data-time", false);
        $(".work_ty").attr("data-title", false);
        $(".cha_day").text("按工作天数查找");
        $(".work_ty").find("li").attr("class", "sel_items");
        $(".work_ty").find("li").css("color", "#000");
        $("#sel_all").css("color", "red");
        works(time_r(works_u1))
    })
    $("#order_dis").on("click", function () {
        $(".dropdown-menu").find(".sel-item").attr("class", "sel-item");
        $(".cha_order").html($(this).html());
        $(".sel-r").find(".row").remove();
        $("#dropdownMenu2").attr("data-time", false);
        $(".work_ty").attr("data-title", false);
        $(".cha_day").text("按工作天数查找");
        $(".work_ty").find("li").attr("class", "sel_items");
        $(".work_ty").find("li").css("color", "#000");
        $("#sel_all").css("color", "red");
        $(".cha_order").html($(this).html());
        $(".sel-r").find(".row").remove();
        works(dis_r(works_u1))
    })
}
//兼职信息
function works(arr) {
    arr.forEach(function (value, index, array) {
        $(".sel-r").append("<div class='row'><div class='work_items'><a href='#' class='disabled thumbnail'><h4 class='work_title'>" + array[index]['title'] + "</h4><h5 class='work_money'>" + array[index]['money'] + "</h5><h5 class='work_place'>" + array[index]['place'] + "</h5><h5 class='work_start'>" + array[index]['work_start'] + "</h5><h5 class='work_time'>需连续工作" + array[index]['time'] + "天</h5><h6 class='work_dis'>距离你约" + array[index]['dis'] + "km</h6><button type='button' class='btn btn-info' data-toggle='modal' data-target='#myModel" + index + "'>申请</button></a></div></div>")
    })
}
//兼职详细信息
function works_dat(arr) {
    arr.forEach(function (value, index, array) {
        var a = $("#myModel").clone();
        a.attr("fl", "jian");
        a.attr("id", "myModel" + index);       
        a.find(".work_id").html(array[index]['work_id']).hide();
        a.find("#gridSystemModalLabel").html(array[index]['title']);
        a.find("#mo_place").html(array[index]['place']);
        a.find("#mo_money").html(array[index]['money']);
        a.find("#mo_time").html(array[index]['work_start']);
        a.find(".mo_ask_time").html("需要连续工作" + array[index]['time'] + "天 ");
        a.find(".mo_ask_a").html(array[index]['ask']);
        a.find(".mo_dis").html("距离你约" + array[index]['dis'] + "km");
        a.find(".mo_tel").html(array[index]['tel']);
        a.find(".peo_cou").html(array[index]['peo_cou'] + " 人");
        a.find(".peoed").html(array[index]['peoed'] + " 人");
        a.find(".apply").attr("data", array[index]['work_id']).attr("target", "#myModel" + index);
        $("#jianzhi").append(a);
    });
}
//当前标题栏被选中时
function sent_title() {
    if ($(".work_ty").attr("data-title") && $(".work_ty").attr("data-title") != "false") {
        var arr = Array();
        var a = $(".work_seled").html();
        if (a != "家教" && a != "传单派发" && a != "钟点工" && a != "校园代理" && a != "保安" && a != "保安" && a != "问卷调查" && a != "市场销售" && a != "服务员" && a != "观众充场" && a != "话务员" && a != "礼仪模特" && a != "快递分拣") {
            sent_time().forEach(function (value, index, array) {
                if (value['title'] != "家教" && value['title'] != "传单派发" && value['title'] != "钟点工" && value['title'] != "校园代理" && value['title'] != "保安" && value['title'] != "保安" && value['title'] != "问卷调查" && value['title'] != "市场销售" && value['title'] != "服务员" && value['title'] != "观众充场" && value['title'] != "话务员" && value['title'] != "礼仪模特" && value['title'] != "快递分拣") {
                    arr.push(value);
                }
            })
            //console.log(1)
            return arr;
        } else {
            works_u1.forEach(function (value, index, array) {
                if (value['title'] == a) {
                    arr.push(value);
                }
            })
           // console.log(2);
            return arr;
        }
    } else {
        //console.log(3);
        return works_u1;
    }
}
//当前时间栏被选中时
function sent_time() {
    var arr = Array();
    if ($("#dropdownMenu2").attr("data-time")) {
        // console.log($(".sel_timed").html());
        switch ($(".sel_timed").html()) {
            case "1 天":
                works_u1.forEach(function (value, index, array) {
                    if (value['time'] == 1) {
                        arr.push(value);
                    }
                })
                // console.log(arr);
                break;
            case "一周以内":
                works_u1.forEach(function (value, index, array) {
                    if (value['time'] <= 7) {
                        arr.push(value);
                    }

                })
                break;
            case "一个月以内":
                works_u1.forEach(function (value, index, array) {
                    if (value['time'] <= 30) {
                        arr.push(value);
                    }
                })
                break;
            case "长 期":
                works_u1.forEach(function (value, index, array) {
                    if (value['time'] > 30) {
                        arr.push(value);
                    }
                })
                break;
            default:
                arr = works_u1.slice();
                break;
        }
        return arr;
    } else {
        return works_u1;
    }
}
// 根据时间分类
function sel_time() {
    $("#sel_aal").on('click', function () {
        $(".dropdown-menu").find(".sel-item").attr("class", "sel-item");
        $(this).attr("class", "sel-item sel_timed");
        $("#dropdownMenu2").attr("data-time", false);
        $(".cha_day").text($(this).html());
        $(".sel-r").find(".row").remove();
        works(sent_title());
    })
    $("#sel_one").on('click', function () {
        $(".dropdown-menu").find(".sel-item").attr("class", "sel-item");
        $(this).attr("class", "sel-item sel_timed");
        $("#dropdownMenu2").attr("data-time", true);
        $(".cha_day").text($(this).html());
        $(".sel-r").find(".row").remove();
        var arr = Array();
        sent_title().forEach(function (value, index, array) {
            if (value['time'] == 1) {
                arr.push(value);
            }
        })
        works(arr);
    })
    $("#sel_two").on('click', function () {
        $(".dropdown-menu").find(".sel-item").attr("class", "sel-item");
        $(this).attr("class", "sel-item sel_timed");
        $("#dropdownMenu2").attr("data-time", true);
        $(".cha_day").text($(this).html());
        $(".sel-r").find(".row").remove();
        var arr = Array();
        sent_title().forEach(function (value, index, array) {
            if (value['time'] <= 7) {
                arr.push(value);
            }
        })
        works(arr);
    })
    $("#sel_three").on('click', function () {
        $(".dropdown-menu").find(".sel-item").attr("class", "sel-item");
        $(this).attr("class", "sel-item sel_timed");
        $("#dropdownMenu2").attr("data-time", true);
        $(".cha_day").text($(this).html());
        $(".sel-r").find(".row").remove();
        var arr = Array();
        sent_title().forEach(function (value, index, array) {
            if (value['time'] <= 30) {
                arr.push(value);
            }
        })
        works(arr);
    })
    $("#sel_four").on('click', function () {
        $(".dropdown-menu").find(".sel-item").attr("class", "sel-item");
        $(this).attr("class", "sel-item sel_timed");
        $("#dropdownMenu2").attr("data-time", true);
        $(".cha_day").text($(this).html());
        $(".sel-r").find(".row").remove();
        var arr = Array();
        sent_title().forEach(function (value, index, array) {
            if (value['time'] > 30) {
                arr.push(value);
            }
        })
        works(arr);
    })
}
//根据标题分类
function sel_ti() {
    $(".work_ty").find("li").on("click", function () {       
        $(".work_ty").find("li").attr("class", "sel_items");
        $(this).attr("class", "sel_items work_seled");
        $(".sel-r").find(".row").remove();
        $(".work_ty").find("li").css("color", "#000");
        $(this).css("color", "red");
        var a = $(this).html();
        var arr = Array();
        if (a == "全部") {
            $(".work_ty").attr("data-title", false);
            works(sent_time());
        } else if (a != "家教" && a != "传单派发" && a != "钟点工" && a != "校园代理" && a != "保安" && a != "保安" && a != "问卷调查" && a != "市场销售" && a != "服务员" && a != "观众充场" && a != "话务员" && a != "礼仪模特" && a != "快递分拣") {
            $(".work_ty").attr("data-title", true);
            sent_time().forEach(function (value, index, array) {
                if (value['title'] != "家教" && value['title'] != "传单派发" && value['title'] != "钟点工" && value['title'] != "校园代理" && value['title'] != "保安" && value['title'] != "保安" && value['title'] != "问卷调查" && value['title'] != "市场销售" && value['title'] != "服务员" && value['title'] != "观众充场" && value['title'] != "话务员" && value['title'] != "礼仪模特" && value['title'] != "快递分拣") {
                    arr.push(value);
                }
            })
            works(arr);
        } else {
            $(".work_ty").attr("data-title", true);
            sent_time().forEach(function (value, index, array) {
                if (value['title'] == a) {
                    arr.push(value);
                }
            })
            works(arr);
        }
    })
}
//发布兼职改变z-index
function jianZ() {
    $(".wrapper").css("z-index", "-1");
    $(".model_all").css("z-index", "0");
    $(".model_issua").css("z-index", "0");
    $(".row").css("z-index", "-1");
}
function addjianZ() {
    $(".wrapper").css("z-index", "0");
    $(".model_all").css("z-index", "999");
    $(".model_issua").css("z-index", "1000");
    $(".row").css("z-index", "0");
}
//发布兼职
function work_sent() {
    $("#outJ").on("click", function () {
        if ($("#user").length > 0) {
            $(".model_all").show();
            $(".model_issua").show();
            jianZ();
        } else {
            $("#tishi").unbind("click");
            $(".model_all").show();
            $(".model_border").show();
        }
    })
    $(".model_close3").on("click", function () {
        $(".model_issua").find("input").val("");
        $(".title_sel_s").html("工作标题");
        $("#work_title_in").remove();
        $(".monty_sel").html("按条件输入");
        $(".work_mon_wra").find("span").html("");
        $(".model_issua").find("textarea").val("");
        $(".model_all").hide();
        $(".model_issua").hide();
        addjianZ();
    })
    $(".model_issua").find(".work_title").find("li").on("click", function () {
        $(".model_issua").find(".work_title").find(".title_sel_s").html($(this).html())
        if ($(this).html() == "其他") {
            if ($("#work_title_in").length == 0) {
                $(".model_issua").find(".work_title").append("<input style='margin-left: 150px; width: 160px; height:33px;' type='text' id='work_title_in' name='work_title_in'>")
            } else {
                $("#work_title_in").show();
            }

        } else {
            $("#work_title_in").hide();
        }
    })
    $(".model_issua").find(".work_money_r").find("li").on("click", function () {
        var a = $(this).html().split("(")[1].split(")")[0];
        $(".model_issua").find(".work_money_r").find(".monty_sel").html($(this).html());
        $(".model_issua").find(".work_money_r").find("div").find("span").html(a);
    })
}
//登录验证
function submit() {
    $("#submit").on("click", function () {
        $(".us_tishi").remove();
        if (!$("#us").val() || !$("#pw").val()) {
            $(".us_wra").before("<h5 class='us_tishi' style='color: red; position: absolute; left: 120px; top: 50px;'>用户名和密码不能为空</h5>");
        } else {
            $.ajax({
                url: "/Shared/AdminUser",
                type: 'POST',
                data: $("#submit_fo").serialize(),
                success: function (res) {
                    if (res) {
                        var arr = res.split(",");
                        $("#Msubmit").hide();
                        $(".model_border").hide();
                        $(".model_all").hide();
                        $(".percenter_wra").append("<a href='#' id='user' data-toggle='modal' data-target='#myModal' style='padding:15px 5px;display:inline-block'>用户名:" + arr[0] + "</a><span style='color:red;cursor:pointer' class='zhuxiao'>[注销]</span>");
                        $(".zhuxiao").on("click", function () {
                            $("#user").remove();
                            $("#Msubmit").show();
                            $(this).remove();
                        })
                    } else {
                        $(".us_wra").before("<h5 class='us_tishi' style='color: red; position: absolute; left: 120px; top: 50px;'>用户名或密码错误</h5>");
                    }
                },
            })
        }

    })
}
//注册账号
function reg() {
    $("#reg_submit").on("click", function () {
        $(".reg_tishi").remove();
        if (!$("#in_us").val() || !$("#in_pw").val() || !$("#in_pw2").val() || !$("#tel_reg").val()) {
            $(".us_wra").before("<h5 class='reg_tishi' style='color: red; position: absolute; left: 120px; top: 50px;'>所有项都不能为空</h5>");
        } else {
            if ($("#in_pw").val() != $("#in_pw2").val()) {
                $(".us_wra").before("<h5 class='reg_tishi' style='color: red; position: absolute; left: 120px; top: 50px;'>两次密码不一致</h5>");
            } else {
                $.ajax({
                    url: "/Shared/RegUser",
                    type: 'POST',
                    data: $(".reg_sub").serialize(),
                    success: function (res) {
                        if (res != 0) {
                            $.ajax({
                                url: "/Shared/AdminUser",
                                type: 'POST',
                                data: {
                                    "us": $("#in_us").val(),
                                    "pw": $("#in_pw").val()
                                },
                                success: function (res) {                                   
                                    if (res) {
                                        var arr = res.split(",");
                                        $(".model_border2").find("input").val("");
                                        $("#Msubmit").hide();
                                        $(".model_border").hide();
                                        $(".model_all").hide();                                      
                                        $(".model_border2").hide();                                       
                                        $(".percenter_wra").append("<a href='#' id='user' data-toggle='modal' data-target='#myModal' style='padding:15px 5px;display:inline-block'>用户名:" + arr[0] + "</a><span style='color:red;cursor:pointer' class='zhuxiao'>[注销]</span>");
                                        $(".zhuxiao").on("click", function () {
                                            $("#user").remove();
                                            $("#Msubmit").show();
                                            $(this).remove();
                                        })
                                        var array;
                                        var username;
                                        var password;
                                        myCookie.getCookie("user", function (data) {
                                            if (data) {
                                                array = data.split(" ");
                                                username = array[0];
                                                password = array[1];
                                                $("#us").val(username);
                                                $("#pw").val(password);
                                            }
                                        })
                                    }
                                },
                            })
                        } else {
                            $(".us_wra").before("<h5 class='reg_tishi' style='color: red; position: absolute; left: 120px; top: 50px;'>用户名已被注册,请重新输入</h5>");
                        }
                    },
                })
            }
        }
    })
}
    //自动登录
    function auto_submit() {
        var arr;
        var username;
        var password;
        myCookie.getCookie("user", function (data) {
            if (data) {
                arr = data.split(" ");
                username = arr[0];
                password = arr[1];
                $("#us").val(username);
                $("#pw").val(password);
            }
        })
        $.ajax({
            url: "/Shared/AdminUser",
            type: 'POST',
            data: {
                "us": username,
                "pw": password
            },
            success: function (res) {
                if (res) {
                    var arr = res.split(",");
                    $("#Msubmit").hide();
                    $(".model_border").hide();
                    $(".model_all").hide();
                    $(".percenter_wra").append("<a href='#' id='user' data-toggle='modal' data-target='#myModal' style='padding:15px 5px;display:inline-block'>用户名:" + arr[0] + "</a><span style='color:red;cursor:pointer' class='zhuxiao'>[注销]</span>");
                    $(".zhuxiao").on("click", function () {
                        $("#user").remove();
                        $("#Msubmit").show();
                        $(this).remove();
                    })
                }
            },
        })
    }

    //设置时间
    function star_time_set() {
        $("#st_time").bind('click', function (event) { timePacker($(this), event) });
        $("#ed_time").bind('click', function (event) { timePacker($(this), event) });
    }
//发布兼职
    function sent_work() {     
        $("#tijiao").on("click", function () {
                var work_title;
                if ($(".title_sel_s").html() != "其他") {
                    work_title = $(".title_sel_s").html();
                } else {
                    work_title = $("#work_title_in").val();
                }
                var work_uname = $("#user").html().split(":")[1];
                var work_place = $("#work_p").val();
                var work_startTime = $("#startTime").val();
                var work_stTime = $("#st_time").val();
                var work_edTime = $("#ed_time").val();
                var work_money = $(".work_money_s").val() + $(".work_mon_wra").find("span").html();
                var work_peo = $("#work_peo").val();
                var work_peoed = 0;
                var work_day = $(".work_day_r").find("input").val();
                var work_ask = $("#work_asks").val();
                var work_tel = $(".work_tel_r").find("input").val();
                $.ajax({
                    url: "/Shared/Work_sent",
                    type: 'POST',
                    data: {
                        "work_uname": work_uname,
                        "work_title": work_title,
                        "work_place": work_place,
                        "work_startTime": work_startTime,
                        "work_stTime": work_stTime,
                        "work_edTime": work_edTime,
                        "work_money": work_money,
                        "work_peo": work_peo,
                        "work_peoed": work_peoed,
                        "work_day": work_day,
                        "work_ask": work_ask,
                        "work_tel": work_tel
                    },
                    success: function (res) {
                        if (res) {
                            alert("发布成功");                         
                            $(".model_issua").find("input").val("");
                            $(".title_sel_s").html("工作标题");
                            $("#work_title_in").remove();
                            $(".monty_sel").html("按条件输入");
                            $(".work_mon_wra").find("span").html("");
                            $(".model_issua").find("textarea").val("");
                            $(".model_close3").css("cursor", "pointer");                           
                            chu();
                            jianZ();
                        } else {
                            alert("发布失败");
                        }
                    },
                })
        })
    }
//申请兼职
    function apply() {
        $(".apply").on("click", function () {
            var a = $(this);
            var work_uname = $("#user").html().split(":")[1];
            $.ajax({
                url: "/Shared/Apply",
                type: 'POST',
                data: {
                    "work_id": a.attr("data"),
                    "us": work_uname
                },
                success: function (res) {
                    if (res != 0) {                       
                        alert("兼职申请成功");
                        var cl = a.attr("target");
                        $(cl).attr("class", "modal fade").hide();
                        $(".modal-backdrop").remove();
                        chu();                    
                    } else {
                        alert("兼职申请失败");
                    }
                }
            })
        })
    }
        //初始化筛选
        function shuaxin() {
            $("#dropdownMenu3").on('click', function () {
                $(this).css("background", "#fff");
                chu();
            })
        }
        //  所有功能初始化
        function chu() {
            $(".dropdown-menu").find(".sel-item").attr("class", "sel-item");
            $(".sel-r").find(".row").remove();
            $("#dropdownMenu2").attr("data-time", false);
            $(".work_ty").attr("data-title", false);
            $(".cha_day").text("按工作天数查找");
            $(".work_ty").find("li").attr("class", "sel_items");
            $(".work_ty").find("li").css("color", "#000");
            $("#sel_all").css("color", "red");
            $(".cha_order").html("开始时间(早-晚)");
            $(".sel-r").find(".row").remove();
            $("#jianzhi").find("div[fl = 'jian']").remove();
            works_u = eval('(' + getWork() + ')');
            works_u1 = time_r(works_u.slice());
            works(dis_r(works_u1)); //填写兼职内容
            works_dat(works_u1); //填写兼职详细内容
            apply();
        }
//获取距离 
        var pl_lng;
        var pl_lat;
        var p2_lat;
        var p2_lng;
        function showLocation(data) {
            pl_lat = data['result']['location']['lat'];
            pl_lng = data['result']['location']['lng'];
        }

        function showLocation2(data) {
           p2_lat = data['result']['location']['lat'];
           p2_lng = data['result']['location']['lng'];
        }
        function showPosition() {

            var radLat1 = rad(pl_lat);
            var radLat2 = rad(p2_lat);
            var a = radLat1 - radLat2;
            var b = rad(pl_lng) - rad(p2_lng);
            var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
            s = s * 6378.137;
            s = Math.round(s * 10000) / 10000;
            return s;
        }


        function rad(d) {
            return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
        }
        function getDis() {
            $("#suggestId_tr").on("click", function () {
                var place1 = $("#suggestId").val();
                var js = document.createElement("script");
                var body = document.getElementsByTagName("body")[0];
                js.src = 'http://api.map.baidu.com/geocoding/v3/?address=' + place1 + '&output=json&ak=LBsbzwpZIV3vEh8Zgtan5M0HSZj7tCcz&callback=showLocation';
                body.appendChild(js);
                js.onload = function () {
                    works_u1.forEach(function (value, index, array) {
                        var place = value['place'];
                        var js1 = document.createElement("script");
                        var body = document.getElementsByTagName("body")[0];
                        js1.src = 'http://api.map.baidu.com/geocoding/v3/?address=' + place + '&output=json&ak=LBsbzwpZIV3vEh8Zgtan5M0HSZj7tCcz&callback=showLocation2';
                        body.appendChild(js1);
                        js1.onload = function () {
                            value['dis'] = showPosition();
                            $(".dropdown-menu").find(".sel-item").attr("class", "sel-item");
                            $(".sel-r").find(".row").remove();
                            $("#dropdownMenu2").attr("data-time", false);
                            $(".work_ty").attr("data-title", false);
                            $(".cha_day").text("按工作天数查找");
                            $(".work_ty").find("li").attr("class", "sel_items");
                            $(".work_ty").find("li").css("color", "#000");
                            $("#sel_all").css("color", "red");
                            $(".sel-r").find(".row").remove();
                            $("#jianzhi").find("div[fl = 'jian']").remove();
                            $(".cha_order").html("距离顺序(近-远)");
                            works(dis_r(works_u1)); //填写兼职内容
                            works_dat(works_u1);
                            apply();
                        }
                    })
                }

            })
        }


        var door = {
            init: function () {
                getCity(); //获取当前位置城市
                in_city(); //输入当前位置的城市
                //getWork();
                sub();  //登录注册
                works(dis_r(works_u1)); //填写兼职内容
                works_dat(works_u1); //填写兼职详细内容
                order();  //按顺序对内容进行排序
                sel_time(); //根据时间筛选
                sel_ti();  //根据标题筛选
                submit(); //登录验证
                shuaxin(); //刷新列表
                star_time_set(); //选择工作时间
                work_sent();  //发布兼职
                auto_submit();  //获取密码
                reg();  //注册账号
                sent_work(); //发布兼职             
                IndexCity("work_p");
                getDis(); //获取经纬度
                apply();
                // cli_dis();
                // window.in_city();
            }
        }
        door.init();

        // getCity();
        // in_city();

