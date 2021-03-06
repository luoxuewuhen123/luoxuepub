﻿<%@ Page Language="VB" Inherits="System.Web.Mvc.ViewPage" %>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>兼职发布</title>
    <link rel="stylesheet" href="/Content/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/Content/index.css">
    <link rel="stylesheet" href="/Scripts/jeDate/skin/jedate.css">
    <link rel="stylesheet" href="/Content/time.css">
    <link href="/Content/img/logo.ico" rel="SHORTCUT ICON" />
    <script type="text/javascript"
        src="http://api.map.baidu.com/api?v=2.0&ak=LBsbzwpZIV3vEh8Zgtan5M0HSZj7tCcz"></script>
</head>

<body>

    <div class="wrapper">
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li class="percenter_wra"><a href="#" id="Msubmit" data-toggle="modal" data-target="#myModal"
                                style="display:inline-block"><span class="glyphicon glyphicon-pencil"></span> 登录/注册</a></li>
                        <li class="dropdown">
                            <a href="/shared/myinfo" id="myInfor" target="_blank"><span
                                    class="glyphicon glyphicon-user"></span> 个人中心</a>
                        </li>
                        <li><a href="#" id="outJ"><span class="glyphicon glyphicon-heart"></span> 免费发布兼职</a></li>
                        <li class="myMusic"><span class="musNa"><span class="glyphicon glyphicon-headphones"></span> 幽蓝键 - Always with Me<audio controls loop autoplay class="buMusic" src="/Content/幽蓝键 - Always with Me.mp3"></audio></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="/shared/weather" id="outJ" style="margin-right: 30px;"><span class="glyphicon glyphicon-cloud"></span> 查询天气</a></li>
                        <li><a href="tencent://message/?Menu=yes&uin=2338448821&Site=80fans&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a545b1714f9d45"
                                target="_blank" style="margin-right: 40px;">联系客服 <span
                                    class="glyphicon glyphicon-th-list"></span></a>
                        </li>
                    </ul>
                </div><!-- /.navbar-collapse -->
            </div><!-- /.container-fluid -->
        </nav>
        <div class="sel-nav">
            <!-- <div class="dropdown">
        <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="true">
          按距离查找
          <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1" id="Odistance">
          <li class="sel-item">全 部</li>
          <li class="sel-item">由近到远</li>
          <li class="sel-item">由远到近</li>
        </ul>
      </div> -->
            <div class="dropdown">
                <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="true">
                    <span class="cha_day">按工作天数查找</span>
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2" id="Otime">
                    <li class="sel-item" id="sel_aal">全 部</li>
                    <li class="sel-item" id="sel_one" data-flag="fasle">1 天</li>
                    <li class="sel-item" id="sel_two" data-flag="fasle">一周以内</li>
                    <li class="sel-item" id="sel_three" data-flag="fasle">一个月以内</li>
                    <li class="sel-item" id="sel_four" data-flag="fasle">长 期</li>
                </ul>
            </div>
            <div class="dropdown">
                <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="true">
                    <span class="cha_order">开始时间(早-晚)</span>
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu1" id="Oorder">
                    <li class="sel-item" id="order_time" data-flag="fasle">开始时间(早-晚)</li>
                    <li class="sel-item" id="order_dis" data-flag="fasle">距离顺序(近-远)</li>
                </ul>
            </div>
            <div class="dropdown">
                <button id="dropdownMenu3" class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="true">刷新列表</button>
            </div>
        </div>
        <div class="sel-l">
            <div id="l-map"></div>
            <div id="r-result">请输入你当前位置(查看距离):</div>
            <div style="z-index:-10">
                <input type="text" id="suggestId" size="20" style="width:200px;padding-left: 5px;" />
                <input type="button" id="suggestId_tr" value="确定">
            </div>
            <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:0px;height:auto; display:none;"></div>
            <div class="sel-ty">
                <h5>请选择兼职类型:</h5>
                <ul class="work_ty">
                    <li class="sel_items" id="sel_all" style="color: red;">全部</li>
                    <li class="sel_items" id="sel_fd">家教</li>
                    <li class="sel_items" id="sel_leaflet">传单派发</li>
                    <li class="sel_items" id="sel_hour_em">钟点工</li>
                    <li class="sel_items" id="sel_cam_agent">校园代理</li>
                    <li class="sel_items" id="sel_pub_sec">保安</li>
                    <li class="sel_items" id="sel_sur">问卷调查</li>
                    <li class="sel_items" id="sel_mark">市场销售</li>
                    <li class="sel_items" id="sel_waiter">服务员</li>
                    <li class="sel_items" id="sel_aud">观众充场</li>
                    <li class="sel_items" id="sel_tel">话务员</li>
                    <li class="sel_items" id="sel_model">礼仪模特</li>
                    <li class="sel_items" id="sel_exp">快递分拣</li>
                    <li class="sel_items" id="sel_else">其他</li>
                </ul>
            </div>
        </div>
        <div class="sel-r">
            <!-- <div class="row">
        <div class="work_items">
          <a href="#" class="disabled thumbnail">
            <h4 class="work_title">小时工</h4>
            <h5 class="work_money">80元日结</h5>
            <h5 class="work_place">香格里拉大酒店</h5>
            <h5 class="work_start">2019年12月5日 8:00-17:00</h5>
            <h5 class="work_time">需连续工作7天</h5>
            <h6 class="work_dis">距离你约30km</h6>
            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModel">申请</button>
          </a>
        </div>
      </div> -->
            <!-- 登录模态框 -->
            <div class="model_all" id="model_all"></div>
            <div class="model_border">
                <div class="model_wrapper">
                    <span class="model_close model_close1">X</span>
                    <form action="" method="POST" onsubmit="return false" id="submit_fo">
                        <div class="us_wra">
                            <label for="us">请输入用户名:</label>
                            <input type="text" name="us" id="us">
                        </div>
                        <div class="pw_wra">
                            <label for="pw">请 输 入 密码:</label>
                            <input type="password" name="pw" id="pw">
                        </div>
                        <div class="audio_wra">
                            <input checked type="checkbox" name="audio_pw" id="audio_pw">
                            <label for="audio_pw" class="la_au">下次自动登录</label>
                        </div>
                        <div class="sub_wra">
                            <button id="submit" type="button" class="btn btn-primary btn-lg">登录</button>
                        </div>
                        <div class="reg_wra">
                            <a>忘记密码?</a>
                            <a style="margin-left: 160px;" id="reg">免费注册</a>
                        </div>
                    </form>
                </div>
            </div>
            <!-- 注册模态框 -->
            <div class="model_reg">
                <div class="model_border2">
                    <div class="model_wrapper">
                        <span class="model_close model_close2">X</span>
                        <form action="" onsubmit="return false" class="reg_sub">
                            <div class="us_wra">
                                <label for="in_us">请 输 入 用 户名:</label>
                                <input type="text" name="in_us" id="in_us">
                            </div>
                            <div class="pw_wra">
                                <label for="in_pw">请&nbsp;&nbsp;输&nbsp;&nbsp;入&nbsp;密&nbsp;&nbsp;码:</label>
                                <input type="password" id="in_pw" name="in_pw">
                            </div>
                            <div class="pw_wra2">
                                <label for="in_pw2">请再次输入密码:</label>
                                <input type="password" id="in_pw2" name="in_pw2">
                            </div>
                            <div class="tel_wra">
                                <label for="tel_reg">请 输 入 手机号:</label>
                                <input type="text" id="tel_reg" name="tel_reg">
                            </div>
                            <div class="sub_reg">
                                <button id="reg_submit" type="button" class="btn btn-primary btn-lg">注册并登陆</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <!-- 兼职详细内容 -->
            <div id="jianzhi">
                <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel" id="myModel">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                        aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="gridSystemModalLabel">小时工</h4>
                                <h4 class="work_id"></h4>
                            </div>
                            <div class="modal-body">
                                <div class="modal_place">
                                    <span>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点: &nbsp;&nbsp;</span>
                                    <span id="mo_place">香格里拉大酒店</span>
                                </div>
                                <div class="modal-money">
                                    <span>薪&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;资: &nbsp;&nbsp;</span>
                                    <span id="mo_money">80元日结</span>
                                </div>
                                <div class="modal_sttime">
                                    <span>工作时间: &nbsp;&nbsp;</span>
                                    <span id="mo_time">2019年12月5日 8:00-17:00</span>
                                </div>
                                <div class="modal_ask">
                                    <span>具体要求: &nbsp;&nbsp;</span>
                                    <span class="mo_ask_time">需要连续工作3天</span>
                                    <span class="mo_ask_a">吃苦耐劳</span>
                                </div>
                                <div class="modal_tel">
                                    <span>联系电话: &nbsp;&nbsp;</span>
                                    <span class="mo_tel">17860526666</span>
                                </div>
                                <div class="modal_dis">
                                    <span>距&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;离: &nbsp;&nbsp;</span>
                                    <span class="mo_dis">距你当前位置约30km</span>
                                </div>
                                <div class="modal_peo_cou">
                                    <span>需要人数: &nbsp;&nbsp;</span>
                                    <span class="peo_cou"></span>
                                </div>
                                <div class="modal_peoed">
                                    <span>已报人数: &nbsp;&nbsp;</span>
                                    <span class="peoed"></span>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary apply">确认申请</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                    <!-- 发布兼职模态框 -->


            <div class="model_issua">
                <span class="model_close model_close3" style="cursor: pointer">X</span>
                <div class="model_wrapper">
                    <form action="">
                        <div class="work_title dropdown">
                            <span>请选择标题:</span>
                            <button class="btn btn-default dropdown-toggle" type="button" id="title_sel"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                <span class="title_sel_s">工作标题</span>
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="title_sel">
                                <li class="title_items">家教</li>
                                <li class="title_items">传单派发</li>
                                <li class="title_items">钟点工</li>
                                <li class="title_items">校园代理</li>
                                <li class="title_items">保安</li>
                                <li class="title_items">问卷调查</li>
                                <li class="title_items">市场销售</li>
                                <li class="title_items">服务员</li>
                                <li class="title_items">观众充场</li>
                                <li class="title_items">话务员</li>
                                <li class="title_items">礼仪模特</li>
                                <li class="title_items">快递分拣</li>
                                <li class="title_items">其他</li>
                            </ul>

                        </div>
                        <div class="work_p_r">
                            <span>请输入兼职地点:</span>
                            <input type="text" id="work_p" size="20" style="width:200px;padding-left: 5px;" />
                        </div>
                        <div class="work_ti_r">
                            <span>请选择工作开始时间:</span>
                            <input type="text" id="startTime" name="st_time"> <input type="text" id="st_time"
                                name="st_time">-<input type="text" id="ed_time" name="ed_time">
                        </div>
                        <div class="work_money_r dropdown">
                            <span>请输入工薪:</span>
                            <button class="btn btn-default dropdown-toggle" type="button" id="work_money_sel"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                <span class="monty_sel">按条件输入</span>
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="work_money_sel">
                                <li class="money_sel">按时计费(元/小时)</li>
                                <li class="money_sel">按天计费(元/天)</li>
                                <li class="money_sel">按月计费(元/月)</li>
                            </ul>
                            <div style="padding-left: 20px;" class="work_mon_wra"> <input type="text"
                                    class="work_money_s" name="work_money_s"><span></span></div>

                        </div>
                        <div class="work_day_r">
                            <span>请输入需连续工作天数:</span>
                            <input type="text" name="work_day">
                        </div>
                        <div class="work_peo_r">
                            <span>请输入需要人数:</span>
                            <input type="text" name="work_peo" id="work_peo" />
                        </div>
                        <div style="vertical-align: top;height: 70px;">
                            <p>请输入工作要求:</p>
                            <textarea name="work_asks" id="work_asks" cols="30" rows="3"></textarea>
                        </div>
                        <div class="work_tel_r" style="padding-top: 10px;">
                            <span>请输入联系电话:</span>
                            <input type="text" name="work_telaa">
                        </div>
                        <button id="tijiao" type="button" class="btn btn-primary btn-lg">提交</button>
                    </form>
                </div>
            </div>
    </div>
    <!-- 百度api -->
    <!-- http://api.map.baidu.com/place/v2/suggestion?query=%E5%A4%A9%E5%AE%89%E9%97%A8&region=%E5%8C%97%E4%BA%AC&city_limit=true&output=json&ak=LBsbzwpZIV3vEh8Zgtan5M0HSZj7tCcz -->
    <!-- 参考文档 -->
    <!-- http://lbsyun.baidu.com/index.php?title=webapi/place-suggestion-api -->
    
    <script src="/Scripts/jquery.js"></script>
    <script src="/Content/bootstrap/js/bootstrap.min.js"></script>
    <script src="/Scripts/xiaohongxin.js"></script>
    <script src="/Scripts/timePacker.js"></script>
    <script src="/Scripts/jeDate/dist/jedate.min.js"></script>
    <script src="/Scripts/data.js"></script>
    <script src="/Scripts/myCookie.js"></script>
    <script src="/Scripts/index.js"></script>

</body>

</html>