$(function () {
    getRole();
    if(window.location.href.indexOf("permissions.html")>-1){
        queryUserList("","",1);
    }
    if(window.location.href.indexOf("permissions_user.html?type=edit")>-1){
        $("#path").html(" > 权限人员修改");
        $('#passwordItem').css({'display' : 'none'});
        $('#newUserNo').attr({'disabled' : 'disabled'});
        $('#userName').attr({'disabled' : 'disabled'});
        $('#newUserNo').css({'color' : '#999'});
        $('#userName').css({'color' : '#999'});
        initUser();
        //点击其他地方收起下拉框
        $("body").on("click",function(event){
            if(event.target.className != "cludeBox"){
                $(".roleSelect").hide()
            }
        })
    }
    // 权限管理 > 权限列表 > 增加人员 点击下拉框选择li
    // 权限管理 > 权限列表 > 权限人员修改 点击下拉框选择li
    $('.cludeBox').click(function () {
        var _ul = $(this).siblings('ul');
        _ul.toggle();
        var _li = _ul.children('li');
        _li.click(function (event) {
            event.stopPropagation();
            _ul.parent().children('input').val($(this).html());
            _ul.parent().children('input').attr("roleId",$(this).attr("roleId"));
            _ul.hide();
        });
    });


    // 点击编辑跳转到编辑页面
    $('.add_user_tit').click(function () {
        window.location.href = 'permissions_user.html';
    });
    var DelId = "";
    // 点击删除弹出二级确认页
    $("#permissionsTable").on('click','.delTit',function () {
        DelId = $(this).parents("td").attr("id");
        $('.mask').show();
        $('.sureDel').show();
    });
    $("#permissionsTable").on('click','a',function () {
        var permissionsInfo =  JSON.stringify($(this).parents("tr").data());
        sessionStorage.setItem("permissionsInfo",permissionsInfo);
        window.location.href = "permissions_user.html?type=edit";
    });

    // 点击二级确认页上取消按钮，关闭二级确认页
    $('.del_cancel').click(function () {
        $('.mask').hide();
        $('.sureDel').hide();
    });
    $(".del_sure").click(function(){
        $('.mask').hide();
        $('.sureDel').hide();
        deleteUser(DelId);
    });
    focusOrBlur($('#inpName'),'border-color','#398BF8','#D9D9D9');
    focusOrBlur($('.listOfOptions .com-span'),'border-color','#398BF8','#D9D9D9');
    $("#submitBtn_addUser").click(function () {
        if(window.location.href.indexOf("permissions_user.html?type=edit")>-1){
            editUser();
        }else {
            addUser();
        }
    });
    $("#searchBtn").click(function () {
        var roleId = $("#selectRole").attr("roleId") ;
        var userName = $.trim($("#inpName").val());
        queryUserList(roleId,userName,1);
    });
});
// input框获取/失去焦点时属性变化
function focusOrBlur(obj,ele,val1,val2) { //对象，元素，属性值1，属性值2
    obj.focus(function () {
        $(this).css(ele,val1);
    }).blur(function () {
        $(this).css(ele,val2);
    });
}
function addUser(){
        var newUserNo = $.trim($("#newUserNo").val());
        var userName = $.trim($("#userName").val());
        var password = $.trim($("#password").val());
        var mobile = $.trim($("#mobile").val());
        var roleId = $.trim($("#add_user_role").attr("roleId"));
        var job = $.trim($("#job").val());
        var department = $.trim($("#department").val());
        if(newUserNo==""){
            showMsg('.error-msg', "请输入账号");
            return false;
        }else if(newUserNo.length !== 8 ){
            showMsg('.error-msg', "请输入正确账号");
            return false;
        }else if(userName==""){
            showMsg('.error-msg', "请输入姓名");
            return false;
        }else if(password==""){
            showMsg('.error-msg', "请输入密码");
            return false;
        }else if(mobile==""){
            showMsg('.error-msg', "请输入手机号");
            return false;
        }else if(department==""){
            showMsg('.error-msg', "请输入部门");
            return false;
        }else if(job==""){
            showMsg('.error-msg', "请输入岗位");
            return false;
        }else if(!isValNum(newUserNo)){
            showMsg('.error-msg', "请输入正确的账号");
        }else if(!isNumAndStr(password)){
            showMsg('.error-msg', "请输入正确格式的密码");
        }else if(!isPhoneNum(mobile) || mobile.length != 11){
            showMsg('.error-msg', "请输入正确格式的手机号");
        }else{
            var obj = {
                "userNo":localStorage.getItem('userNo'),
                "userName":userName,
                "newUserNo":newUserNo,
                "password":md5(password),//(md5加密)
                "roleId":roleId,
                "job":job,
                "department":department,
                "mobile":mobile
            };
            var _obj = JSON.stringify(obj, 'utf-8');
            $.ajax({
                headers: {
                    token: localStorage.getItem('LoginToken')
                },
                type: "POST",
                contentType: "text/html; charset=UTF-8",
                url: "/api/sysUser/sysUserRegister/v1",//员工增加
                data: _obj,
                dataType: 'json',
                success: function (data) {
                    if (data.rspCode === '000000') {
                        showMsg($('.error-msg'), '提交成功');
                        setTimeout(function () {
                            window.location.href = 'permissions.html' ;
                        });
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

}
function editUser(){
    var newUserNo = $("#newUserNo").val();
    var userName = $("#userName").val();
    var mobile = $("#mobile").val();
    var roleId = $("#add_user_role").attr("roleId");
    var job = $("#job").val();
    var department = $("#department").val();
    if(newUserNo==""){
        showMsg('.error-msg', "请输入账号");
        return false;
    }else if(userName==""){
        showMsg('.error-msg', "请输入姓名");
        return false;
    }else if(mobile==""){
        showMsg('.error-msg', "请输入手机号");
        return false;
    }else if(department==""){
        showMsg('.error-msg', "请输入部门");
        return false;
    }else if(job==""){
        showMsg('.error-msg', "请输入岗位");
        return false;
    }else if(!isPhoneNum(mobile) || mobile.length != 11){
        showMsg('.error-msg', "请输入正确的手机号");
    }else {
        var obj = {
            "userNo":localStorage.getItem('userNo'),
            "userName":userName,
            "newUserNo":newUserNo,
            "job":job,
            "department":department,
            "mobile":mobile
        };
        if(roleId!=undefined&&roleId!=""){
            obj.roleId = roleId;
        }
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: "POST",
            contentType: "text/html; charset=UTF-8",
            url: "/api/sysUser/updateUser/v1",//员工修改
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if (data.rspCode === '000000') {
                    showMsg($('.error-msg'), '提交成功');
                    setTimeout(function () {
                        window.location.href = 'permissions.html' ;
                    });
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
}
function getRole(){
    var _obj = JSON.stringify({}, 'utf-8');
    $.ajax({
        headers: {
            token: localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/sysUserRole/selectRoleAll/v1",//获取角色下拉框
        dataType: 'json',
        data: _obj,
        aysnc:false,
        success: function (data) {
            if (data.rspCode === '000000') {
                var items = data.body;

                $("#role").html(""); //绑定模号下拉菜单
                for (var i = 0; i < items.length; i++) {
                    $("#role").append($("<option value=\"" + items[i].id + "\">" + items[i].role_name + "</option>"));
                }
                if($(".roleSelect").hasClass("search")){
                    $(".roleSelect").prepend('<li roleId="">全部</li>');
                }else{
                    if(window.location.href.indexOf("permissions_user.html?type=edit")==-1) {
                        var _defaultLi = $(".roleSelect li:first-child");
                        $("#add_user_role").val(_defaultLi.html()).attr("roleId", _defaultLi.attr("roleId"));
                    }
                }
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

function queryUserList(roleId,userName,page){
    roleId = $("#selectRole").attr("roleId") ;
    userName = $.trim($("#inpName").val());
    var _obj = JSON.stringify({
        "pageNum":page,
        "pageSize":10,
        "roleId":roleId,
        "userName":userName
        }, 'utf-8');
    $.ajax({
        headers: {
            token: localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/sysUser/selectUserList/v1",//获取角色下拉框
        dataType: 'json',
        data: _obj,
        success: function (data) {
            if (data.rspCode === '000000') {
                var list = data.body.list;
                totalPage =data.body.lastPage;
                definedPaginator(page, totalPage, "kkpager", function (n) {
                    queryUserList(roleId,userName,n);
                });
                $("#permissionsTable tbody").html("");
                if(list.length>0) {
                    $.each(list, function (i) {
                        var _tr = $("<tr>");
                        var str =  '          <td>' + parseInt((page - 1) * 10 +i+1) + '</td>' +
                            '                <td>' + this.user_no + '</td>' +
                            '                <td>' + this.user_name + '</td>' +
                            '                <td>' + this.role_name + '</td>' +
                            '                <td>' + this.department + '</td>' +
                            // '                <td>' + this.job + '</td>' +
                            '                <td>' + this.mobile + '</td>' +
                            '                <td>' + (this.create_time?this.create_time:"") + '</td>' +
                            '                <td id="' + this.user_no
                        +'"><span class="redactTlt"><a href="javascript:void(0);"><img src="../images/compile.svg" />编辑</a></span><span class="delTit"><img src="../images/delete.svg" />删除</span></td>' ;
                        _tr.html(str).data(list[i]);
                        $("#permissionsTable tbody").append(_tr);
                    });
                }else{
                    $("#permissionsTable tbody").append('<tr class="table_null"><td style="padding-left: 15px; text-align: left;" colspan=\'9\'>暂无数据</td></tr>');
                }

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
function deleteUser(id) {
    var _obj = JSON.stringify({
        newUserNo:id,
        updateUser:localStorage.getItem('userNo')
    }, 'utf-8');
    $.ajax({
        headers: {
            token: localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/sysUser/sysUserDel/v1",//员工删除
        dataType: 'json',
        data: _obj,
        success: function (data) {
            if (data.rspCode === '000000') {
                showMsg($('.error-msg'), '删除成功');
                setTimeout(function () {
                    queryUserList("","",1);
                });
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
function initUser(){
    var permissionsInfo = JSON.parse(sessionStorage.getItem("permissionsInfo"));
    $("#newUserNo").val(permissionsInfo.user_no);
    $("#userName").val(permissionsInfo.user_name);
    $("#password").val("******").attr("readonly",true);
    $("#mobile").val(permissionsInfo.mobile);
    $('#add_user_role').val(permissionsInfo.role_name);
    $("#department").val(permissionsInfo.department);
    $("#job").val(permissionsInfo.job);
}