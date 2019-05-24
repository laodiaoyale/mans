$(function () {
    // 点击跳转到编辑页
    $('.limitsWrap').click(function () {
        window.location.href = 'role_add.html';
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
        url: "/api/sysUserRole/queryRoleList/v1",//角色列表接口
        data: _obj,
        dataType: 'json',
        success : function(data){
            if(data.rspCode==='000000'){
                var roleListData = data.body;
                if(roleListData){
                    var roleList = $.map(roleListData,function(o,i){
                        var str ='<td><span class="redactTlt noselect"><a href="role_edit.html?resourceIds='+ o.resourceIds +'&roleName='+o.roleName+'&roleCode='+o.roleCode+'&id='+ o.id +'"><img src="../images/compile.svg" />编辑</a></span><span class="delTit noselect" data-id = "'+o.id +'"><img src="../images/delete.svg" />删除</span></td>' ;
                        return '<tr>' +
                            '                <td>'+(i+1)+'</td>' +
                            '                <td>'+ o.roleName +'</td>' +
                            '                <td class="limitsShow">'+ o.resourceName +'</td>' +
                            '                <td>'+ o.createTime +'</td>' +
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
//渲染基本权限
if(window.location.pathname == '/manage/html/role_add.html'){
    getBasicPermissions();
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
    var allVal = $("input:checkbox:checked").map(function(index,elem) {
        return $(elem).val();
    }).get().join(',');
    var _createUser = $('.mine-info-account').html(),
        _roleName = $('.role-name').val(),
        _roleCode = $('.role-encode').val(),
        _resourceIds = allVal;
    if(_roleName.length > 8){
        showMsg($('.error-msg'), '角色名称最多8个字符');
    }else if(isIncludeSpecalStr(_roleName)){ //是否包含特殊字符
        showMsg($('.error-msg'), '角色名称不可包含特殊字符');
    }else if (isValContent(_roleName) ||isValContent(_roleCode) || _resourceIds.length <= 0){ // 是否为空
        showMsg($('.error-msg'), '您的输入有误');
    }else {
        var obj = {
            'createUser':_createUser,
            'roleName':_roleName,
            'roleCode':_roleCode,
            'resourceIds':_resourceIds
        };
        var _obj = JSON.stringify(obj,'utf-8');
        $.ajax({
            headers: {
                token:localStorage.getItem('LoginToken')
            },
            type: "POST",
            contentType: "text/html; charset=UTF-8",
            url: "/api/sysUserRole/addRole/v1",//角色新增接口
            data: _obj,
            dataType: 'json',
            success : function(data){
                if(data.rspCode==='000000'){
                    showMsg($('.error-msg'), '角色新增成功');
                    setTimeout(function(){
                        window.location.href = 'role.html';
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
    var _updateUser = $('.mine-info-account').html(),
        _id = $('.sureDel').data('id');
    var obj = {
        'updateUser':_updateUser,
        'id':_id
    };
    var _obj = JSON.stringify(obj,'utf-8');
    $.ajax({
        headers: {
            token:localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/sysUserRole/delRole/v1",//角色删除接口
        data: _obj,
        dataType: 'json',
        success : function(data){
            if(data.rspCode==='000000'){
                $('.mask,.sureDel').hide();
                showMsg($('.error-msg'), '角色删除成功');
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
