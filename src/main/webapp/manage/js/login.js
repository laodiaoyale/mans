
$(function(){
    var login_userNo = localStorage.getItem('LoginUserNo');
    $("#login-username").val(login_userNo);
    //点击登录
    $('#login-button').click(function(){
        loginFn();
    });
});
//回车登录
function enterLogin(e){
    var keyCode;
    if(window.event){
        keyCode=event.keyCode;
    }else{
        keyCode=e.which;
    }
    if (keyCode == 13){
        loginFn();
    }
};
function loginFn(){
    var _userName = $('#login-username').val();
    var _password = $('#login-passwod').val();
    if(isIncludeSpecalStr(_password)){
        showMsg('.error-msg','请输入正确的密码格式')
    }else if(CheckChinese(_password)){
        showMsg('.error-msg','请输入正确的密码格式')
    }else if(_password.length<6||_password.length>8){
        showMsg('.error-msg','请输入正确的密码长度');
    }else if(!isNumAndStr(_password)){ //字母加数字组合判断
        showMsg('.error-msg','请输入正确的密码格式')
    }else{
        var MD5_password = md5(_password);
        var obj ={
            'userNo': _userName,
            'password': MD5_password
        };
        var _obj = JSON.stringify(obj,'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: 'POST',
            contentType: "text/html; charset=UTF-8",
            url: "/api/sysUser/login/v2",//登录接口
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if(data.rspCode === '000000'){
                    var _data = data.body,
                        login_name = _data.userName,//用户名
                        login_token = _data.token,
                        _userNo = _data.userNo,//账号
                        login_jobs = _data.job,//岗位
                        login_department = _data.department,//部门
                        login_roleName = _data.roleName,
                        login_id= _data.id;//角色
                    localStorage.setItem('userNo', _userNo);
                    localStorage.setItem('LoginName', login_name);
                    localStorage.setItem('LoginToken', login_token);
                    localStorage.setItem('LoginJob', login_jobs);
                    localStorage.setItem('LoginDepartment', login_department);
                    localStorage.setItem('LoginRoleName', login_roleName);
                    localStorage.setItem('LoginId', login_id);
                    //记住账号
                    SaveAccount();
                    window.location.href = 'customerInfo.html';
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
}
//记住账号
function SaveAccount() {
    if ($(".input_check").prop("checked")) {
        var _userNo = $("#login-username").val();//用户名
        localStorage.setItem('LoginUserNo', _userNo);
    }else{
        localStorage.setItem('LoginUserNo', '');
    }
};