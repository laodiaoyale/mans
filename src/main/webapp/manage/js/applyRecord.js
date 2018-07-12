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
    if($('#name').val()!=''){
        obj.username = $('#name').val();
    }
    if($('#phone').val()!=''){
        obj.mobile = $('#phone').val();
    }
    if(allFn($('#source').find("option:selected").text())!=''){
        obj.customerSource = channelFn($('#source').find("option:selected").text());
    }
    var _obj = JSON.stringify(obj, 'utf-8');
    $.ajax({
        headers: {
            token:localStorage.getItem('LoginToken')
        },
        timeout : 600000, //超时时间设置，单位毫秒
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/manage/intoExamine/list",//申请记录接口
        data: _obj,
        dataType: 'json',
        beforeSend: function () {
            $('.loading-img').show();
        },
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
                    $('.loading-img').hide();
                    return;
                }
                totalPage = Math.ceil(sum / 10);
                definedPaginator(pn, totalPage, "kkpager", function (n) {
                    getData(n);
                });//初始化
                var list = _data.list;
                if(list.length > 0){
                    var html = $.map(list, function (o, i) {
                        if(o.applyTerminal == 'h5' || o.applyTerminal == 'H5' || o.applyTerminal == 'API-KN'){
                            var _productName = 'TB'
                        }else {
                            var _productName = o.productName
                        }
                        return '<tr>' +
                            '<td></td>' +
                            '<td>' + o.intoCode + '</td>' +
                            '<td>' + o.name + '</td>' +
                            '<td>' + o.mobile + '</td>' +
                            '<td>' + nullFn(_productName) + '</td>' +
                            '<td>' + nullFn(marketchannelFn(o.marketChannel)) + '</td>' +
                            '<td>' + nullFn(whereFn(o.promotionSource)) + '</td>' +
                            '<td>' + nullFn(sourceTerminal(o.applyTerminal)) + '</td>' + //终端来源
                            '<td>' + nullFn(intoChannelFn(o.applyChannel)) + '</td>' + //进件渠道
                            '<td>' + o.applyAmount + '</td>' +
                            '<td>' + o.applyPeriod + '</td>' +
                            '<td>' + nullFn(o.createTime) + '</td>' +
                            '<td>' + authStateFn(o.authState) + '</td>' +
                            '<td>' + validateStateFn(o.validateState) + '</td>' +
                            '<td>' + nullFn(crcardCertStateFn(o.crcardCertState)) + '</td>' +
                            '<td>' + nullFn(mobileCertStateFn(o.mobileCertState)) + '</td>' +
                            '<td>' + nullFn(creditCertStateFn(o.creditCertState)) + '</td>' +
                            '<td>' + stateFn(o.state) + '</td>' +
                            '<td>' + nullFn(o.updateTime) + '</td>' +
                            '</tr>';
                    }).join('');
                    $('.tableCon').html(html);
                    $('.loading-img').hide();
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
                showMsg($('.error-msg'), data.rspMsg);
                window.location.href = 'login.html';
            }else{
                showMsg($('.error-msg'), data.rspMsg);
            }
            $('.loading-img').hide();
        },
        error:function(){
            $('.loading-img').hide();
        }
    })
}

$(document).on("click", ".filterUl2 li a", function () {
    var i = $(this).index() - 1;
    $(this).parent().find("a").removeClass("active").eq(i).addClass("active");
})


$(function () {
    //条件查询
    $('.find').click(function () {
        getData(pn);
    })
})

function allFn(str) {
    if (str === '全部') {
        return '';
    } else {
        return str;
    }
}


function authStateFn(authState) {
    var str = "";
    switch (authState) {
        case "0":
            str = '未完成';
            break;
        case "1":
            str = '进行中';
            break;
        case "2":
            str = '已完成';
            break;
    }
    return str;
}

function validateStateFn(validateState) {
    var str = "";
    switch (validateState) {
        case "0":
            str = '未完成';
            break;
        case "1":
            str = '已完成';
            break;
    }
    return str;
}

function mobileCertStateFn(mobileCertState) {
    var str = "";
    switch (mobileCertState) {
        case "0":
            str = '未完成';
            break;
        case "1":
            str = '已完成';
            break;
    }
    return str;
}
function crcardCertStateFn(mobileCertState) {
    var str = "";
    switch (mobileCertState) {
        case "-1":
            str = '已失效';
            break;
        case "0":
            str = '未认证';
            break;
        case "1":
            str = '已认证';
            break;
    }
    return str;
}

function creditCertStateFn(creditCertState) {
    var str = "";
    switch (creditCertState) {
        case "0":
            str = '未完成';
            break;
        case "1":
            str = '已完成';
            break;
        case "-1":
            str = '已失效';
            break;
    }
    return str;
}

function stateFn(state) {
    var str = "";
    switch (state) {
        case "0":
            str = '进件中';
            break;
        case "1":
            str = '进件完成';
            break;
    }
    return str;
}

