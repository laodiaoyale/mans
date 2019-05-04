$(function () {
    getRole();
    if(window.location.href.indexOf("supplier_list.html")>-1){
        queryResourceInfoList("","",1);
    }
    if(window.location.href.indexOf("supplier_info.html")>-1){
        $("#path").html(" > 资源管理");
        initUser();
        //点击其他地方收起下拉框
        $("body").on("click",function(event){
            if(event.target.className != "cludeBox"){
                $(".roleSelect").hide()
            }
        })
    }
    if(window.location.href.indexOf("supplier_add.html")>-1){
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
    if(window.location.href.indexOf("supplier_add.html?type=edit")>-1){
        $("#path").html(" > 团队修改");
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
        window.location.href = 'supplier_add.html';
    });
    // 点击编辑跳转到编辑页面
    $('#submitBtn_infoUser').click(function () {
        window.location.href = 'supplier_list.html';
    });
    // 点击编辑跳转到编辑页面
    $('#submitBtn_cancel').click(function () {
        window.location.href = 'supplier_list.html';
    });
    var DelId = "";
    // 点击删除弹出二级确认页
    $("#userTable").on('click','.delTit',function () {
        DelId = $(this).parents("td").attr("id");
        $('.mask').show();
        $('.sureDel').show();
    });
    $("#userTable").on('click','.infoTlt',function () {
        var supplier =  JSON.stringify($(this).parents("tr").data());
        sessionStorage.setItem("supplier",supplier);
        window.location.href = "supplier_info.html";
    });
    $("#userTable").on('click','.redactTlt',function () {
        var supplier =  JSON.stringify($(this).parents("tr").data());
        sessionStorage.setItem("supplier",supplier);
        window.location.href = "supplier_add.html?type=edit";
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
        if(window.location.href.indexOf("supplier_add.html?type=edit")>-1){
            editUser();
        }else {
            addResource();
        }
    });
    $("#searchBtn").click(function () {
        var roleId = $("#selectRole").attr("roleId") ;
        var userName = $.trim($("#inpName").val());
        var sex = $.trim($("#sex").val());
        console.log(sex)
        var enterprise= $('#enterprise').selectpicker('val');
        console.log(enterprise)
        queryResourceInfoList(roleId,userName,1);
    });

    $("#resetBtn").click(function () {
        $("#inpName").val("");
        $("#sex").prop('selectedIndex', 0);
        $("#idCard").val("");
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
function addResource(){
        var id = $.trim($("#id").val());
        var name = $.trim($("#name").val());
        var idCard = $.trim($("#idCard").val());
        var mobile1 = $.trim($("#mobile1").val());
        var mobile2 = $.trim($("#mobile2").val());
        var address = $.trim($("#address").val());
        var bankCard = $.trim($("#bankCard").val());
        var bankName = $.trim($("#bankName").val());
        var bankAddress = $.trim($("#bankAddress").val());
        var region = $.trim($("#region").val());
        var company =  $.trim($("#company").val());
        var distribution =  $.trim($("#distribution").val());
        var supplierLev = $.trim($("#supplierLev").val());
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
        if(!validateIdCard(idCard)){
            $("#idCard")[0].style.border="1px solid red";
            showMsg('.error-msg', "请输入正确身份证号");
            return false;
        }
        var obj = {
            "id":id,
            "type":2,
            "name":name,
            "idCard":idCard,
            "sex" : getSex(idCard),
            "mobile1":mobile1,
            "mobile2":mobile2,
            "region":region,
            "address":address,
            "bankCard":bankCard,
            "bankName":bankName,
            "bankAddress":bankAddress,
            "company":company,
            "distribution":distribution,
            "supplierLev":supplierLev
        };
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: "POST",
            contentType: "text/html; charset=UTF-8",
            url: "/api/resource/addOrUpdate",//员工增加
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if (data.rspCode === '000000') {
                    showMsg($('.error-msg'), '提交成功');
                    setTimeout(function () {
                        window.location.href = 'supplier_list.html' ;
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
    var mobile1 = $.trim($("#mobile1").val());
    var mobile2 = $.trim($("#mobile2").val());
    var address = $.trim($("#address").val());
    var bankCard = $.trim($("#bankCard").val());
    var bankName = $.trim($("#bankName").val());
    var bankAddress = $.trim($("#bankAddress").val());
    var region = $.trim($("#region").val());
    var company =  $.trim($("#company").val());
    var distribution =  $.trim($("#distribution").val());
    var supplierLev = $.trim($("#supplierLev").val());
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
    if(!validateIdCard(idCard)){
        $("#idCard")[0].style.border="1px solid red";
        showMsg('.error-msg', "请输入正确身份证号");
        return false;
    }
    var obj = {
        "id":id,
        "name":name,
        "idCard":idCard,
        "sex" : getSex(idCard),
        "mobile1":mobile1,
        "mobile2":mobile2,
        "region":region,
        "address":address,
        "bankCard":bankCard,
        "bankName":bankName,
        "bankAddress":bankAddress,
        "company":company,
        "distribution":distribution,
        "supplierLev":supplierLev
    };
    var _obj = JSON.stringify(obj, 'utf-8');
    $.ajax({
        headers: {
            token: localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/resource/addOrUpdate",//员工修改
        data: _obj,
        dataType: 'json',
        success: function (data) {
            if (data.rspCode === '000000') {
                showMsg($('.error-msg'), '提交成功');
                setTimeout(function () {
                    window.location.href = 'supplier_list.html' ;
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

function queryResourceInfoList(roleId,userName,page){
    userName = $.trim($("#inpName").val());
    department = localStorage.getItem("LoginDepartment");
    roleCode = localStorage.getItem("LoginRoleCode");
    roleName = localStorage.getItem("LoginRoleName");
    var sex = $.trim($("#sex").val());
    var _obj = JSON.stringify({
        "pageNum":page,
        "pageSize":10,
        "name":userName,
        "sex":sex,
        "type":2,
        "idCard":$.trim($("#idCard").val()),
        "userNo":localStorage.getItem('userNo'),
        "roleCode":localStorage.getItem('LoginRoleCode')

    }, 'utf-8');
    $.ajax({
        headers: {
            token: localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/resource/list",//获取角色下拉框
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
                            '                <td>' + this.supplierLev + '</td>' +
                            '                <td>' + setDistribution(this.distribution) + '</td>' +
                            '                <td>' + this.mobile1 + '</td>' +
                            '                <td>' + this.mobile2 + '</td>' +
                            '                <td>' + this.region + '</td>' +
                            '                <td>' + this.idCard + '</td>' +
                            '                <td>' + this.bankCard + '</td>' +
                            '                <td>' + this.bankName + '</td>' +
                            '                <td>' + this.bankAddress + '</td>' +
                            '                <td>' + this.company + '</td>' +
                            '                <td>' + this.address + '</td>' +
                            '                <td id="' + this.id +'">' +
                            '<span class="infoTlt"><a href="javascript:void(0);">详情</a></span>';
                            if(localStorage.getItem("roleCode")=="admin"){
                                str =str+'<span class="redactTlt"><a href="javascript:void(0);">编辑</a></span>' +
                                    '<span class="delTit">删除</span>' ;
                            }else if(localStorage.getItem("roleCode")=="001"){
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
function setDistribution(distribution){
    var res='';
    switch (distribution) {
        case 0:
            res=''
            break;
        case 1:
            res='大龄工'
            break;
        case 2:
            res='年轻人'
            break;
        case 3:
            res='均有'
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
        url: "/api/resource/del",//员工删除
        dataType: 'json',
        data: _obj,
        success: function (data) {
            if (data.rspCode === '000000') {
                showMsg($('.error-msg'), '删除成功');
                setTimeout(function () {
                    queryResourceInfoList("","",1);
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
    var supplier = JSON.parse(sessionStorage.getItem("supplier"));
    $("#id").val(supplier.id);
    $("#name").val(supplier.name);
    $("#distribution").val(supplier.distribution);
    $("#mobile1").val(supplier.mobile1);
    $("#mobile2").val(supplier.mobile2);
    $("#idCard").val(supplier.idCard);
    $('#address').val(supplier.address);
    $("#bankCard").val(supplier.bankCard);
    $("#bankName").val(supplier.bankName);
    $("#bankAddress").val(supplier.bankAddress);
    $("#company").val(supplier.company);
    $("#region").val(supplier.region);
    $("#supplierLev").val(supplier.supplierLev);

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