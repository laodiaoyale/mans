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
        var enterprise= $('#enterprise').selectpicker('val');
        console.log(enterprise)
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
        // $('#enterprise').selectpicker('refresh');
        getEnterprise();
        $("#insurance").prop('selectedIndex', 0);
        $('#startEntryDate').val("");
        $("#endEntryDate").val("");
        $('#startLeaveDate').val("");
        $("#endLeaveDate").val("");
    });

    //导入excel文件
    $("#saveZipButton").on('click', function(){
        var filepath = encodeURI(encodeURI($("#articleImageFile").val()));
        var extname = filepath.substring(filepath.lastIndexOf(".")+1,filepath.length);//文件后缀
        extname = extname.toLowerCase();//处理了大小写
        if(extname!= "xls" && extname!= "xlsm" && extname!= "xlsx"){
            alert("导入文件格式不对,请按模版导入！");
            return;
        }
        var obj = {
            "id":localStorage.getItem('id'),
            "path":extname,
        };
        var _obj = JSON.stringify(obj, 'utf-8');
        alert(name);
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: "POST",
            contentType: "text/html; charset=UTF-8",
            url: "/api/user/importData",//员工增加
            data: _obj,
            dataType: 'json',
            // 告诉jQuery不要去处理发送的数据
            processData : false,
            // 告诉jQuery不要去设置Content-Type请求头
            contentType : false,
            beforeSend:function(){
                console.log("正在进行，请稍候");
            },
            success : function(responseStr) {
                if(responseStr=="01"){
                    alert("导入成功");
                }else{
                    alert("导入失败");
                }
            }
        });
    });

    $(document).ready(function(){
        $("#importExcel").click(function(){ if(checkData()){
            $('#form1').ajaxSubmit({
                url:'/api/user/importData',
                dataType: 'text',
                async: false,
                success: resutlMsg,
                error: errorMsg
            });
            function resutlMsg(msg){
                alert(msg);
                $("#upfile").val("");
            }
            function errorMsg(){
                alert("导入excel出错！");
            }
        }
        });
    });

});
//JS校验form表单信息
function checkData(){
    var fileDir = $("#upfile").val();
    var suffix = fileDir.substr(fileDir.lastIndexOf("."));
    if("" == fileDir){
        alert("选择需要导入的Excel文件！");
        return false;
    }
    if(".xls" != suffix && ".xlsx" != suffix ){
        alert("选择Excel格式的文件导入！");
        return false;
    }
    return true;
}


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
        var enterprise = $.trim($("#enterpriseAdd").find("option:selected").text());
        if(enterprise=='-请选择-'){enterprise=''}
        var enNo = $.trim($("#enterpriseAdd").val());
        var remark = $.trim($("#remark").val());
        var entryDate = $.trim($("#entryDate").val());
        var leaveDate = $.trim($("#leaveDate").val());
        var bankCard = $.trim($("#bankCard").val());
        var bankName = $.trim($("#bankName").val());
        var insurance =  $.trim($("#insurance").val());
        var contacts =  $.trim($("#contacts").val());
        var relation =  $.trim($("#relation").val());
        var contactNumber =  $.trim($("#contactNumber").val());

        var flag = true;
        $('input[required]').each(function() {
            if($(this).val() == ""){
                $(this)[0].style.border="1px solid red";
                flag =  false;
            }
        });
        $('select[required]').each(function() {
            if($(this).val() == 0){
                $(this)[0].style.border="1px solid red";
                flag =  false;
            }
        });
        if(!flag){
            showMsg('.error-msg', "请输入必填项");
            return flag;
        }
    //     if(!flag){
    //         showMsg('.error-msg', "请选择必填项");
    //         return flag;
    //     }
        // if(name==""){
        //     showMsg('.error-msg', "请输入姓名");
        //     return false;
        // }else if(sex==""){
        //     showMsg('.error-msg', "请选择性别");
        //     return false;
        // }else if(idCard==""){
        //     showMsg('.error-msg', "请输入身份证号");
        //     return false;
        // }else if(mobile==""){
        //     showMsg('.error-msg', "请输入手机号");
        //     return false;
        // }else
        if(!isPhoneNum(mobile) || mobile.length != 11){
            showMsg('.error-msg', "请输入正确格式的手机号");
            return false;
        }
        // else if(insurance==""){
        //     showMsg('.error-msg', "请选择商业保险");
        //     return false;
        // }else if(enNo==""){
        //     showMsg('.error-msg', "请选择企业");
        //     return false;
        // }else if(status==""){
        //     showMsg('.error-msg', "请选择在职状态");
        //     return false;
        // }else if(entryDate==""){
        //     showMsg('.error-msg', "请选择入职时间");
        //     return false;
        // }
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
                "enNo":enNo,
                "remark":remark,
                "entryDate":entryDate,
                "leaveDate":leaveDate,
                "bankCard":bankCard,
                "bankName":bankName,
                "insurance":insurance,
                "contacts":contacts,
                "relation":relation,
                "contactNumber":contactNumber,
                "realName":  $.trim($("#realName").val()),
                "realCard" : $.trim($("#realCard").val())
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
                        if(data.rspMsg == "该身份证号已存在"){
                            $("#idCard")[0].style.border="1px solid red";
                        }
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
    var enterprise = $.trim($("#enterpriseAdd").find("option:selected").text());
    if(enterprise=='-请选择-'){enterprise=''}
    var enNo = $.trim($("#enterpriseAdd").val());
    var remark = $.trim($("#remark").val());

    var entryDate = $.trim($("#entryDate").val());
    var leaveDate = $.trim($("#leaveDate").val());
    var bankCard = $.trim($("#bankCard").val());
    var bankName = $.trim($("#bankName").val());
    var insurance =  $.trim($("#insurance").val());
    var contacts =  $.trim($("#contacts").val());
    var relation =  $.trim($("#relation").val());
    var contactNumber =  $.trim($("#contactNumber").val());

    var flag = true;
    $('input[required]').each(function() {
        if($(this).val() == ""){
            $(this)[0].style.border="1px solid red";
            flag =  false;
        }
    });
    $('select[required]').each(function() {
        if($(this).val() == 0){
            $(this)[0].style.border="1px solid red";
            flag =  false;
        }
    });
    if(!flag){
        showMsg('.error-msg', "请输入必填项");
        return flag;
    }

    if(!isPhoneNum(mobile) || mobile.length != 11){
        showMsg('.error-msg', "请输入正确格式的手机号");
        return false;
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
            "enNo":enNo,
            "remark":remark,
            "entryDate":entryDate,
            "leaveDate":leaveDate,
            "bankCard":bankCard,
            "bankName":bankName,
            "insurance":insurance,
            "contacts":contacts,
            "relation":relation,
            "contactNumber":contactNumber,
            "realName":  $.trim($("#realName").val()),
            "realCard" : $.trim($("#realCard").val())
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
                    if(data.rspMsg == "该身份证号已存在"){
                        $("#idCard")[0].style.border="1px solid red";
                    }
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
        "userNo":localStorage.getItem('userNo'),
        "roleCode":localStorage.getItem('LoginRoleCode')

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
                $("#enterprise").html(""); //绑定模号下拉菜单
                for (var i = 0; i < items.length; i++) {
                    $("#enterprise").append($("<option value=\"" + items[i].id + "\">" + items[i].enCode + "</option>"));
                }
                $('#enterprise').selectpicker('refresh');
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
                if(items.roleCode=="admin"){
                    $('#import').css("display","block");
                    $('#export').css("display","block");
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

    var startEntryDate = $('#startEntryDate').val();
    var endEntryDate = $("#endEntryDate").val();
    var startLeaveDate = $('#startLeaveDate').val();
    var endLeaveDate = $("#endLeaveDate").val();
    var enNos= $('#enterprise').selectpicker('val');
    if(startEntryDate!=null&&endEntryDate!=null&&endEntryDate<startEntryDate){
        showMsg($('.error-msg'), "开始时间必须小于结束时间");
        return;
    }
    if(startLeaveDate!=null&&endLeaveDate!=null&&endLeaveDate<startLeaveDate){
        showMsg($('.error-msg'), "开始时间必须小于结束时间");
        return;
    }

    if(roleName=="管理员"||roleCode=="user"){
        department='';
    }
    var sex = $.trim($("#sex").val());
    var insurance = $.trim($("#insurance").val());
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
        "department":department,
        "startEntryDate":$.trim($("#startEntryDate").val()),
        "endEntryDate":$.trim($("#endEntryDate").val()),
        "startLeaveDate":$.trim($("#startLeaveDate").val()),
        "endLeaveDate":$.trim($("#endLeaveDate").val()),
        "insurance":insurance,
        "enNos":enNos,
        "userNo":localStorage.getItem('userNo'),
        "roleCode":localStorage.getItem('LoginRoleCode')

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
                            '                <td>' + this.enterprise + '</td>' +
                            '                <td>' + this.source + '</td>' +
                            '                <td>' + statusAction(this.status) + '</td>' +
                            '                <td>' + setDate(this.entryDate) + '</td>' +
                            '                <td>' + setDate(this.leaveDate) + '</td>' +
                            '                <td>' + insuranceAction(this.insurance) + '</td>' +
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
            res=''
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
            res=''
            break;
        case 1:
            res='在职'
            break;
        case 2:
            res='离职'
            break;
        case 3:
            res='已请假'
            break;
        case 4:
            res='工作未满七天'
            break;
        case 5:
            res='未满七已处理'
            break;
    }
    return res
}
function insuranceAction(insurance){
    var res='';
    switch (insurance) {
        case 0:
            res=''
            break;
        case 1:
            res='已购买保险'
            break;
        case 2:
            res='离职已替换'
            break;
        case 3:
            res='离职未替换'
            break;
        case 4:
            res='待购买保险'
            break;
    }
    return res
}

function educationAction(education){
    var res='';
    switch (education) {
        case 0:
            res=''
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
    $("#insurance").val(user.insurance);
    $("#contacts").val(user.contacts);
    $("#relation").val(user.relation);
    $("#contactNumber").val(user.contactNumber);
    $("#realName").val(user.realName);
    $("#realCard").val(user.realCard);
}

function setDate(date){
    if(date==null)
        return"";
    return /\d{4}-\d{1,2}-\d{1,2}/g.exec(date);
}
//js直接导出数据，但是只限当前页面数据
var idTmr;
function getExplorer() {
    var explorer = window.navigator.userAgent ;
    //ie
    if (explorer.indexOf("MSIE") >= 0) {
        return 'ie';
    }
    //firefox
    else if (explorer.indexOf("Firefox") >= 0) {
        return 'Firefox';
    }
    //Chrome
    else if(explorer.indexOf("Chrome") >= 0){
        return 'Chrome';
    }
    //Opera
    else if(explorer.indexOf("Opera") >= 0){
        return 'Opera';
    }
    //Safari
    else if(explorer.indexOf("Safari") >= 0){
        return 'Safari';
    }
}
function exprotExcel(tableid) {
    if(getExplorer()=='ie')
    {
        var curTbl = document.getElementById(tableid);
        var oXL = new ActiveXObject("Excel.Application");
        var oWB = oXL.Workbooks.Add();
        var xlsheet = oWB.Worksheets(1);
        var sel = document.body.createTextRange();
        sel.moveToElementText(curTbl);
        sel.select();
        sel.execCommand("Copy");
        xlsheet.Paste();
        oXL.Visible = true;
        try {
            var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
        } catch (e) {
            print("Nested catch caught " + e);
        } finally {
            oWB.SaveAs(fname);
            oWB.Close(savechanges = false);
            oXL.Quit();
            oXL = null;
            idTmr = window.setInterval("Cleanup();", 1);
        }
    }
    else
    {
        tableToExcel(tableid)
    }
}
function Cleanup() {
    window.clearInterval(idTmr);
    CollectGarbage();
}
var tableToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,',
        template = '<html><head><meta charset="UTF-8"></head><body><table>{table}</table></body></html>',
        base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
        format = function(s, c) {
            return s.replace(/{(\w+)}/g,
                function(m, p) { return c[p]; }) }
    return function(table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
        window.location.href = uri + base64(format(template, ctx))
    }
})()


function exprotExcel1(){
    var roleId = $("#selectRole").attr("roleId") ;
    var userName = $.trim($("#inpName").val());
    department = localStorage.getItem("LoginDepartment");
    roleCode = localStorage.getItem("LoginRoleCode");
    roleName = localStorage.getItem("LoginRoleName");

    var startEntryDate = $('#startEntryDate').val();
    var endEntryDate = $("#endEntryDate").val();
    var startLeaveDate = $('#startLeaveDate').val();
    var endLeaveDate = $("#endLeaveDate").val();
    var enNos= $('#enterprise').selectpicker('val');
    if(startEntryDate!=null&&endEntryDate!=null&&endEntryDate<startEntryDate){
        showMsg($('.error-msg'), "开始时间必须小于结束时间");
        return;
    }
    if(startLeaveDate!=null&&endLeaveDate!=null&&endLeaveDate<startLeaveDate){
        showMsg($('.error-msg'), "开始时间必须小于结束时间");
        return;
    }
    if(roleName=="管理员"||roleCode=="user"){
        department='';
    }
    var sex = $.trim($("#sex").val());
    var insurance = $.trim($("#insurance").val());
    var _obj = JSON.stringify({
        "name":userName,
        "sex":sex,
        "minAge":$.trim($("#minAge").val()),
        "maxAge":$.trim($("#maxAge").val()),
        "status":$.trim($("#status").val()),
        "idCard":$.trim($("#idCard").val()),
        "education":$.trim($("#education").val()),
        "city":$.trim($("#city").val()),
        "source":$.trim($("#source").val()),
        "department":department,
        "startEntryDate":$.trim($("#startEntryDate").val()),
        "endEntryDate":$.trim($("#endEntryDate").val()),
        "startLeaveDate":$.trim($("#startLeaveDate").val()),
        "endLeaveDate":$.trim($("#endLeaveDate").val()),
        "insurance":insurance,
        "enNos":enNos,
        "userNo":localStorage.getItem('userNo'),
        "roleCode":localStorage.getItem('LoginRoleCode')

    }, 'utf-8');
    location.href="/api/user/exportData?data="+encodeURI(_obj);//这里的result则是选取的查询条件
}