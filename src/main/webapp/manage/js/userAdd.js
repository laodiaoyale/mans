$(function(){
    getEnterprises();
// 点击显示日历
    $('#entryDate').datetimepicker({
        format: 'yyyy-mm-dd',
        minView: 2,
        language: 'zh-CN',
        endDate: getNowFormatDate(),
        autoclose: true
    });
    $('#leaveDate').datetimepicker({
        format: 'yyyy-mm-dd',
        minView: 2,
        language: 'zh-CN',
        endDate: getNowFormatDate(),
        autoclose: true
    });
    // 点击显示日历
    $('#startEntryDate').datetimepicker({
        format: 'yyyy-mm-dd',
        minView: 2,
        language: 'zh-CN',
        endDate: getNowFormatDate(),
        autoclose: true
    });
    $('#endEntryDate').datetimepicker({
        format: 'yyyy-mm-dd',
        minView: 2,
        language: 'zh-CN',
        endDate: getNowFormatDate(),
        autoclose: true
    });

    // 点击显示日历
    $('#startLeaveDate').datetimepicker({
        format: 'yyyy-mm-dd',
        minView: 2,
        language: 'zh-CN',
        endDate: getNowFormatDate(),
        autoclose: true
    });
    $('#endLeaveDate').datetimepicker({
        format: 'yyyy-mm-dd',
        minView: 2,
        language: 'zh-CN',
        endDate: getNowFormatDate(),
        autoclose: true
    });
});

function changeValue(){
    var startEntryDate = $('#startEntryDate').val();
    var endEntryDate = $("#endEntryDate").val();
    var startLeaveDate = $('#startLeaveDate').val();
    var endLeaveDate = $("#endLeaveDate").val();
    if(startEntryDate!=''&&endEntryDate!=''&&endEntryDate<startEntryDate){
        showMsg($('.error-msg'), "开始时间必须小于结束时间");
    }
    if(startLeaveDate!=''&&endLeaveDate!=''&&endLeaveDate<startLeaveDate){
        showMsg($('.error-msg'), "开始时间必须小于结束时间");
    }
}

// 显示日历函数
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}


function getEnterprises(){
    var obj = {
        "userNo":localStorage.getItem('userNo')
    };
    var _obj = JSON.stringify(obj, 'utf-8');
    $.ajax({
        headers: {
            token: localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/sysEnterprise/getEnterprise",//获取城市下拉列表
        dataType: 'json',
        data: _obj,
        aysnc:false,
        success: function (data) {
            if (data.rspCode === '000000') {
                var items = data.body;
                $("#enterpriseAdd").html(""); //绑定模号下拉菜单
                for (var i = 0; i < items.length; i++) {
                    $("#enterpriseAdd").append($("<option value=\"" + items[i].id + "\">" + items[i].enCode + "</option>"));
                }
                // $('#enterprise').selectpicker('refresh');
            } else if (data.rspCode === '-999999') {
                localStorage.removeItem("LoginName");
                localStorage.removeItem("LoginToken");
                localStorage.removeItem("userNo");
                localStorage.removeItem("LoginJob");
                localStorage.removeItem("LoginDepartment");
                localStorage.removeItem("LoginRoleName");
                showMsg($('.error-msg'), data.rspMsg);
                window.location.href = 'wechatLogin.html';
            } else {
                showMsg('.error-msg', data.rspMsg);
            }
        }
    });
}