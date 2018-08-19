$(function(){

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
