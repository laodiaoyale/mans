//分页逻辑
var pn = 1,
    sum,
    totalPage;
var hash_ = getHashStringArgs(location.hash);
if(hash_.pageNo){
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
    var _obj = JSON.stringify(obj, 'utf-8');
    $.ajax({
        headers: {
            token:localStorage.getItem('LoginToken')
        },
        type:"POST",
        contentType: "text/html; charset=UTF-8",
        url : "/api/manage/credit/creditList",//授信管理接口
        data : _obj,
        dataType: 'json',
        success: function(data) {
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
                totalPage = Math.ceil(sum/10);
                definedPaginator(pn, totalPage, "kkpager",function(n){
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
                            '<td>' + _productName + '</td>' +
                            '<td>' + nullFn(marketchannelFn(o.marketChannel)) + '</td>' + //客户来源
                            '<td>' + nullFn(whereFn(o.promotionSource)) + '</td>' + // 渠道来源
                            '<td>' + nullFn(sourceTerminal(o.applyTerminal)) + '</td>' + //终端来源
                            '<td>' + nullFn(intoChannelFn(o.applyChannel)) + '</td>' + //进件渠道
                            '<td>' + quotaFn(o.applyAmount) + '</td>' +
                            '<td>' + nullFn(o.creditReqTime) + '</td>' +
                            '<td>'+nullFn(o.creditRetTime)+'</td>' +
                            '<td>'+nullFn(o.termOfValidity)+'</td>' +
                            '</tr>';
                    }).join('');
                    $('.tableCon').html(html);
                }else{
                    showMsg($('.error-msg'), '未查到该信息');
                }

                if($('.tableCon tr').length < 10){
                    var a = 0;
                    for(var i =(pn - 1)*10 + 1;i <= (pn * 10);i++ ){
                        a+= 1;
                        if(a >$('.tableCon tr').length){
                            return;
                        }else{
                            $('.tableCon tr').eq(i%10-1).children('td').eq(0).html(i);
                        }
                    }
                }else{
                    for(var i =(pn - 1)*10 + 1;i <= (pn * 10);i++ ){
                        $('.tableCon tr').eq(i%10-1).children('td').eq(0).html(i);
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
$(function(){
    //条件查询
    $('.find').click(function(){
        getData(pn);
    })
})

function nullFn(str){
    if(str == null || str == "" || str == undefined){
        return "--";
    }else{
        return str;
    }
}






