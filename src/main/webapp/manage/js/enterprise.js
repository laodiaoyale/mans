$(function () {
    // 点击跳转到编辑页
    $('.limitsWrap').click(function () {
        window.location.href = 'enterprise_add.html';
    });
    // 点击删除弹出二级确认页
    $(document).on('click','.delTit',function(){
        $('.mask,.sureDel').show();
        var _this = $(this);
        $('.sureDel').data('id', _this.data('id'));
    });
    // 点击二级确认页上取消按钮，关闭二级确认页
    $('.del_cancel').click(function () {
        $('.mask').hide();
        $('.sureDel').hide();
    });
    focusOrBlur($('.listOfOptions .com-span'),'border-color','#398BF8','#D9D9D9');
    //角色新增
    $('#submitBtn_addRole').click(function(){
        roleAddFn();
    })
    //角色删除
    $(document).on('click','.del_sure',function(){
        roleDelteFn();
    })

    $("#enterpriseTable").on('click','.redactTlt',function () {
        var user =  JSON.stringify($(this).parents("tr").data());
        sessionStorage.setItem("user",user);
        window.location.href = "enterprise_add.html?type=edit";
    });
    if(window.location.href.indexOf("enterprise_add.html?type=edit")>-1){
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

});
// input框获取/失去焦点时属性变化
function focusOrBlur(obj,ele,val1,val2) { //对象，元素，属性值1，属性值2
    obj.focus(function () {
        $(this).css(ele,val1);
    }).blur(function () {
        $(this).css(ele,val2);
    });
}
//角色列表渲染
getRoleListFn();
function getRoleListFn(){
    var obj = new Object();
    var _obj = JSON.stringify(obj,'utf-8');
    $.ajax({
        headers: {
            token:localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/sysEnterprise/list",//角色列表接口
        data: _obj,
        dataType: 'json',
        success : function(data){
            if(data.rspCode==='000000'){
                var roleListData = data.body;
                if(roleListData){
                    var roleList = $.map(roleListData,function(o,i){
                        var str ='<td>' +
                            //'<span class="redactTlt"><a href="javascript:void(0);"><img src="../images/compile.svg" />编辑</a></span>' +
                            '<span class="delTit noselect" data-id = "'+o.id +'"><img src="../images/delete.svg" />删除</span></td>' ;
                        return '<tr>' +
                            '                <td>'+(i+1)+'</td>' +
                            '                <td>'+ o.enCode +'</td>' +
                            '                <td>'+ o.enterprise +'</td>' +
                            '                <td>'+ o.createDate +'</td>' +
                            str +
                            '            </tr>';
                    }).join('');
                    $('.role-list').html(roleList);
                }else{
                    $('.role-list').html('<p class="empt-msg">暂无数据</p>');
                }
            }else if(data.rspCode==='-999999'){
                localStorage.removeItem("LoginName");
                localStorage.removeItem("LoginToken");
                localStorage.removeItem("userNo");
                localStorage.removeItem("LoginJob");
                localStorage.removeItem("LoginDepartment");
                localStorage.removeItem("LoginRoleName");
                showMsg($('.error-msg'), data.rspMsg);
                window.location.href = 'login.html';
            }else{
                showMsg($('.error-msg'), data.rspMsg);
            }
        }
    })
}


function getBasicPermissions(callbak){
    var obj = new Object();
    var _obj = JSON.stringify(obj,'utf-8');
    $.ajax({
        headers: {
            token:localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/sysResource/querySysResourceTree/v1",//基本权限接口
        data: _obj,
        dataType: 'json',
        success : function(data){
            if(data.rspCode==='000000'){
                var menuData = data.body;
                var menuList = $.map(menuData,function(o,i){
                    var menuChild = $.map(o.childs,function(item,index){
                        return '<dd><input type="checkbox" value="'+ item.id +' "id="'+ item.id+'">'+ item.resourceName +'</dd>';
                    }).join('');
                    return '<dl>' +
                        '          <dt><input type="checkbox" value="'+ o.id +'" id="'+o.id+'">'+ o.resourceName +'</dt>' +
                        menuChild +
                        '     </dl>';
                }).join('');
                $('.menuListAll').html(menuList);
                callbak&&callbak();
            }else if(data.rspCode==='-999999'){
                localStorage.removeItem("LoginName");
                localStorage.removeItem("LoginToken");
                localStorage.removeItem("userNo");
                localStorage.removeItem("LoginJob");
                localStorage.removeItem("LoginDepartment");
                localStorage.removeItem("LoginRoleName");
                showMsg($('.error-msg'), data.rspMsg);
                window.location.href = 'login.html';
            }else{
                showMsg($('.error-msg'), data.rspMsg);
            }
        }
    })
}
//角色新增
function roleAddFn(){
    var enCode = $('#enCode').val(),
        enterprise = $('#enterprise').val(),
        remark = $('#remark').val()
    if(enCode==''){
        showMsg($('.error-msg'), '公司简称不能为空');
    }if(enterprise==''){
        showMsg($('.error-msg'), '公司名称不能为空');
    }else {
        var obj = {
            'enCode':enCode,
            'enterprise':enterprise,
            'remark':remark
        };
        var _obj = JSON.stringify(obj,'utf-8');
        $.ajax({
            headers: {
                token:localStorage.getItem('LoginToken')
            },
            type: "POST",
            contentType: "text/html; charset=UTF-8",
            url: "/api/sysEnterprise/addOrUpdate",//角色新增接口
            data: _obj,
            dataType: 'json',
            success : function(data){
                if(data.rspCode==='000000'){
                    showMsg($('.error-msg'), '企业新增成功');
                    setTimeout(function(){
                        window.location.href = 'enterprise.html';
                    },1000)
                    // getBasicPermissions();
                    // $('.role-name,.role-encode').val('');
                }else if(data.rspCode==='-999999'){
                    localStorage.removeItem("LoginName");
                    localStorage.removeItem("LoginToken");
                    localStorage.removeItem("userNo");
                    localStorage.removeItem("LoginJob");
                    localStorage.removeItem("LoginDepartment");
                    localStorage.removeItem("LoginRoleName");
                    showMsg($('.error-msg'), data.rspMsg);
                    window.location.href = 'login.html';
                }else{
                    showMsg($('.error-msg'), data.rspMsg);
                }
            }
        })
    }
}
//角色删除
function roleDelteFn(){
    var id = $('.sureDel').data('id');
    var _obj = JSON.stringify({
        id:String(id)
    }, 'utf-8');
    $.ajax({
        headers: {
            token:localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/sysEnterprise/del",//角色删除接口
        data: _obj,
        dataType: 'json',
        success : function(data){
            if(data.rspCode==='000000'){
                $('.mask,.sureDel').hide();
                showMsg($('.error-msg'), '企业删除成功');
                getRoleListFn();
            }else if(data.rspCode==='-999999'){
                localStorage.removeItem("LoginName");
                localStorage.removeItem("LoginToken");
                localStorage.removeItem("userNo");
                localStorage.removeItem("LoginJob");
                localStorage.removeItem("LoginDepartment");
                localStorage.removeItem("LoginRoleName");
                showMsg($('.error-msg'), data.rspMsg);
                window.location.href = 'login.html';
            }else{
                showMsg($('.error-msg'), data.rspMsg);
            }
        }
    })
}


function initUser(){
    var user = JSON.parse(sessionStorage.getItem("enterprise"));
    $("#id").val(enterprise.id);
    $("#name").val(user.name);
    $("#mobile").val(user.mobile);
    $('#sex').val(user.sex);
    $("#idCard").val(user.idCard);
}