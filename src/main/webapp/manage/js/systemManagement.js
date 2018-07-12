//分页逻辑
var pn = 1,
    sum,
    totalPage;
var hash_ = getHashStringArgs(location.hash);
if (hash_.pageNo) {
    pn = hash_.pageNo;
}

getData(pn);

function getData(pn) {
    var obj = new Object();
    obj.pageNum = pn;
    obj.pageSize = 10;
    if(  $('#configName').val()!=''){
        obj.configName = $('#configName').val();
    }
    if($('#configCode').val()!=''){
        obj.configCode = $('#configCode').val();
    }
    var _obj = JSON.stringify(obj, 'utf-8');
    $.ajax({
        headers: {
            token:localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/sys/selectAll/v1/",//系统配置列表
        data: _obj,
        dataType: 'json',
        success: function (data) {
            if(data.rspCode==='000000'){
                var _data = data.body;
                sum = _data.total;
                if(!sum){
                    $('.tableCon').html('');
                    totalPage = 1;
                    definedPaginator(pn, totalPage, "kkpager", function (n) {
                        getData(n);
                    });//初始化
                    showMsg($('.error-msg'), '未查到该信息');
                    return;
                }
                totalPage = Math.ceil(sum / 10);
                definedPaginator(pn, totalPage, "kkpager", function (n) {
                    getData(n);
                });//初始化
                var list = _data.list;
                if(list.length > 0){
                    var html = $.map(list, function (o, i) {
                        return '<tr>' +
                            '<td></td>' +
                            '<td>' + o.configName + '</td>' +
                            '<td>' + o.configCode + '</td>' +
                            '<td class="value '+ o.configCode +'">' + o.configValue + '</td>' +
                            // '<td>' + typeFn(o.configType) + '</td>' +
                            '<td>' + validityFn(o.validateState) + '</td>' +
                            '<td class="detial xiugai" data-sid ="'+ o.id +'" data-svalue ="'+ o.configValue +'" data-configcode = "'+o.configCode+'" data-configname="'+o.configName+'">修改</td>' +
                            '</tr>';
                    }).join('');
                    $('.tableCon').html(html);
                }else{
                    showMsg($('.error-msg'), '未查到该信息');
                }
                if ($('.tableCon tr').length < 10) {
                    var a = 0;
                    for (var i = (pn - 1) * 10 + 1; i <= (pn * 10); i++) {
                        a += 1;
                        if (a > $('.tableCon tr').length) {
                            return;
                        } else {
                            $('.tableCon tr').eq(i % 10 - 1).children('td').eq(0).html(i);
                        }
                    }
                } else {
                    for (var i = (pn - 1) * 10 + 1; i <= (pn * 10); i++) {
                        $('.tableCon tr').eq(i % 10 - 1).children('td').eq(0).html(i);
                    }
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

$(document).on("click", ".filterUl2 li a", function () {
    var i = $(this).index() - 1;
    $(this).parent().find("a").removeClass("active").eq(i).addClass("active");
})


$(function () {
    //条件查询
    $('.find').click(function(){
        getData(pn);
    })
    //一键刷新
    $('.refresh').click(function(){
        var obj = new Object();
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token:localStorage.getItem('LoginToken')
            },
            type: "POST",
            contentType: "text/html; charset=UTF-8",
            url: "/api/sys/updateByAll/v1/",//一键刷新系统文件
            data:_obj,
            dataType: 'json',
            success : function(data){
                if(data.rspCode==='000000'){
                    showMsg($('.error-msg'), '刷新成功');
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
                    showMsg($('.error-msg'),  data.rspMsg);
                }
            }
        })
    })
    // 修改
    $(document).on('click','.xiugai',function(){
        var _this = $(this);
        $('.mask,.fix').show();
        $('.fix').data('sid',_this.data('sid'));
        $('.fix').data('configcode',_this.data('configcode'));
        $('.fix').data('configname',_this.data('configname'));
        $('.value-ipt').val(_this.data('svalue'));
        $('.fix-head').html(_this.data('configname'));
    })
    $(document).on('click','.sure',function(){
        var _this = $(this);
        var obj = new Object();
        obj.configName =  $('.fix').data('configname');
        obj.configCode =$('.fix').data('configcode');
        obj.id =$('.fix').data('sid');
        var newVal = $('.value-ipt').val();
        if(isValContent(newVal)) {
            showMsg($('.error-msg'), '修改值不能为空');
        } else if(isIncludeSpecalStr(newVal)) {
            showMsg($('.error-msg'), '修改值不能包括特殊字符');
        }
        obj.configValue = newVal;
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token:localStorage.getItem('LoginToken')
            },
            type: "POST",
            contentType: "text/html; charset=UTF-8",
            url: "/api/sys/updateStatus/v1/",//修改系统配置接口
            data: _obj,
            dataType: 'json',
            success : function(data){
                if(data.rspCode==='000000'){
                    var newVal = $('.value-ipt').val();
                    $('.'+obj.configCode+'').html(newVal);
                    $('.mask,.fix').hide();
                    showMsg($('.error-msg'), '修改成功');
                    getData(pn);
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
    })
    $('.cancle').click(function(){
        $('.mask,.fix').hide();
    })
    //添加项目
    $(document).on('click','.add-item',function(){
        $('.mask,.item-box').show();
    })
    $(document).on('click','.item-sure',function(){
        var obj = new Object();
        obj.configName =  $('.item-name').val();
        obj.configCode =$('.code-size').val();
        obj.configValue =$('.value-num').val();
        obj.configType = $('#item-type').find("option:selected").val();
        obj.validateState = $('#item-state').find("option:selected").val();
        obj.version = '1';
        if(isValContent(obj.configName)) {
            showMsg($('.error-msg'), '配置名称不能为空');
        } else if(isValContent(obj.configCode)) {
            showMsg($('.error-msg'), '配置CODE不能为空');
        }else if(isValContent(obj.configValue)){
            showMsg($('.error-msg'), 'value值不能为空');
        }else{
            var _obj = JSON.stringify(obj, 'utf-8');
            $.ajax({
                headers: {
                    token:localStorage.getItem('LoginToken')
                },
                type: "POST",
                contentType: "text/html; charset=UTF-8",
                url: "/api/sys/insert/v1/",//添加系统配置接口
                data: _obj,
                dataType: 'json',
                success:function(data){
                    if(data.rspCode==='000000'){
                        $('.mask,.item-box').hide();
                        showMsg($('.error-msg'), '添加成功');
                        getData(pn);
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
    })
    $('.item-cancle').click(function(){
        $('.mask,.item-box').hide();
    })
})

function validityFn(str){
    switch (str){
        case '0':
            str = '无效';
            break;
        case '1':
            str = '有效';
            break;
    }
    return str;
}
function typeFn(str){
    switch (str){
        case '0':
            str = '系统级';
            break;
        case '1':
            str = '项目级';
            break;
    }
    return str;
}

