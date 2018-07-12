var reportServer = {}
$(function () {
    var myChart1 = echarts.init(document.getElementById('chart1'));
    var myChart2 = echarts.init(document.getElementById('chart2'));
    var obj = new Object();
    obj.startTime = $('#datetimepicker').val();
    obj.endTime = $('#datetimepicker1').val();
    dateCompare(obj.startTime, obj.endTime);
    _obj = JSON.stringify(obj, 'utf-8');
    $.ajax({
        headers: {
            token: localStorage.getItem('LoginToken')
        },
        type: 'POST',
        contentType: "text/html; charset=UTF-8",
        url: "/api/operationpanel/information/informationList",//运营面板接口
        data: _obj,
        dataType: 'json',
        success: function (data) {
            if (data.rspCode === '000000') {
                var _data = data.body;
                $('.applyTotal').html(_data.applyTotal);//当天申请总数
                $('.refuseTotal').html(_data.adoptTotal);//当天审批拒绝总数
                $('.adoptTotal').html(_data.refuseTotal);//当天审批通过总数
                var now = GetDateStr(0);
                var before = GetDateStr(-6);
                $('#datetimepicker').attr('placeholder',before);
                $('#datetimepicker1').attr('placeholder',now);
                $('#datetimepicker').attr('value',before);
                $('#datetimepicker1').attr('value',now);
                optionFn(_data, myChart1)
                optionFn1(_data, myChart2)
            }else if(data.rspCode==='-999999'){
                localStorage.removeItem("LoginName");
                localStorage.removeItem("LoginToken");
                localStorage.removeItem("userNo");
                localStorage.removeItem("LoginJob");
                localStorage.removeItem("LoginDepartment");
                localStorage.removeItem("LoginRoleName");
                showMsg($('.error-msg'), data.rspMsg);
                window.location.href = 'login.html';
            } else {
                showMsg($('.error-msg'), data.rspMsg);
            }
        }
    })
    $('#datetimepicker').datetimepicker({
        format: 'yyyy-mm-dd',
        minView: 2,
        language: 'zh-CN',
        endDate: getNowFormatDate(),
        autoclose: true
    });
    $('#datetimepicker1').datetimepicker({
        format: 'yyyy-mm-dd',
        minView: 2,
        language: 'zh-CN',
        endDate: getNowFormatDate(),
        autoclose: true
    });


    //条件查询
    $('.find').click(function () {
        var obj = new Object();
        obj.startTime = $('#datetimepicker').val();
        obj.endTime = $('#datetimepicker1').val();
        dateCompare(obj.startTime, obj.endTime);
        if (daysBetween(obj.startTime, obj.endTime) > 30) {
            showMsg($('.error-msg'), '查询日期不得超过30天');
        } else {
            _obj = JSON.stringify(obj, 'utf-8');
            $.ajax({
                headers: {
                    token: localStorage.getItem('LoginToken')
                },
                type: 'POST',
                contentType: "text/html; charset=UTF-8",
                url: "/api/operationpanel/information/informationList",//运营面板接口
                data: _obj,
                dataType: 'json',
                success: function (data) {
                    if (data.rspCode === '000000') {
                        var _data = data.body;
                        $('.applyTotal').html(_data.applyTotal);//当天申请总数
                        $('.refuseTotal').html(_data.adoptTotal);//当天审批拒绝总数
                        $('.adoptTotal').html(_data.refuseTotal);//当天审批通过总数
                        optionFn(_data, myChart1)
                        optionFn1(_data, myChart2)
                    }else if(data.rspCode==='-999999'){
                        localStorage.removeItem("LoginName");
                        localStorage.removeItem("LoginToken");
                        localStorage.removeItem("userNo");
                        localStorage.removeItem("LoginJob");
                        localStorage.removeItem("LoginDepartment");
                        localStorage.removeItem("LoginRoleName");
                        showMsg($('.error-msg'), data.rspMsg);
                        window.location.href = 'login.html';
                    } else {
                        showMsg($('.error-msg'), data.rspMsg);
                    }
                }
            })
        }
    })
    //快捷查询
    $('.fast span').click(function () {
        $(this).addClass('active').siblings('span').removeClass('active')
    })
    $('.sevenD').click(function () {
        var now = GetDateStr(0);
        var before = GetDateStr(-6);
        $('#datetimepicker').val(before);
        $('#datetimepicker1').val(now);
        $('.find').click();
    })
    $('.thirtyD').click(function () {
        var now = GetDateStr(0);
        var before = GetDateStr(-29);
        $('#datetimepicker').val(before);
        $('#datetimepicker1').val(now);
        var obj = new Object();
        obj.startTime = $('#datetimepicker').val();
        obj.endTime = $('#datetimepicker1').val();
        $('.find').click();
    })
})

function optionFn(data, box) {
    option = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: getTime(data),
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
                // axisLabel:{
                //     interval:0,//横轴信息全部显示
                //     rotate:-15,//-30度角倾斜显示
                // }
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#EEEFF0"
                    }
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '数量',
                type: 'bar',
                barWidth: '20%',
                data: getNum(data),
            }
        ]
    };
    box.setOption(option);
}

//动态获取数据
function getNum(data) {
    var numArray = [];
    var dataList = data.loanApplicationStatistics;
    for (var i = 0; i < dataList.length; i++) {
        numArray.push(dataList[i].thatNumber)
    }
    return numArray;
}

function getTime(data) {
    var timeArray = [];
    var dataList = data.loanApplicationStatistics;
    for (var i = 0; i < dataList.length; i++) {
        timeArray.push(dataList[i].thattime)
    }
    return timeArray;
}

function optionFn1(data, box) {
    option = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: getTime1(data),
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
                // axisLabel:{
                //     interval:0,//横轴信息全部显示
                //     rotate:-15,//-30度角倾斜显示
                // }
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#EEEFF0"
                    }
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: '数量',
                type: 'bar',
                barWidth: '20%',
                data: getNum1(data),
            }
        ]
    };
    box.setOption(option);
}

function getNum1(data) {
    var numArray = [];
    var dataList = data.loanadoptStatistics;
    for (var i = 0; i < dataList.length; i++) {
        numArray.push(dataList[i].thatNumber);
    }
    return numArray;
}

function getTime1(data) {
    var timeArray = [];
    var dataList = data.loanadoptStatistics;
    for (var i = 0; i < dataList.length; i++) {
        timeArray.push(dataList[i].thattime)
    }
    return timeArray;
}

//获取当前时间，格式YYYY-MM-DD
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

//计算天数
// var days = daysBetween('2016-11-01','2016-11-02');
/**
 * 根据两个日期，判断相差天数
 * @param sDate1 开始日期 如：2016-11-01
 * @param sDate2 结束日期 如：2016-11-02
 * @returns {number} 返回相差天数
 */
function daysBetween(sDate1, sDate2) {
//Date.parse() 解析一个日期时间字符串，并返回1970/1/1 午夜距离该日期时间的毫秒数
    var time1 = Date.parse(new Date(sDate1));
    var time2 = Date.parse(new Date(sDate2));
    var nDays = Math.abs(parseInt((time2 - time1) / 1000 / 3600 / 24));
    return nDays;
};

