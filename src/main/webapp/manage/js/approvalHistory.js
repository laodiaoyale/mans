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
    if ($('#name').val() != '') {
        obj.name = $('#name').val();
    }
    if ($('#status').find("option:selected").val() != '') {
        obj.status = allFn(parseInt($('#status').find("option:selected").val()));
    }
    var hashStrings = (window.location.hash.length > 0 ? window.location.hash.substring(8) : "");
    var _obj = JSON.stringify(obj, 'utf-8');
    $.ajax({
        headers: {
            token: localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/manage/user/history/ApproveRankList",//审批历史接口
        data: _obj,
        dataType: 'json',
        success: function (data) {
            if (data.rspCode === '000000') {
                var _data = data.body;
                sum = _data.total;
                if (!sum) {
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
                if (list.length > 0) {
                    var html = $.map(list, function (o, i) {
                        if(o.applyTerminal == 'h5' || o.applyTerminal == 'H5' || o.applyTerminal == 'API-KN'){
                            var _productName = 'TB'
                        }else {
                            var _productName = o.productName
                        }
                        return '<tr>' +
                            '<td>' + o.intoCode + '</td>' +
                            '<td>' + o.name + '</td>' +
                            '<td>' + nullFn(_productName) + '</td>' +
                            '<td>' + o.applyAmount + '</td>' +
                            '<td>' + o.applyPeriod + '</td>' +
                            '<td>' + nullFn(quotaFn(o.fundAmt)) + '</td>' +
                            '<td>' + nullFn(o.loanPeriods) + '</td>' +
                            '<td>' + statusFn(o.status) + '</td>' +//状态
                            '<td>' + nullFn(o.approveRetTime) + '</td>' +
                            '<td>'+nullFn(marketchannelFn(o.marketChannel))+'</td>' +//客户来源
                            '<td>'+nullFn(sourceTerminal(o.applyTerminal))+'</td>' +//终端来源
                            '<td>' + nullFn(whereFn(o.promotionSource)) + '</td>' +
                            '<td>' + nullFn(intoChannelFn(o.applyChannel)) + '</td>' + //进件渠道
                            '<td class="detial" id="checkDetail"><a href="approvalHistoryMessage.html?intoCode=' + o.intoCode + '&status=' + o.status+'&cancelCode='+ o.cancelCode + '&pageNo='+hashStrings +'">查看明细</a></td>'
                        '</tr>';
                    }).join('');
                    $('.tableCon').html(html);
                } else {
                    showMsg($('.error-msg'), '未查到该信息');
                }
            } else if (data.rspCode === '-999999') {
                localStorage.removeItem("LoginName");
                localStorage.removeItem("LoginToken");
                localStorage.removeItem("userNo");
                localStorage.removeItem("LoginJob");
                localStorage.removeItem("LoginDepartment");
                localStorage.removeItem("LoginRoleName");
                showMsg($('.error-msg'), data.rspMsg);
                window.location.href = 'login.html';
            } else {
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
    $('.find').click(function () {
        getData(pn);
    })
})

function allFn(str) {
    if (str >= 0) {
        return str;
    } else {
        return '';
    }
}

function statusFn(str) {
    switch (str) {
        case 0:
            str = '通过';
            break;
        case 1:
            str = '拒绝';
            break;
        case 2:
            str = '拒绝并加入黑名单';
            break;
        case 3:
            str = '审批中撤销';
            break;
    }
    return str;
}

function selectFn(str) {
    switch (str) {
        case '通过':
            str = 0;
            break;
        case  '拒绝':
            str = 1;
            break;
        case '拒绝并加入黑名单':
            str = 2;
            break;
        case '审批中撤销':
            str = 3;
            break;
    }
    return str;
}

