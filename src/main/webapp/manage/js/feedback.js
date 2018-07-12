//分页逻辑
var pn = 1,
    sum,
    totalPage;
var hash_ = getHashStringArgs(location.hash);
if (hash_.pageNo) {
    pn = hash_.pageNo;
}
labelShow();
getBackData(pn);

$(function(){
    // 点击查询
    $('.searchBtn').click(function () {
        getBackData(pn);
    });
    // 点击导出按钮
    $('#exportBtn').on('click',function () {
        ajaxExpExcel();
    });
    //点击其他地方收起下拉框
    $("body").on("click",function(){
        if(event.target.className != "showCon"){
            $(".optionUl").hide()
        }
    })
    // 点击下拉框选择li
    $('.showCon').click(function(e){
        $(".optionUl").hide()
        $(this).parent().children('.optionUl').toggle();
        e = e || event;
        stopPropagation(e);
    });
    $('.optionUl li').click(function () {
        $(this).parent().parent().children('.showCon').children('.detailCon').html($(this).html());
        $(this).parent().hide();
    });
    $(document).on('click', function () {
        $('.optionList ul').hide();
    });
    // 点击显示日历
    $('#datetimepicker_str').datetimepicker({
        format: 'yyyy-mm-dd',
        minView: 2,
        language: 'zh-CN',
        endDate: getNowFormatDate(),
        autoclose: true
    });
    $('#datetimepicker_end').datetimepicker({
        format: 'yyyy-mm-dd',
        minView: 2,
        language: 'zh-CN',
        endDate: getNowFormatDate(),
        autoclose: true
    });
    // 点击操作显示弹框
    $(document).on('click','.showDetail', function () {
        var _this = $(this);
        $('body').addClass('ovfHiden');//使网页不可滚动
        var Height = $(document).scrollTop();
        $('.bouced').css({'top': Height + 150 +'px' });
        $('.bouced,.mask').show();
        var detailTit = $(this).children('p').children('span').html();
        $('.detailTitCon').html(detailTit);
        $('#cusAccount').html(_this.siblings('.custCode').html()); // 客户账号
        $('#cusAccount').parent().attr('data-id',$(this).siblings('.custCode').attr('data-id'));
        $('#cusName').html(_this.siblings('.userName').html()); // 客户姓名
        $('#cusIphoneNum').html(_this.siblings('.mobile').html()); // 手机号
        $('#cusTag').html(_this.siblings('.serverType').html()); // 问题标签
        $('#cusDepict').html(_this.siblings('.omitWrap').html()); // 问题描述
        $('#cusTime').html(_this.siblings('.createTime').html()); // 反馈时间
        var obj = new Object();
        obj.id = parseInt($(this).siblings('.custCode').attr('data-id'));
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token:localStorage.getItem('LoginToken')
            },
            type: "POST",
            contentType: "text/html; charset=UTF-8",
            url: "/api/backComments/queryDetailById", // 客户反馈-处理意见初始化
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if(data.rspCode==='000000'){
                    var _data = data.body;
                    var _img = _data.image;
                    if(_img.length > 0){
                        var html = $.map(_img, function (o,i) {
                            return '<div class="swiper-slide stop-swiping"><img class="showThisImg" src="'+o.picture_url+'"></div>';
                        });
                    }
                    var _reply = _data.reply;
                    if(_reply){
                        $('.slideshowImg .swiper-wrapper').html(html);
                        if(detailTit == '详情'){
                            $('.treatment').html(nullFn(_reply.context)); // 处理意见
                            $('.conductor').html(nullFn(_reply.createUser)); // 处理人
                            $('.processing').html(nullFn(_reply.createTime)); // 处理时间
                        }
                    }else{
                        $('.treatment, .conductor, .processing').html('--');
                    }
                }else if(data.rspCode == '-999999'){
                    $('.treatment, .conductor, .processing').html('--');
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
        if(detailTit == '详情'){
            $('.if_detail').show();
            $('.if_manage').hide();
        }else{
            $('.if_manage').show();
            $('.if_detail').hide();
        }
    });
    // 点击关闭弹框
    $('.audit-close').click(function () {
        $('.bouced, .mask').hide();
        $('body').removeClass('ovfHiden');//使网页可滚动
    })
    //弹框拖拽
    dragDialog($('.bouced'));

    // 鼠标滑过显示大图片
    $(document).on('mouseover','.swiper-slide',function(){
        $('.showBigImg').show();
        $('.showBigImg img').attr('src',$(this).children('img').attr('src'));
    })
    $(document).on('mouseleave','.swiper-slide',function(){
        $('.showBigImg').hide();
    });

    // 点击按钮提交处理意见
    $('.submitBtn').on('click', function () {
        sublitSuggestion($(this));
    })
});
// 处理意见提交函数
function sublitSuggestion(_this) {
    var obj = new Object();
    obj.createUser = localStorage.getItem('LoginId');
    obj.context = _this.parent().siblings('.detailBodyList').children('.suggestionCon').val();
    obj.commentsId = parseInt(_this.parent().parent().siblings('#cusAccountWrap').attr('data-id'));
    var _obj = JSON.stringify(obj, 'utf-8');
    if(obj.context == '' || obj.context == null || obj.context == undefined){
        showMsg($('.error-msg'), '意见不能为空');
    }else{
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: "POST",
            contentType: "text/html; charset=UTF-8",
            url: "/api/backComments/backCommentsReplyAdd",// 意见反馈—处理意见添加
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if (data.rspCode === '000000') {
                    _this.parent().siblings('.detailBodyList').children('.suggestionCon').val('');
                    $('.bouced, .mask').hide();
                    showMsg($('.error-msg'), '提交'+data.rspMsg);
                    var hash_ = getHashStringArgs(location.hash);
                    if (hash_.pageNo) {
                        pn = hash_.pageNo;
                    }
                    getBackData(pn);
                    $('body').removeClass('ovfHiden');//使网页可滚动
                }else if(data.rspCode == '-999999'){
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
}
// 阻止事件冒泡函数
function stopPropagation(e) {
    if (e.stopPropagation)
        e.stopPropagation();
    else
        e.cancelBubble = true;
}
// 查询表格数据函数
function getBackData(pn) {
    var obj = new Object();
    obj.pageNum = pn;
    obj.pageSize = 10;
    obj.startDate = $('#datetimepicker_str').val();
    obj.endDate = $('#datetimepicker_end').val();
    obj.type = labelFn($('.bqQuestion .detailCon').html());
    obj.status = stateFn($('.condition .detailCon').html());
    // dateCompare(obj.startDate, obj.endDate);
    var date1 = obj.startDate.replace(/\-/gi, "/");
    var date2 = obj.endDate.replace(/\-/gi, "/");
    var time1 = new Date(date1).getTime();
    var time2 = new Date(date2).getTime();
    if (time1 > time2) {
        showMsg($('.error-msg'), '请选择正确的时间区间');
    }else{
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token:localStorage.getItem('LoginToken')
            },
            type: "POST",
            contentType: "text/html; charset=UTF-8",
            url: "/api/backComments/list", // 客户反馈列表
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if(data.rspCode==='000000'){
                    var _data = data.body;
                    sum = _data.total;
                    if(!sum){
                        $('.ListTable tbody').html('');
                        totalPage = 1;
                        definedPaginator(pn, totalPage, "kkpager", function (n) {
                            getBackData(n);
                        });//初始化
                        $('.ListTable tbody').html('<tr class="table_null"><td style="padding-left: 15px; text-align: left;" colspan="9">暂无数据</td></tr>');
                        showMsg($('.error-msg'), '未查到该信息');
                        return;
                    }
                    totalPage = Math.ceil(sum / 10);
                    definedPaginator(pn, totalPage, "kkpager", function (n) {
                        getBackData(n);
                    });//初始化
                    var list = _data.list;
                    if(list.length > 0){
                        var html = $.map(list, function (o, i) {
                            return '<tr>' +
                                '<td class="serialNum"></td>' +  // 序号
                                '<td class="custCode" data-id="'+o.id+'">'+nullFn(o.custCode)+'</td>' +  // 客户账号
                                '<td class="userName">'+nullFn(o.userName)+'</td> ' +  // 客户姓名
                                '<td class="mobile">'+nullFn(o.mobile)+'</td>' + // 手机号码
                                '<td class="serverType">'+numToLabel(o.serverType)+'</td>' + // 标签问题
                                '<td class="omitWrap">' +
                                '<p class="showAllPlace fkshowAllPlace"><span class="showAng"></span>'+nullFn(o.backComments)+'</p>' +
                                '<p class="overflowOmit">'+nullFn(o.backComments)+'</p>' +
                                '</td>' + // 问题描述
                                '<td class="createTime">'+timeToNYRFn(o.createTime)+'</td>' + // 提交时间
                                '<td>'+numTostate(o.status)+'</td>' + // 状态
                                (o.status == '1'?'' +
                                    '<td class="showDetail"><p class="leftAligned"><img src="../images/detail.svg" /><span>详情</span></p></td> ':
                                    '<td class="showDetail"><p class="leftAligned"><img src="../images/detail.svg" /></i><span>问题处理</span></p></td>')+
                                '</tr>';
                        }).join('');
                        $('.ListTable tbody').html(html);
                    }else{
                        $('.ListTable tbody').html('<tr class="table_null"><td style="padding-left: 15px; text-align: left;" colspan="9">暂无数据</td></tr>');
                        showMsg($('.error-msg'), '未查到该信息');
                    }
                    if ($('.ListTable tbody tr').length < 10) {
                        var a = 0;
                        for (var i = (pn - 1) * 10 + 1; i <= (pn * 10); i++) {
                            a += 1;
                            if (a > $('.ListTable tbody tr').length) {
                                return;
                            } else {
                                $('.ListTable tbody tr').eq(i % 10 - 1).children('td').eq(0).html(i);
                            }
                        }
                    } else {
                        for (var i = (pn - 1) * 10 + 1; i <= (pn * 10); i++) {
                            $('.ListTable tbody tr').eq(i % 10 - 1).children('td').eq(0).html(i);
                        }
                    }
                }else if(data.rspCode==='-999999'){
                    $('.ListTable tbody').html('<tr class="table_null"><td style="padding-left: 15px; text-align: left;" colspan="9">暂无数据</td></tr>');
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
// 标签问题接口函数
function labelShow() {
    var obj = new Object();
    obj.datatype = '0';
    var _obj = JSON.stringify(obj, 'utf-8');
    $.ajax({
        headers: {
            token:localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/sys/dataDictionary/v1/",
        data: _obj,
        dataType: 'json',
        success: function (data) {
            var _optionUl = $('.bqQuestion .optionUl');
            if(data.rspCode==='000000'){
                var _body = data.body.feedbackVoList;
                if(_body.length > 0){
                    var liList='';
                    for(var i=0; i<_body.length; i++){
                        liList += '<li data-feedbackId='+_body[i].feedbackId+'>'+_body[i].feedbackmessage+'</li>';
                    }
                    _optionUl.append(liList);
                    $('.optionUl li').click(function () {
                        $(this).parent().parent().children('.showCon').children('.detailCon').html($(this).html());
                        $(this).parent().parent().children('.showCon').children('.detailCon').attr('data-feedbackid',$(this).attr('data-feedbackid'));
                        $(this).parent().hide();
                    });
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
// 导出表格数据函数
function ajaxExpExcel() {
    var type = labelFn($('.bqQuestion .detailCon').html());
    var status = stateFn($('.condition .detailCon').html());
    var startDate = $('#datetimepicker_str').val();
    var endDate = $('#datetimepicker_end').val();
    var headers = encodeURI(encodeURI('客户账号,客户姓名,手机号码,标签问题,问题描述,提交时间,状态')) ;
    var fileds = 'custCode,userName,mobile,serverType,backComments,createTime,status';
    if(startDate != '' && endDate != ''){
        var date1 = startDate.replace(/\-/gi, "/");
        var date2 = endDate.replace(/\-/gi, "/");
        var time1 = new Date(date1).getTime();
        var time2 = new Date(date2).getTime();
        if (time1 > time2) {
            showMsg($('.error-msg'), '请选择正确的时间区间');
        }else{
            $('#exportForm').attr('action','/excel/exportLarge?type='+type+'&status='+status+'&startDate='+startDate+'&endDate='+endDate+'&headers='+headers+"&fileds="+fileds);
            // debugger
            $('#exportForm')[0].submit();
        }
    }else{
        $('#exportForm').attr('action','/excel/exportLarge?type='+type+'&status='+status+'&startDate='+startDate+'&endDate='+endDate+'&headers='+headers+"&fileds="+fileds);
        // debugger
        $('#exportForm')[0].submit();
    }

}
// 表格-问题描述列鼠标滑过显示浮动框位置
function overDetail(detail){
    var _height = parseFloat(detail.css('height').substring(0,_length)); // 获取弹框高度
    var _top = _height-7+'px'; // 弹框定位的高度
    detail.css('top',_top);
}

// 显示日历函数
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}