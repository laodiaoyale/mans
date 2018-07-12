function getFormatDate(){
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
    var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
    var hour = nowDate.getHours()< 10 ? "0" + nowDate.getHours() : nowDate.getHours();
    var minute = nowDate.getMinutes()< 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
    var second = nowDate.getSeconds()< 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}
$(function () {
    //历史备注
    $("#btn").on("click",function () {
        var reg=/\s+/g;
        var textareaCon=$("#textareaContents").val();
        if(textareaCon.replace(reg,"") == ""){
            showMsg($('.error-msg'), "备注不能为空");
        }else {
        var obj = new Object();
        obj.intoCode = getParam.intoCode; //进件编号
        obj.noteInfo= $("#textareaContents").val();//历史备注
        obj.reviewUser=localStorage.getItem('LoginId');//登录名
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: 'POST',
            contentType: "text/html; charset=UTF-8",
            url: "/api/manage/reviewDecision/save",                      //历史备注
            data: _obj,
            dataType: 'json',
            success:function (data) {
                if (data.rspCode === '000000') {
                    var str = getFormatDate();
                        if($("#history li").length>0){
                            $.tmpl(TmplService.remark,[{id:1,noteInfo:$("#textareaContents").val(),index:$("#history ul li").length+1,createTime:str}]).appendTo("#history .complete");
                        }else{
                            $.tmpl(TmplService.remarks,{historyNote:[{id:"",noteInfo:$("#textareaContents").val(),index:1,createTime:str}]}).appendTo("#history");
                        }
                        $("#textareaContents").val("")
                }else if (data.rspCode === '-999999') {
                    localStorage.removeItem("LoginName");
                    localStorage.removeItem("LoginToken");
                    localStorage.removeItem("userNo");
                    localStorage.removeItem("LoginJob");
                    localStorage.removeItem("LoginDepartment");
                    localStorage.removeItem("LoginRoleName");
                    showMsg($('.error-msg'), data.rspMsg);
                    window.location.href = 'login.html';
                }else {
                    showMsg($('.error-msg'), data.rspMsg);
                }
            }
        })
        }
    });
    $(document).on("click",".complete .remarks .details",function () {
        $(this).toggleClass("open");
        $(this).toggleClass("closed");
        $(this).parent().siblings().children('p').removeClass("open").addClass("closed");
    });
});