$(function () {
    getRole();
    var date=new Date;
    var nowYear=date.getFullYear();
    $("#year").val(nowYear)
    // var nowMonth=date.getMonth()+1;
    // $("#month").val(nowMonth)
    if(window.location.href.indexOf("user_report.html")>-1){
        getEnterprise();
        getUserCount();
        queryUserList("","",1);
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

    $("#resetBtn").click(function () {
        $("#type").val(1)
        var date=new Date;
        var nowYear=date.getFullYear();
        $("#year").val(nowYear)
        // var nowMonth=date.getMonth()+1;
        // $("#month").val(nowMonth)
        // $('#enterprise').selectpicker('refresh');
        getEnterprise();
        $('#startDate').val("");
        $("#endDate").val("");
        $("#month").val("");

        $('#dateTime').hide();
        $("#monthDiv").hide();
    });
    $("#searchBtn").click(function () {
        var roleId = $("#selectRole").attr("roleId") ;
        var userName = $.trim($("#inpName").val());
        queryUserList(roleId,userName,1);
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

    $("#batch_updateUser").click(function () {
        var ids = sessionStorage.getItem('updateIds');
        var insurance =  $.trim($("#insurance").val());
        var status = $.trim($("#status").val());
        var leaveDate = $.trim($("#leaveDate").val());
        var enterprise = $.trim($("#enterpriseAdd").find("option:selected").text());
        if(enterprise=='-请选择-'){enterprise=''}
        var enNo = $.trim($("#enterpriseAdd").val());
        var flag = true;
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
        var obj = {
            "ids":ids,
            "status":status,
            "enterprise":enterprise,
            "enNo":enNo,
            "leaveDate":leaveDate,
            "insurance":insurance,
        };
        var _obj = JSON.stringify(obj, 'utf-8');

        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: "POST",
            contentType: "text/html; charset=UTF-8",
            url: "/api/user/batchUpdate",//员工修改
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
    });

});

function getUserCount(){
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
        url: "/api/userReport/getUserCount",//获取城市下拉列表
        dataType: 'json',
        data: _obj,
        aysnc:false,
        success: function (data) {
            if (data.rspCode === '000000') {
                var items = data.body;
                if(items.reportAll!=null){
                    $('#allInNum').html(items.reportAll.inNum);
                    $('#allOutNum').html(items.reportAll.outNum);
                }
                if(items.reportToday!=null){
                    $('#todayInNum').html(items.reportToday.inNum);
                    $('#todayOutNum').html(items.reportToday.outNum);
                }

                setTimeout(function () {
                    getUserCount();
                }, 1000)
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
        var idCard = $.trim($("#idCard").val());
        var mobile = $.trim($("#mobile").val());
        var wechatCode = $.trim($("#wechatCode").val());
        var qqCode = $.trim($("#qqCode").val());
        var entryDate = $.trim($("#entryDate").val());
        var city = $.trim($("#city").val());
        var address = $.trim($("#address").val());
        var age = GetAge(idCard);
        var sex = getSex(idCard);
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
        }
        if(!validateIdCard(idCard)){
            $("#idCard")[0].style.border="1px solid red";
            showMsg('.error-msg', "请输入正确身份证号");
            return false;
        }
        var realCard = $.trim($("#realCard").val());
        if(realCard!=null&&realCard!=''&&!validateIdCard(realCard)){
            $("#realCard")[0].style.border="1px solid red";
            showMsg('.error-msg', "请输入正确身份证号");
            return false;
        }
        //如果在职状态是离职、工作未满七天、未满七已处理，则必须填写离职日期
        if(status==2||status==4||status==5){
            if(leaveDate==null||leaveDate==''){
                $("#leaveDate")[0].style.border="1px solid red";
                showMsg('.error-msg', "请输入离职日期");
                return false;
            }
        }
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
            "realCard" : realCard
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
function editUser(){
    var id = $.trim($("#id").val());
    var name = $.trim($("#name").val());
    var idCard = $.trim($("#idCard").val());
    var mobile = $.trim($("#mobile").val());
    var wechatCode = $.trim($("#wechatCode").val());
    var qqCode = $.trim($("#qqCode").val());
    var entryDate = $.trim($("#entryDate").val());
    var city = $.trim($("#city").val());
    var address = $.trim($("#address").val());
    var age = GetAge(idCard);
    var sex = getSex(idCard);
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
    }
    if(!validateIdCard(idCard)){
        $("#idCard")[0].style.border="1px solid red";
        showMsg('.error-msg', "请输入正确身份证号");
        return false;
    }
    var realCard = $.trim($("#realCard").val());
    if(realCard!=null&&realCard!=''&&!validateIdCard(realCard)){
        $("#realCard")[0].style.border="1px solid red";
        showMsg('.error-msg', "请输入正确身份证号");
        return false;
    }
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
        "realCard" : realCard
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
                if(items.roleCode=="001"){
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
    department = localStorage.getItem("LoginDepartment");
    roleCode = localStorage.getItem("LoginRoleCode");
    roleName = localStorage.getItem("LoginRoleName");
    var year = $.trim($("#year").val());
    var type = $.trim($("#type").val());
    var month = $.trim($("#month").val());
    var flag = true;
    var date=new Date;
    var nowYear=date.getFullYear();
    // if(!year == nowYear){
    //     flag = false;
    // }
    // var nowMonth=date.getMonth()+1;
    // if(month != ''&& month!=null &&month!=nowMonth){
    //     flag = false;
    // }
    var enNos= $('#enterprise').selectpicker('val');
    var startDate = $('#startDate').val();
    var endDate = $("#endDate").val();
    var _obj = JSON.stringify({
        "pageNum":page,
        "pageSize":10,
        "type":type,
        "year":year,
        "month":month,
        "flag":flag,
        "enNos":enNos,
        "startDate":startDate,
        "endDate":endDate,
        "userNo":localStorage.getItem('userNo'),
        "roleCode":localStorage.getItem('LoginRoleCode'),
        "startDate":$.trim($("#startDate").val()),
        "endDate":$.trim($("#endDate").val())

    }, 'utf-8');
    $.ajax({
        headers: {
            token: localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/userReport/list",//获取角色下拉框
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
                        var str =  
                            '                <td>' + parseInt((page - 1) * 10 +i+1) + '</td>' +
                            '                <td>' + this.enName + '</td>' +
                            '                <td>' + this.inNum + '</td>' +
                            '                <td>' + this.outNum + '</td>' +
                            '                <td>' + this.sumNum + '</td>' +
                            '                <td>' + this.rate + '%</td>' ;
                            str =str+'</td>';
                        _tr.html(str).data(list[i]);
                        $("#userTable tbody").append(_tr);
                    });
                    initTableCheckbox();
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
                    queryUserList("","",1,10);
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
    $("#age").val(GetAge(user.idCard));
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


function GetAge(identityCard) {
    var len = (identityCard + "").length;
    if (len == 0) {
        return 0;
    } else {
        if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
        {
            return 0;
        }
    }
    var strBirthday = "";
    if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
    {
        strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
    }
    if (len == 15) {
        strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
    }
    //时间字符串里，必须是“/”
    var birthDate = new Date(strBirthday);
    var nowDateTime = new Date();
    var age = nowDateTime.getFullYear() - birthDate.getFullYear();
    //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
    if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


function getSex(val) {
        birthdayValue=val.charAt(6)+val.charAt(7)+val.charAt(8)+val.charAt(9)+'-'+val.charAt(10)+val.charAt(11)
            +'-'+val.charAt(12)+val.charAt(13);
        if(parseInt(val.charAt(16)/2)*2!=val.charAt(16))
            return 1;
        else
            return 2;
}

// 18位身份证号最后一位校验
function IDCard(Num)
{
    if (Num.length!=18)
        return false;
    var x=0;
    var y='';

    for(i=18;i>=2;i--)
        x = x + (square(2,(i-1))%11)*parseInt(Num.charAt(19-i-1));
    x%=11;
    y=12-x;
    if (x==0)
        y='1';
    if (x==1)
        y='0';
    if (x==2)
        y='X';
    return y;
}

// 求得x的y次方
function square(x,y)
{
    var i=1;
    for (j=1;j<=y;j++)
        i*=x;
    return i;
}

function validateIdCard(idCard) {
    //15位和18位身份证号码的正则表达式
    var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
            var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
            var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }
            var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
            var idCardLast = idCard.substring(17);//得到最后一位身份证号码
            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
                if (idCardLast == "X" || idCardLast == "x") {
                    return true;
                    //alert("恭喜通过验证啦！");
                } else {
                    return false;
                    //alert("身份证号码错误！");
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    //alert("恭喜通过验证啦！");
                    return true;
                } else {
                    return false;
                    //alert("身份证号码错误！");
                }
            }
        }
    } else {
        //alert("身份证格式不正确!");
        return false;
    }

}
function initTableCheckbox() {
    var $thr = $('table thead tr');
    var $checkAllTh = $('checkAll');
    // /*将全选/反选复选框添加到表头最前，即增加一列*/
    // $thr.prepend($checkAllTh);
    /*“全选/反选”复选框*/
    var $checkAll = $thr.find('input');
    $checkAll.click(function(event){
        /*将所有行的选中状态设成全选框的选中状态*/
        $tbr.find('input').prop('checked',$(this).prop('checked'));
        /*并调整所有选中行的CSS样式*/
        if ($(this).prop('checked')) {
            $tbr.find('input').parent().parent().addClass('warning');
        } else{
            $tbr.find('input').parent().parent().removeClass('warning');
        }
        /*阻止向上冒泡，以防再次触发点击操作*/
        event.stopPropagation();
    });
    /*点击全选框所在单元格时也触发全选框的点击操作*/
    $checkAllTh.click(function(){
        $(this).find('input').click();
    });
    var $tbr = $('table tbody tr');
    // var $checkItemTd = $('<td><input type="checkbox" name="checkItem" /></td>');
    // /*每一行都在最前面插入一个选中复选框的单元格*/
    // $tbr.prepend($checkItemTd);
    /*点击每一行的选中复选框时*/
    $tbr.find('input').click(function(event){
        /*调整选中行的CSS样式*/
        $(this).parent().parent().toggleClass('warning');
        /*如果已经被选中行的行数等于表格的数据行数，将全选框设为选中状态，否则设为未选中状态*/
        $checkAll.prop('checked',$tbr.find('input:checked').length == $tbr.length ? true : false);
        /*阻止向上冒泡，以防再次触发点击操作*/
        event.stopPropagation();
    });
    /*点击每一行时也触发该行的选中操作*/
    $tbr.click(function(){
        $(this).find('input').click();
    });
}

function showQueyBytype() {
    var type = $.trim($("#type").val());
    if(type==1){//年
        $("#yearDiv").show();
        $("#monthDiv").hide();
        $("#dateTime").hide();
        return;
    }
    if(type==2){//月
        $("#yearDiv").show();
        $("#monthDiv").show();
        $("#dateTime").hide();

        $('#month').val(1);
        return;
    }
    if(type==3){//自定义
        $("#yearDiv").hide();
        $("#monthDiv").hide();
        $("#dateTime").show();
        return;
    }

}

// function showByYear() {
//     var roleId = $("#selectRole").attr("roleId") ;
//     var userName = $.trim($("#inpName").val());
//     queryUserList(roleId,userName,1);
// }

function getStatisticDataList() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    var names = [];    //类别数组（实际用来盛放X轴坐标值）
    var series1 = [];
    var series2 = [];
    var series3 = [];
    var series4 = [];
    var series5 = [];
    var series6 = [];
    var series7 = [];
    var series8 = [];
    var series9 = [];
    var series10 = [];
    var series11 = [];
    var series12 = [];
    var stageType;
    var option = {
        title: {
            text: ''
        },
        tooltip : {
            enterable:true,
            trigger: 'axis',
            axisPointer : { // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'// 默认为直线，可选为：'line' | 'shadow'
            },
            formatter:function(params)//数据格式
            {
                var relVal = params[0].name+ '&nbsp;&nbsp;' +stageType;
                relVal+='<table style="color: white;font-size: 14px">'
                for(i= 0 ;i<params.length;i++){
                    relVal += '<tr><td>'+(i+1)+'.</td><td>&nbsp;&nbsp;</td><td>';
                    relVal += params[i].seriesName+'</td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>';
                    relVal += params[i].value +'人</td></tr>';
                }
                relVal+='</table>';
                return relVal;
            }
        },
        legend: [
            {data: ['0-5分钟(含)', '5-30分钟(含)', '30分钟-1小时(含)', '1-12小时(含)', '12-24小时(含)', '1-3天(含)']},
            {top: '20', data: ['3-7天(含)', '7-14天(含)', '14-30天(含)', '30-60天(含)', '60-90天(含)', '90天以上']}
        ],
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                //保存图片
//                    saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: '0-5分钟(含)',
                type: 'line',
                data: series1
            },
            {
                name: '5-30分钟(含)',
                type: 'line',
                data: series2
            },
            {
                name: '30分钟-1小时(含)',
                type: 'line',
                data: series3
            },
            {
                name: '1-12小时(含)',
                type: 'line',
                data: series4
            },
            {
                name: '12-24小时(含)',
                type: 'line',
                data: series6
            },
            {
                name: '1-3天(含)',
                type: 'line',
                data: series6
            },

            {
                name: '3-7天(含)',
                type: 'line',
                data: series7
            },
            {
                name: '7-14天(含)',
                type: 'line',
                data: series8
            },
            {
                name: '14-30天(含)',
                type: 'line',
                data: series9
            },
            {
                name: '30-60天(含)',
                type: 'line',
                data: series10
            },
            {
                name: '60-90天(含)',
                type: 'line',
                data: series11
            },
            {
                name: '90天以上',
                type: 'line',
                data: series12
            }
        ]
    };
    myChart.showLoading();    //数据加载完之前先显示一段简单的loading动画
    $.ajax({
        type: 'post',
        url: getAbsolutePathWithProtocol("/sjpTWmsUserBehavior/getxAxis"),//请求数据的地址
        data: {"startDate":$("#startDate").val(),"endDate":$("#endDate").val(),"stageType":$("#stageType").val()},
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            stageType = result.data.stageType;
            //请求成功时执行该函数内容，result即为服务器返回的json对象
            $.each(result.data.xAxis, function (index, item) {
                names.push(item);    //挨个取出类别并填入类别数组
            });
            $.each(result.data.series[0], function (index, item) {
                series1.push(item);
            });
            $.each(result.data.series[1], function (index, item) {
                series2.push(item);
            });
            $.each(result.data.series[2], function (index, item) {
                series3.push(item);
            });
            $.each(result.data.series[3], function (index, item) {
                series4.push(item);
            });
            $.each(result.data.series[4], function (index, item) {
                series5.push(item);
            });
            $.each(result.data.series[5], function (index, item) {
                series6.push(item);
            });
            $.each(result.data.series[6], function (index, item) {
                series7.push(item);
            });
            $.each(result.data.series[7], function (index, item) {
                series8.push(item);
            });
            $.each(result.data.series[8], function (index, item) {
                series9.push(item);
            });
            $.each(result.data.series[9], function (index, item) {
                series10.push(item);
            });
            $.each(result.data.series[10], function (index, item) {
                series11.push(item);
            });
            $.each(result.data.series[11], function (index, item) {
                series12.push(item);
            });
            myChart.hideLoading();    //隐藏加载动画
            myChart.setOption({        //加载数据图表
                xAxis: {
                    data: names
                },

                series: [
                    {data: series1},
                    {data: series2},
                    {data: series3},
                    {data: series4},
                    {data: series5},
                    {data: series6},
                    {data: series7},
                    {data: series8},
                    {data: series9},
                    {data: series10},
                    {data: series11},
                    {data: series12}
                ]
            });
        },
        error: function (errorMsg) {
            //请求失败时执行该函数
            alert("图表请求数据失败!");
            myChart.hideLoading();
        }
    });
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

// 点击显示日历
$('#startDate').datetimepicker({
    format: 'yyyy-mm-dd',
    minView: 2,
    language: 'zh-CN',
    endDate: getNowFormatDate(),
    autoclose: true
});
$('#endDate').datetimepicker({
    format: 'yyyy-mm-dd',
    minView: 2,
    language: 'zh-CN',
    endDate: getNowFormatDate(),
    autoclose: true
});
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
