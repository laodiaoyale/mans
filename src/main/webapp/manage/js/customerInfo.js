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
    if ($('#mobile').val() != '') {
        obj.mobile = $('#mobile').val();
    }
    if ($('#idCard').val() != '') {
        obj.idCard = $('#idCard').val();
    }
    var _obj = JSON.stringify(obj, 'utf-8');
    $.ajax({
        headers: {
            token: localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/manage/user/list",//客户信息接口
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
                var _list = _data.list;
                if (_list.length > 0) {
                    var html = $.map(_list, function (o, i) {
                        var txt = o.validateState == '0' ? '解冻账号' : '冻结账号';
                        return '<tr>' +
                            '<td></td>' +
                            '<td>' + nullFn(o.name) + '</td>' +
                            '<td id="mobile">' + nullFn(o.mobile) + '</td>' +
                            '<td>' + nullFn(o.idCard) + '</td>' +
                            '<td>' + nullFn(marketchannelFn(o.sex)) + '</td>' + //性别
                            // '<td>' + nullFn(whereFn(o.promotionSource)) + '</td>' + //渠道来源
                            // '<td>' + nullFn(sourceTerminal(o.terminalType)) + '</td>' + //终端来源
                            // '<td>' + nullFn(o.createTime) + '</td>' +
                            // '<td>' + nullFn(o.loginTime) + '</td>' +
                            // '<td class="' + o.custCode + '_txt">' + nullFn(validateStateFn(o.validateState)) + '</td>' +
                            // '<td class="detial noselect" data-stype="' + o.validateState + '" data-mobile="' + o.mobile + '" data-custCode="' + o.custCode + '" data-stxt="' + txt + '">' + txt + '</td>' +
                            '</tr>';
                    }).join('');
                    $('.tableCon').html(html);
                    var btn_box = '<div class="msg-con"></div>' +
                        '<div class="msg-btn">' +
                        '        <button class="sure-btn">确定</button>' +
                        '        <button class="cancel-btn">取消</button>' +
                        '    </div>';
                    $('.msg-box').html('').append(btn_box);
                } else {
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

$(function () {
    //条件查询
    $('.find').click(function () {
        getData(pn);
    })
    //冻结账号
    $(document).on('click', '.detial', function () {
        $('.msg-box,.mask').show();
        var _this = $(this);
        $('.msg-box').data('custcode', _this.data('custcode'));
        $('.msg-box').data('stype', _this.data('stype'));
        $('.msg-box').data('mobile', _this.data('mobile'));
        $('.msg-box').data('stxt', _this.data('stxt'));
        if (_this.data('stype') == '1') {
            $('.msg-con').html('是否冻结此账号')
        } else {
            $('.msg-con').html('是否解冻此账号')
        }
    })

    //确定冻结
    $(document).on('click', '.sure-btn', function () {
        var state = $('.msg-box').data('stype');
        var obj = new Object();
        obj.mobile = $('.msg-box').data('mobile');
        obj.custCode = $('.msg-box').data('custcode');
        obj.validateState = state;
        var _state = state == '0' ? '1' : '0';
        var _txt = state == '0' ? '冻结账号' : '解冻账号';
        _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: 'POST',
            contentType: "text/html; charset=UTF-8",
            url: "/api/manage/user/blockedAccount",//冻结账号接口
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if (data.rspCode === '000000') {
                    var _data = data.body;
                    $('.' + obj.custCode + '').data('stype', _state).html(_txt);
                    $('.' + obj.custCode + '_txt').html(nullFn(validateStateFn(_state)));
                    getData(pn);//刷新页面
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
        $('.msg-box,.mask').hide();
    })
    $(document).on('click', '.cancel-btn', function () {
        $('.msg-box,.mask').hide();
    })
})

function validateStateFn(validateState) {
    var str = '';
    switch (validateState) {
        case '0':
            str = '冻结';
            break;
        case '1':
            str = '正常';
            break;
    }
    return str;
}

function nullFn(str) {
    if (str == null || str == "" || str == undefined) {
        return "--";
    } else {
        return str;
    }
}

