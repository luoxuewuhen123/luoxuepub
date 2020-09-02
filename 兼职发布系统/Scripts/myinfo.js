//根据ip获取当前城市名称
function getCity() {
    var myCity = new BMap.LocalCity();
    myCity.get(function (data) {
        $("#Mcity").remove();
        $(".navbar-header").prepend("<span class='navbar-brand' id='Mcity'>" + data['name'] + "</span>");
    });
    // getPositon.city = $("#Mcity").html();
}
function IndexCity(Oid) {
    function G(id) {
        return document.getElementById(id);
    }
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {
            "input": Oid
        });
}
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
function work_sent() {
    $("#outJ").on("click", function () {
        $("#tijiaoup").attr("id", "tijiao").html("提交");
        $("#tijiaoup").unbind();
        $("#tijiao").unbind();
        sent_work();
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
        addjianZ()
    })
    $(".model_issua").find(".work_title").find("li").on("click", function () {
        $(".model_issua").find(".work_title").find(".title_sel_s").html($(this).html())
        if ($(this).html() == "其他") {
            if ($("#work_title_in").length == 0) {
                $(".model_issua").find(".work_title").append("<input style='width: 160px; height:33px;' type='text' id='work_title_in' name='work_title_in'>")
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
                    chu();
                    reg_works();
                    jianZ()
                } else {
                    alert("发布失败");
                }
            },
        })
    })
}
function star_time_set() {
    $("#st_time").bind('click', function (event) { timePacker($(this), event) });
    $("#ed_time").bind('click', function (event) { timePacker($(this), event) });
}
//获取发布过的兼职
function reg_works() {
    var work_uname = $("#user").html().split(":")[1];
    $.ajax({
        url: "/Shared/Reg_works",
        type: 'POST',
        data:  {
          "work_uname" : work_uname  
        },
        success: function (res) {
            $(".wo_appy").remove();
            var arr = eval('(' + res + ')');         
            arr.forEach(function (value, index, array) {
                var a = $("#wo_copy").clone();
                a.attr("id", "");
                a.show();
                a.attr("class", "wo_co_r wo_appy");
                a.find(".update").attr("Wid", value['work_id']).attr("target", "#collapseExample" + index);
                a.find(".delete").attr("Wid", value['work_id']);
                a.find(".fanhui").attr("Wid", value['work_id']);
                a.find(".apply_bu").remove();
                a.find(".work_show").attr("data-target", "#collapseExample" + index);              
                a.find(".work_titleS").html(value['title']);
                a.find(".work_placeS").html(array[index]['place']);
                a.find(".work_startTimeS").html(value['work_start']);
                a.find(".work_peoS").html(value['peoed'] + "/" + value['peo_cou']);
                a.find("#collapseExample").attr("id", "collapseExample"+ index);
                a.find("#mo_title").html(value['title']);
                a.find("#mo_place").html(array[index]['place']);
                a.find("#mo_money").html(array[index]['money']);
                a.find("#mo_time").html(array[index]['work_start']);
                a.find(".mo_ask_time").html("需要连续工作" + array[index]['time'] + "天 ");
                a.find(".mo_ask_a").html(array[index]['ask']);
                a.find(".mo_dis").html("距离你约" + array[index]['dis'] + "km");
                a.find(".mo_tel").html(array[index]['tel']);
                a.find(".peo_cou").html(array[index]['peo_cou'] + " 人");
                a.find(".peoed").html(array[index]['peoed'] + " 人");
                $(".content_workS").append(a);
            });
            updese()
        },
    })
}

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
}

function sent_works() {
    var work_uname = $("#user").html().split(":")[1];
    $.ajax({
        url: "/Shared/Sent_works",
        type: 'POST',
        data: {
            "work_uname": work_uname
        },
        success: function (res) {
            $(".wo_appy").remove();
            var arr = eval('(' + res + ')');
            arr.forEach(function (value, index, array) {
                var a = $("#wo_copy").clone();           
                a.attr("id", "");
                a.show();
                a.attr("class", "wo_co_r wo_appy");
                a.find(".update").attr("Wid", value['work_id']);
                a.find(".delete").attr("Wid", value['work_id']);
                a.find(".fanhui").attr("Wid", value['work_id']);
                a.find(".sent_bu").remove();
                a.find(".work_show").attr("data-target", "#collapseExample" + index);
                a.find(".work_titleS").html(value['title']);
                a.find(".work_placeS").html(array[index]['place']);
                a.find(".work_startTimeS").html(value['work_start']);
                a.find(".work_peoS").html(value['peoed'] + "/" + value['peo_cou']);
                a.find("#collapseExample").attr("id", "collapseExample" + index);
                a.find("#mo_title").html(value['title']);
                a.find("#mo_place").html(array[index]['place']);
                a.find("#mo_money").html(array[index]['money']);
                a.find("#mo_time").html(array[index]['work_start']);
                a.find(".mo_ask_time").html("需要连续工作" + array[index]['time'] + "天 ");
                a.find(".mo_ask_a").html(array[index]['ask']);
                a.find(".mo_dis").html("距离你约" + array[index]['dis'] + "km");
                a.find(".mo_tel").html(array[index]['tel']);
                a.find(".peo_cou").html(array[index]['peo_cou'] + " 人");
                a.find(".peoed").html(array[index]['peoed'] + " 人");
                $(".content_workS").append(a);
            });
            updese()
        },
        
    })
}
function onbu() {
    $(".work_myapply").on('click', function () {
        $(".content_work").find("li").css("background", "#fff");
        $(this).css("background", "#f5f5f5");
        if ($("#user").length > 0) {
            sent_works();         
        } else {
            $(".model_all").show();
            $(".model_border").show();
        }
        
    })
    $(".work_mysent").on('click', function () {
        $(".content_work").find("li").css("background", "#fff");
        $(this).css("background", "#f5f5f5");
        if ($("#user").length > 0) {
            reg_works();
        } else {
            $(".model_all").show();
            $(".model_border").show();
        }
        
    })
}
function updese() {
    $(".update").on('click', function () {
        $("#tijiaoup").unbind();
        $("#tijiao").unbind();
        $("#tijiao").attr("id", "tijiaoup");
        $(".model_all").show();
        $(".model_issua").show();
        var sid = $(this).attr("target");
        $(".title_sel_s").html($(sid).find("#mo_title").html());
        $("#work_p").val($(sid).find("#mo_place").html());
        $("#startTime").val($(sid).find("#mo_time").html().split(" ")[0]);
        $("#st_time").val($(sid).find("#mo_time").html().split(" ")[1].split("-")[0]);
        $("#ed_time").val($(sid).find("#mo_time").html().split(" ")[1].split("-")[1]);
        $(".work_money_s").val($(sid).find("#mo_money").html().split("元")[0]);
        $(".work_day_r").find("input").val($(sid).find(".mo_ask_time").html().split("作")[1].split("天")[0]);
        $("#work_peo").val($(sid).find(".peo_cou").html().split("人")[0]);
        $("#work_asks").val($(sid).find(".mo_ask_a").html());
        $(".work_tel_r").find("input").val($(sid).find(".mo_tel").html());
        $("#tijiaoup").html("确定修改");
        var work_id = $(this).attr("wid");
        $("#tijiaoup").on("click", function () {
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
            var work_peoed = $(sid).find(".peoed").html().split("人")[0];
            var work_day = $(".work_day_r").find("input").val();
            var work_ask = $("#work_asks").val();
            var work_tel = $(".work_tel_r").find("input").val();
            $.ajax({
                url: "/Shared/updateWork",
                type: 'POST',
                data: {
                    "work_id" : work_id,
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
                        alert("修改成功");
                        $(".model_issua").find("input").val("");
                        $(".title_sel_s").html("工作标题");
                        $("#work_title_in").remove();
                        $(".monty_sel").html("按条件输入");
                        $(".work_mon_wra").find("span").html("");
                        $(".model_issua").find("textarea").val("");
                        $(".model_close3").css("cursor", "pointer")
                        chu();
                        $(".model_all").hide();
                        $(".model_issua").hide();
                        reg_works();
                    } else {
                        alert("修改失败");
                    }
                }
            })
        })
    })
    $(".fanhui").on('click', function () {
        var work_id = $(this).attr("wid");
        var work_uname = $("#user").html().split(":")[1];
        $.ajax({
            url: "/Shared/fanhui_works",
            type: 'POST',
            data: {
                "work_id": work_id,
                "work_uname": work_uname
            },
            success: function (res) {
                if (res != 0) {
                    alert('退选成功');
                    sent_works();

                } else {
                    alert('退选失败');
                }
            },

        })
    })
    $(".delete").on('click', function () {;
        var work_id = $(this).attr("wid");
        $.ajax({
            url: "/Shared/delete_works",
            type: 'POST',
            data: {
                "work_id": work_id
            },
            success: function (res) {
                if (res != 0) {
                    alert('删除成功');
                    reg_works();

                } else {
                    alert('删除失败');
                }
            },

        })
    })
}
var door = {
    init: function () {
        getCity(); //获取当前位置城市
        sub();  //登录注册    
        submit(); //登录验证
        auto_submit();  //获取密码
        reg();  //注册账号
        sent_work(); //发布兼职
        work_sent();
        star_time_set();
        onbu();
        IndexCity("work_p");
        // cli_dis();        
        // window.in_city();
    }
}
door.init();