
var approvalServer={

}
var getParam = urlParse();
messageFn(getParam.intoCode);
function messageFn(intoCode){
    var obj = new Object();
    obj.intoCode = getParam.intoCode;
    var _obj = JSON.stringify(obj,'utf-8');
    $.ajax({
        headers: {
            token:localStorage.getItem('LoginToken')
        },
        type :'POST',
        contentType: "text/html; charset=UTF-8",
        url: "/api/manage/contract/contractInfo",//合同信息接口
        data: _obj,
        dataType: 'json',
        success : function(data){
            if(data.rspCode==='000000'){
                var _data = data.body;
                if(_data.clTUserDTOExt != null){
                    $('#name').html(_data.clTUserDTOExt.name);
                    $('#sex').html(sexFn(_data.clTUserDTOExt.sex));
                    $('#age').html(_data.clTUserDTOExt.age);
                    $('#mobile').html(_data.clTUserDTOExt.mobile);
                    $('#industry').html(industryFn(_data.clTUserDTOExt.industry));
                    $('#degree').html(degreeFn(_data.clTUserDTOExt.degree));
                    $('#provinces').html(_data.clTUserDTOExt.provinces);
                    $('#idCard').html(_data.clTUserDTOExt.idCard);
                    $('#address').html(_data.clTUserDTOExt.address);
                    $('#currentAddr').html(_data.clTUserDTOExt.currentAddr);
                }
                //正面显示照
                if(_data.clTVerifyInfo != null || _data.clTVerifyInfo != ''){
                    $('.img-box>img').attr('src',_data.clTVerifyInfo.verifyUrl);
                }
                var basicUser = _data.clTIntoContactsList;//联系人列表
                var html = $.map(basicUser,function(o,i){
                    return '<div class="row">' +
                        '                    <div class="col-lg-4 col-md-4 col-sm-4">' +
                        '                        <label class="com-lab">联系人'+(i+1)+'</label>' +
                        '                        <span class="com-span">'+o.conName+'</span>' +
                        '                    </div>' +
                        '                    <div class="col-lg-4 col-md-4 col-sm-4">' +
                        '                        <label class="com-lab">关系</label>' +
                        '                        <span class="com-span">'+relationFn(o.conRelation)+'</span>' +
                        '                    </div>' +
                        '                    <div class="col-lg-4 col-md-4 col-sm-4">' +
                        '                        <label class="com-lab">联系电话</label>' +
                        '                        <span class="com-span">'+o.conPhone+'</span>' +
                        '                    </div>' +
                        '                </div>';
                }).join('');
                //借款信息
                $('.right-box').append(html);
                $('#intoCode').html(_data.loanInfo.intoCode);
                $('#fundAmt').html('¥'+_data.loanInfo.fundAmt);
                $('#productName').html(_data.loanInfo.productName);
                $('#factFundAmt').html('¥'+_data.loanInfo.factFundAmt);
                $('#loanPeriods').html(_data.loanInfo.loanPeriods+'月');
                $('#approveRetTime').html(_data.loanInfo.approveRetTime);
                //合同信息
                $('#contractNo').html(_data.contractInfo.contractNo);
                $('#fundDate').html(_data.contractInfo.fundDate);
                $('#endDate').html(_data.contractInfo.endDate);
                $('#loanStatus').html(_data.contractInfo.loanStatus);
                $('#loanBalance').html('¥'+_data.contractInfo.loanBalance);
                $('#curLoanPeriod').html(_data.contractInfo.curLoanPeriod);
                //还款计划
                var plantDataList = _data.plantDataList;
                var plantData = $.map(plantDataList,function(o,i){
                    return '<li class="row">' +
                        '                    <div class="col-lg-1 col-md-1 col-sm-1">'+o.curPeriod+'</div>' +
                        '                    <div class="col-lg-2 col-md-2 col-sm-2">'+o.curRepayDate+'</div>' +
                        '                    <div class="col-lg-2 col-md-2 col-sm-2">'+'¥'+o.curRepayBase+'</div>' +
                        '                    <div class="col-lg-2 col-md-2 col-sm-2">'+'¥'+o.curRepayInst+'</div>' +
                        '                    <div class="col-lg-2 col-md-2 col-sm-2">'+'¥'+o.repayPanelty+'</div>' +
                        '                    <div class="col-lg-2 col-md-2 col-sm-2">'+'¥'+o.repayDefault+'</div>' +
                        '                    <div class="col-lg-1 col-md-1 col-sm-1 min-pad">'+statusFn(o.status)+'</div>' +
                        '                </li>';
                }).join('');
                $('#risk').append(plantData);
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

$(function(){
    $("#risk").find("li").each(function(index,val){
        if(index%2==1){
            $(val).addClass("bk");
        }
    })
    $(".radio-span").on("click",function(){
        $(".radio-span").removeClass("active");
        $(this).addClass("active")
    })
    //消息提示全局配置
    toastr.options = {
        "closeButton": false,//是否配置关闭按钮
        "debug": false,//是否开启debug模式
        "newestOnTop": true,//新消息是否排在最上层
        "progressBar": false,//是否显示进度条
        "positionClass": "toast-top-center",//消息框的显示位置
        "preventDuplicates": false,//是否阻止弹出多个消息框
        "onclick": null,//点击回调函数
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "1500",//1.5s后关闭消息框
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    // toastr.success('恭喜您，您已升级为财富合伙人！')
    // toastr.error('恭喜您，您已升级为财富合伙人！')
    // toastr.warning('恭喜您，您已升级为财富合伙人！')
    //toastr.info('恭喜您，您已升级为财富合伙人！')
    var hashStrings = getParam.pageNo||'1';
    $('.comeBack').click(function(){
        window.location.href = 'hetongManagement.html#pageNo='+ hashStrings;
    })
})

function statusFn(str){
    switch (str){
        case '0':
            str = '正常';
            break;
        case '1':
            str = '逾期';
            break;
        case '2':
            str = '结清';
            break;
    }
    return str;
}
