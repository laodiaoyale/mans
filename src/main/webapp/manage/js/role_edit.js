var getParam = urlParse();
$(function () {
    //角色编辑
    $(document).on('click','#submitBtn_editRole',function(){
        roleEditFn();
    })
    $('.role-name-edit').val(getParam.roleName);//角色名称返显
    getBasicPermissions(function(){
        //返显选中权限
        var getResourceIds = getParam.resourceIds.split(',');
        for(var i = 0;i < getResourceIds.length;i++){
            $("#"+getResourceIds[i]).prop('checked',true);
        }
    });
})
//角色编辑
function roleEditFn(){
    var _resourceIds = $("input:checkbox:checked").map(function(index,elem) {
        return $(elem).val();
    }).get().join(',');
    var _updateUser = $('.mine-info-account').html(),
        _roleName = $('.role-name-edit').val(),
        _roleCode = getParam.roleCode ,
        _id = getParam.id;
    if(_roleName.length >8 ){
        showMsg($('.error-msg'), '角色名称最多8个字符');
    }else if(isIncludeSpecalStr(_roleName)){ //是否包含特殊字符
        showMsg($('.error-msg'), '角色名称不可包含特殊字符');
    }else if (isValContent(_roleName) || _resourceIds.length <= 0){ // 是否为空
        showMsg($('.error-msg'), '您的输入有误');
    }else{
        var obj = {
            'updateUser':_updateUser,
            'roleName':_roleName,
            'roleCode':_roleCode,
            'resourceIds':_resourceIds,
            'id':_id
        };
        var _obj = JSON.stringify(obj,'utf-8');
        $.ajax({
            headers: {
                token:localStorage.getItem('LoginToken')
            },
            type: "POST",
            contentType: "text/html; charset=UTF-8",
            url: "/api/sysUserRole/updateRole/v1",//角色编辑接口
            data: _obj,
            dataType: 'json',
            success : function (data) {
                if(data.rspCode==='000000'){
                    showMsg($('.error-msg'), '角色编辑成功');
                    window.location.href = 'role.html';
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