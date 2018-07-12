//分页逻辑
var pn = 1,
    sum,
    totalPage;
var hash_ = getHashStringArgs(location.hash);
if (hash_.pageNo) {
    pn = hash_.pageNo;
}
getListData(pn);
function getListData(pn) {
    var obj =  {
        'pageNum':pn,
        'pageSize':10
    };
    var _obj = JSON.stringify(obj,'utf-8');
    $.ajax({
        headers: {
            token:localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/sysRefuse/queryRefuseAll/v1",//拒绝代码列表
        data: _obj,
        dataType: 'json',
        success :function (data) {
            if(data.rspCode==='000000'){
                var _data = data.body;
                sum = _data.total;//总条数
                if(!sum){
                    $('.tableCon').html('');
                    totalPage = 1;
                    definedPaginator(pn, totalPage, "kkpager", function (n) {
                        getListData(n);
                    });//初始化
                    showMsg($('.error-msg'), '未查到该信息');
                    return;
                }
                totalPage = Math.ceil(sum / 10);
                definedPaginator(pn, totalPage, "kkpager", function (n) {
                    getListData(n);
                });//初始化
                var _dataList = _data.list;
                var rejectList = $.map(_dataList,function(o,i){
                    var _txt = o.validateState == 1?"是":"否";
                    var _sty = o.validateState == 1?"color:#2383E2;":"color:#a2a2a2;";
                    var _str = '<td class="detial noselect"><span class="disable" style="'+ _sty +'" data-id="'+o.id+'" data-stype="'+ o.validateState +'"><i class="icon-c iconfont icon-tingyong"></i>停用</span></td>';
                    var list =  '<tr>' +
                        '                        <td></td>' +
                        '                        <td>'+o.leve1Code+'</td>' +
                        '                        <td style="text-align: left;">'+o.leve1Des+'</td>' +
                        '                        <td>'+o.leve2Code+'</td>' +
                        '                        <td style="text-align: left;padding-left: 20px;">'+o.leve2Des+'</td>' +
                        '                        <td>'+o.leve3Code+'</td>' +
                        '                        <td style="text-align: left;padding-left: 20px;">'+o.leve3Des+'</td>' +
                        '                        <td>'+nullFn(o.createTime)+'</td>' +
                        '                        <td>'+_txt+'</td>' +
                        _str+
                        '                    </tr>';
                    return list;
                }).join('');
                $('.rejectListWrap').html(rejectList);
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
        }
    })
}
$(document).on("click", ".filterUl2 li a", function () {
    var i = $(this).index() - 1;
    $(this).parent().find("a").removeClass("active").eq(i).addClass("active");
})
var optionsArray = [];//存放拒绝码
$(function () {
    $(document).on('click','.disable',function(){
        var _this = $(this);
        $('.msg-box,.mask').show();
        $('.msg-box').data('id', _this.data('id'));
        $('.msg-box').data('stype', _this.data('stype'));
    })
    $('.cancel-btn').click(function(){
        $('.msg-box,.mask').hide();
    })
    //停用
    $(document).on('click','.sure-btn',function(){
        var pn = 1;
        var hash_ = getHashStringArgs(location.hash);
        if (hash_.pageNo) {
            pn = hash_.pageNo;
        }
        var _this = $(this);
        var _updateUser = localStorage.getItem('userNo'),
        _id = $('.msg-box').data('id');
        var obj = {
            'updateUser':_updateUser,
            'id':_id,
            'status':'0'
        };
        var _obj = JSON.stringify(obj,'utf-8');
        $.ajax({
            headers: {
                token:localStorage.getItem('LoginToken')
            },
            type: "POST",
            contentType: "text/html; charset=UTF-8",
            url: "/api/sysRefuse/refuseLose/v1",//拒绝代码 ——停用
            data: _obj,
            dataType: 'json',
            success :function(data){
                if(data.rspCode==='000000'){
                    $('.msg-box,.mask').hide();
                    _this.css({'color':'#A2A2A2'});
                    _this.prev().html('否');
                    getListData(pn);
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
    //增加拒绝代码
    $('.CodeAddBtn').click(function(){
        $('.rejectCodeListWrap').hide();
        $('.rejectCodeAddWrap').show();
    })
    //获取一级拒绝原因
    getRejectCodeFn($('#firstRejectCode'),0);
    //获取二级拒绝原因
    $('#firstRejectCode').change(function(){
        var level = $('#firstRejectCode').find("option:selected").val(),
            _parentId = parseInt(level),
            _reasonDes =$('#firstRejectCode').find("option:selected").data('reason');
        $('#firstRejectReason').val(_reasonDes);//一级拒绝原因
        getRejectCodeFn($('#select2'),_parentId);
    })
    $('#select2').change(function(){
        var _reasonDes =$('#select2').find("option:selected").data('reason');
        $('#secondRejectReason').val(_reasonDes);
    })
    // 一级原因改变二级原因更新
    $('#firstRejectCode').change(function(){
        $('#select2').empty();
    })
    //拒绝代码 ——添加
    $(document).on('click','.submit-button',function(){
        var _createUser =localStorage.getItem('userNo') ,
            _parentId1 = $('#firstRejectCode').find("option:selected").val(),
            _refuseCode1 = $('#selectIpt2').val(),
            _refuseDesrefuseDes1 =$('#secondRejectReason').val() ,
            _parentId2 = $('#select2').find("option:selected").val(),
            _refuseCode2 = $('#thirdRejectCode').val(),
            _refuseDesrefuseDes2 = $('#thirdRejectReason').val(),
            _refuseDays =$('#reentryTime').val() ;
        if($('#firstRejectCode').find("option:selected").text()=='请选择'||$('#selectIpt2').find("option:selected").text()=='请选择'){
            showMsg($('.error-msg'), '请填写完整信息');
            return;
        }else if(isValContent($('#selectIpt2').val()) || isValContent($('#secondRejectReason').val())||isValContent(_parentId1)){
            showMsg($('.error-msg'), '请填写完整信息');
            return;
        }else if(!isEightNumAndStr($('#selectIpt2').val())){
            showMsg($('.error-msg'), '拒绝代码只能为字母加数字');
            return;
        }
        if(isValContent($('#thirdRejectCode').val()) && isValContent($('#thirdRejectReason').val()) && isValContent($('#reentryTime').val())){
            if(optionsArray.indexOf(_refuseCode1) < 0){
                var obj =  {
                    "createUser":_createUser,
                    "refuseDTOList":[{
                            "parentId":_parentId1,
                            "refuseCode":_refuseCode1,
                            "refuseDes":_refuseDesrefuseDes1,
                            "level":2,
                            'flag' :"2"      // -------    0 -同时增加二级三级    1 -只增加三级   2 -只增加二级
                        }
                    ]
                };
            }else{
                showMsg($('.error-msg'), '二级拒绝代码已存在');
                return;
            }
        }else{
            if(_refuseCode2 !== '' && _refuseDesrefuseDes2 !== '' && _refuseDays !== ''){
                if( !isEightNumAndStr($('#thirdRejectCode').val())){
                    showMsg($('.error-msg'), '拒绝代码只能为字母加数字');
                    return;
                }else if(!/^\+?[1-9][0-9]*$/.test(_refuseDays)){
                    showMsg($('.error-msg'), '再次进件时间只能为正整数');
                    return;
                }else if( _refuseDays < 0){
                    showMsg($('.error-msg'), '请输入正确的再次进件时间');
                    return;
                }
                var obj =  {
                    "createUser":_createUser,
                    "refuseDTOList":[{
                        "parentId":_parentId1,
                        "refuseCode":_refuseCode1,
                        "refuseDes":_refuseDesrefuseDes1,
                        "level":2,
                        'flag' :optionsArray.indexOf(_refuseCode1) < 0 ? "0" : "1"
                    },
                        {
                            "parentId":_parentId2,
                            "refuseCode":_refuseCode2,
                            "refuseDes":_refuseDesrefuseDes2,
                            "level":3,
                            "refuseDays":_refuseDays,
                            'flag' :optionsArray.indexOf(_refuseCode1) < 0 ? "0" : "1"
                        }
                    ]
                };
            }else{
                showMsg($('.error-msg'), '请您按规定填写');
                return;
            }
        }
        rejectCodeAdd(obj);
    })
    //编辑选择二级、三级拒绝码
    $("#selectIpt2").val($("#select2 option:selected").text());
    $('#select2').change(function(){
        //编辑选择二级拒绝码
        $("#selectIpt2").val($("#select2 option:selected").text());
    })
})
//拒绝代码添加
function rejectCodeAdd(obj){
    var _obj = JSON.stringify(obj,'utf-8');
    $.ajax({
        headers: {
            token:localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/sysRefuse/refuseAdd/v1",//拒绝代码 ——添加
        data: _obj,
        dataType: 'json',
        success : function(data){
            if(data.rspCode==='000000'){
                showMsg($('.error-msg'), '拒绝代码添加成功');
                setTimeout(function(){
                    window.location.href = 'reject.html';
                },1000)
                getListData(pn);
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

//拒绝代码增加获取一级拒绝码/原因
function getRejectCodeFn(code,parentId) {
    if(parentId != 0){
        if($('#firstRejectCode').find("option:selected").text()=='请选择'||$('#selectIpt2').find("option:selected").text()=='请选择'){
            showMsg($('.error-msg'), '请填写完整信息');
            return;
        }
    }
    var obj = {
        'parentId':parentId
    };
    var _obj = JSON.stringify(obj,'utf-8');
    $.ajax({
        headers: {
            token:localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/sysRefuse/queryRefuseByParent/v1",//拒绝代码 -- 下拉框联动
        data: _obj,
        dataType: 'json',
        success : function (data) {
            if(data.rspCode==='000000'){
                var dataList = data.body;
                var reasonCodeList = $.map(dataList,function (o,i) {
                    optionsArray.push(o.refuse_code);
                    return '<option value="'+o.id+'" id="'+o.id+'" data-reason = '+o.refuse_des +'>' + o.refuse_code + '</option>';
                }).join('');
                code.html('<option value="">请选择</option>').append(reasonCodeList);
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

