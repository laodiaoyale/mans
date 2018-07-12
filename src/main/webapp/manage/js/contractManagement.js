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
    if( $('#name').val()!=''){
        obj.name = $('#name').val();
    }
    if($('#phone').val()!=''){
        obj.mobile = $('#phone').val();
    }
    if(stateFn($('#contractStatus').find("option:selected").val())!=''){
        obj.contractStatus = stateFn($('#contractStatus').find("option:selected").val());
    }
    var _obj = JSON.stringify(obj, 'utf-8');
    $.ajax({
        headers: {
            token:localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/manage/sign/list",//签约管理列表接口
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
                            '<td>' + o.intoCode + '</td>' +
                            '<td>' + o.orderNo + '</td>' +
                            '<td>' + o.name + '</td>' +
                            '<td>' + o.mobile + '</td>' +
                            '<td>' + o.productName + '</td>' +
                            '<td>' +nullFn(o.fundAmt)  + '</td>' +
                            '<td>' + nullFn(o.loanPeriods) + '</td>' +
                            '<td>' + nullFn(o.productRate) + '</td>' +
                            '<td>' + o.contractStatus + '</td>' +
                            '<td>' + nullFn(o.operationTime) + '</td>' +
                            '<td>' + nullFn(o.signDeadline) + '</td>' +
                            '<td>' + nullFn(o.statusValue) + '</td>' +
                            '</tr>';
                    }).join('');
                    $('.tableCon').html(html);
                }else{
                    showMsg($('.error-msg'), '未查到该信息');
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
    $('.find').click(function () {
        getData(pn);
    })
})

function stateFn(val){
    if(val < 0){
        return '';
    }else{
        return val;
    }
}
