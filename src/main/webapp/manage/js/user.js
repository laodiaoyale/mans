$(function () {
    getRole();
    if(window.location.href.indexOf("user.html")>-1){
        getCity();
        getEnterprise();
        queryUserList("","",1);
    }
    if(window.location.href.indexOf("user_info.html")>-1){
        $("#path").html(" > 人员信息");
        $('#name').attr({'display' : 'disabled'});
        $('#sex').attr({'disabled' : 'disabled'});
        $('#job').attr({'disabled' : 'disabled'});
        $('#mobile').css({'color' : '#999'});
        $('#idCard').css({'color' : '#999'});
        initUser();
        //点击其他地方收起下拉框
        $("body").on("click",function(event){
            if(event.target.className != "cludeBox"){
                $(".roleSelect").hide()
            }
        })
    }
    if(window.location.href.indexOf("user_add.html")>-1){
        if(localStorage.getItem('LoginDepartment')!="admin"){
            $('#enterprise').attr({'disabled' : 'disabled'});
            $("#enterprise").val(localStorage.getItem('LoginDepartment'));
        }
        $('#userName').attr({'disabled' : 'disabled'});
        $('#newUserNo').css({'color' : '#999'});
        $('#userName').css({'color' : '#999'});
        // initUser();
        //点击其他地方收起下拉框
        $("body").on("click",function(event){
            if(event.target.className != "cludeBox"){
                $(".roleSelect").hide()
            }
        })
    }
    if(window.location.href.indexOf("user_add.html?type=edit")>-1){
        $("#path").html(" > 人员修改");
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
    $('#addUserBtn').click(function () {
        window.location.href = 'user_add.html';
    });
    // 点击编辑跳转到编辑页面
    $('#submitBtn_infoUser').click(function () {
        window.location.href = 'user.html';
    });
    // 点击编辑跳转到编辑页面
    $('#submitBtn_cancel').click(function () {
        window.location.href = 'user.html';
    });
    var DelId = "";
    // 点击删除弹出二级确认页
    $("#userTable").on('click','.delTit',function () {
        DelId = $(this).parents("td").attr("id");
        $('.mask').show();
        $('.sureDel').show();
    });
    $("#userTable").on('click','.infoTlt',function () {
        var user =  JSON.stringify($(this).parents("tr").data());
        sessionStorage.setItem("user",user);
        window.location.href = "user_info.html";
    });
    $("#userTable").on('click','.redactTlt',function () {
        var user =  JSON.stringify($(this).parents("tr").data());
        sessionStorage.setItem("user",user);
        window.location.href = "user_add.html?type=edit";
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
        if(window.location.href.indexOf("user_add.html?type=edit")>-1){
            editUser();
        }else {
            addUser();
        }
    });
    $("#searchBtn").click(function () {
        var roleId = $("#selectRole").attr("roleId") ;
        var userName = $.trim($("#inpName").val());
        var sex = $.trim($("#sex").val());
        console.log(sex)
        queryUserList(roleId,userName,1);
    });

    $("#resetBtn").click(function () {
        $("#inpName").val("");
        $("#sex").prop('selectedIndex', 0);
        $('#minAge').val("");
        $('#maxAge').val("");
        $("#idCard").val("");
        $("#education").prop('selectedIndex', 0);
        $('#status').prop('selectedIndex', 0);
        $('#city').val("");
        $("#source").val("");
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
        var name = $.trim($("#name").val());
        var sex = $.trim($("#sex").val());
        var idCard = $.trim($("#idCard").val());
        var mobile = $.trim($("#mobile").val());
        var wechatCode = $.trim($("#wechatCode").val());
        var qqCode = $.trim($("#qqCode").val());
        var entryDate = $.trim($("#entryDate").val());
        var city = $.trim($("#city").val());
        var address = $.trim($("#address").val());
        var age = $.trim($("#age").val());
        var education = $.trim($("#education").val());
        var source = $.trim($("#source").val());
        var job = $.trim($("#job").val());
        var skill = $.trim($("#skill").val());
        var status = $.trim($("#status").val());
        var history = $.trim($("#history").val());
        var enterprise = $.trim($("#enterprise").val());
        var remark = $.trim($("#remark").val());
        var entryDate = $.trim($("#entryDate").val());
        var leaveDate = $.trim($("#leaveDate").val());
        var bankCard = $.trim($("#bankCard").val());
        var bankName = $.trim($("#bankName").val());
        if(name==""){
            showMsg('.error-msg', "请输入姓名");
            return false;
        }else if(idCard==""){
            showMsg('.error-msg', "请输入身份证号");
        }
        else{
            var obj = {
                "id":localStorage.getItem('id'),
                "name":name,
                "sex":sex,
                "idCard":idCard,
                "mobile":mobile,
                "city":city,
                "wechatCode":wechatCode,
                "qqCode":qqCode,
                "entryDate":entryDate,
                "address":address,
                "age":age,
                "education":education,
                "source":source,
                "job":job,
                "skill":skill,
                "status":status,
                "history":history,
                "enterprise":enterprise,
                "remark":remark,
                "entryDate":entryDate,
                "leaveDate":leaveDate,
                "bankCard":bankCard,
                "bankName":bankName
            };
            var _obj = JSON.stringify(obj, 'utf-8');
            $.ajax({
                headers: {
                    token: localStorage.getItem('LoginToken')
                },
                type: "POST",
                contentType: "text/html; charset=UTF-8",
                url: "/api/user/addOrUpdate",//员工增加
                data: _obj,
                dataType: 'json',
                success: function (data) {
                    if (data.rspCode === '000000') {
                        showMsg($('.error-msg'), '提交成功');
                        setTimeout(function () {
                            window.location.href = 'user.html' ;
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
    var id = $.trim($("#id").val());
    var name = $.trim($("#name").val());
    var sex = $.trim($("#sex").val());
    var idCard = $.trim($("#idCard").val());
    var mobile = $.trim($("#mobile").val());
    var wechatCode = $.trim($("#wechatCode").val());
    var qqCode = $.trim($("#qqCode").val());
    var entryDate = $.trim($("#entryDate").val());
    var city = $.trim($("#city").val());
    var address = $.trim($("#address").val());
    var age = $.trim($("#age").val());
    var education = $.trim($("#education").val());
    var source = $.trim($("#source").val());
    var job = $.trim($("#job").val());
    var skill = $.trim($("#skill").val());
    var status = $.trim($("#status").val());
    var history = $.trim($("#history").val());
    var enterprise = $.trim($("#enterprise").val());
    var remark = $.trim($("#remark").val());

    var entryDate = $.trim($("#entryDate").val());
    var leaveDate = $.trim($("#leaveDate").val());
    var bankCard = $.trim($("#bankCard").val());
    var bankName = $.trim($("#bankName").val());
    if(name==""){
        showMsg('.error-msg', "请输入姓名");
        return false;
    }else if(idCard==""){
        showMsg('.error-msg', "请输入身份证号");
    }else {
        var obj = {
            "id":id,
            "name":name,
            "sex":sex,
            "idCard":idCard,
            "mobile":mobile,
            "wechatCode":wechatCode,
            "qqCode":qqCode,
            "entryDate":entryDate,
            "city":city,
            "address":address,
            "age":age,
            "education":education,
            "source":source,
            "job":job,
            "skill":skill,
            "status":status,
            "history":history,
            "enterprise":enterprise,
            "remark":remark,
            "entryDate":entryDate,
            "leaveDate":leaveDate,
            "bankCard":bankCard,
            "bankName":bankName
        };
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: "POST",
            contentType: "text/html; charset=UTF-8",
            url: "/api/user/addOrUpdate",//员工修改
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if (data.rspCode === '000000') {
                    showMsg($('.error-msg'), '提交成功');
                    setTimeout(function () {
                        window.location.href = 'user.html' ;
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

function getCity(){
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
        url: "/api/user/getCity",//获取城市下拉列表
        dataType: 'json',
        data: _obj,
        aysnc:false,
        success: function (data) {
            if (data.rspCode === '000000') {
                var items = data.body;
                $("#city").html(""); //绑定模号下拉菜单
                $("#city").append($("<option value=\"\">全部</option>"));
                for (var i = 0; i < items.length; i++) {
                    $("#city").append($("<option value=\"" + items[i] + "\">" + items[i] + "</option>"));
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

function getEnterprise(){
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
        url: "/api/sysUser/getEnterprise",//获取城市下拉列表
        dataType: 'json',
        data: _obj,
        aysnc:false,
        success: function (data) {
            if (data.rspCode === '000000') {
                var items = data.body;
                $("#enterprise").html(""); //绑定模号下拉菜单
                $("#enterprise").append($("<option value=\"\">全部</option>"));
                for (var i = 0; i < items.length; i++) {
                    $("#enterprise").append($("<option value=\"" + items[i] + "\">" + items[i] + "</option>"));
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
function getRole(){
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
        url: "/api/sysUserRole/queryRoleByUserId/v1",//获取角色下拉框
        dataType: 'json',
        data: _obj,
        aysnc:false,
        success: function (data) {
            if (data.rspCode === '000000') {
                var items = data.body;
                localStorage.setItem("roleCode",items.roleCode);
                localStorage.setItem("roleName",items.roleName);
                localStorage.setItem("department",items.department);
                if(items.roleCode=="user"){
                    $("#addUserBtn").attr("style","display:none");
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
    userName = $.trim($("#inpName").val());
    department = localStorage.getItem("LoginDepartment");
    roleCode = localStorage.getItem("LoginRoleCode");
    roleName = localStorage.getItem("LoginRoleName");
    if(roleName=="管理员"||roleCode=="user"){
        department='';
    }
    sex = $.trim($("#sex").val());
    var _obj = JSON.stringify({
        "pageNum":page,
        "pageSize":10,
        "name":userName,
        "sex":sex,
        "minAge":$.trim($("#minAge").val()),
        "maxAge":$.trim($("#maxAge").val()),
        "status":$.trim($("#status").val()),
        "idCard":$.trim($("#idCard").val()),
        "education":$.trim($("#education").val()),
        "city":$.trim($("#city").val()),
        "source":$.trim($("#source").val()),
        "department":department
        }, 'utf-8');
    $.ajax({
        headers: {
            token: localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/user/list",//获取角色下拉框
        dataType: 'json',
        data: _obj,
        success: function (data) {
            if (data.rspCode === '000000') {
                var list = data.body.list;
                totalPage =data.body.lastPage;
                definedPaginator(page, totalPage, "kkpager", function (n) {
                    queryUserList(roleId,userName,n);
                });
                $("#userTable tbody").html("");
                if(list.length>0) {
                    $.each(list, function (i) {
                        var _tr = $("<tr>");
                        var str =  '         <td>' + parseInt((page - 1) * 10 +i+1) + '</td>' +
                            '                <td>' + this.name + '</td>' +
                            '                <td>' + sexAction(this.sex) + '</td>' +
                            '                <td>' + this.age + '</td>' +
                            '                <td>' + this.idCard + '</td>' +
                            '                <td>' + this.mobile + '</td>' +
                            // '                <td>' + this.wechatCode + '</td>' +
                            // '                <td>' + this.qqCode + '</td>' +
                            '                <td>' + educationAction(this.education) + '</td>' +
                            '                <td>' + this.skill + '</td>' +
                            '                <td>' + this.city + '</td>' +
                            '                <td>' + this.source + '</td>' +
                            '                <td>' + statusAction(this.status) + '</td>' +
                            '                <td id="' + this.id +'">' +
                            '<span class="infoTlt"><a href="javascript:void(0);">详情</a></span>';
                            if(localStorage.getItem("roleCode")=="admin"){
                                str =str+'<span class="redactTlt"><a href="javascript:void(0);">编辑</a></span>' +
                                    '<span class="delTit">删除</span>' ;
                            }else if(localStorage.getItem("roleCode")=="root"){
                                str =str+'<span class="redactTlt"><a href="javascript:void(0);">编辑</a></span>';
                            }
                            str =str+'</td>';
                        _tr.html(str).data(list[i]);
                        $("#userTable tbody").append(_tr);
                    });
                }else{
                    $("#userTable tbody").append('<tr class="table_null"><td style="padding-left: 15px; text-align: left;" colspan=\'15\'>暂无数据</td></tr>');
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
function sexAction(sex){
    var res='';
    switch (sex) {
        case 0:
            res='--'
            break;
        case 1:
            res='男'
            break;
        case 2:
            res='女'
            break;
    }
    return res
}
function statusAction(status){
    var res='';
    switch (status) {
        case 0:
            res='--'
            break;
        case 1:
            res='在职'
            break;
        case 2:
            res='离职'
            break;
    }
    return res
}
function educationAction(education){
    var res='';
    switch (education) {
        case 0:
            res='--'
            break;
        case 1:
            res='高中以下'
            break;
        case 2:
            res='高中'
            break;
        case 3:
            res='专科'
            break;
        case 4:
            res='本科'
            break;
        case 5:
            res='研究生'
            break;
        case 6:
            res='研究生以上'
            break;
    }
    return res
}
function deleteUser(id) {
    var _obj = JSON.stringify({
        id:id
    }, 'utf-8');
    $.ajax({
        headers: {
            token: localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/user/del",//员工删除
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
    var user = JSON.parse(sessionStorage.getItem("user"));
    $("#id").val(user.id);
    $("#name").val(user.name);
    $("#mobile").val(user.mobile);
    $('#sex').val(user.sex);
    $("#idCard").val(user.idCard);
    $("#job").val(user.job);
    $("#wechatCode").val(user.wechatCode);
    $("#qqCode").val(user.qqCode);
    $('#address').val(user.address);
    $("#age").val(user.age);
    $("#education").val(user.education);
    $("#source").val(user.source);
    $('#skill').val(user.skill);
    $("#status").val(user.status);
    $("#history").val(user.history);
    $("#remark").val(user.remark);
    $("#enterprise").val(user.enterprise);
    $("#entryDate").val(setDate(user.entryDate));
    $("#leaveDate").val(setDate(user.leaveDate));
    $("#bankCard").val(user.bankCard);
    $("#bankName").val(user.bankName);
}

function setDate(date){
    return /\d{4}-\d{1,2}-\d{1,2}/g.exec(date);
}