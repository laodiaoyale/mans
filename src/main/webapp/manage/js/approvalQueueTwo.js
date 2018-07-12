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
    obj.type = 2;
    if( $('#name').val()!=''){
        obj.name = $('#name').val();
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
        url : "/api/manage/user/ApproveRankList",//审批队列接口
        data : _obj,
        dataType: 'json',
        success: function(data) {
            if(data.rspCode==='000000'){
                var _data = data.body;
                sum = _data.total;
                $('.totalNum').html(sum);//总数
                $('.lockNum').html(_data.lockNum);//锁定数
                $('.unlockNum').html(_data.unLockNum);//未锁定数
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
                        o.locking == true ? _lock = '已锁定'+'-'+o.lockUserName : _lock = '未锁定';
                        var _td = '';
                        if (o.locking == true) {
                            if (o.lockUserId == localStorage.getItem('LoginId')) {
                                _td = '<td class="detial noselect lock_td" style="padding: 8px 10px 8px;">' +
                                    '<a class="lock_a" href="approvalTwo.html?intoCode='+o.intoCode+'&manualReviewQueue='+o.manualReviewQueue+'&applyTerminal='+o.applyTerminal+'" style="position: relative;">' +
                                    '<i class="icon-c iconfont icon-ic_shenpiguanli_nor lock_i" style="font-size: 140%; position: absolute; left: -35%; top: -15%;"></i>' +
                                    '<span class="lock_span">立即审批</span></a></td>';
                            } else {
                                _td = '<td class="detial noselect lock_td" style="color: #A2A2A2; cursor: default; padding: 8px 10px 8px;">' +
                                    '<a class="lock_a" href="javascript:void(0);" style="position: relative; color: #A2A2A2; cursor: default;">' +
                                    '<i class="icon-c iconfont icon-ic_shenpiguanli_nor lock_i" style="font-size: 140%; position: absolute; left: -35%; top: -15%; color: #A2A2A2; cursor: default;"></i>' +
                                    '<span class="lock_span" style="color: #A2A2A2; cursor: default;">立即审批</span></a></td>';
                            }
                        }else{
                            _td = '<td class="detial noselect lock_td" style="padding: 8px 10px 8px;">' +
                                '<a class="lock_a" href="approvalTwo.html?intoCode='+o.intoCode+'&manualReviewQueue='+o.manualReviewQueue+'&applyTerminal='+o.applyTerminal+'" style="position: relative;">' +
                                '<i class="icon-c iconfont icon-ic_shenpiguanli_nor lock_i" style="font-size: 140%; position: absolute; left: -35%; top: -15%;"></i>' +
                                '<span class="lock_span">立即审批</span></a></td>';
                        }
                        //判断是否命中“ZP01”
                        if(o.flagZP01 === true){
                            _custName = '<td class="red">' + nullFn(o.name) + '</td>'
                        }else{
                            _custName = '<td>' + nullFn(o.name) + '</td>'
                        }
                        //业务类型
                        if(o.applyTerminal == 'h5' || o.applyTerminal == 'H5' || o.applyTerminal == 'API-KN'){
                            var _productName = 'TB'
                        }else {
                            var _productName = o.productName
                        }
                        return '<tr'+ ' data-code='+ o.intoCode +' data-url=approvalTwo.html?intoCode='+o.intoCode+'&manualReviewQueue='+o.manualReviewQueue+'&applyTerminal='+o.applyTerminal+'>' +
                            '<td class="approveIntoCode">' + o.intoCode + '</td>' +
                            _custName +
                            '<td>' + nullFn(o.mobile) + '</td>' +
                            '<td>' + nullFn(o.approveReqTime) + '</td>' +
                            '<td>' + nullFn(_productName) + '</td>' +
                            '<td>' + nullFn(o.applyAmount) + '</td>' +
                            '<td>' + nullFn(o.applyPeriod) + '</td>' +
                            '<td>'+nullFn(statusFn(o.status))+'</td>' +
                            // '<td>队列'+nullFn(o.manualReviewQueue)+'</td>' +
                            '<td>'+nullFn(marketchannelFn(o.marketChannel))+'</td>' +//客户来源
                            '<td>'+nullFn(sourceTerminal(o.applyTerminal))+'</td>' +//终端来源
                            '<td>'+nullFn(whereFn(o.promotionSource))+'</td>' +
                            '<td>' + nullFn(intoChannelFn(o.applyChannel)) + '</td>' + //进件渠道
                            // '<td class="detial noselect"><a href="approvalTwo.html?intoCode='+o.intoCode+'&manualReviewQueue='+o.manualReviewQueue+'">立即审批</a></td>' +
                            '<td class="lock_con">'+ _lock +'</td>' +
                            _td +
                            '</tr>';
                    }).join('');
                    $('.tableCon').html(html);
                    // 点击判断订单状态
                    $('.lock_td').click(function () {
                        var _approveIntoCode = $(this).siblings('.approveIntoCode').html();
                        var _thisA = $(this).children('a');
                        if($(this).css('color') != 'rgb(162, 162, 162)'){
                            clickApproval(_approveIntoCode, _thisA);
                        }
                    });
                    window.setInterval(setLock,5000);  // 5s刷新
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
    });
}

// 定时发送数据，并发送请求，判断订单状态；
function sending() {
    var lockCode = ''; // 保存进件编号
    $.map($('.approveIntoCode'), function (o, i) {
        lockCode += o.innerHTML+',';
    })
    return lockCode = lockCode.slice(0, -1);
}
var _lock;
function setLock() {
    var obj = new Object();
    obj.intoCodes = sending();
    var _obj = JSON.stringify(obj, 'utf-8');
    $.ajax({
        headers: {
            token: localStorage.getItem('LoginToken')
        },
        type: 'POST',
        contentType: "text/html; charset=UTF-8",
        url: "/api/manage/user/refuseLocking",
        data: _obj,
        dataType: 'json',
        success: function (data) {
            if(data.rspCode === '000000'){
                var _data = data.body;
                var _lockMap = _data.lockMap;
                var _sending = sending().split(',');
                if(_sending){
                    $.each(_sending, function (ind, value) {
                        if(_lockMap.length > 0){
                            $.each(_lockMap, function (i, o) {
                                // if(sending().indexOf(o.intoCode)>-1) {
                                if(value == o.intoCode){
                                    $('tr[data-code=' + o.intoCode + ']').find('.lock_con').html(o.isLocking == true ? _lock = '已锁定' + '-' + o.reviewUser.reviewUserName : _lock = '未锁定');
                                    if (o.isLocking == true) {
                                        if (o.reviewUser.reviewUserId == localStorage.getItem('LoginId')) {
                                        } else {
                                            $('tr[data-code=' + o.intoCode + ']').find('.lock_td, .lock_a, .lock_i, .lock_span').css({cursor:'default',color:'#A2A2A2'});
                                            // $('tr[data-code=' + o.intoCode + ']').find('.lock_a').click(function () {
                                            //     return false;
                                            // })
                                            $('tr[data-code=' + o.intoCode + ']').find('.lock_a').attr("href","javascript:void(0);")
                                            // $('tr[data-code=' + o.intoCode + ']').find('.lock_a').attr("href",$(this).attr("data-url"))
                                        }
                                    }
                                    return false;
                                }else{
                                    $('tr[data-code=' + value + ']').find('.lock_con').html('未锁定');
                                    $('tr[data-code=' + value + ']').find('.lock_td, .lock_a, .lock_i, .lock_span').css({cursor:'pointer',color:'#2c7efa'});
                                    $('tr[data-code=' + value + ']').find('.lock_a').attr("href",$('tr[data-code=' + value + ']').attr("data-url"));
                                }
                            })
                        }else{
                            $('tr[data-code=' + value + ']').find('.lock_con').html('未锁定');
                            $('tr[data-code=' + value + ']').find('.lock_td, .lock_a, .lock_i, .lock_span').css({cursor:'pointer',color:'#2c7efa'});
                            $('tr[data-code=' + value + ']').find('.lock_a').attr("href",$('tr[data-code=' + value + ']').attr("data-url"));
                        }
                    })
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

// 点击立即审批时判断审批状态
function clickApproval(intoCode, thisA) {
    var obj = new Object();
    obj.intoCode = intoCode;
    var _obj = JSON.stringify(obj, 'utf-8');
    $.ajax({
        headers: {
            token: localStorage.getItem('LoginToken')
        },
        type: 'POST',
        contentType: "text/html; charset=UTF-8",
        url: "/api/manage/user/selectStatusByIntoCode",//判断订单状态接口
        data: _obj,
        dataType: 'json',
        success: function (data) {
            if (data.rspCode === '000000') {
                var _data = data.body;
                if(_data.status === 3){
                    thisA.attr('href','javascript:void(0);');
                    showMsg('.error-msg', '订单已撤销');
                }
            }else {
                showMsg('.error-msg', data.rspMsg);
            }
        }
    });
}

$(function(){
    //条件查询
    $('.find').click(function(){
        getData(pn);
    })
})

function statusFn(str){
    if( str == 12){
        return '待人工审批';
    }
}



