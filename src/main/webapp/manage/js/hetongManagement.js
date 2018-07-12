$(function () {
    // /分页逻辑
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
        }else {
            obj.name ='';
        }
        if($('#phone').val()!=''){
            obj.mobile = $('#phone').val();
        }else{
            obj.mobile ='';
        }
        if($('#loanStatus').val()){
            obj.loanStatus = parseInt($('#loanStatus').val());
        }
        var hashStrings = (window.location.hash.length > 0 ? window.location.hash.substring(8) : "");
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token:localStorage.getItem('LoginToken')
            },
            type: "POST",
            contentType: "text/html; charset=UTF-8",
            url: "/api/manage/contract/list",//合同管理列表接口
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
                            var str='';
                            if(o.loanStatus==="待还款" || o.loanStatus==="已逾期" || o.loanStatus==="已结清"){
                                str="<td class='detial'><a class='ht-detail' href = 'hetongMessage.html?intoCode="+o.intoCode +'&pageNo='+ hashStrings +"'>合同信息</a><a class='ht-download' data-contractNo='"+o.contractNo+"'  data-custCode='"+o.custCode+"'>合同下载</a></td>";
                            }else{
                                str="<td>--</td>";
                            }
                            return '<tr>' +
                                '<td>' + o.orderNo + '</td>' +
                                '<td>' + o.name + '</td>' +
                                '<td>' + o.mobile + '</td>' +
                                '<td>' + o.productName + '</td>' +
                                '<td>' + o.fundAmt + '</td>' +
                                '<td>' + o.loanPeriods + '</td>' +
                                '<td>' + o.productRate + '</td>' +
                                '<td>' + o.loanStatus + '</td>'+
                                '<td>' + nullFn(o.fundDate) + '</td>' +str+
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
    if(stateFn(parseInt($('#loanStatus').find("option:selected").val()))!=''){
        obj.loanStatus = stateFn(parseInt($('#loanStatus').find("option:selected").val()));
    }
    var hashStrings = (window.location.hash.length > 0 ? window.location.hash.substring(8) : "");
    var _obj = JSON.stringify(obj, 'utf-8');
    $.ajax({
        headers: {
            token:localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/manage/contract/list",//合同管理列表接口
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
                        var str='';
                        if(o.loanStatus==="待还款" || o.loanStatus==="已逾期" || o.loanStatus==="已结清"){
                            str="<td class='detial'><a class='ht-detail' href = 'hetongMessage.html?intoCode="+o.intoCode +'&pageNo='+ hashStrings +"'>合同信息</a><a class='ht-download' data-contractNo='"+o.contractNo+"'  data-custCode='"+o.custCode+"'>合同下载</a></td>";
                        }else{
                            str="<td>--</td>";
                        }
                        return '<tr>' +
                            '<td>' + o.orderNo + '</td>' +
                            '<td>' + o.name + '</td>' +
                            '<td>' + o.mobile + '</td>' +
                            '<td>' + o.productName + '</td>' +
                            '<td>' + o.fundAmt + '</td>' +
                            '<td>' + o.loanPeriods + '</td>' +
                            '<td>' + o.productRate + '</td>' +
                            '<td>' + o.loanStatus + '</td>'+
                            '<td>' + nullFn(o.fundDate) + '</td>' +str+
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
    });
    //条件查询
    $('.find').click(function () {
        getData(pn);
    })
    //合同下载
    $(document).on('click', '.ht-download', function () {
        var obj = new Object();
        obj.contractNo =$(this).attr("data-contractno");
        obj.custCode =$(this).attr("data-custCode");
        var _obj = JSON.stringify(obj, 'utf-8');
        var $this=$(this);
        $.ajax({
            headers: {
                token:localStorage.getItem('LoginToken')
            },
            timeout : 600000, //超时时间设置，单位毫秒
            type: "POST",
            contentType: "text/html; charset=UTF-8",
            url: "/api/manage/contract/contractDownload",//合同下载
            data: _obj,
            dataType: 'json',
            beforeSend: function () {
                $('.loading-img').show();
            },
            success: function (data) {
                if (data.rspCode === '000000') {
                    var _data = data.body;
                    if(_data.contractInfoUrl.length > 0){
                        var url = 'http://iqianjindai.oss-cn-beijing.aliyuncs.com'+_data.contractInfoUrl[0].url;
                        var elemIF = document.createElement("iframe");
                        elemIF.src = url;
                        elemIF.style.display = "none";
                        document.body.appendChild(elemIF);
                        $this.attr('download', '合同信息');
                        showMsg('error-msg', '下载成功');
                        $('.loading-img').hide();
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
                } else {
                    showMsg('error-msg', data.rspMsg)
                }
                $('.loading-img').hide();
            },
            error:function(){
                $('.loading-img').hide();
            }
        })
    })
});


function stateFn(val){
    if(val < 0){
        return '';
    }else{
        return val;
    }
}

