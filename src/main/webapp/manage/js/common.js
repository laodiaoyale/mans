Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


// 验证手机号是否正确
function isPhoneNum(phoneNum) {
    var reg = /^1(([3|8|7|5][0-9])|(5[^4|\D]))\d{8}$/;
    return reg.test(phoneNum);
}

// 验证内容中是否包括特殊字符
function isIncludeSpecalStr(str) {
    var reg = /[`~!@#$%^&*()_+<>?:"{},\/;'[\]]/;
    return reg.test(str);
}

// 验证内容中是否包括汉字
function CheckChinese(str) {
    var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
    return reg.test(str);
}

//验证内容只能为汉字
function onlyChinese(str){
    var reg=/^[\u2E80-\u9FFF]+$/;//Unicode编码中的汉字范围
    return reg.test(str);
}

// 验证文本内容是否为空
function isValContent(str) {
    if ($.trim(str) == '') {
        return true;
    } else {
        return false;
    }
}

//验证内容是否位数字
function isValNum(str) {
    var reg = /^[0-9]*[1-9][0-9]*$/;
    return reg.test(str);
}
//验证6-8位字母加数字
function isNumAndStr(str){
    var reg =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,8}$/;
    return reg.test(str);
}

//验证字母加数字
function isEightNumAndStr(str){
    var reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{1,8}$/; // 字母加数字
    return reg.test(str);
}

function industryFn(str) {
    switch (str) {
        case '1':
            str = '非营利机构';
            break;
        case '2':
            str = '建筑/传统加工制造';
            break;
        case '3':
            str = '金融/IT';
            break;
        case '4':
            str = '商贸/服务/文娱传媒(含私营企业)';
            break;
        case '5':
            str = '专业机构';
            break;
        case '6':
            str = '其他';
            break;
    }
    return str;
}

function relationFn(str) {
    switch (str) {
        case '1':
            str = '配偶';
            break;
        case '2':
            str = '父母';
            break;
        case '3':
            str = '子女';
            break;
        case '4':
            str = '亲属';
            break;
        case '5':
            str = '同事';
            break;
        case '6':
            str = '朋友';
            break;
    }
    return str;
}

function degreeFn(str) {
    switch (str) {
        case '1':
            str = '研究生及以上';
            break;
        case '2':
            str = '本科';
            break;
        case '3':
            str = '大专';
            break;
        case '4':
            str = '高中/中专';
            break;
        case '5':
            str = '初中及以下';
            break;
    }
    return str;
}

function sexFn(str) {
    switch (str) {
        case '0':
            str = '女';
            break;
        case '1':
            str = '男';
            break;
    }
    return str;
}

function nullFn(str) {
    var nStr = str + '';
    if (nStr === 'null' || nStr === "" || nStr === 'undefined') {
        return "--";
    } else {
        return nStr;
    }
}
//渠道来源
function whereFn(where){
    var str ='';
    switch (where) {
        case '2':
            str = '卡牛';
            break;
        case '3':
            str = '借点钱';
            break;
        case '4':
            str = '客户经理';
            break;
        case '5':
            str = '自营';
            break;
        case '1':
        case '1br':
        case '1br-01':
        case '1br-02':
        case '1br-2':
            str = '百融';
            break;
        case '2yr':
        case '2yr-1':
            str = '予人';
            break;
        case '3yw':
            str = '易网';
            break;
        case '4rx':
            str = '融信';
            break;
        case '6xjcr':
            str = '现金超人';
            break;
        case '7xf':
            str = '小凡';
            break;
        case '8xdzj':
            str = '速贷之家';
            break;
        case '9dkb':
            str = '贷款宝';
            break;
        case '10xxqb':
            str = '小星钱包';
            break;
        case '11dkdh':
            str = '360贷款导航';
            break;
        case '13lt':
            str = '联拓';
            break;
        case '14dgjr':
            str = '地瓜金融';
            break;
        case '15wdxm':
            str = '网贷小猫';
            break;
        case '16huijie':
            str = '会借';
            break;
        case '17hjb':
            str = '汇聚宝';
            break;
        case '18sqb':
            str = '收钱宝';
            break;
        case '19klq':
            str = '快来钱';
            break;
        case '20rrw':
            str = '热融网';
            break;
        case '21xxjr':
            str = '小小金融';
            break;
        case '22jyd':
            str = '借易得';
            break;
        case '40houhan':
        case '40houhan-1':
            str = '后汉科技';
            break;
        case '41duke':
        case '41duke-1':
        case '41duke-2':
        case '41duke-3':
            str = '嘟克';
            break;
        case '12hcdz':
            str = '红尘电子';
            break;
        case '42daima':
        case '001abc':
        case '002abc':
            str = '贷嘛';
            break;
        case '30sywl':
        case '30sywl-1':
        case '30sywl-01':
            str = '速易网络';
            break;
        case '33zzcm':
            str = '掌众传媒';
            break;
        case '34haik':
            str = '海科';
            break;
        case '36zqxq':
        case '36zqxq-1':
            str = '纵情向前';
            break;
        case '37yyjr':
            str = '有鱼金融';
            break;
        case '38klzx':
            str = '考拉征信';
            break;
        case '39idai':
        case '39idai-1':
        case '39idai-2':
            str = 'i代';
            break;
        case '29fqgj':
            str = '分期管家';
            break;
        case '31hqwy':
            str = '花钱无忧';
            break;
        case '26nuoy':
            str = '诺映科技';
            break;
        case '27cain':
            str = '财鸟金服';
            break;
        case '28huif':
            str = '汇丰精英';
            break;
        case '25baoj':
            str = '保街';
            break;
        case '44jjd':
            str = '99贷';
            break;
        case '45tkb':
            str = '提款宝';
            break;
        case '46dgjt':
            str = '打个借条';
            break;
        case '233wl':
            str = '二三三网络';
            break;
        case 'haoxiangdai':
            str = '好享贷';
            break;
        case 'yiweijinrong1':
        case 'yiweijinrong2':
        case 'yiweijinrong3':
        case 'yiweijinrong4':
        case 'yiweijinrong5':
        case 'yiweijinrong6':
        case 'yiweijinrong7':
        case 'yiweijinrong8':
            str = '易维金融';
            break;
        case '47awqb':
            str = '安稳钱包';
            break;
        case '48hndx':
            str = '河电';
            break;
        case '49fxkj':
            str = '梵星科技';
            break;
        case '50rdxx':
        case '50rdxx-1':
        case '50rdxx-2':
        case '50rdxx-3':
        case '50rdxx-4':
            str = '瑞道信息';
            break;
        case '51jkqb-1':
        case '51jkqb-2':
        case '51jkqb-3':
            str = '借款钱包';
            break;
        case '52rxkj':
            str = '融翔科技';
            break;
        case '53dmjd':
            str = '大麦贷款';
            break;
        case '54bld-1':
        case '54bld-2':
        case '54bld-3':
            str = '菠萝贷';
            break;
        case 'sigeyezi1':
        case 'sigeyezi2':
        case 'sigeyezi3':
        case 'sigeyezi4':
        case 'sigeyezi5':
            str = '四个椰子';
            break;
        case  '55dhqudao':
            str = '登荷信息';
            break;
        case  '56xygj':
            str = '信用管家';
            break;
        case  '58yaqi':
            str = '雅琪';
            break;
        case  '59jingxi':
            str = '璟熙';
            break;
        case  '60lld':
            str = '蓝领贷';
            break;
        case  '61xmdk':
            str = '熊猫贷款';
            break;
        case  '62qsj':
            str = '轻松借';
            break;
        case  '63rongshu-1':
        case  '63rongshu-2':
        case  '63rongshu-3':
        case  '63rongshu-4':
        case  '63rongshu-5':
            str = '榕树';
            break;
        case 'kanong':
        case 'kanong1':
            str = '卡农';
            break;
        case 'qianxiangjiedai':
        case 'qianxiangjiedai1':
            str = '钱箱借贷';
            break;
        case 'yidianbang':
            str = '亿点帮';
            break;
        case 'woairong':
            str = '我爱融';
            break;
        case 'ronghengpuju':
            str = '聚恒普惠';
            break;
        case 'edaiweifu':
            str = 'e代微服';
            break;
        case 'cainiu':
            str = '财牛';
            break;
        case 'kamengshuyuan':
            str = '卡盟书院';
            break;
        case 'yashang':
            str = '亚上';
            break;
        case 'haocheng':
            str = '豪诚';
            break;
        case 'fankezhijia':
            str = '凡客之家';
            break;
        case 'rongyi':
            str = '融逸';
            break;
        case 'caocaolianmeng':
            str = '曹操联盟';
            break;
        case 'qianyuandai':
            str = '千元贷';
            break;
        default:
            str = where;
            break;
    }
    return str;
}
function quotaFn(str) {
    if (str == 0) {
        return '无额度';
    } else {
        return str;
    }
}

$(function () {
    //头部展示姓名
    var _name = localStorage.getItem('LoginName');
    $('.name .loginName').html(_name);
    //点击退出
    $(document).on('click','.logOut',function(){
        var obj = new Object();
        obj.token = localStorage.getItem('LoginToken');
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: 'POST',
            contentType: "text/html; charset=UTF-8",
            url: "/api/sysUser/logout/v2",//退出接口
            data: _obj,
            dataType: 'json',
            success: function (data) {
                localStorage.removeItem("LoginName");
                localStorage.removeItem("LoginToken");
                localStorage.removeItem("userNo");
                localStorage.removeItem("LoginJob");
                localStorage.removeItem("LoginDepartment");
                localStorage.removeItem("LoginRoleName");
                window.location.href = 'login.html';
            }
        })
    })
    $("#header").load("header.html",function(){
        var _userNo = localStorage.getItem('userNo'),
            _name = localStorage.getItem('LoginName'),
            _jobs = localStorage.getItem('LoginJob'),
            _department = localStorage.getItem('LoginDepartment'),
            _roleName = localStorage.getItem('LoginRoleName');
        $('.loginName').html(_name);//姓名
        $('.mine-info-account').html(_userNo);//账号
        $('.mine-info-role').html(_roleName);//角色
        $('.mine-info-depart').html(_department);//部门
        $('.mine-info-job').html(_jobs);//岗位
    });
    //显示“我的”
    $(document).on('mouseover','.name',function(){
        $('.mine-info-box').show();
    })
    $(document).on('mouseout','.name',function(){
        setTimeout(function(){
            $('.mine-info-box').hide();
        },2000)
    });
    $('.reset-password').load('resetPassword.html',function(){
        //修改密码
        $(document).on('click','.mine-info-reset',function(){
            $('.reset-password').show();//显示修改密码页面
            $('html').css({'background' : '#FAFBFE'});
            if($('#header').next().next().hasClass('inner-page')){
                $('.inner-page').hide()
            }else{
                $('.customer-box').hide();
                $('.reset-password').css({'margin':'50px 0 0 200px'})
            }
        })
        //修改密码
        $(document).on('click','.reset-password-button',function(){
            var _userNo = localStorage.getItem('userNo'),
                _newPassword = $('.new-password').val(),//新密码
                _confirmPassword = $('.confirm-password').val();//再次确认密码
            if(_newPassword !== _confirmPassword){
                showMsg('.error-msg','你的密码不一致，请重新输入');
            }else if(isIncludeSpecalStr(_newPassword) || isIncludeSpecalStr(_confirmPassword)){//判断是否包含特殊字符
                showMsg('.error-msg','请输入正确的密码格式');
            }else if(CheckChinese(_newPassword) || CheckChinese(_confirmPassword)){//是否包含汉字
                showMsg('.error-msg','请输入正确的密码格式');
            }else if(_newPassword.length<6||_newPassword.length>8||_confirmPassword.length<6||_confirmPassword.length>8){
                showMsg('.error-msg','请输入正确的密码长度');
            }else if(!isNumAndStr(_newPassword) || !isNumAndStr(_confirmPassword)){
                showMsg('.error-msg','请输入正确的密码格式');
            }else{
                var obj = {
                    'userNo':_userNo,
                    'newPassword':md5(_newPassword),
                    'confirmPassword':md5(_confirmPassword)
                };
                var _obj = JSON.stringify(obj,'utf-8');
                $.ajax({
                    headers: {
                        token: localStorage.getItem('LoginToken')
                    },
                    type: 'POST',
                    contentType: "text/html; charset=UTF-8",
                    url: "/api/sysUser/passwordUpdate/v1",//修改密码接口
                    data: _obj,
                    dataType: 'json',
                    success : function(data){
                        if(data.rspCode === '000000'){
                            showMsg($('.error-msg'), '密码修改成功');
                            window.location.href = 'user.html';
                        }else if(data.rspCode === '-999999'){
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
        })
    })
})

//fnTab($('.a-hock'),$('.b-hock'),'click');     tab切换
function fnTab(oNav,aCon,action,callback){
    var aElem=aCon.children();
    var oElem=oNav.children();

    aCon.hide().eq(0).show();

    oElem.each(function(index, element) {
        if(action=='click'){
            $(this).click(function(){
                aElem.hide().eq(index).show();
                oElem.removeClass("active").eq(index).addClass("active");
                //执行回调方法
                callback&&callback();
            });
        }
        if(action=='hover'){
            $(this).hover(function(){
                aElem.hide().eq(index).show();
                oElem.removeClass("active").eq(index).addClass("active");
                //执行回调方法
                callback&&callback();
            },function(){});
        }
    });
}
//人工审核中的方法
//资产处理信息保证人代偿信息等
function assetFlagFn(assetFlag){
    var str = '';
    switch (assetFlag){
        case '0':
            str = '无相关信息';
            break;
        case '1':
            str = '有相关信息';
            break;
    }
    return str;
}
//身份信息核对结果
function checksFn(checks){
    var str = '';
    switch (checks){
        case '0':
            str = '有缺失值';
            break;
        case '1':
            str = '姓名一致,身份证不一致';
            break;
        case '2':
            str = '姓名不一致,身份证一致';
            break;
        case '3':
            str = '姓名和身份证都一致';
            break;
        case '-1':
            str = '姓名和身份证都不一致';
            break;
    }
    return str;
}
//是否失败
function isfailFn(isfail){
    var str = '';
    switch (isfail){
        case '0':
            str = '成功';
            break;
        case '1':
            str = '失败';
            break;
    }
    return str;
}
//审批队列终端来源转换方法
function sourceTerminal(value){
    var str = '';
    switch (value){
        case 'API-KN':
            str = '卡牛';
            break;
        case 'iOS':
            str = 'iOS';
            break;
        case 'android':
            str = 'Android';
            break;
        case 'h5':
        case 'H5':
            str = 'H5';
            break;
        case 'wap':
            str = 'WAP';
            break;
    }
    return str;
}
//审批管理模块-进件渠道转义方法
function intoChannelFn(value){
    var str = '';
    switch (value){
        case 'JY':
        case 'jy':
            str = '自营';
            break;
        case 'O2O':
            str = 'O2O';
            break;
        case 'API-KN':
            str = '卡牛';
            break;
    }
    return str;
}
//列表循环展示信息
function marketchannelFn(sex){
    var str = '';
    switch (sex){
        case 0:
            str = '女';
            break;
        case 1:
            str = '男';
            break;
    }
    return str;
}
//接口返回
function channelFn(channel){
    var str = '';
    switch (channel){
        case 'AppStore':
            str = 'AppStore';
            break;
        case '应用宝':
            str = 'yingyongbao';
            break;
        case '360市场':
            str = '_360';
            break;
        case '百度市场':
            str = 'baidu';
            break;
        case '小米市场':
            str = 'xiaomi';
            break;
        case '华为市场':
            str = 'huawei';
            break;
        case '豌豆荚':
            str = 'wandoujia';
            break;
        case '安智市场':
            str = 'anzhi';
            break;
        case 'OPPO市场':
            str = 'oppo';
            break;
        case 'VIVO市场':
            str = 'vivo';
            break;
        case '魅族市场':
            str = 'meizu';
            break;
        case '捷越官网':
            str = 'jieyue';
            break;
        case '锤子市场':
            str = 'chuizi';
            break;
        case '乐视市场':
            str = 'leshi';
            break;
        case '搜狗市场':
            str = 'sougou';
            break;
        case ' 乐商店':
            str = 'leshangdian';
            break;
        case '机锋':
            str = 'jifeng';
            break;
        case '应用汇':
            str = 'yingyonghui';
            break;
        case '木蚂蚁':
            str = 'mumayi';
            break;
    }
    return str;
}
//汇法网中详细信息特殊字符替换方法
function replaceFn(str){
    var reg=/#@!/g;
    var Str=str.replace(reg,':');
    var reg2 = /!@#/g;
    var newStr=Str.replace(reg2,';');
    return newStr;
}
//法院、金融服务机构是否命中黑名单
// 蜜罐-用户被机构查询历史-是否是本机构查询
function isCurror(con){
    var str = '';
    switch (con){
        case 'true':
            str = '是';
            break;
        case 'false':
            str = '否';
            break;
    }
    return str;
}
//处理时间格式(人工审核 yyyy-mm-dd hh:ff:ss)
function timeFormat(str){
    if(str != null || str != undefined){
        var Nstr = str + '';
        var timeStr = Nstr.substring(0,4) + '-'+Nstr.substring(4,6) + '-'+Nstr.substring(6,8) + ' '+Nstr.substring(8,10) + ':'+Nstr.substring(10,12) + ':'+Nstr.substr(12,2);
    }
    return timeStr;
}
// 时间格式化（年月日:xxxxxxxx => xxxx-xx-xx）
function  timeFormat8(str) {
    if(str !=null && str !=undefined && str != '--') {
        var Nstr = str + '';
        var timeStr = Nstr.substring(0,4) + '-' + Nstr.substring(4,6) + '-' + Nstr.substring(6,8);
    }else{
        timeStr = '--';
    }
    return timeStr;
}
//规范时间格式（yyyy-mm-dd => yyyy年yy月）2017-11-01T00:00:00.000+08  => 2017年11月
function timeTransforFn(string){
    if(string !=null && string !=undefined && string != '--') {
        var Nstr = string + '';
        var monthStr = Nstr.substring(0,4) + '年' + Nstr.substring(5,7) + '月';
    }else{
        monthStr = '--';
    }
    return monthStr;
}
// 时间戳转换成标准时间格式：xxxx-xx-xx
function timestampToTime(timestamp) {
    if(timestamp !=null && timestamp !=''){
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() < 10 ? '0'+(date.getDate()): date.getDate();
        return Y+M+D;
    }else{
        return '';
    }

}
// 规范时间格式（yyyy-mm-dd => yyyy年yy月）2017-11-01T00:00:00.000+08  => 2017-11-1
function timeToNYRFn(string){
    if(string !=null && string !=undefined && string != '--') {
        var Nstr = string + '';
        var monthStr = Nstr.substring(0,11);
    }else{
        monthStr = '--';
    }
    return monthStr;
}
//货币类型    风险提示查看
function currencyTypeFn(item){
    var str = '';
    switch (item){
        case 1:
            str = '人民币';
            break;
        case 2:
            str = '美元';
            break;
    }
    return str;
}
//至诚阿福-查询历史信息-查询原因码表翻译
function queryReasonFn(code){
    var str = '';
    switch(code){
        case '10':
            str ='贷款审批';
            break;
        case '11':
            str ='贷后管理';
            break;
        case '12':
            str ='信用卡审批';
            break;
        case '13':
            str ='担保资格审查';
            break;
        case '14':
            str ='保前审查';
            break;
    }
    return str;
}
//至诚阿福-查询历史信息-还款状态码/审批结果码/借款类型码表翻译
function loanStatusFn(code){
    var str = '';
    switch(code){
        case '301':
            str ='正常';
            break;
        case '302':
            str ='逾期';
            break;
        case '303':
            str ='结清';
            break;
    }
    return str;
}
function approvalStatuCoFn(code){
    var str = '';
    switch(code){
        case '201':
            str ='审核中';
            break;
        case '202':
            str ='批贷已放款';
            break;
        case '203':
            str ='拒贷';
            break;
        case '204':
            str ='客户放弃';
            break;
    }
    return str;
}
function loanTypeFn(code){
    var str = '';
    switch(code){
        case '21':
            str ='信用';
            break;
        case '22':
            str ='抵押';
            break;
        case '23':
            str ='担保';
            break;
    }
    return str;
}

//至诚阿福-查询历史信息-命中项码/风险类别码表翻译
function riskItemTypeFn(code){
    var str = '';
    switch(code){
        case '101010':
            str ='证件号码';
            break;
    }
    return str;
}
function riskTypeFn(code){
    var str = '';
    switch(code){
        case '10':
            str ='丧失还款能力类';
            break;
        case '11':
            str ='伪冒类';
            break;
        case '12':
            str ='资料虚假类';
            break;
        case '13':
            str ='用途虚假类';
            break;
        case '19':
            str ='其他';
            break;
    }
    return str;
}

// 新颜&前海征信-前海征信-证件类型判断
// 算话共享-身份信息概要-身份信息-证件类型判断
function idTypeFn(code) {
    var str = '';
    switch(code){
        case '0' : str = '身份证'; break;
        case '1' : str = '户口簿'; break;
        case '2' : str = '护照'; break;
        case '3' : str = '军官证'; break;
        case '4' : str = '士兵证'; break;
        case '5' : str = '港澳居民来往内地通行证'; break;
        case '6' : str = '台湾同胞来往内地通行证'; break;
        case '7' : str = '临时身份证'; break;
        case '8' : str = '外国人居留证'; break;
        case '9' : str = '警官证'; break;
        case 'A' : str = '香港身份证'; break;
        case 'B' : str = '澳门身份证'; break;
        case 'X' : str = '其他证件'; break;
    }
    return str;
}

// 新颜&前海征信-前海征信-来源代码判断
function sourceCodeFn(code) {
    var str = '';
    switch(code){
        case 'A' : str = '信贷逾期风险'; break;
        case 'B' : str = '行政负面风险'; break;
        case '99' : str = '权限不足'; break;
    }
    return str;
}

// 新颜&前海征信-前海征信-风险标记判断
function riskMarkersFn(code) {
    var str = '';
    switch(code){
        case 'B1' : str = '失信被执行人'; break;
        case 'B2' : str = '被执行人'; break;
        case 'B3' : str = '交通严重违章'; break;
        case '99' : str = '权限不足'; break;
    }
    return str;
}

// 新颜&前海征信-前海征信-数据状态判断
function dataStateFn(code) {
    var str = '';
    switch(code){
        case '1' : str = '已验证'; break;
        case '2' : str = '未验证'; break;
        case '3' : str = '异议中'; break;
        case '99' : str = '权限不足'; break;
    }
    return str;
}

// 算话共享-身份信息概要-身份信息-性别判断
function genderFn(code) {
    var str = '';
    switch(code){
        case 0 : str = '未知的性别'; break;
        case 1 : str = '男性'; break;
        case 2 : str = '女性'; break;
        case 9 : str = '未说明性别'; break;
    }
    return str;
}

// 算话共享-身份信息概要-身份信息-婚姻状态判断
function maritalStatusFn(code) {
    var str = '';
    switch(code){
        case 10 : str = '未婚'; break;
        case 20 : str = '已婚'; break;
        case 30 : str = '丧偶'; break;
        case 40 : str = '离婚'; break;
        case 90 : str = '未说明婚姻状况'; break;
    }
    return str;
}

// 算话共享-身份信息概要-身份信息-最高学历判断
function highestEducationFn(code) {
    var str = '';
    switch(code){
        case 10 : str = '研究生及以上'; break;
        case 20 : str = '大学本科'; break;
        case 30 : str = '大学专科和专科学校'; break;
        case 40 : str = '中等专业学校或中等技术学校'; break;
        case 50 : str = '技术学校'; break;
        case 60 : str = '高中'; break;
        case 70 : str = '初中'; break;
        case 80 : str = '小学'; break;
        case 90 : str = '文盲或半文盲'; break;
        case 99 : str = '未知'; break;
    }
    return str;
}

// 算话共享-身份信息概要-居住地址信息-居住情况判断
function livingFn(code) {
    var str = '';
    switch(code){
        case '1' : str = '自置（自建，自购）无贷款或贷款已还清'; break;
        case '2' : str = '按揭'; break;
        case '3' : str = '亲属楼宇'; break;
        case '4' : str = '集体宿舍'; break;
        case '5' : str = '租房'; break;
        case '6' : str = '共有住宅'; break;
        case '7' : str = '其他'; break;
        case '9' : str = '未知'; break;
    }
    return str;
}

// 算话共享-信贷信息概要-信用提示-业务判断
function businessFn(code) {
    var str = '';
    switch (code){
        case 'car' : str = '车辆抵押贷款'; break;
        case 'cash' : str = '信用贷款'; break;
        case 'circle' : str = '循环租赁业务'; break;
        case 'estate' : str = '房产抵押贷款'; break;
        case 'lease' : str = '融资租赁业务'; break;
        case 'other' : str = '其他业务'; break;
    }
    return str;
}

// 算话共享-信贷信息明细-信贷信息明细-业务类型判断
function businessTypeFn(code) {
    var str = '';
    switch (code){
        case '1' : str = '信用贷款-现金贷（大于30天）'; break;
        case '2' : str = '循环贷款业务'; break;
        case '3' : str = '融资租赁业务'; break;
        case '5' : str = '房产抵押贷款'; break;
        case '6' : str = '车辆抵押贷款'; break;
        case '7' : str = '信用贷款-短期现金贷(<=30天)'; break;
        case '8' : str = '信用贷款-消费分期贷（有业务场景）'; break;
        case 'Z' : str = '其他业务'; break;
    }
    return str;
}

// 算话共享-信贷信息明细-信贷信息明细-合同状态判断
function contractStatesFn(code) {
    var str = '';
    switch (code){
        case 0 : str = '正常未结清'; break;
        case 1 : str = '代偿未结清'; break;
        case 2 : str = '正常结清'; break;
        case 3 : str = '代偿结清'; break;
        case 4 : str = '呆账'; break;
        case 5 : str = '核销'; break;
        case 6 : str = '以资抵债'; break;
        case 7 : str = '提前还款未结清'; break;
        case 8 : str = '提前还款结清'; break;
    }
    return str;
}

// 算话共享-信贷信息明细-信贷信息明细-担保方式判断
function guarantyStyleFn(code) {
    var str = '';
    switch (code){
        case 1 : str = '质押（含保证金）'; break;
        case 2 : str = '抵押'; break;
        case 3 : str = '自然人保证'; break;
        case 4 : str = '信用/免担保'; break;
        case 5 : str = '组合（含自然人保证）'; break;
        case 6 : str = '组合（不含自然人保证）'; break;
        case 7 : str = '农户联保'; break;
        case 9 : str = '其他'; break;
    }
    return str;
}

// 算话共享-信贷信息明细-信贷信息明细-还款频率判断
function reimbursementFn(code) {
    var str = '';
    switch (code){
        case '01' : str = '日'; break;
        case '02' : str = '周'; break;
        case '03' : str = '月'; break;
        case '04' : str = '季'; break;
        case '05' : str = '半年'; break;
        case '06' : str = '年'; break;
        case '07' : str = '一次性'; break;
        case '08' : str = '不定期'; break;
        case '99' : str = '其他'; break;
    }
    return str;
}

// 算话共享-异常交易信息列表-异常类型判断
function frequencyFn(code) {
    var str = '';
    switch (code){
        case 'extends' : str = '展期'; break;
        case 'angents' : str = '担保人代还'; break;
        case 'leases' : str = '以资抵债'; break;
        case 'over30' : str = '逾期1-29天'; break;
        case 'over60' : str = '逾期30-59天'; break;
        case 'over90' : str = '逾期60-89天'; break;
        case 'overL' : str = '长期拖欠(90天以上)'; break;
        case 'illegal' : str = '法律诉讼(已判决生效)'; break;
        case 'cheat' : str = '诈骗'; break;
        case 'advance' : str = '提前还款'; break;
        case 'other' : str = '其他'; break;
    }
    return str;
}
//坚果信用卡分期类型方法
function installmentTypeFn(item){
    var str ='';
    switch (item){
        case 0:
            str = '消费分期';
            break;
        case 1:
            str = '现金分期';
            break;
        case 2:
            str = '账单分期';
            break;
    }
    return str;
}
//拖拽
function dragDialog(element){
    var $dialog = element;
    //禁止选中对话框内容
    if(document.attachEvent) {//ie的事件监听，拖拽div时禁止选中内容，firefox与chrome已在css中设置过-moz-user-select: none; -webkit-user-select: none;
        $dialog.attachEvent('onselectstart', function() {
            return false;
        });
    }
    //声明需要用到的变量
    var mx = 0,my = 0;      //鼠标x、y轴坐标（相对于left，top）
    var dx = 0,dy = 0;      //对话框坐标（同上）
    var isDraging = false;      //不可拖动

    //鼠标按下
    $(".move_part",$dialog).mousedown(function(e){
        e = e || window.event;
        mx = e.pageX;     //点击时鼠标X坐标
        my = e.pageY;     //点击时鼠标Y坐标
        dx = $dialog.offset().left;
        dy = $dialog.offset().top;
        isDraging = true;      //标记对话框可拖动
    });

    //鼠标移动更新窗口位置
    $(document).mousemove(function(e){
        var e = e || window.event;
        var x = e.pageX;      //移动时鼠标X坐标
        var y = e.pageY;      //移动时鼠标Y坐标
        if(isDraging){        //判断对话框能否拖动
            var moveX = dx + x - mx;      //移动后对话框新的left值
            var moveY = dy + y - my;      //移动后对话框新的top值
            //设置拖动范围
            var pageW = $(window).width();
            var pageH = $(window).height();
            var dialogW = $dialog.width();
            var dialogH = $dialog.height();
            var maxX = pageW - dialogW+dialogW*0.8;       //X轴可拖动最大值
            var maxY = pageH - dialogH+dialogH*0.8;       //Y轴可拖动最大值
            var minX = -dialogW*0.8;       //X轴可拖动最小值
            var minY = -dialogH*0.8;       //Y轴可拖动最小值
            moveX = Math.min(Math.max(minX,moveX),maxX);     //X轴可拖动范围
            moveY = Math.min(Math.max(minY,moveY),maxY);     //Y轴可拖动范围
            //重新设置对话框的left、top
            $dialog.css({"left":moveX + 'px',"top":moveY + 'px'});
        };
    });
    //鼠标离开
    $(".move_part",$dialog).mouseup(function(){
        isDraging = false;
    });
}
//jquery拖拽插件方法
function TdragFn(parent,child){
    $(child).Tdrag({
        scope:parent ,
        handle:".title"
    });
}

// 蜜罐-基本信息-身份证是否有效
// 蜜罐-用户灰度分数信息-是否成功产生过蜜蜂报告
// 蜜罐-黑名单信息-姓名和手机是否在黑名单
// 蜜罐-黑名单信息-身份证和姓名是否在黑名单
function idCardEnabled(con){
    var str = '';
    switch (con){
        case true:str = '是';break;
        case false:str = '否';break;
    }
    return str;

}

// 蜜罐-消费标签信息
// 公信宝-电商淘宝报告-报告摘要-基本信息-是否实名认证
// 公信宝-电商淘宝报告-报告摘要-资产信息-花呗逾期
// 公信宝-电商淘宝报告-报告摘要-基本信息-借呗是否逾期
function conLabelInfo(i) {
    var str = '';
    switch (i){
        case 1: str = '是'; break;
        case 0: str = '否'; break;
    }
    return str;
}

// 公信宝-电商淘宝报告-报告摘要-基本信息-是否本人
function isOneself(i) {
    var str = '';
    switch (i){
        case 1: str = '是'; break;
        case 2: str = '否'; break;
    }
    return str;
}

// 公信宝-电商淘宝报告-报告摘要-资产信息-花呗的冻结状态
function freezeMode(i) {
    var str = '';
    switch (i){
        case 0: str = '未冻结'; break;
        case 1: str = '冻结'; break;
    }
    return str;
}

// 公信宝-电商淘宝报告-报告摘要-资产信息-是否有借呗
function haveJieBei(i) {
    var str = '';
    switch (i){
        case 0: str = '没有'; break;
        case 1: str = '有'; break;
    }
    return str;
}



// 运营模板页面-判断前后日期大小
function dateCompare(date1, date2) {
    date1 = date1.replace(/\-/gi, "/");
    date2 = date2.replace(/\-/gi, "/");
    var time1 = new Date(date1).getTime();
    var time2 = new Date(date2).getTime();
    if (time1 > time2) {
        showMsg($('.error-msg'), '请选择正确的时间区间');
    }
}
//运营模板-计算快捷键最近时间
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();//获取当前几号，不足10补0
    return y + "-" + m + "-" + d;
}
// 信息管理-客户反馈-标签问题说明
function labelFn(str) {
    switch(str){
        case '全部': str = ''; break;
        case '信用卡': str = '1'; break;
        case '运营商': str = '2'; break;
        case '征信报告': str = '3'; break;
        case '身份证': str = '4'; break;
        case '人脸识别': str = '5'; break;
        case '额度太低': str = '6'; break;
        case '重新申请': str = '7'; break;
        case '时间太长': str = '8'; break;
        case '其它': str = '9'; break;
    }
    return str;
}
function numToLabel(str) {
    switch(str){
        case '1': str='信用卡'; break;
        case '2': str='运营商'; break;
        case '3': str='征信报告'; break;
        case '4': str='身份证'; break;
        case '5': str='人脸识别'; break;
        case '6': str='额度太低'; break;
        case '7': str='重新申请'; break;
        case '8': str='时间太长'; break;
        case '9': str='其它'; break;
    }
    return str;
}
// 信息管理-客户反馈-状态说明
function stateFn(str){
    switch (str){
        case '全部': str = ''; break;
        case '未处理': str = '0'; break;
        case '已处理': str = '1'; break;
    }
    return str;
}
function numTostate(str) {
    switch (str){
        case '0': str='未处理'; break;
        case '1': str='已处理'; break;
    }
    return str;
}

