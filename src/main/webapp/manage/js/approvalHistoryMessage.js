var approvalServer = {}

var SellerScroll = function (options) {
    this.SetOptions(options);
    this.lButton = this.options.lButton;
    this.rButton = this.options.rButton;
    this.oList = this.options.oList;
    this.showSum = this.options.showSum;
    this.parent = this.options.parent;
    this.iList = $(this.parent + "." + this.options.oList + " > li");
    this.iListSum = this.iList.length;
    this.iListWidth = this.iList.outerWidth(true);
    this.moveWidth = this.iListWidth * this.showSum;

    this.dividers = Math.ceil(this.iListSum / this.showSum);    //共分为多少块
    this.moveMaxOffset = (this.dividers - 1) * this.moveWidth;
    this.LeftScroll();
    this.RightScroll();
};
SellerScroll.prototype = {
    SetOptions: function (options) {
        this.options = {
            lButton: options.lButton,
            rButton: options.rButton,
            oList: options.oList,
            showSum: 4,
            parent: options.parent
        };
        $.extend(this.options, options || {});
    },
    ReturnLeft: function () {
        return isNaN(parseInt($(this.parent + "." + this.oList).css("left"))) ? 0 : parseInt($(this.parent + "." + this.oList).css("left"));
    },
    LeftScroll: function () {
        if (this.dividers == 1) return;
        var _this = this, currentOffset;
        $(this.parent + "." + this.lButton).click(function () {
            currentOffset = _this.ReturnLeft();
            if (currentOffset == 0) {
                for (var i = 1; i <= _this.showSum; i++) {
                    $(_this.iList[_this.iListSum - i]).prependTo($(_this.parent + "." + _this.oList));
                }
                $(_this.parent + "." + _this.oList).css({left: -_this.moveWidth});
                $(_this.parent + "." + _this.oList + ":not(:animated)").animate({left: "+=" + _this.moveWidth}, {
                    duration: "slow", complete: function () {
                        for (var j = _this.showSum + 1; j <= _this.iListSum; j++) {
                            $(_this.iList[_this.iListSum - j]).prependTo($(_this.parent + "." + _this.oList));
                        }
                        $(_this.parent + "." + _this.oList).css({left: -_this.moveWidth * (_this.dividers - 1)});
                    }
                });
            } else {
                $(_this.parent + "." + _this.oList + ":not(:animated)").animate({left: "+=" + _this.moveWidth}, "slow");
            }
        });
    },
    RightScroll: function () {
        if (this.dividers == 1) return;
        var _this = this, currentOffset;
        $(this.parent + "." + this.rButton).click(function () {
            currentOffset = _this.ReturnLeft();
            if (Math.abs(currentOffset) >= _this.moveMaxOffset) {
                for (var i = 0; i < _this.showSum; i++) {
                    $(_this.iList[i]).appendTo($(_this.parent + "." + _this.oList));
                }
                $(_this.parent + "." + _this.oList).css({left: -_this.moveWidth * (_this.dividers - 2)});

                $(_this.parent + "." + _this.oList + ":not(:animated)").animate({left: "-=" + _this.moveWidth}, {
                    duration: "slow", complete: function () {
                        for (var j = _this.showSum; j < _this.iListSum; j++) {
                            $(_this.iList[j]).appendTo($(_this.parent + "." + _this.oList));
                        }
                        $(_this.parent + "." + _this.oList).css({left: 0});
                    }
                });
            } else {
                $(_this.parent + "." + _this.oList + ":not(:animated)").animate({left: "-=" + _this.moveWidth}, "slow");
            }
        });
    }
};
//加载页面
var getParam = urlParse();
approveFn(getParam.intoCode);

function approveFn(intoCode) {
    var obj = new Object();
    obj.intoCode = getParam.intoCode;
    var _obj = JSON.stringify(obj, 'utf-8');
    $.ajax({
        headers: {
            token: localStorage.getItem('LoginToken')
        },
        type: 'POST',
        contentType: "text/html; charset=UTF-8",
        url: "/api/manage/user/selectHistoryByIntoCodeMessage",//审批历史查询-查看明细
        data: _obj,
        dataType: 'json',
        success: function (data) {
            if (data.rspCode === '000000') {
                var _data = data.body;
                $('#intoCode').html(_data.basicUser.intoCode);
                $('#updateTime').html(_data.basicUser.createTime);
                $('#name').html(_data.basicUser.name);
                $('#sex').html(sexFn(_data.basicUser.sex));
                if(_data.basicUser.age==-99){
                    _data.basicUser.age = "";
                }
                $('#age').html(_data.basicUser.age);
                $('#mobile').html(_data.basicUser.mobile);
                $('#industry').html(industryFn(_data.basicUser.industry));
                $('#degree').html(degreeFn(_data.basicUser.degree));
                $('#provinces').html(_data.basicUser.provinces);
                $('#idCard').html(_data.basicUser.idCard);
                $('#address').html(_data.basicUser.address);
                $('#currentAddr').html(_data.basicUser.currentAddr);
                //查看身份证
                if (_data.clTIdcardInfoDTO != null) {
                    $('.frontUrl').attr('src', _data.clTIdcardInfoDTO.frontUrl);
                    $('.backUrl').attr('src', _data.clTIdcardInfoDTO.backUrl);
                }
                //查看活体照片
                if (_data.clTVerifyInfo != null) {
                    $('.verifyUrl').attr('src', _data.clTVerifyInfo.verifyUrl);
                    if(_data.clTVerifyInfo.imageRef1){
                        $('.imageRef1').attr('src', _data.clTVerifyInfo.imageRef1);
                    }else {
                        $('.imageRef1').hide();
                    }
                    if(_data.clTVerifyInfo.imageRef2){
                        $('.imageRef2').attr('src', _data.clTVerifyInfo.imageRef2);
                    }else {
                        $('.imageRef2').hide();
                    }
                    if(_data.clTVerifyInfo.imageRef3){
                        $('.imageRef3').attr('src', _data.clTVerifyInfo.imageRef3);
                    }else{
                        $('.imageRef3').hide();
                    }
                    //正面显示照
                    $('.img-box>img').attr('src', _data.clTVerifyInfo.verifyUrl);
                }
                var basicUser = _data.clTIntoContactsList;//基本信息联系人
                if(basicUser){
                    var html = $.map(basicUser, function (o, i) {
                        return '<div class="row">' +
                            '                    <div class="col-lg-4 col-md-4 col-sm-4">' +
                            '                        <label class="com-lab">联系人' + (i + 1) + '</label>' +
                            '                        <span class="com-span">' + o.conName + '</span>' +
                            '                    </div>' +
                            '                    <div class="col-lg-4 col-md-4 col-sm-4">' +
                            '                        <label class="com-lab">关系</label>' +
                            '                        <span class="com-span">' + relationFn(o.conRelation) + '</span>' +
                            '                    </div>' +
                            '                    <div class="col-lg-4 col-md-4 col-sm-4">' +
                            '                        <label class="com-lab">联系电话</label>' +
                            '                        <span class="com-span">' + o.conPhone + '</span>' +
                            '                    </div>' +
                            '                </div>';
                    }).join('');
                    $('.right-box').append(html);
                }
                var warning = _data.riskWarning;//风险提示
                if (warning.length > 0) {
                    var riskWarn = $.map(warning, function (o, i) {
                        var str = '';
                        if (o === "NH4" || o === "NH8" || o === "NH12" || o === "NH6" || o === "NH10" || o === "NH14" || o === "NQ2" || o === "NQ3" || o === "NH5" || o === "NH9" || o === "NH13" || o === "ZR1-1" || o === 'ZR2-10' || o === 'NF5' ||  o === 'TB-9' ||  o === 'TB-10' ||  o === 'TB-11' ||  o === 'TB-12' ||  o === 'TB-13') {
                            str = '<div class="col-lg-2 col-md-2 col-sm-2 look noselect heiL">查看</div>';
                        } else {
                            str = '<td>  </td>';
                        }
                        return '<li class="row">' +
                            '                    <div class="col-lg-2 col-md-2 col-sm-2">' + (i + 1) + '</div>' +
                            '                    <div class="col-lg-2 col-md-2 col-sm-2 strategyCode">' + o + '</div>' +
                            str +
                            '                </li>';
                    }).join('');
                    $('#risk').append(riskWarn);
                }else{
                    $('.riskWarnTable').hide();
                    $('#risk').html('<li class="empt-msg" style="margin-top: 0;font-size:14px;text-align: left;padding-left: 40px;">暂无数据</li>');
                }
                if(_data.mainframeMap){
                    $('#ji-phone').html(nullFn(_data.mainframeMap.mobile));
                    $('#ji-name').html(nullFn(_data.mainframeMap.realName));
                    $('#ji-card').html(nullFn(_data.mainframeMap.idCard));//身份证号码
                }else{
                    $('#ji-phone').html('--');
                    $('#ji-name').html('--');
                    $('#ji-card').html('--');//身份证号码
                }
                var calllog = _data.callLog.callLogList;
                if (calllog.length > 0) {
                    var callRecords = $.map(calllog, function (o, i) {
                        return '<div class="title-division"><span>联系人' + (i + 1) + '通话情况</span></div>' +
                            '                            <div class="row">' +
                            '                                <div class="col-lg-4 col-md-4 col-sm-4">' +
                            '                                    <label class="com-lab">姓名</label>' +
                            '                                    <span class="com-span">' + calllog[i].userName + '</span>' +
                            '                                </div>' +
                            '                                <div class="col-lg-3 col-md-3 col-sm-3">' +
                            '                                    <label class="com-lab">关系</label>' +
                            '                                    <span class="com-span">' + nullFn(calllog[i].relation) + '</span>' +
                            '                                </div>' +
                            '                                <div class="col-lg-5 col-md-5 col-sm-5">' +
                            '                                    <label class="com-lab">手机号码</label>' +
                            '                                    <span class="com-span contact-tel">' + calllog[i].mobile + '</span>' +
                            '                                </div>' +
                            '                           </div>' +
                            '                            <div class="row">' +
                            '                                <div class="col-lg-4 col-md-4 col-sm-4">' +
                            '                                    <label class="com-lab">通话次数</label>' +
                            '                                    <span class="com-span">' + calllog[i].callsNum100 + '</span>' +
                            '                                </div>' +
                            '                                <div class="col-lg-3 col-md-3 col-sm-3">' +
                            '                                    <label class="com-lab" style="width:100px">通话时长</label>' +
                            '                                    <span class="com-span">' + calllog[i].callTimes100 + '分钟</span>' +
                            '                                </div>' +
                            '                                <div class="col-lg-5 col-md-5 col-sm-5">' +
                            '                                    <label class="com-lab">操作</label>' +
                            '                                    <span class="com-span look phoneL noselect"  data-mobile="' + calllog[i].mobile + '"  data-name="' + calllog[i].userName + '">通话明细</span>' +
                            '                                </div>' +
                            '                            </div>';
                    })
                    $('.appendItem').append(callRecords);
                }
                //拒绝原因循环
                var city_json = '{"RJ1-资格不符": [{"code": "RJ1101","txt": "RJ1101-年龄不符","day": 1}, {"code": "RJ1102","txt": "RJ1102-身份验证失败","day": 1}, {"code": "RJ1103","txt": "RJ1103-高风险区域","day": 180}, {"code": "RJ1104","txt": "RJ1104-综合稳定性差","day": 60}, {"code": "RJ1201","txt": "RJ1201-信用卡不符","day": 1}, {"code": "RJ1301","txt": "RJ1301-PBOC不符","day": 1}, {"code": "RJ1401","txt": "RJ1401-运营商手机号时长不符","day": 30}, {"code": "RJ1402","txt": "RJ1402-运营商手机号无效","day": 1}, {"code": "RJ1501","txt": "RJ1501-循环贷","day": 15}, {"code": "RJ1502","txt": "RJ1502-有已提交申请","day": 1}, {"code": "RJ1503","txt": "RJ1503-有未提交且有效申请","day": 1}, {"code": "RJ1504","txt": "RJ1504-联系人内匹不符","day": 15}, {"code": "RJ1601","txt": "RJ1601-淘宝实名不符","day": 1}, {"code": "RJ1602","txt": "RJ1602-注册时间不符","day": 30}, {"code": "RJ1701","txt": "RJ1701-拒绝时间不足","day": 1}],"RJ2-信用不符": [{"code": "RJ2101","txt": "RJ2101-多头借贷","day": 30}, {"code": "RJ2102","txt": "RJ2102-申请人历史逾期","day": 60}, {"code": "RJ2103","txt": "RJ2103-联系人历史逾期","day": 30}, {"code": "RJ2104","txt": "RJ2104-还款能力不足","day": 60}, {"code": "RJ2105","txt": "RJ2105-评分过低","day": 60}, {"code": "RJ2201","txt": "RJ2201-多头借贷","day": 30}, {"code": "RJ2202","txt": "RJ2202-贷记卡不符","day": 30}, {"code": "RJ2203","txt": "RJ2203-贷款不符","day": 30}, {"code": "RJ2204","txt": "RJ2204-负债高","day": 60}, {"code": "RJ2205","txt": "RJ2205-多头借贷-征信查询次数不符","day": 60}, {"code": "RJ2301","txt": "RJ2301-负面信息","day": 180}],"RJ3-反欺诈": [{"code": "RJ3101","txt": "RJ3101-内黑","day": 60}, {"code": "RJ3102","txt": "RJ3102-外黑","day": 60}, {"code": "RJ3201","txt": "RJ3201-历史反欺诈拒绝","day": 60}, {"code": "RJ3301","txt": "RJ3301-申请人设备风险高","day": 60}, {"code": "RJ3302","txt": "RJ3302-短信命中黑名单关键词","day": 60}, {"code": "RJ3401","txt": "RJ3401-PBOC出现异常","day": 60}, {"code": "RJ3501","txt": "RJ3501-虚假信息","day": 60}, {"code": "RJ3502","txt": "RJ3502-申请人或联系人涉及同业","day": 180}],"RJ4-高风险": [{"code": "RJ4101","txt": "RJ4101-联系人电话真实性低","day": 30}, {"code": "RJ4102","txt": "RJ4102-申请人手机号疑似中介/小号/团伙","day": 90}, {"code": "RJ4103","txt": "RJ4103-申请人手机号通话记录风险高","day": 60}, {"code": "RJ4104","txt": "RJ4104-联系人黑名单/逾期过高","day": 60}, {"code": "RJ4105","txt": "RJ4105-通讯录黑名单或临时小号","day": 60}, {"code": "RJ4201","txt": "RJ4201-申请人姓名身份证号命中高风险名单","day": 90}, {"code": "RJ4202","txt": "RJ4202-三方验证信息不符","day": 90}, {"code": "RJ4203","txt": "RJ4203-身份证风险高","day": 90}, {"code": "RJ4204","txt": "RJ4204-申请人资金用途风险","day": 90}, {"code": "RJ4301","txt": "RJ4301-PBOC状态高风险","day": 90}, {"code": "RJ4401","txt": "RJ4401-申请人设备风险高","day": 30}, {"code": "RJ4402","txt": "RJ4402-短信命中高风险关键词","day": 30}, {"code": "RJ4501","txt": "RJ4501-欺诈分数高","day": 30}, {"code": "RJ4601","txt": "RJ4601-花呗借呗逾期","day": 30}, {"code": "RJ4602","txt": "RJ4602-淘宝账户涉嫌高风险","day": 30}, {"code": "RJ4701","txt": "RJ4701-本公司逾期过高","day": 30}],"RJ5-其他": [{"code": "RJ5101","txt": "RJ5101-政策性","day": 1}, {"code": "RJ5201","txt": "RJ5201-申请人(联系人)不配合","day": 1}, {"code": "RJ5202","txt": "RJ5202-申请人超时放弃或撤销","day": 0}, {"code": "RJ5203","txt": "RJ5203-联系人不同意","day": 1}, {"code": "RJ5204","txt": "RJ5204-电核态度恶劣","day": 180}, {"code": "RJ5301","txt": "RJ5301-其他","day": 1}]}';
                var _approvalStatus = getParam.status;
                $('#conclusion').html(StatusFn(_approvalStatus));//审批结论
                if (_approvalStatus == 0) { //通过
                    $('#conclusion').addClass('blue');
                    $('#recultPic').append('<img src="../images/ic_shenpijuece_tongguo.svg">')
                    $('.tongguo').show();
                    $('.jujue,.jujuehei').hide();
                } else if (_approvalStatus == 1) { //拒绝
                    $('#conclusion').addClass('red');
                    $('#recultPic').append('<img src="../images/ic_shenpijuece_jujue.svg">')
                    $('.jujue').show();
                    $('.tongguo,.jujuehei').hide();
                } else if (_approvalStatus == 2) { //拒绝并加入黑名单
                    $('#conclusion').addClass('black');
                    $('#recultPic').append('<img src="../images/ic_shenpijuece_jujuebingjiaruheimingdan.svg">')
                    $('.jujuehei').show();
                    $('.jujue,.tongguo').hide();
                } else if (_approvalStatus == 3) { //审批中撤销
                    $('#recultPic,.approval-queue').hide();
                    $('.undoReason,.undoReasonPerson').show();
                    $('#conclusion').html('审批中撤销');
                    var _undoreason = cancelCodeFn(getParam.cancelCode);
                    $('.undoReasonTxt').html(_undoreason);//撤销原因
                    var _clALoanOrderQueueDTOList = _data.result.clALoanOrderQueueDTOList;
                    if(_clALoanOrderQueueDTOList !== null ){
                        var _reviewStatus = _data.result.clALoanOrderQueueDTOList.reviewStatus;
                        if(_reviewStatus == '3'){
                            var _reviewUser = _data.result.clALoanOrderQueueDTOList.reviewUser;
                            $('.undoReasonPersonTxt').html(nullFn(_reviewUser));  //撤销人  "3"-->客服撤销  非"3" 客户撤销
                        }else{
                            $('.undoReasonPersonTxt').html('客户');  //撤销人
                        }
                    }else if(_clALoanOrderQueueDTOList === null){
                        $('.undoReasonPersonTxt').html('客户');  //撤销人
                    }
                }
                var resuleL = _data.result.clALoanOrderQueueDTOList;
                if (resuleL != null) {

                    $('.manualReviewQueue').html(resuleL.manualReviewQueue);//审批队列
                    $('.reviewUser').html(resuleL.reviewUser);
                    $('.reviewTime').html(resuleL.reviewTime);
                    $('.remark').html(resuleL.remark);
                    $('.blacklistType').html(ListItemFn(resuleL.blacklistType));
                    if (resuleL.reviewStatus == 0) {
                        $('.tongguo').show();
                        $('.jujue,.jujuehei').hide();
                        $('.reviewResultCode').html(resuleL.reviewResultCode);//批核代码
                    } else if (resuleL.reviewStatus == 1 || resuleL.reviewStatus == 2) {
                        $('.refuseReason').html(resuleL.leve1RefuseCode +'-'+ resuleL.leve1RefuseDes);//拒绝原因
                        $('.reviewResultCode').html(resuleL.leve3RefuseCode+'-'+ resuleL.leve3RefuseDes);//原因子类
                        // var _code = resuleL.reviewResultCode.substring(0, 3);
                        // $('.refuseReason').html(RefuseReasonFn(_code));//拒绝原因
                        // var _reson = RefuseReasonFn(_code);//拒绝原因
                        // var _resonCode = resuleL.reviewResultCode;//原因子类码
                        // var city_obj = eval('(' + city_json + ')');
                        // var _RJ1 = city_obj[_reson];
                        // for (var key in city_obj) {
                        //     if (_reson == key) {
                        //         for (var i = 0; i < _RJ1.length; i++) {
                        //             if (_resonCode == _RJ1[i].code) {
                        //                 $('.reviewResultCode').html(_RJ1[i].txt);//原因子类
                        //             }
                        //         }
                        //     }
                        // }
                    }
                } else {
                    $('.approvalConclusion').siblings('div').hide();
                    $('.comeBack').show();
                }
                var records = _data.historyNote;
                if (records.length > 0) {
                    $.tmpl(TmplService.remarks, _data).appendTo(".examine");
                } else if (records.length == 0) {
                    if (_data.result !== null) {
                        if (_data.result.clALoanOrderQueueDTOList !== null) {
                            if (_data.result.clALoanOrderQueueDTOList.remark !== "") {
                                $.tmpl(TmplService.commented, _data.result.clALoanOrderQueueDTOList).appendTo(".examine");
                            }
                        }
                    }
                }
                //电核操作
                var answeringStateVk = {"1": "接通", "2": "无人接", "3": "关机", "4": "空号", "5": "拒接"};
                if (_data.phoneCheckList.length > 0) {
                    $.each(_data.phoneCheckList, function () {
                        var _li = $("<li>");
                        var _div = $("<div>").html(this.contractName);
                        var _div2 = $("<div>").html('<label>电话</label>' + this.telephone);
                        var _div3 = $("<div>").html('<label>接听状态</label>' + answeringStateVk[this.answeringState]);
                        var _span = $("<span>").text(this.note).addClass("remark");
                        var _div4 = $("<div>").html('<label>备注</label>').append(_span);
                        var _div5 = $("<div>").html('提交时间 ' + this.updateTime);
                        $("#phoneCheckOperationList").append(_li.append(_div).append(_div2).append(_div3).append(_div4).append(_div5));
                    });
                } else {
                    $("#phoneCheckOperationList").append("<li>暂无记录</li>");
                }
                // var clALoanOrderstatus = _data.result.clALoanOrderStatus;
                // if (resuleL == null) {
                //     $('.approvalConclusion').siblings('div').hide();
                //     $('.comeBack').show();
                // if (clALoanOrderstatus == '201') {
                //     $('#conclusion').html('自动审核通过');
                // } else if (clALoanOrderstatus == '1001') {
                //     $('#conclusion').html('自动拒绝');
                // } else if (clALoanOrderstatus == '1101') {
                //     $('#conclusion').html('自动加入黑名单');
                // } else if (clALoanOrderstatus == '301') {
                //     $('#conclusion').html('审批中撤销');
                // } else if (clALoanOrderstatus == '302') {
                //     $('#conclusion').html('签约中撤销');
                // }
                // }
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
    var _jump = getParam.isJump;
    if(_jump){ //判断是否为内匹历史跳转  是：不展示菜单栏与返回  否：展示菜单栏
        $('#menu,.comeBack,.detail-info').hide();
        $('body').css({"padding-left":"0"})
    }
    //详细信息
    $('.detail-info').click(function () {
        $('body').addClass('ovfHiden');//使网页不可滚动
        var Height = $(document).scrollTop();
        $('.audit-box').css({'top': Height + 100 + 'px'});
        $('.audit-box,.mask').show();
        $('.yixin_one').click();
        $('.yixin').click();
        //汇法网
        $('.huifa_perCase_con,.huifa_perTax_con,.huifa_perPerform_con,.huifa_perRushOwe_con,.huifa_perBrkProm_con,.huifa_perLoanOver_con').html('');
    })
    $('.audit-close').click(function () {
        $('body').removeClass('ovfHiden');//使网页可滚动
        $('.audit-box,.mask').hide();
    })
    //电核操作
    $("#phoneCheckOperationList").on("click", ".remark", function () {
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
        } else {
            $("#phoneCheckOperationList .remark").removeClass("open");
            $(this).addClass("open");
        }
    });
    //拖拽详细信息
    dragDialog($(".audit-box"));
    fnTab($('.a-tit-hock'), $('.a-con-hock'), 'click');//第一级
    fnTab($('.yixin-tit-hock'), $('.yixin-con-hock'), 'click');//宜信致诚&致诚阿福
    fnTab($('.renhang-tit-hock'), $('.renhang-con-hock'), 'click');//人行报告
    fnTab($('.juxinli-tit-hock'), $('.juxinli-con-hock'), 'click');//聚信立
    fnTab($('.face-tit-hock'), $('.face-con-hock'), 'click');//Face++&百融
    fnTab($('.xinyan-tit-hock'), $('.xinyan-con-hock'), 'click');//新颜&前海征信
    fnTab($('.shumei-tit-hock'), $('.shumei-con-hock'), 'click');//数美(多头/黑名单)
    fnTab($('.huifa-tit-hock'), $('.huifa-con-hock'), 'click');//汇法网
    fnTab($('.zixin-tit-hock'), $('.zixin-con-hock'), 'click');//上海资信
    fnTab($('.chengxin-tit-hock'), $('.chengxin-con-hock'), 'click');//诚信积分.
    fnTab($('.gongxiang-tit-hock'), $('.gongxiang-con-hock'), 'click'); //共享信贷
    fnTab($('.gxb-tit-hock'), $('.gxb-con-hock'), 'click'); //公信宝

    // 详细信息页一级导航左右滑动
    var distance = 60;
    var marginLeft = 0;
    $('.toRight').on('click', function(){
        if($(window).width() < 1415){
            if(Math.abs($('.gongxinbao').offset().left - $('.audit-box').width()) <= distance){
                marginLeft -= 0;
            }else{
                marginLeft -= distance;
            }
            $('.first-level').css('marginLeft', marginLeft + 'px');
        }
    });
    $('.toLeft').on('click', function(){
        if(marginLeft >= 0){
            marginLeft = 0;
        }else{
            marginLeft += distance;
        }
        $('.first-level').css('marginLeft', marginLeft + 'px');
    });

    //宜信致诚&致诚阿福
    $('.yixin').click(function () {
        $('.yixin_one').click();
    })
    $('.yixin_one').click(function () {
        var obj = new Object();
        obj.intoCode = getParam.intoCode;
        // obj.intoCode = '120171214151922579227';
        obj.bigdataType = 'bigData1002';
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: 'POST',
            contentType: "text/html; charset=UTF-8",
            url: "/api/obtain/bigdata",//大数据-宜信致诚
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if (data.rspCode === '000000') {
                    var _data = data.body;
                    if (_data != null) {
                        var _data_con = _data.ZCAF02_8002.data;
                        if (_data_con) {
                            //宜信致诚
                            if (_data_con.behaviorFeatures) {
                                $('.yx_gender').html(nullFn(_data_con.behaviorFeatures.gender));//性别
                                $('.yx_gendercode').html(nullFn(_data_con.behaviorFeatures.genderCode));//性别码
                                $('.yx_idlocation').html(nullFn(_data_con.behaviorFeatures.idNoLocation));//身份证号归属地
                                $('.yx_age').html(nullFn(_data_con.behaviorFeatures.age));//年龄
                                $('.yx_phoneoperator').html(nullFn(_data_con.behaviorFeatures.mobileOperator));//手机运营商
                                $('.yx_phonelocation').html(nullFn(_data_con.behaviorFeatures.mobileLocation));//手机号码归属地
                                $('.yx_firstBlackCnt').html(nullFn(_data_con.behaviorFeatures.firstOrderBlackCnt));//一阶联系人黑名单个数
                                $('.yx_firstOverdueCnt').html(nullFn(_data_con.behaviorFeatures.firstOrderOverdueCnt));//一阶联系人逾期个数
                                $('.yx_firstM3Cnt').html(nullFn(_data_con.behaviorFeatures.firstOrderM3Cnt));//一阶联系人逾期m3+个数
                                $('.yx_firstBlackRate').html(nullFn(_data_con.behaviorFeatures.firstOrderBlackRate + '%'));//一阶联系人黑名单数占比
                                $('.yx_firstOverdueRate').html(nullFn(_data_con.behaviorFeatures.firstOrderOverdueRate + '%'));//一阶联系人逾期占比
                                $('.yx_secondBlackCnt').html(nullFn(_data_con.behaviorFeatures.secondOrderBlackCnt));//二阶联系人黑名单个数
                                $('.yx_secondOverdueCnt').html(nullFn(_data_con.behaviorFeatures.secondOrderOverdueCnt));//二阶联系人逾期个数
                                $('.yx_secondM3Cnt').html(nullFn(_data_con.behaviorFeatures.secondOrderM3Cnt));//二阶联系人逾期m3+个数
                                $('.yx_activeCallCnt').html(nullFn(_data_con.behaviorFeatures.activeCallCnt));//主叫联系人数
                                $('.yx_activeCallBlackCnt').html(nullFn(_data_con.behaviorFeatures.activeCallBlackCnt));//主叫联系人黑名单个数
                                $('.yx_activeCallOverdueCnt').html(nullFn(_data_con.behaviorFeatures.activeCallOverdueCnt));//主叫联系人逾期个数
                                $('.yx_nightCallCnt').html(nullFn(_data_con.behaviorFeatures.nightCallCnt));//夜间通话人数
                                $('.yx_nightCallNum').html(nullFn(_data_con.behaviorFeatures.nightCallNum));//夜间通话次数
                                $('.yx_nightCallSecond').html(nullFn(_data_con.behaviorFeatures.nightCallSeconds));//夜间通话秒数
                                $('.yx_fictionCallCnt').html(nullFn(_data_con.behaviorFeatures.fictionCallCnt));//与虚拟号码通话人数
                                $('.yx_fictionCallNum').html(nullFn(_data_con.behaviorFeatures.fictionCallNum));//与虚拟号码通话次数
                                $('.yx_fictionCallSecond').html(nullFn(_data_con.behaviorFeatures.fictionCallSeconds));//与虚拟号码通话秒数
                                $('.yx_remoteCallCnt').html(nullFn(_data_con.behaviorFeatures.remoteCallCnt));// 异地通话人数
                                $('.yx_remoteCallNum').html(nullFn(_data_con.behaviorFeatures.remoteCallNum));//异地通话次数
                                $('.yx_remoteCallSecond').html(nullFn(_data_con.behaviorFeatures.remoteCallSeconds));//异地通话秒数
                                $('.yx_macaoCallCnt').html(nullFn(_data_con.behaviorFeatures.macaoCallCnt));//与澳门通话人数
                            } else {
                                $('.yx_gender,.yx_gendercode,.yx_idlocation,.yx_age,.yx_phoneoperator,.yx_phonelocation,.yx_firstBlackCnt,.yx_firstOverdueCnt,.yx_firstM3Cnt,.yx_firstBlackRate,.yx_firstOverdueRate,.yx_secondBlackCnt,.yx_secondOverdueCnt,.yx_secondM3Cnt,.yx_activeCallCnt,.yx_activeCallBlackCnt,.yx_activeCallOverdueCnt,.yx_nightCallCnt,.yx_nightCallNum,.yx_nightCallSecond,.yx_fictionCallCnt,.yx_fictionCallNum,.yx_fictionCallSecond,.yx_remoteCallCnt,.yx_remoteCallNum,.yx_remoteCallSecond,.yx_macaoCallCnt').html('--');
                            }
                            $('.yx_identity').html(nullFn(_data_con.identityVerify));//个人身份验证结果
                            $('.yx_identitycode').html(nullFn(_data_con.identityVerifyCode));//个人身份验证结果码
                            $('.yx_zcFraudScore').html(nullFn(_data_con.zcFraudScore));// 致诚欺诈评分
                            $('.yx_bankAuth3').html(nullFn(_data_con.bankCheckAuth3));//银行卡验证3要素
                            $('.yx_bankAuth3Code').html(nullFn(_data_con.bankCheckAuth3Code));//银行卡验证3要素码
                            $('.yx_bankAuth4').html(nullFn(_data_con.bankCheckAuth4));//银行卡验证4要素
                            $('.yx_bankAuth4Code').html(nullFn(_data_con.bankCheckAuth4Code));//银行卡验证4要素码
                        } else {
                            $('.yx_gender,.yx_gendercode,.yx_idlocation,.yx_age,.yx_phoneoperator,.yx_phonelocation,.yx_firstBlackCnt,.yx_firstOverdueCnt,.yx_firstM3Cnt,.yx_firstBlackRate,.yx_firstOverdueRate,.yx_secondBlackCnt,.yx_secondOverdueCnt,.yx_secondM3Cnt,.yx_activeCallCnt,.yx_activeCallBlackCnt,.yx_activeCallOverdueCnt,.yx_nightCallCnt,.yx_nightCallNum,.yx_nightCallSecond,.yx_fictionCallCnt,.yx_fictionCallNum,.yx_fictionCallSecond,.yx_remoteCallCnt,.yx_remoteCallNum,.yx_remoteCallSecond,.yx_macaoCallCnt,.yx_identity,.yx_identitycode,.yx_zcFraudScore,.yx_bankAuth3,.yx_bankAuth3Code,.yx_bankAuth4,.yx_bankAuth4Code').html('--');//性别
                        }
                    } else {
                        $('.yx_gender,.yx_gendercode,.yx_idlocation,.yx_age,.yx_phoneoperator,.yx_phonelocation,.yx_firstBlackCnt,.yx_firstOverdueCnt,.yx_firstM3Cnt,.yx_firstBlackRate,.yx_firstOverdueRate,.yx_secondBlackCnt,.yx_secondOverdueCnt,.yx_secondM3Cnt,.yx_activeCallCnt,.yx_activeCallBlackCnt,.yx_activeCallOverdueCnt,.yx_nightCallCnt,.yx_nightCallNum,.yx_nightCallSecond,.yx_fictionCallCnt,.yx_fictionCallNum,.yx_fictionCallSecond,.yx_remoteCallCnt,.yx_remoteCallNum,.yx_remoteCallSecond,.yx_macaoCallCnt,.yx_identity,.yx_identitycode,.yx_zcFraudScore,.yx_bankAuth3,.yx_bankAuth3Code,.yx_bankAuth4,.yx_bankAuth4Code').html('--');//性别
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
                    $('.yx_gender').html('--');//性别
                    $('.yx_gendercode').html('--');//性别码
                    $('.yx_idlocation').html('--');//身份证号归属地
                    $('.yx_age').html('--');//年龄
                    $('.yx_phoneoperator').html('--');//手机运营商
                    $('.yx_phonelocation').html('--');//手机号码归属地
                    $('.yx_firstBlackCnt').html('--');//一阶联系人黑名单个数
                    $('.yx_firstOverdueCnt').html('--');//一阶联系人逾期个数
                    $('.yx_firstM3Cnt').html('--');//一阶联系人逾期m3+个数
                    $('.yx_firstBlackRate').html('--');//一阶联系人黑名单数占比
                    $('.yx_firstOverdueRate').html('--');//一阶联系人逾期占比
                    $('.yx_secondBlackCnt').html('--');//二阶联系人黑名单个数
                    $('.yx_secondOverdueCnt').html('--');//二阶联系人逾期个数
                    $('.yx_secondM3Cnt').html('--');//二阶联系人逾期m3+个数
                    $('.yx_activeCallCnt').html('--');//主叫联系人数
                    $('.yx_activeCallBlackCnt').html('--');//主叫联系人黑名单个数
                    $('.yx_activeCallOverdueCnt').html('--');//主叫联系人逾期个数
                    $('.yx_nightCallCnt').html('--');//夜间通话人数
                    $('.yx_nightCallNum').html('--');//夜间通话次数
                    $('.yx_nightCallSecond').html('--');//夜间通话秒数
                    $('.yx_fictionCallCnt').html('--');//与虚拟号码通话人数
                    $('.yx_fictionCallNum').html('--');//与虚拟号码通话次数
                    $('.yx_fictionCallSecond').html('--');//与虚拟号码通话秒数
                    $('.yx_remoteCallCnt').html('--');// 异地通话人数
                    $('.yx_remoteCallNum').html('--');//异地通话次数
                    $('.yx_remoteCallSecond').html('--');//异地通话秒数
                    $('.yx_macaoCallCnt').html('--');//与澳门通话人数
                    $('.yx_identity').html('--');//个人身份验证结果
                    $('.yx_identitycode').html('--');//个人身份验证结果码
                    $('.yx_zcFraudScore').html('--');// 致诚欺诈评分
                    $('.yx_bankAuth3').html('--');//银行卡验证3要素
                    $('.yx_bankAuth3Code').html('--');//银行卡验证3要素码
                    $('.yx_bankAuth4').html('--');//银行卡验证4要素
                    $('.yx_bankAuth4Code').html('--');//银行卡验证4要素码
                }
            }
        })
    })
    //致诚阿福
    $('.yixin_two').click(function () {
        var obj = new Object();
        obj.intoCode = getParam.intoCode;
        // obj.intoCode = '120171215142907825425';
        obj.bigdataType = 'bigData1001';
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: 'POST',
            contentType: "text/html; charset=UTF-8",
            url: "/api/obtain/bigdata",//大数据-宜信致诚
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if (data.rspCode === '000000') {
                    var _data = data.body;
                    if (_data != null) {
                        var _data_con = _data.ZCAF01_8001.params.data;
                        if (_data_con) {
                            //借款信息
                            var _loanRecords = _data_con.loanRecords;
                            if (_loanRecords) {
                                if (_loanRecords.length > 0) {
                                    var _loanInfos = $.map(_loanRecords, function (o, i) {
                                        return '<tr>' +
                                            '                <td>' + (i + 1) + '</td>' +//编号
                                            '                <td>' + nullFn(o.name) + '</td>' +//借款人姓名
                                            '                <td>' + nullFn(o.certNo) + '</td>' +//借款人身份证号
                                            '                <td>' + nullFn(o.loanDate) + '</td>' +//借款时间
                                            '                <td>' + nullFn(o.periods) + '</td>' +//期数
                                            '                <td>' + nullFn(o.loanAmount) + '</td>' +//借款金额
                                            '                <td>' + nullFn(o.overdueM3) + '</td>' +//历史逾期M3+次数
                                            '                <td>' + nullFn(o.overdueM6) + '</td>' +//历史逾期M6+次数
                                            '                <td>' + nullFn(loanStatusFn(o.loanStatusCode)) + '</td>' +//还款状态码
                                            '                <td>' + nullFn(o.overdueStatus) + '</td>' +//逾期情况
                                            '                <td>' + nullFn(o.overdueTotal) + '</td>' +//历史逾期总次数
                                            '                <td>' + nullFn(o.overdueAmount) + '</td>' +//逾期金额
                                            '                <td>' + nullFn(approvalStatuCoFn(o.approvalStatusCode)) + '</td>' +//审批结果码
                                            '                <td>' + nullFn(loanTypeFn(o.loanTypeCode)) + '</td>' +//借款类型码
                                            '            </tr>';
                                    })
                                    $('.borrowing_con').html('').append(_loanInfos);
                                } else {
                                    $('.borrowing_info .table').hide();
                                    $('.borrowing_null').show().html('暂无借款信息');
                                }
                            } else {
                                $('.borrowing_info .table').hide();
                                $('.borrowing_null').show().html('暂无借款信息');
                            }
                            // //风险命中信息 []
                            var _riskResults = _data_con.riskResults;
                            if (_riskResults) {
                                if (_riskResults.length > 0) {
                                    var _loanInfos = $.map(_riskResults, function (o, i) {
                                        return '<tr>' +
                                            '                <td>' + (i + 1) + '</td>' +//编号
                                            '                <td>' + nullFn(riskItemTypeFn(o.riskItemTypeCode)) + '</td>' +//命中项码
                                            '                <td>' + nullFn(o.riskItemValue) + '</td>' +//命中内容
                                            '                <td>' + nullFn(riskTypeFn(o.riskTypeCode)) + '</td>' +//风险类别码
                                            '                <td>' + nullFn(o.riskDetail) + '</td>' +//风险明细
                                            '                <td>' + nullFn(o.riskTime) + '</td>' +//风险最近时间
                                            '            </tr>';
                                    })
                                    $('.risk_hit_con').html('').append(_loanInfos);
                                } else {
                                    $('.risk_hit_info .table').hide();
                                    $('.risk_hit_null').show().html('暂无风险命中信息');
                                }
                            } else {
                                $('.risk_hit_info .table').hide();
                                $('.risk_hit_null').show().html('暂无风险命中信息');
                            }
                            // // 基本信息
                            $('.yixin_zcCreditScore').html(nullFn(_data_con.zcCreditScore));//致诚信用分数
                            $('.yixin_contractBreakRate').html(nullFn(_data_con.contractBreakRate));//违约概率
                            // // 查询统计信息
                            $('.yixin_timesByOtherOrg').html(nullFn(_data_con.queryStatistics.timesByOtherOrg));//其他机构查询次数
                            $('.yixin_otherOrgCount').html(nullFn(_data_con.queryStatistics.otherOrgCount));//其他查询机构数
                            $('.yixin_timesByCurrentOrg').html(nullFn(_data_con.queryStatistics.timesByCurrentOrg));//本机构查询次数
                            // // 查询历史信息[1]
                            var _queryHistory = _data_con.queryHistory;
                            if (_queryHistory.length > 0) {
                                var _loanInfos = $.map(_queryHistory, function (o, i) {
                                    return '<tr>' +
                                        '                <td>' + (i + 1) + '</td>' +//编号
                                        '                <td>' + nullFn(o.orgName) + '</td>' +///机构代号
                                        '                <td>' + nullFn(o.orgType) + '</td>' +//机构类型
                                        '                <td>' + nullFn(queryReasonFn(o.queryReason)) + '</td>' +//查询原因
                                        '                <td>' + nullFn(o.time) + '</td>' +//查询时间
                                        '            </tr>';
                                })
                                $('.query_history_con').html('').append(_loanInfos);
                            } else {
                                $('.query_history_info .table').hide();
                                $('.query_history_null').show().html('暂无查询历史信息');
                            }
                        } else {
                            //借款信息
                            $('.borrowing_info .table').hide();
                            $('.borrowing_null').show().html('暂无借款信息');
                            // //风险命中信息 []
                            $('.risk_hit_info .table').hide();
                            $('.risk_hit_null').show().html('暂无风险命中信息');
                            // // 基本信息
                            $('.yixin_zcCreditScore').html('--');//致诚信用分数
                            $('.yixin_contractBreakRate').html('--');//违约概率
                            // // 查询统计信息
                            $('.yixin_timesByOtherOrg').html('--');//其他机构查询次数
                            $('.yixin_otherOrgCount').html('--');//其他查询机构数
                            $('.yixin_timesByCurrentOrg').html('--');//本机构查询次数
                            // // 查询历史信息[1]
                            $('.query_history_info .table').hide();
                            $('.query_history_null').show().html('暂无查询历史信息');
                        }
                    } else {
                        //借款信息
                        $('.borrowing_info .table').hide();
                        $('.borrowing_null').show().html('暂无借款信息');
                        // //风险命中信息 []
                        $('.risk_hit_info .table').hide();
                        $('.risk_hit_null').show().html('暂无风险命中信息');
                        // // 基本信息
                        $('.yixin_zcCreditScore').html('--');//致诚信用分数
                        $('.yixin_contractBreakRate').html('--');//违约概率
                        // // 查询统计信息
                        $('.yixin_timesByOtherOrg').html('--');//其他机构查询次数
                        $('.yixin_otherOrgCount').html('--');//其他查询机构数
                        $('.yixin_timesByCurrentOrg').html('--');//本机构查询次数
                        // // 查询历史信息[1]
                        $('.query_history_info .table').hide();
                        $('.query_history_null').show().html('暂无查询历史信息');
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
                    //借款信息
                    $('.borrowing_info .table').hide();
                    $('.borrowing_null').show().html('暂无借款信息');
                    // //风险命中信息 []
                    $('.risk_hit_info .table').hide();
                    $('.risk_hit_null').show().html('暂无风险命中信息');
                    // // 基本信息
                    $('.yixin_zcCreditScore').html('--');//致诚信用分数
                    $('.yixin_contractBreakRate').html('--');//违约概率
                    // // 查询统计信息
                    $('.yixin_timesByOtherOrg').html('--');//其他机构查询次数
                    $('.yixin_otherOrgCount').html('--');//其他查询机构数
                    $('.yixin_timesByCurrentOrg').html('--');//本机构查询次数
                    // // 查询历史信息[1]
                    $('.query_history_info .table').hide();
                    $('.query_history_null').show().html('暂无查询历史信息');
                }
            }
        })
    })
    // 新颜&前海征信 - 新颜
    $(".xinyan").click(function () {
        var obj = new Object();
        obj.intoCode = getParam.intoCode;
        // obj.intoCode = '10';
        obj.bigdataType = 'bigData2001';  // 新颜
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: 'POST',
            contentType: "text/html; charset=UTF-8",
            url: "/api/obtain/bigdata",// 大数据-新颜
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if (data.rspCode === '000000') {
                    var _data = data.body;
                    if (_data != null) {
                        var _map = _data.interfaceData;
                        if (_map) {
                            var _mapList = $.map(_map, function (v, i) {
                                if (v.code == '21170003' || v.code == '21170004' || v.code == '21170005') {
                                    return '<tr>' +
                                        '<td>' + nullFn(v.code) + '</td><td>' + nullFn(v.msg) + '</td><td>' + nullFn(v.value) + '</td>' +
                                        '</tr>';
                                }
                            }).join('');
                            if (_mapList == null || _mapList == '' || _mapList == undefined) {
                                $('.xinyan_li1_box .table').hide();
                                $('.xinyan_li1_null').html('新颜表暂无信息');
                            } else {
                                $('.xinyan_li1_con').html('').append(_mapList);
                            }
                        } else {
                            $('.xinyan_li1_box .table').hide();
                            $('.xinyan_li1_null').html('新颜表暂无信息');
                        }

                        // 新颜在还订单数量
                        if (_data.xy_in_repy_order_num != null && _data.xy_in_repy_order_num != '' && _data.xy_in_repy_order_num != undefined) {
                            if (_data.xy_in_repy_order_num == -1) {
                                $('.xinyan_li1_order').html('查询失败');
                            } else {
                                $('.xinyan_li1_order').html(_data.xy_in_repy_order_num);
                            }
                        } else {
                            $('.xinyan_li1_order').html('--');
                        }
                    } else {
                        $('.xinyan_li1_box .table').hide();
                        $('.xinyan_li1_null').html('新颜表暂无信息');
                        $('.xinyan_li1_order').html('--');  // 新颜在还订单数量
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
                    $('.xinyan_li1_box .table').hide();
                    $('.xinyan_li1_null').html('新颜表暂无信息');
                    $('.xinyan_li1_order').html('--');  // 新颜在还订单数量
                }
            }
        })
    });
    // 新颜&前海征信 - 前海征信
    $(".xinyan_li2_tit").click(function () {
        var obj = new Object();
        obj.intoCode = getParam.intoCode;
        // obj.intoCode = '120171225170338170009';
        obj.bigdataType = 'bigData2002';  // 前海征信
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: 'POST',
            contentType: "text/html; charset=UTF-8",
            url: "/api/obtain/bigdata",// 大数据-前海征信
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if (data.rspCode === '000000') {
                    var _data = data.body;
                    if (_data != null) {
                        if (_data.QHZXRISKDOO_8015 != null && _data.QHZXRISKDOO_8015 != '' && _data.QHZXRISKDOO_8015 != undefined &&
                            _data.QHZXRISKDOO_8015.busiDataInfo != null && _data.QHZXRISKDOO_8015.busiDataInfo != '' && _data.QHZXRISKDOO_8015.busiDataInfo != undefined &&
                            _data.QHZXRISKDOO_8015.busiDataInfo.records != null && _data.QHZXRISKDOO_8015.busiDataInfo.records != '' && _data.QHZXRISKDOO_8015.busiDataInfo.records != undefined) {
                            var _records = _data.QHZXRISKDOO_8015.busiDataInfo.records;
                            var _IDcard, _sourceId, _rskScore, _rskMark, _dataStatus, _erCode;
                            var _recordsList = $.map(_records, function (v, i) {
                                // 证件类型
                                if (v.idType == '0') {
                                    _IDcard = '身份证';
                                } else if (v.idType == '1') {
                                    _IDcard = '户口簿';
                                } else if (v.idType == '2') {
                                    _IDcard = '护照';
                                } else if (v.idType == '3') {
                                    _IDcard = '军官证';
                                } else if (v.idType == '4') {
                                    _IDcard = '士兵证';
                                } else if (v.idType == '5') {
                                    _IDcard = '港澳居民来往内地通行证';
                                } else if (v.idType == '6') {
                                    _IDcard = '台湾同胞来往内地通行证';
                                } else if (v.idType == '7') {
                                    _IDcard = '临时身份证';
                                } else if (v.idType == '8') {
                                    _IDcard = '外国人居留证';
                                } else if (v.idType == '9') {
                                    _IDcard = '警官证';
                                } else if (v.idType == 'A') {
                                    _IDcard = '香港身份证';
                                } else if (v.idType == 'B') {
                                    _IDcard = '澳门身份证';
                                } else if (v.idType == 'X') {
                                    _IDcard = '其他证件';
                                } else {
                                    _IDcard = '--';
                                }
                                // 来源代码
                                if (v.sourceId == null || v.sourceId == "" || v.sourceId == undefined) {
                                    _sourceId = "--";
                                } else if (v.sourceId == 'A') {
                                    _sourceId = "信贷逾期风险";
                                } else if (v.sourceId == 'B') {
                                    _sourceId = "行政负面风险";
                                } else if (v.sourceId == 99) {
                                    _sourceId = "权限不足";
                                }
                                // 风险得分
                                if (v.rskScore == null || v.rskScore == "" || v.rskScore == undefined || v.sourceId != 'A') {
                                    _rskScore = "--";
                                } else if (v.rskScore >= 20 && v.rskScore <= 45) {
                                    _rskScore = v.rskScore;
                                } else if (v.rskScore == -1) {
                                    _rskScore = "权限不足";
                                }
                                // 风险标记
                                if (v.rskMark == null || v.rskMark == "" || v.rskMark == undefined) {
                                    _rskMark = "--";
                                } else if (v.rskMark == 'B1') {
                                    _rskMark = "失信被执行人";
                                } else if (v.rskMark == 'B2') {
                                    _rskMark = "被执行人";
                                } else if (v.rskMark == 'B3') {
                                    _rskMark = "交通严重违章";
                                } else if (v.rskMark == '99') {
                                    _rskMark = "权限不足";
                                }
                                // 数据状态
                                if (v.dataStatus == null || v.dataStatus == "" || v.dataStatus == undefined) {
                                    _dataStatus = "--";
                                } else if (v.dataStatus == 99) {
                                    _dataStatus = "权限不足";
                                } else if (v.dataStatus == 1) {
                                    _dataStatus = "已验证";
                                } else if (v.dataStatus == 2) {
                                    _dataStatus = "未验证";
                                } else if (v.dataStatus == 3) {
                                    _dataStatus = "异议中";
                                }
                                return '<tr>' +
                                    '<td>' + nullFn(v.idNo) + '</td>' + '<td>' + _IDcard + '</td>' + '<td>' + nullFn(v.name) + '</td>' +
                                    '<td>' + nullFn(v.seqNo) + '</td>' + '<td>' + _sourceId + '</td>' + '<td>' + _rskScore + '</td>' +
                                    '<td>' + _rskMark + '</td>' + '<td>' + nullFn(v.dataBuildTime) + '</td>' + '<td>' + _dataStatus + '</td>' +
                                    '</tr>';
                            });
                            $('.xinyan_li2_con').html('').append(_recordsList);
                        } else {
                            $('.xinyan_li2_box .table').hide();
                            $('.xinyan_li2_null').show().html('前海征信暂无信息');
                        }
                    } else {
                        $('.xinyan_li2_box .table').hide();
                        $('.xinyan_li2_null').show().html('前海征信暂无信息');
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
                    $('.xinyan_li2_box .table').hide();
                    $('.xinyan_li2_null').show().html('前海征信暂无信息');
                }
            }
        })
    });
    // 算话共享
    $(".xindai").click(function () {
        var obj = new Object();
        obj.intoCode = getParam.intoCode;
        // obj.intoCode = '120180112161953961380';
        obj.bigdataType = 'bigData1005';  // 共享信贷
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: 'POST',
            contentType: "text/html; charset=UTF-8",
            url: "/api/obtain/bigdata",// 大数据-共享信贷
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if (data.rspCode === '000000') {
                    var _data = data.body;
                    if (_data != null) {
                        // 身份信息概要
                        if (_data.SH_QUERY_SHARE_SH != null && _data.SH_QUERY_SHARE_SH != '' && _data.SH_QUERY_SHARE_SH != undefined &&
                            _data.SH_QUERY_SHARE_SH.data != null && _data.SH_QUERY_SHARE_SH.data != '' && _data.SH_QUERY_SHARE_SH.data != undefined &&
                            _data.SH_QUERY_SHARE_SH.data.Person != null && _data.SH_QUERY_SHARE_SH.data.Person != '' && _data.SH_QUERY_SHARE_SH.data.Person != undefined) {
                            // 身份信息概要-身份信息
                            if (_data.SH_QUERY_SHARE_SH.data.Person.identification != null && _data.SH_QUERY_SHARE_SH.data.Person.identification != '' && _data.SH_QUERY_SHARE_SH.data.Person.identification != undefined) {
                                var _identification = _data.SH_QUERY_SHARE_SH.data.Person.identification;
                                // 性别
                                if (_identification.gender == 0) {
                                    $('.xindai_li1_con1_1').html('未知的性别');
                                } else if (_identification.gender == 1) {
                                    $('.xindai_li1_con1_1').html('男性');
                                } else if (_identification.gender == 2) {
                                    $('.xindai_li1_con1_1').html('女性');
                                } else if (_identification.gender == 9) {
                                    $('.xindai_li1_con1_1').html('未说明性别');
                                } else {
                                    $('.xindai_li1_con1_1').html('--');
                                }
                                // 出生日期
                                $('.xindai_li1_con1_2').html(nullFn(_identification.birthday));
                                // 证件类型
                                if (_identification.idType == '0') {
                                    $('.xindai_li1_con1_3').html('身份证');
                                } else if (_identification.idType == '1') {
                                    $('.xindai_li1_con1_3').html('户口簿');
                                } else if (_identification.idType == '2') {
                                    $('.xindai_li1_con1_3').html('护照');
                                } else if (_identification.idType == '3') {
                                    $('.xindai_li1_con1_3').html('军官证');
                                } else if (_identification.idType == '4') {
                                    $('.xindai_li1_con1_3').html('士兵证');
                                } else if (_identification.idType == '5') {
                                    $('.xindai_li1_con1_3').html('港澳居民来往内地通行证');
                                } else if (_identification.idType == '6') {
                                    $('.xindai_li1_con1_3').html('台湾同胞来往内地通行证');
                                } else if (_identification.idType == '7') {
                                    $('.xindai_li1_con1_3').html('临时身份证');
                                } else if (_identification.idType == '8') {
                                    $('.xindai_li1_con1_3').html('外国人居留证');
                                } else if (_identification.idType == '9') {
                                    $('.xindai_li1_con1_3').html('警官证');
                                } else if (_identification.idType == 'A') {
                                    $('.xindai_li1_con1_3').html('香港身份证');
                                } else if (_identification.idType == 'B') {
                                    $('.xindai_li1_con1_3').html('澳门身份证');
                                } else if (_identification.idType == 'X') {
                                    $('.xindai_li1_con1_3').html('其他证件');
                                } else {
                                    $('.xindai_li1_con1_3').html('--');
                                }
                                // 证件号码
                                $('.xindai_li1_con1_4').html(nullFn(_identification.idCard));
                                // 婚姻状态
                                if (_identification.marriage == 10) {
                                    $('.xindai_li1_con1_5').html('未婚');
                                } else if (_identification.marriage == 20) {
                                    $('.xindai_li1_con1_5').html('已婚');
                                } else if (_identification.marriage == 30) {
                                    $('.xindai_li1_con1_5').html('丧偶');
                                } else if (_identification.marriage == 40) {
                                    $('.xindai_li1_con1_5').html('离婚');
                                } else if (_identification.marriage == 90) {
                                    $('.xindai_li1_con1_5').html('未说明婚姻状况');
                                } else {
                                    $('.xindai_li1_con1_5').html('--');
                                }
                                // 最高学历
                                if (_identification.eduLevel == 10) {
                                    $('.xindai_li1_con1_6').html('研究生及以上');
                                } else if (_identification.eduLevel == 20) {
                                    $('.xindai_li1_con1_6').html('大学本科');
                                } else if (_identification.eduLevel == 30) {
                                    $('.xindai_li1_con1_6').html('大学专科和专科学校');
                                } else if (_identification.eduLevel == 40) {
                                    $('.xindai_li1_con1_6').html('中等专业学校或中等技术学校');
                                } else if (_identification.eduLevel == 50) {
                                    $('.xindai_li1_con1_6').html('技术学校');
                                } else if (_identification.eduLevel == 60) {
                                    $('.xindai_li1_con1_6').html('高中');
                                } else if (_identification.eduLevel == 70) {
                                    $('.xindai_li1_con1_6').html('初中');
                                } else if (_identification.eduLevel == 80) {
                                    $('.xindai_li1_con1_6').html('小学');
                                } else if (_identification.eduLevel == 90) {
                                    $('.xindai_li1_con1_6').html('文盲或半文盲');
                                } else if (_identification.eduLevel == 99) {
                                    $('.xindai_li1_con1_6').html('未知');
                                } else {
                                    $('.xindai_li1_con1_6').html('--');
                                }
                            } else {
                                // 性别，出生日期，证件类型，证件号码，婚姻状态，最高学历
                                $('.xindai_li1_con1_1, .xindai_li1_con1_2, .xindai_li1_con1_3, .xindai_li1_con1_4, .xindai_li1_con1_5, .xindai_li1_con1_6').html('--');
                            }
                            // 身份信息概要-职业信息
                            if (_data.SH_QUERY_SHARE_SH.data.Person.occupations != null && _data.SH_QUERY_SHARE_SH.data.Person.occupations != '' && _data.SH_QUERY_SHARE_SH.data.Person.occupations != undefined) {
                                var _occupations = _data.SH_QUERY_SHARE_SH.data.Person.occupations;
                                var _occupationsList = $.map(_occupations, function (v, i) {
                                    return '<tr>' +
                                        '<td>' + (i + 1) + '</td>' +  // 编号
                                        '<td>' + nullFn(v.company) + '</td>' +  // 工作单位
                                        '<td>' + nullFn(v.companyAddress) + '</td>' +  // 单位地址
                                        '<td>' + timeFormat8(nullFn(v.updateTime)) + '</td>' +  // 信息更新日期
                                        '</tr>';
                                }).join('');
                                $('.xindai_li1_con2').html('').append(_occupationsList);
                            } else {
                                $('.gongxiang_li1_2_box .table').hide();
                                $('.gongxiang_li1_2_null').html('职业信息表暂无信息');
                            }
                            // 身份信息概要-通讯地址信息
                            if (_data.SH_QUERY_SHARE_SH.data.Person.contactAddresses != null && _data.SH_QUERY_SHARE_SH.data.Person.contactAddresses != '' && _data.SH_QUERY_SHARE_SH.data.Person.contactAddresses != undefined) {
                                var _contactAddresses = _data.SH_QUERY_SHARE_SH.data.Person.contactAddresses;
                                var _contactAddressesList = $.map(_contactAddresses, function (v, i) {
                                    return '<tr>' +
                                        '<td>' + (i + 1) + '</td>' +  // 编号
                                        '<td>' + nullFn(v.contactAddress) + '</td>' +  // 通讯地址
                                        '<td>' + timeFormat8(nullFn(v.updateTime)) + '</td>' +  // 信息更新日期
                                        '</tr>';
                                }).join('');
                                $('.xindai_li1_con3').html('').append(_contactAddressesList);
                            } else {
                                $('.gongxiang_li1_3_box .table').hide();
                                $('.gongxiang_li1_3_null').html('通讯地址信息表暂无信息');
                            }
                            // 身份信息概要-居住地址信息
                            if (_data.SH_QUERY_SHARE_SH.data.Person.estates != null && _data.SH_QUERY_SHARE_SH.data.Person.estates != '' && _data.SH_QUERY_SHARE_SH.data.Person.estates != undefined) {
                                var _estates = _data.SH_QUERY_SHARE_SH.data.Person.estates;
                                var _address, _condition;
                                var _estatesList = $.map(_estates, function (v, i) {
                                    // 居住地址
                                    if (v.address == 9) {
                                        _address = '未知';
                                    } else {
                                        _address = v.address;
                                    }
                                    // 居住情况
                                    if (v.condition == 1) {
                                        _condition = '自置（自建，自购）无贷款或贷款已还清';
                                    } else if (v.condition == 2) {
                                        _condition = '按揭';
                                    } else if (v.condition == 3) {
                                        _condition = '亲属楼宇';
                                    } else if (v.condition == 4) {
                                        _condition = '集体宿舍';
                                    } else if (v.condition == 5) {
                                        _condition = '租房';
                                    } else if (v.condition == 6) {
                                        _condition = '共有住宅';
                                    } else if (v.condition == 7) {
                                        _condition = '其他';
                                    } else if (v.condition == 9) {
                                        _condition = '未知';
                                    }
                                    return '<tr>' +
                                        '<td>' + (i + 1) + '</td>' +  // 编号
                                        '<td>' + nullFn(_address) + '</td>' +  // 居住地址
                                        '<td>' + nullFn(_condition) + '</td>' +  // 居住情况
                                        '<td>' + timeFormat8(nullFn(v.updateTime)) + '</td>' +  // 信息更新日期
                                        '</tr>';
                                }).join('');
                                $('.xindai_li1_con4').html('').append(_estatesList);
                            } else {
                                $('.gongxiang_li1_4_box .table').hide();
                                $('.gongxiang_li1_4_null').html('居住地址信息表暂无信息');
                            }
                        } else {
                            // 性别，出生日期，证件类型，证件号码，婚姻状态，最高学历
                            $('.xindai_li1_con1_1, .xindai_li1_con1_2, .xindai_li1_con1_3, .xindai_li1_con1_4, .xindai_li1_con1_5, .xindai_li1_con1_6').html('--');
                            $('.gongxiang_li1_2_box .table').hide();
                            $('.gongxiang_li1_2_null').html('职业信息表暂无信息');
                            $('.gongxiang_li1_3_box .table').hide();
                            $('.gongxiang_li1_3_null').html('通讯地址信息表暂无信息');
                            $('.gongxiang_li1_4_box .table').hide();
                            $('.gongxiang_li1_4_null').html('居住地址信息表暂无信息');
                        }

                        // 信贷信息概要
                        // 信贷信息概要-信用提示
                        if (_data.SH_QUERY_SHARE_SH != null && _data.SH_QUERY_SHARE_SH != '' && _data.SH_QUERY_SHARE_SH != undefined &&
                            _data.SH_QUERY_SHARE_SH.data != null && _data.SH_QUERY_SHARE_SH.data != '' && _data.SH_QUERY_SHARE_SH.data != undefined &&
                            _data.SH_QUERY_SHARE_SH.data.Credit != null && _data.SH_QUERY_SHARE_SH.data.Credit != '' && _data.SH_QUERY_SHARE_SH.data.Credit != undefined &&
                            _data.SH_QUERY_SHARE_SH.data.Credit.indicator != null && _data.SH_QUERY_SHARE_SH.data.Credit.indicator != '' && _data.SH_QUERY_SHARE_SH.data.Credit.indicator != undefined) {
                            var _indicator = _data.SH_QUERY_SHARE_SH.data.Credit.indicator;
                            var _i;
                            var _indicatorList = $.map(_indicator, function (o, i) {
                                if (i == 'car') (_i = '车辆抵押贷款');
                                if (i == 'cash') (_i = '信用贷款');
                                if (i == 'circle') (_i = '循环租赁业务');
                                if (i == 'estate') (_i = '房产抵押贷款');
                                if (i == 'lease') (_i = '融资租赁业务');
                                if (i == 'other') (_i = '其他业务');
                                return '<tr>' +
                                    '<td>' + nullFn(_i) + '</td>' +  // 业务
                                    '<td>' + nullFn(o.total) + '</td>' +  // 总笔数
                                    '<td>' + nullFn(o.guaranteeTotal) + '</td>' +  // 为他人担保笔数
                                    '<td>' + nullFn(o.unSettledTotal) + '</td>' +  // 未结清笔数
                                    '</tr>';
                            });
                            $('.zyMessage-con-1').html('').append(_indicatorList);
                        } else {
                            $('.gongxiang_li2_1_box .table').hide();
                            $('.gongxiang_li2_1_null').html('信用提示表暂无信息');
                        }
                        // 信贷信息概要-逾期及违约概要
                        if (_data.SH_QUERY_SHARE_SH != null && _data.SH_QUERY_SHARE_SH != '' && _data.SH_QUERY_SHARE_SH != undefined &&
                            _data.SH_QUERY_SHARE_SH.data != null && _data.SH_QUERY_SHARE_SH.data != '' && _data.SH_QUERY_SHARE_SH.data != undefined &&
                            _data.SH_QUERY_SHARE_SH.data.Credit != null && _data.SH_QUERY_SHARE_SH.data.Credit != '' && _data.SH_QUERY_SHARE_SH.data.Credit != undefined &&
                            _data.SH_QUERY_SHARE_SH.data.Credit.overdueInfo != null && _data.SH_QUERY_SHARE_SH.data.Credit.overdueInfo != '' && _data.SH_QUERY_SHARE_SH.data.Credit.overdueInfo != undefined) {
                            var _overdueInfo = _data.SH_QUERY_SHARE_SH.data.Credit.overdueInfo;
                            // 呆账信息汇总
                            var _overdueInfo_01 = '<tr>' +
                                '<td>' + nullFn(_overdueInfo.badDebtNum) + '</td>' +  // 笔数
                                '<td>' + nullFn(_overdueInfo.badDebtBalance) + '</td>' +  // 总负债
                                '</tr>';
                            // 核销信息汇总
                            var _overdueInfo_02 = '<tr>' +
                                '<td>' + nullFn(_overdueInfo.offNum) + '</td>' +  // 笔数
                                '<td>' + nullFn(_overdueInfo.offBalance) + '</td>' +  // 总负债
                                '</tr>';
                            // 代偿信息汇总
                            var _overdueInfo_03 = '<tr>' +
                                '<td>' + nullFn(_overdueInfo.agentNum) + '</td>' +  // 笔数
                                '<td>' + nullFn(_overdueInfo.agentBalance) + '</td>' +  // 总负债
                                '</tr>';
                            // 逾期信息汇总
                            var _overdueInfo_04 = '<tr>' +
                                '<td>' + nullFn(_overdueInfo.overdueNum) + '</td>' +  // 笔数
                                '<td>' + nullFn(_overdueInfo.maxOverdueTimes) + '</td>' +  // 最大期数
                                '<td>' + nullFn(_overdueInfo.maxOverdueAmount) + '</td>' +  // 最大金额
                                '</tr>';
                            $('.xindai_li2_2_con1').html('').append(_overdueInfo_01);
                            $('.xindai_li2_2_con2').html('').append(_overdueInfo_02);
                            $('.xindai_li2_2_con3').html('').append(_overdueInfo_03);
                            $('.xindai_li2_2_con4').html('').append(_overdueInfo_04);
                        } else {
                            // 呆账信息汇总
                            var _overdueInfo_01 = '<tr><td>--</td><td>--</td></tr>';
                            // 核销信息汇总
                            var _overdueInfo_02 = '<tr><td>--</td><td>--</td></tr>';
                            // 代偿信息汇总
                            var _overdueInfo_03 = '<tr><td>--</td><td>--</td></tr>';
                            // 逾期信息汇总
                            var _overdueInfo_04 = '<tr><td>--</td><td>--</td><td>--</td></tr>';
                            $('.xindai_li2_2_con1').html('').append(_overdueInfo_01);
                            $('.xindai_li2_2_con2').html('').append(_overdueInfo_02);
                            $('.xindai_li2_2_con3').html('').append(_overdueInfo_03);
                            $('.xindai_li2_2_con4').html('').append(_overdueInfo_04);
                        }
                        // 信贷信息概要-授信及负债概要
                        if (_data.SH_QUERY_SHARE_SH != null && _data.SH_QUERY_SHARE_SH != '' && _data.SH_QUERY_SHARE_SH != undefined &&
                            _data.SH_QUERY_SHARE_SH.data != null && _data.SH_QUERY_SHARE_SH.data != '' && _data.SH_QUERY_SHARE_SH.data != undefined &&
                            _data.SH_QUERY_SHARE_SH.data.Credit != null && _data.SH_QUERY_SHARE_SH.data.Credit != '' && _data.SH_QUERY_SHARE_SH.data.Credit != undefined &&
                            _data.SH_QUERY_SHARE_SH.data.Credit.debtInfo != null && _data.SH_QUERY_SHARE_SH.data.Credit.debtInfo != '' && _data.SH_QUERY_SHARE_SH.data.Credit.debtInfo != undefined) {
                            var _debtInfo = _data.SH_QUERY_SHARE_SH.data.Credit.debtInfo;
                            var _unSettled = _debtInfo.unSettled;  // 未结清
                            var _guarantee = _debtInfo.guarantee;  // 对外保证汇总
                            var _unSettledTable, _unSettledList, _guaranteeList;
                            if (_unSettled) {
                                _unSettledTable = $.map(_unSettled, function (o, i) {
                                    if (i == 'car') (_i = '车辆抵押贷款');
                                    if (i == 'cash') (_i = '信用贷款');
                                    if (i == 'circle') (_i = '循环租赁业务');
                                    if (i == 'estate') (_i = '房产抵押贷款');
                                    if (i == 'lease') (_i = '融资租赁业务');
                                    if (i == 'other') (_i = '其他业务');
                                    _unSettledList += '<tr>' +
                                        '<td>' + nullFn(_i) + '</td>' +  // 业务
                                        '<td>' + nullFn(o.orgNum) + '</td>' +  // 机构数
                                        '<td>' + nullFn(o.total) + '</td>' +  // 笔数
                                        '<td>' + nullFn(o.creditLimit) + '</td>' +  // 合同金额
                                        '<td>' + nullFn(o.balance) + '</td>' +  // 总负债
                                        '</tr>';
                                });
                            }
                            if (_guarantee) {
                                _guaranteeList = '<tr>' +
                                    '<td>' + '对外保证汇总' + '</td>' +  // 业务
                                    '<td>' + _guarantee.orgNum + '</td>' +  // 机构数
                                    '<td>' + _guarantee.total + '</td>' +  // 笔数
                                    '<td>' + _guarantee.creditLimit + '</td>' +  // 合同金额
                                    '<td>' + _guarantee.balance + '</td>' +  // 总负债
                                    '</tr>';
                            }
                            var _table = _unSettledList + _guaranteeList;
                            $('.zyMessage-con-3').html('').append(_table);
                        } else {
                            $('.gongxiang_li2_3_box .table').hide();
                            $('.gongxiang_li2_3_null').html('授信及负债概要表暂无信息');
                        }
                        // 信贷信息概要-长期未更新信贷概要
                        if (_data.SH_QUERY_SHARE_SH != null && _data.SH_QUERY_SHARE_SH != '' && _data.SH_QUERY_SHARE_SH != undefined &&
                            _data.SH_QUERY_SHARE_SH.data != null && _data.SH_QUERY_SHARE_SH.data != '' && _data.SH_QUERY_SHARE_SH.data != undefined &&
                            _data.SH_QUERY_SHARE_SH.data.Credit != null && _data.SH_QUERY_SHARE_SH.data.Credit != '' && _data.SH_QUERY_SHARE_SH.data.Credit != undefined &&
                            _data.SH_QUERY_SHARE_SH.data.Credit.remoteCreditInfo != null && _data.SH_QUERY_SHARE_SH.data.Credit.remoteCreditInfo != '' && _data.SH_QUERY_SHARE_SH.data.Credit.remoteCreditInfo != undefined) {
                            var _remoteCreditInfo = _data.SH_QUERY_SHARE_SH.data.Credit.remoteCreditInfo;
                            // 呆账信息
                            var _remoteCreditInfo_01 = '<tr>' +
                                '<td>' + nullFn(_remoteCreditInfo.unSettledNum) + '</td>' +  // 笔数
                                '<td>' + nullFn(_remoteCreditInfo.unSettledBalance) + '</td>' +  // 总负债
                                '</tr>';
                            // 对外担保信息
                            var _remoteCreditInfo_02 = '<tr>' +
                                '<td>' + nullFn(_remoteCreditInfo.guaranteeNum) + '</td>' +  // 笔数
                                '<td>' + nullFn(_remoteCreditInfo.guaranteeBalance) + '</td>' +  // 总负债
                                '</tr>';
                            // 代偿信息
                            var _remoteCreditInfo_03 = '<tr>' +
                                '<td>' + nullFn(_remoteCreditInfo.agentNum) + '</td>' +  // 笔数
                                '<td>' + nullFn(_remoteCreditInfo.agentBalance) + '</td>' +  // 总负债
                                '</tr>';
                            // 逾期信息
                            var _remoteCreditInfo_04 = '<tr>' +
                                '<td>' + nullFn(_remoteCreditInfo.overdueNum) + '</td>' +  // 笔数
                                '<td>' + nullFn(_remoteCreditInfo.maxOverdueTimes) + '</td>' +  // 最大期数
                                '<td>' + nullFn(_remoteCreditInfo.maxOverdueAmount) + '</td>' +  // 最大金额
                                '</tr>';
                            $('.xindai_li2_4_con1').html('').append(_remoteCreditInfo_01);
                            $('.xindai_li2_4_con2').html('').append(_remoteCreditInfo_02);
                            $('.xindai_li2_4_con3').html('').append(_remoteCreditInfo_03);
                            $('.xindai_li2_4_con4').html('').append(_remoteCreditInfo_04);
                        } else {
                            // 呆账信息
                            var _remoteCreditInfo_01 = '<tr><td>--</td><td>--</td></tr>';
                            // 对外担保信息
                            var _remoteCreditInfo_02 = '<tr><td>--</td><td>--</td></tr>';
                            // 代偿信息
                            var _remoteCreditInfo_03 = '<tr><td>--</td><td>--</td></tr>';
                            // 逾期信息
                            var _remoteCreditInfo_04 = '<tr><td>--</td><td>--</td><td>--</td></tr>';
                            $('.xindai_li2_4_con1').html('').append(_remoteCreditInfo_01);
                            $('.xindai_li2_4_con2').html('').append(_remoteCreditInfo_02);
                            $('.xindai_li2_4_con3').html('').append(_remoteCreditInfo_03);
                            $('.xindai_li2_4_con4').html('').append(_remoteCreditInfo_04);
                        }
                        // 信贷信息明细-对外担保信息明细
                        if (_data.SH_QUERY_SHARE_SH != null && _data.SH_QUERY_SHARE_SH != '' && _data.SH_QUERY_SHARE_SH != undefined &&
                            _data.SH_QUERY_SHARE_SH.data != null && _data.SH_QUERY_SHARE_SH.data != '' && _data.SH_QUERY_SHARE_SH.data != undefined &&
                            _data.SH_QUERY_SHARE_SH.data.Credit != null && _data.SH_QUERY_SHARE_SH.data.Credit != '' && _data.SH_QUERY_SHARE_SH.data.Credit != undefined &&
                            _data.SH_QUERY_SHARE_SH.data.Credit.guaranteeInfos != null && _data.SH_QUERY_SHARE_SH.data.Credit.guaranteeInfos != '' && _data.SH_QUERY_SHARE_SH.data.Credit.guaranteeInfos != undefined) {
                            var _guaranteeInfos = _data.SH_QUERY_SHARE_SH.data.Credit.guaranteeInfos;
                            var _guaranteeType;
                            var _guaranteeInfosList = $.map(_guaranteeInfos, function (v, i) {
                                if (v) {
                                    if (v.guaranteeType == 1) {
                                        _guaranteeType = '担保中';
                                    } else if (v.guaranteeType == 2) {
                                        _guaranteeType = '担保解除';
                                    }
                                }
                                return '<tr>' +
                                    '<td>' + (i + 1) + '</td>' +  // 编号
                                    '<td>' + nullFn(v.orgCode) + '</td>' +  // 发放机构
                                    '<td>' + nullFn(v.creditLimit) + '</td>' +  // 担保贷款合同
                                    '<td>' + timeFormat8(nullFn(v.dateOpened)) + '</td>' +  // 担保贷款发放日
                                    '<td>' + timeFormat8(nullFn(v.dateClosed)) + '</td>' +  // 担保贷款到期日期
                                    '<td>' + nullFn(v.occurSum) + '</td>' +  // 担保金额
                                    '<td>' + nullFn(_guaranteeType) + '</td>' +  // 担保状态
                                    '<td>' + timeFormat8(nullFn(v.updateDate)) + '</td>' +  // 信息更新日
                                    '<td>' + nullFn(v.balance) + '</td>' +  // 总负债
                                    '</tr>';
                            }).join('');
                            $('.xindai_li4_con2').html('').append(_guaranteeInfosList);
                        } else {
                            $('.gongxiang_li4_2_table').hide();
                            $('.gongxiang_li4_2_null').html('对外担保信息明细表暂无信息');
                        }
                        // 信贷信息明细-信贷信息明细
                        if (_data.SH_QUERY_SHARE_SH != null && _data.SH_QUERY_SHARE_SH != '' && _data.SH_QUERY_SHARE_SH != undefined &&
                            _data.SH_QUERY_SHARE_SH.data != null && _data.SH_QUERY_SHARE_SH.data != '' && _data.SH_QUERY_SHARE_SH.data != undefined &&
                            _data.SH_QUERY_SHARE_SH.data.Credit != null && _data.SH_QUERY_SHARE_SH.data.Credit != '' && _data.SH_QUERY_SHARE_SH.data.Credit != undefined &&
                            _data.SH_QUERY_SHARE_SH.data.Credit.creditInfos != null && _data.SH_QUERY_SHARE_SH.data.Credit.creditInfos != '' && _data.SH_QUERY_SHARE_SH.data.Credit.creditInfos != undefined) {
                            var _creditInfos = _data.SH_QUERY_SHARE_SH.data.Credit.creditInfos;
                            var _creditType, _accountStatus, _guaranteeWay, _repayFreq, _overduesList, _table01,
                                indList;
                            var _creditInfosList = $.map(_creditInfos, function (v, i) {
                                var _creditDetail = v.creditDetail;
                                if (_creditDetail) {
                                    // 业务类型
                                    if (_creditDetail.creditType == '1') {
                                        _creditType = '信用贷款-现金贷（大于30天）';
                                    } else if (_creditDetail.creditType == '2') {
                                        _creditType = '循环贷款业务';
                                    } else if (_creditDetail.creditType == '3') {
                                        _creditType = '融资租赁业务';
                                    } else if (_creditDetail.creditType == '5') {
                                        _creditType = '房产抵押贷款';
                                    } else if (_creditDetail.creditType == '6') {
                                        _creditType = '车辆抵押贷款';
                                    } else if (_creditDetail.creditType == '7') {
                                        _creditType = '信用贷款-短期现金贷(<=30天)';
                                    } else if (_creditDetail.creditType == '8') {
                                        _creditType = '信用贷款-消费分期贷（有业务场景）';
                                    } else if (_creditDetail.creditType == 'Z' || _creditDetail.creditType == 'z') {
                                        _creditType = '其他业务';
                                    }
                                    // 合同状态
                                    if (_creditDetail.accountStatus == 0) {
                                        _accountStatus = '正常未结清';
                                    } else if (_creditDetail.accountStatus == 1) {
                                        _accountStatus = '代偿未结清';
                                    } else if (_creditDetail.accountStatus == 2) {
                                        _accountStatus = '正常结清';
                                    } else if (_creditDetail.accountStatus == 3) {
                                        _accountStatus = '代偿结清';
                                    } else if (_creditDetail.accountStatus == 4) {
                                        _accountStatus = '呆账';
                                    } else if (_creditDetail.accountStatus == 5) {
                                        _accountStatus = '核销';
                                    } else if (_creditDetail.accountStatus == 6) {
                                        _accountStatus = '以资抵债';
                                    } else if (_creditDetail.accountStatus == 7) {
                                        _accountStatus = '提前还款未结清';
                                    } else if (_creditDetail.accountStatus == 8) {
                                        _accountStatus = '提前还款结清';
                                    }
                                    // 担保方式
                                    if (_creditDetail.guaranteeWay == 1) {
                                        _guaranteeWay = '质押（含保证金）';
                                    } else if (_creditDetail.guaranteeWay == 2) {
                                        _guaranteeWay = '抵押';
                                    } else if (_creditDetail.guaranteeWay == 3) {
                                        _guaranteeWay = '自然人保证';
                                    } else if (_creditDetail.guaranteeWay == 4) {
                                        _guaranteeWay = '信用/免担保';
                                    } else if (_creditDetail.guaranteeWay == 5) {
                                        _guaranteeWay = '组合（含自然人保证）';
                                    } else if (_creditDetail.guaranteeWay == 6) {
                                        _guaranteeWay = '组合（不含自然人保证）';
                                    } else if (_creditDetail.guaranteeWay == 7) {
                                        _guaranteeWay = '农户联保';
                                    } else if (_creditDetail.guaranteeWay == 9) {
                                        _guaranteeWay = '其他';
                                    }
                                    // 还款频率
                                    if (_creditDetail.repayFreq == '01') {
                                        _repayFreq = '日';
                                    } else if (_creditDetail.repayFreq == '02') {
                                        _repayFreq = '周';
                                    } else if (_creditDetail.repayFreq == '03') {
                                        _repayFreq = '月';
                                    } else if (_creditDetail.repayFreq == '04') {
                                        _repayFreq = '季';
                                    } else if (_creditDetail.repayFreq == '05') {
                                        _repayFreq = '半年';
                                    } else if (_creditDetail.repayFreq == '06') {
                                        _repayFreq = '年';
                                    } else if (_creditDetail.repayFreq == '07') {
                                        _repayFreq = '一次性';
                                    } else if (_creditDetail.repayFreq == '08') {
                                        _repayFreq = '不定期';
                                    } else if (_creditDetail.repayFreq == '99') {
                                        _repayFreq = '其他';
                                    }
                                    _table01 = '<div class="xindai_li3_1_box tit-li-null">' +
                                        '<table class="table table-bordered">' +
                                        '<tr><td colspan="7" style="font-weight: bold;">第' + (i + 1) + '笔</td></tr><tr><th style="font-weight: bold;">业务类型</th><th style="font-weight: bold;">合同状态</th><th style="font-weight: bold;">担保方式</th><th style="font-weight: bold;">还款频率</th><th style="font-weight: bold;">机构号</th><th style="font-weight: bold;">合同生效日期</th><th style="font-weight: bold;">合同到期日期</th></tr>' +
                                        '<tr><td>' + nullFn(_creditType) + '</td><td>' + nullFn(_accountStatus) + '</td><td>' + nullFn(_guaranteeWay) + '</td><td>' + nullFn(_repayFreq) + '</td><td>' + nullFn(_creditDetail.orgCode) + '</td><td>' + timeFormat8(nullFn(_creditDetail.dateOpened)) + '</td><td>' + timeFormat8(nullFn(_creditDetail.dateClosed)) + '</td></tr>' +
                                        '<tr><th style="font-weight: bold;">合同金额</th><th style="font-weight: bold;">当前负债金额</th><th style="font-weight: bold;">贷款期数</th><th style="font-weight: bold;">剩余还款期数</th><th style="font-weight: bold;">本期应还款日</th><th style="font-weight: bold;">本期应还款</th><th style="font-weight: bold;">本期实还款</th></tr>' +
                                        '<tr><td>' + nullFn(_creditDetail.creditLimit) + '</td><td>' + nullFn(_creditDetail.balance) + '</td><td>' + nullFn(_creditDetail.loanTerm) + '</td><td>' + nullFn(_creditDetail.periodNumber) + '</td><td>' + timeFormat8(nullFn(_creditDetail.billingDate)) + '</td><td>' + nullFn(_creditDetail.scheduledAmount) + '</td><td>' + nullFn(_creditDetail.actualPayAmount) + '</td></tr>' +
                                        '<tr><th style="font-weight: bold;">最近一次还款日</th><th style="font-weight: bold;">最高逾期金额</th><th style="font-weight: bold;">当前逾期期数</th><th style="font-weight: bold;">当前逾期金额</th><th style="font-weight: bold;">最高逾期期数</th></tr>' +
                                        '<tr><td>' + timeFormat8(nullFn(_creditDetail.actualPayDate)) + '</td><td>' + nullFn(_creditDetail.maxOverdueAmount) + '</td><td>' + nullFn(_creditDetail.nowOverdueTimes) + '</td><td>' + nullFn(_creditDetail.nowOverdueAmount) + '</td><td>' + nullFn(_creditDetail.maxOverdueTimes) + '</td></tr>' +
                                        '</table>' +
                                        '</div>';
                                } else {
                                    _table01 = '<div style="color: #8B94A0;font-size: 14px;line-height: 40px;text-align: center;">信贷信息明细暂无信息</div>';
                                }

                                var _repayStatus = v.repayStatus;
                                if (_repayStatus) {
                                    var yearStart = _repayStatus.start.slice(0, 4);  // 开始年
                                    var monthStart = _repayStatus.start.slice(-2);  // 开始月
                                    var yearEnd = _repayStatus.end.slice(0, 4);  // 结束年
                                    var monthEnd = _repayStatus.end.slice(-2);  // 结束月
                                    indList =
                                        '<div class="gongxiang_li3_2_box">' +
                                        '<div class="tit-li">' +
                                        '<span class="xindai_li3_21">' + nullFn(yearStart) + '</span>年<span class="xindai_li3_22">' + nullFn(monthStart) + '</span>月-<span class="xindai_li3_23">' + nullFn(yearEnd) + '</span>年<span class="xindai_li3_24">' + nullFn(monthEnd) + '</span>月24期还款状态' +
                                        '</div>' +
                                        '<div style="font-size:14px; padding:0;">( -：表示合同尚未生效 &nbsp;&nbsp;N：表示正常&nbsp;&nbsp;D：表示代偿' +
                                        '&nbsp;&nbsp;G：表示核销 &nbsp;&nbsp;C：已结清 &nbsp;&nbsp;#：表示未知&nbsp;&nbsp;数字：针对有逾期的期数，以机构报送的当前逾期期数)' +
                                        '</div>' +
                                        '<div class="gongxiang_li3_2_null" style="color: #8B94A0;font-size: 14px;line-height: 40px;text-align: center;"></div>' +
                                        '<table class="table table-bordered"><thead>' +
                                        '<tr class="com-lab">' +
                                        '<th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th>' +
                                        '<th>9</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th>' +
                                        '<th>17</th><th>18</th><th>19</th><th>20</th><th>21</th><th>22</th><th>23</th><th>24</th>' +
                                        '</tr>' +
                                        '<tr><td>' + nullFn(_repayStatus.M1) + '</td><td>' + nullFn(_repayStatus.M2) + '</td><td>' + nullFn(_repayStatus.M3) + '</td><td>' + nullFn(_repayStatus.M4) + '</td><td>' + nullFn(_repayStatus.M5) + '</td><td>' + nullFn(_repayStatus.M6) + '</td><td>' + nullFn(_repayStatus.M7) + '</td><td>' + nullFn(_repayStatus.M8) + '</td>' +
                                        '<td>' + nullFn(_repayStatus.M9) + '</td><td>' + nullFn(_repayStatus.M10) + '</td><td>' + nullFn(_repayStatus.M11) + '</td><td>' + nullFn(_repayStatus.M12) + '</td><td>' + nullFn(_repayStatus.M13) + '</td><td>' + nullFn(_repayStatus.M14) + '</td><td>' + nullFn(_repayStatus.M15) + '</td><td>' + nullFn(_repayStatus.M16) + '</td>' +
                                        '<td>' + nullFn(_repayStatus.M17) + '</td><td>' + nullFn(_repayStatus.M18) + '</td><td>' + nullFn(_repayStatus.M19) + '</td><td>' + nullFn(_repayStatus.M20) + '</td><td>' + nullFn(_repayStatus.M21) + '</td><td>' + nullFn(_repayStatus.M22) + '</td><td>' + nullFn(_repayStatus.M23) + '</td><td>' + nullFn(_repayStatus.M24) + '</td>' +
                                        '</tr></thead>' +
                                        '<tbody class="zyMessage-con xindai_li3_20"></tbody>' +
                                        '</table>' +
                                        '</div>';
                                } else {
                                    indList = '<div style="color: #8B94A0;font-size: 14px;line-height: 40px;text-align: center;">24还款状态暂无信息</div>';
                                }
                                var _overdues = v.overdues, _overduesCon = '';
                                if (_overdues) {
                                    _overduesList = $.map(_overdues, function (val, ind) {
                                        _overduesCon +=
                                            '<div class="secondCon_li_box">' +
                                            '<div class="tit-li">逾期信息明细</div>' +
                                            '<div class="gongxiang_li4_1_null" style="color: #8B94A0;font-size: 14px;line-height: 40px;text-align: center;"></div>' +
                                            '<table class="table table-bordered">' +
                                            '<thead><tr><th style="font-weight: bold;">编号</th><th style="font-weight: bold;">逾期期数</th><th style="font-weight: bold;">逾期金额</th><th style="font-weight: bold;">本期应还款日</th></tr></thead>' +
                                            '<tbody class="zyMessage-con xindai_li4_con1"><tr><td>' + nullFn(ind + 1) + '</td><td>' + nullFn(val.nowOverdueTimes) + '</td><td>' + nullFn(val.nowOverdueAmount) + '</td><td>' + timeFormat8(nullFn(val.billingDate)) + '</td></tr></tbody>' +
                                            '</table>' +
                                            '</div>'
                                    })
                                } else {
                                    _overduesCon = '<div style="color: #8B94A0;font-size: 14px;line-height: 40px;text-align: center;">逾期信息明细暂无信息</div>';
                                }
                                return _table01 + indList + _overduesCon;
                            });
                            $('.xindai_li3_box').html('').append(_creditInfosList);
                        } else {
                            $('.xindai_li3_box_null').show().html('信贷信息明细暂无信息');
                        }

                        // 异常交易信息列表
                        if (_data.SH_QUERY_SHARE_SH != null && _data.SH_QUERY_SHARE_SH != '' && _data.SH_QUERY_SHARE_SH != undefined &&
                            _data.SH_QUERY_SHARE_SH.data != null && _data.SH_QUERY_SHARE_SH.data != '' && _data.SH_QUERY_SHARE_SH.data != undefined &&
                            _data.SH_QUERY_SHARE_SH.data.SpecTrade != null && _data.SH_QUERY_SHARE_SH.data.SpecTrade != '' && _data.SH_QUERY_SHARE_SH.data.SpecTrade != undefined && !$.isEmptyObject(_data.SH_QUERY_SHARE_SH.data.SpecTrade)) {
                            var _SpecTrade = _data.SH_QUERY_SHARE_SH.data.SpecTrade;
                            var _num = 1, _SpecTradeArray = '';
                            var _SpecTradeList = $.map(_SpecTrade, function (o, i) {
                                var _i;
                                if (i == 'extends') {
                                    _i = '展期'
                                }
                                ;
                                if (i == 'angents') {
                                    _i = '担保人代还'
                                }
                                ;
                                if (i == 'leases') {
                                    _i = '以资抵债'
                                }
                                ;
                                if (i == 'over30') {
                                    _i = '逾期1-29天'
                                }
                                ;
                                if (i == 'over60') {
                                    _i = '逾期30-59天'
                                }
                                ;
                                if (i == 'over90') {
                                    _i = '逾期60-89天'
                                }
                                ;
                                if (i == 'overL') {
                                    _i = '长期拖欠(90天以上)'
                                }
                                ;
                                if (i == 'illegal') {
                                    _i = '法律诉讼(已判决生效)'
                                }
                                ;
                                if (i == 'cheat') {
                                    _i = '诈骗'
                                }
                                ;
                                if (i == 'advance') {
                                    _i = '提前还款'
                                }
                                ;
                                if (i == 'other') {
                                    _i = '其他'
                                }
                                ;
                                if (o) {
                                    _SpecTradeArray += $.map(o, function (v, i) {
                                        return '<tr>' +
                                            '<td>' + _num++ + '</td>' +  // 编号
                                            '<td>' + nullFn(_i) + '</td>' +  // 异常类型
                                            '<td>' + nullFn(v.orgCode) + '</td>' +  // 机构
                                            '<td>' + timeFormat8(nullFn(v.dateOpened)) + '</td>' +  // 合同生效日期
                                            '<td>' + timeFormat8(nullFn(v.tradeDate)) + '</td>' +  // 发生日期
                                            '<td>' + nullFn(v.tradeSum) + '</td>' +  // 发生金额
                                            '<td>' + nullFn(v.details) + '</td>' +  // 明细记录
                                            '<td>' + timeFormat8((v.createTime)) + '</td>' +  // 信息获取时间
                                            '</tr>';
                                    });
                                } else {
                                    return '';
                                }
                            });
                            $('.xindai_li5_con').html('').append(_SpecTradeArray);
                        } else {
                            $('.gongxiang_li5_table').hide();
                            $('.gongxiang_li5_null').html('异常交易信息列表暂无信息');
                        }
                    } else {
                        $('.xindai_li1_con1_1').html('--');  // 性别
                        $('.xindai_li1_con1_2').html('--'); // 出生日期
                        $('.xindai_li1_con1_3').html('--'); // 证件类型
                        $('.xindai_li1_con1_4').html('--'); // 证件号码
                        $('.xindai_li1_con1_5').html('--'); // 婚姻状态
                        $('.xindai_li1_con1_6').html('--'); // 最高学历
                        $('.gongxiang_li1_2_box .table').hide();
                        $('.gongxiang_li1_2_null').html('职业信息表暂无信息');
                        $('.gongxiang_li1_3_box .table').hide();
                        $('.gongxiang_li1_3_null').html('通讯地址信息表暂无信息');
                        $('.gongxiang_li1_4_box .table').hide();
                        $('.gongxiang_li1_4_null').html('居住地址信息表暂无信息');
                        $('.gongxiang_li2_1_box .table').hide();
                        $('.gongxiang_li2_1_null').html('信用提示表暂无信息');
                        // 呆账信息
                        var _overdueInfo_01 = '<tr><td>--</td><td>--</td></tr>';
                        // 核销信息
                        var _overdueInfo_02 = '<tr><td>--</td><td>--</td></tr>';
                        // 代偿信息
                        var _overdueInfo_03 = '<tr><td>--</td><td>--</td></tr>';
                        // 逾期信息
                        var _overdueInfo_04 = '<tr><td>--</td><td>--</td><td>--</td></tr>';
                        $('.xindai_li2_2_con1').html('').append(_overdueInfo_01);
                        $('.xindai_li2_2_con2').html('').append(_overdueInfo_02);
                        $('.xindai_li2_2_con3').html('').append(_overdueInfo_03);
                        $('.xindai_li2_2_con4').html('').append(_overdueInfo_04);
                        $('.gongxiang_li2_3_box .table').hide();
                        $('.gongxiang_li2_3_null').html('授信及负债概要表暂无信息');
                        // 呆账信息
                        var _remoteCreditInfo_01 = '<tr><td>--</td><td>--</td></tr>';
                        // 对外担保信息
                        var _remoteCreditInfo_02 = '<tr><td>--</td><td>--</td></tr>';
                        // 代偿信息
                        var _remoteCreditInfo_03 = '<tr><td>--</td><td>--</td></tr>';
                        // 逾期信息
                        var _remoteCreditInfo_04 = '<tr><td>--</td><td>--</td><td>--</td></tr>';
                        $('.xindai_li2_4_con1').html('').append(_remoteCreditInfo_01);
                        $('.xindai_li2_4_con2').html('').append(_remoteCreditInfo_02);
                        $('.xindai_li2_4_con3').html('').append(_remoteCreditInfo_03);
                        $('.xindai_li2_4_con4').html('').append(_remoteCreditInfo_04);
                        $('.xindai_li3_box_null').show().html('信贷信息明细暂无信息');
                        $('.gongxiang_li4_2_table').hide();
                        $('.gongxiang_li4_2_null').html('对外担保信息明细表暂无信息');
                        $('.gongxiang_li5_table').hide();
                        $('.gongxiang_li5_null').html('异常交易信息列表暂无信息');
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
                    $('.xindai_li1_con1_1').html('--');  // 性别
                    $('.xindai_li1_con1_2').html('--'); // 出生日期
                    $('.xindai_li1_con1_3').html('--'); // 证件类型
                    $('.xindai_li1_con1_4').html('--'); // 证件号码
                    $('.xindai_li1_con1_5').html('--'); // 婚姻状态
                    $('.xindai_li1_con1_6').html('--'); // 最高学历
                    $('.gongxiang_li1_2_box .table').hide();
                    $('.gongxiang_li1_2_null').html('职业信息表暂无信息');
                    $('.gongxiang_li1_3_box .table').hide();
                    $('.gongxiang_li1_3_null').html('通讯地址信息表暂无信息');
                    $('.gongxiang_li1_4_box .table').hide();
                    $('.gongxiang_li1_4_null').html('居住地址信息表暂无信息');
                    $('.gongxiang_li2_1_box .table').hide();
                    $('.gongxiang_li2_1_null').html('信用提示表暂无信息');
                    // 呆账信息
                    var _overdueInfo_01 = '<tr><td>--</td><td>--</td></tr>';
                    // 核销信息
                    var _overdueInfo_02 = '<tr><td>--</td><td>--</td></tr>';
                    // 代偿信息
                    var _overdueInfo_03 = '<tr><td>--</td><td>--</td></tr>';
                    // 逾期信息
                    var _overdueInfo_04 = '<tr><td>--</td><td>--</td><td>--</td></tr>';
                    $('.xindai_li2_2_con1').html('').append(_overdueInfo_01);
                    $('.xindai_li2_2_con2').html('').append(_overdueInfo_02);
                    $('.xindai_li2_2_con3').html('').append(_overdueInfo_03);
                    $('.xindai_li2_2_con4').html('').append(_overdueInfo_04);
                    $('.gongxiang_li2_3_box .table').hide();
                    $('.gongxiang_li2_3_null').html('授信及负债概要表暂无信息');
                    // 呆账信息
                    var _remoteCreditInfo_01 = '<tr><td>--</td><td>--</td></tr>';
                    // 对外担保信息
                    var _remoteCreditInfo_02 = '<tr><td>--</td><td>--</td></tr>';
                    // 代偿信息
                    var _remoteCreditInfo_03 = '<tr><td>--</td><td>--</td></tr>';
                    // 逾期信息
                    var _remoteCreditInfo_04 = '<tr><td>--</td><td>--</td><td>--</td></tr>';
                    $('.xindai_li2_4_con1').html('').append(_remoteCreditInfo_01);
                    $('.xindai_li2_4_con2').html('').append(_remoteCreditInfo_02);
                    $('.xindai_li2_4_con3').html('').append(_remoteCreditInfo_03);
                    $('.xindai_li2_4_con4').html('').append(_remoteCreditInfo_04);
                    $('.xindai_li3_box_null').show().html('信贷信息明细暂无信息');
                    $('.gongxiang_li4_2_table').hide();
                    $('.gongxiang_li4_2_null').html('对外担保信息明细表暂无信息');
                    $('.gongxiang_li5_table').hide();
                    $('.gongxiang_li5_null').html('异常交易信息列表暂无信息');
                }
            }
        })
    });
    //人行报告
    $(document).on('click', '.renhang', function () {
        PBOCReportFn();
    })
    function PBOCReportFn(){
        var obj = {
            'intoCode':getParam.intoCode,
            // 'intoCode':"120171215174252198885",
            'bigdataType':'bigData8001',
            'childType':'app_shreport'
        };
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: 'POST',
            contentType: "text/html; charset=UTF-8",
            url: "/api/obtain/getBigDataByType",//详细信息-人行征信
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if (data.rspCode === '000000') {
                    var _data = data.body;
                    // 信贷记录概要表
                    var _creditRecordSummary = _data.report.creditRecord.summary;
                    if (_creditRecordSummary != null || _creditRecordSummary != '' || _creditRecordSummary != undefined) {
                        $('.first_one_con').html(nullFn(_creditRecordSummary.assetDisposal));//资产处置信息笔数
                        $('.first_two_con').html(nullFn(_creditRecordSummary.compensate));//保证人代偿信息笔数
                        if(_creditRecordSummary.creditCard != null || _creditRecordSummary.creditCard != '' || _creditRecordSummary.creditCard != undefined){
                            $('.second_one_con').html(nullFn(_creditRecordSummary.creditCard.accountTotal));//信用卡账户数
                            $('.second_two_con').html(nullFn(_creditRecordSummary.creditCard.activeTotal));//信用卡未结清/未销户账户数
                            $('.second_three_con').html(nullFn(_creditRecordSummary.creditCard.overdue90Total));//信用卡发生过90天以上逾期的账户数
                            $('.third_one_con').html(nullFn(_creditRecordSummary.creditCard.guarantee));//信用卡为他人担保笔数
                            $('.third_two_con').html(nullFn(_creditRecordSummary.creditCard.overdueTotal));//信用卡发生过逾期的账户数
                        }
                        if(_creditRecordSummary.mortgage != null || _creditRecordSummary.mortgage != '' || _creditRecordSummary.mortgage != undefined){
                            $('.fourth_one_con').html(nullFn(_creditRecordSummary.mortgage.accountTotal));//购房贷款账户数
                            $('.fourth_two_con').html(nullFn(_creditRecordSummary.mortgage.activeTotal));//购房贷款未结清/未销户账户数
                            $('.fourth_three_con').html(nullFn(_creditRecordSummary.mortgage.overdue90Total));//购房贷款发生过90天以上逾期的账户数
                            $('.fifth_one_con').html(nullFn(_creditRecordSummary.mortgage.guarantee));//购房贷款为他人担保笔数
                            $('.fifth_two_con').html(nullFn(_creditRecordSummary.mortgage.overdueTotal));//购房贷款发生过逾期的账户数
                        }
                        if(_creditRecordSummary.otherLoan != null || _creditRecordSummary.otherLoan != '' || _creditRecordSummary.otherLoan != undefined){
                            $('.six_one_con').html(nullFn(_creditRecordSummary.otherLoan.accountTotal));//其他贷款账户数
                            $('.six_two_con').html(nullFn(_creditRecordSummary.otherLoan.activeTotal));//其他贷款未结清/未销户账户数
                            $('.six_three_con').html(nullFn(_creditRecordSummary.otherLoan.overdue90Total));//其他贷款发生过90天以上逾期的账户数
                            $('.seven_one_con').html(nullFn(_creditRecordSummary.otherLoan.guarantee));//其他贷款为他人担保笔数
                            $('.seven_two_con').html(nullFn(_creditRecordSummary.otherLoan.overdueTotal));//其他贷款发生过逾期的账户数
                        }
                    } else {
                        $('.first_one_con').html('--');//资产处置信息笔数
                        $('.first_two_con').html('--');//保证人代偿信息笔数
                        $('.second_one_con').html('--');//信用卡账户数
                        $('.second_two_con').html('--');//信用卡未结清/未销户账户数
                        $('.second_three_con').html('--');//信用卡发生过90天以上逾期的账户数
                        $('.third_one_con').html('--');//信用卡为他人担保笔数
                        $('.third_two_con').html('--');//信用卡发生过逾期的账户数
                        $('.fourth_one_con').html('--');//购房贷款账户数
                        $('.fourth_two_con').html('--');//购房贷款未结清/未销户账户数
                        $('.fourth_three_con').html('--');//购房贷款发生过90天以上逾期的账户数
                        $('.fifth_one_con').html('--');//购房贷款为他人担保笔数
                        $('.fifth_two_con').html('--');//购房贷款发生过逾期的账户数
                        $('.six_one_con').html('--');//其他贷款账户数
                        $('.six_two_con').html('--');//其他贷款未结清/未销户账户数
                        $('.six_three_con').html('--');//其他贷款发生过90天以上逾期的账户数
                        $('.seven_one_con').html('--');//其他贷款为他人担保笔数
                        $('.seven_two_con').html('--');//其他贷款发生过逾期的账户数
                    }
                    // 公共记录概要表
                    var _publiCrecordSummary = _data.report.publicRecord.summary;
                    if (_publiCrecordSummary != null || _publiCrecordSummary != '' || _publiCrecordSummary != undefined) {
                        $('.owe_count').html(nullFn(_publiCrecordSummary.tax));//欠税记录个数
                        $('.civil_count').html(nullFn(_publiCrecordSummary.judgment));//民事判决记录个数
                        $('.coercion_count').html(nullFn(_publiCrecordSummary.enforcement));//强制执行记录个数
                        $('.administrative_count').html(nullFn(_publiCrecordSummary.punishment));//行政处罚记录个数
                        $('.telecom_count').html(nullFn(_publiCrecordSummary.telecom));//电信欠费记录个数
                    } else {
                        $('.owe_count').html('--');//欠税记录个数
                        $('.civil_count').html('--');//民事判决记录个数
                        $('.coercion_count').html('--');//强制执行记录个数
                        $('.administrative_count').html('--');//行政处罚记录个数
                        $('.telecom_count').html('--');//电信欠费记录个数
                    }
                    // 查询记录概要表
                    var _queryRecordSummary = _data.report.queryRecord.summary;
                    if (_queryRecordSummary != null || _queryRecordSummary != '' || _queryRecordSummary != undefined) {
                        $('.mechanism_count').html(nullFn(_queryRecordSummary.organization));//最近2年被机构查询次数
                        $('.individual_count').html(nullFn(_queryRecordSummary.individual));//最近2年个人查询次数
                    } else {
                        $('.mechanism_count').html('--');//最近2年被机构查询次数
                        $('.individual_count').html('--');//最近2年个人查询次数
                    }
                    // 查询记录说明表
                    var _queryRecordDetail = _data.report.queryRecord.detail;
                    if (_queryRecordDetail != null || _queryRecordDetail != '' || _queryRecordDetail != undefined) {
                        //机构查询
                        var _organization = _queryRecordDetail.organization;
                        if (_organization) {
                            var organList = $.map(_organization, function (o, i) {
                                return '<tr>' +
                                    '                <td>' + (i + 1) + '</td>' +
                                    '                <td>' + o.reason + '</td>' +
                                    '                <td>' + o.operator + '</td>' +
                                    '                <td>' + o.date + '</td>' +
                                    '            </tr>';
                            }).join('');
                            $('.jigou_con').html('').append(organList);
                            $('.agency_query_null').hide();
                        } else {
                            $('.agency_query_box .table').hide();
                            $('.agency_query_null').show().html('机构查询暂无信息');
                        }
                        //个人查询
                        var _individual = _queryRecordDetail.individual;
                        if (_individual.length > 0) {
                            var personList = $.map(_individual, function (o, i) {
                                return '<tr>' +
                                    '                <td>' + (i + 1) + '</td>' +
                                    '                <td>' + o.reason + '</td>' +
                                    '                <td>' + o.operator + '</td>' +
                                    '                <td>' + o.date + '</td>' +
                                    '            </tr>';
                            }).join('');
                            $('.person_con').html('').append(personList);
                            $('.individual_query_null').hide();
                        } else {
                            $('.individual_query_box .table').hide();
                            $('.individual_query_null').show().html('个人查询暂无信息');
                        }
                    } else {
                        ('.agency_query_box .table').hide();
                        $('.agency_query_null').show().html('机构查询暂无信息');
                        $('.individual_query_box .table').hide();
                        $('.individual_query_null').show().html('个人查询暂无信息');
                    }
                    // 风险报告表
                    var _pbocReportRiskVO = _data.report_risk;
                    if (_pbocReportRiskVO != null || _pbocReportRiskVO != '' || _pbocReportRiskVO != undefined) {
                        //报告信息
                        var _reportinfo = _pbocReportRiskVO.reportinfo;
                        if (_reportinfo) {
                            $('.risk_report_time').html(nullFn(timeFormat(_reportinfo.reporttime)));//报告时间
                            $('.risk_report_num').html(nullFn(_reportinfo.reporttime));//报告编号
                            $('.risk_chaxun_time').html(nullFn(timeFormat(_reportinfo.querytime)));//查询时间
                        } else {
                            $('.risk_report_time').html('--');//报告时间
                            $('.risk_report_num').html('--');//报告编号
                            $('.risk_chaxun_time').html('--');//查询时间
                        }
                        //个人信息
                        var _personalinfo = _pbocReportRiskVO.personalinfo;
                        if (_personalinfo) {
                            $('.risk_name').html(nullFn(_personalinfo.name));//姓名
                            $('.risk_card_type').html(nullFn(_personalinfo.IDtype));//证件类型
                            $('.risk_card_num').html(nullFn(_personalinfo.IDnumber));//证件号
                            $('.risk_marriage_status').html(nullFn(_personalinfo.marital));//婚姻状态
                        } else {
                            $('.risk_name').html('--');//姓名
                            $('.risk_card_type').html('--');//证件类型
                            $('.risk_card_num').html('--');//证件号
                            $('.risk_marriage_status').html('--');//婚姻状态
                        }
                        //逾期信息
                        var _overdues = _pbocReportRiskVO.overdues;
                        if (_overdues) {
                            $('.credit_delinquent_num').html(nullFn(_overdues.creditOrgCounts));//信用卡当前逾期卡所属机构数
                            $('.credit_delinquent_200').html(nullFn(_overdues.creditOrgCounts200));//信用卡当前逾期卡所属机构数(逾期金额>200元/卡)
                            $('.overdue_total_amount').html(nullFn(_overdues.creditAmts));//信用卡当前逾期总金额
                            $('.overdue_amount_200').html(nullFn(_overdues.creditAmts200));//信用卡当前逾期总金额(逾期金额>200元/卡)
                            $('.credit_creditCountsM60').html(nullFn(_overdues.creditCountsM60));//信用卡近60个月逾期次数
                            $('.credit_creditCountsM60D90').html(nullFn(_overdues.creditCountsM60D90));//信用卡近60个月逾期90天以上次数
                            $('.overdues_loanCounts').html(nullFn(_overdues.loanCounts));//贷款当前逾期笔数
                            $('.overdues_loanAmts').html(nullFn(_overdues.loanAmts));//贷款当前逾期总金额
                            $('.overdues_loanCountsM60').html(nullFn(_overdues.loanCountsM60));//贷款近60个月逾期次数
                            $('.overdues_loanCountsM60D90').html(nullFn(_overdues.loanCountsM60D90));//贷款近60个月逾期90天以上逾期次数
                            $('.overdues_countsM60').html(nullFn(_overdues.countsM60));//汇总近60个月逾期次数
                            $('.overdues_countsM60D90').html(nullFn(_overdues.countsM60D90));//汇总近60个月逾期90天以上次数
                        } else {
                            $('.credit_delinquent_num').html('--');//信用卡当前逾期卡所属机构数
                            $('.credit_delinquent_200').html('--');//信用卡当前逾期卡所属机构数(逾期金额>200元/卡)
                            $('.overdue_total_amount').html('--');//信用卡当前逾期总金额
                            $('.overdue_amount_200').html('--');//信用卡当前逾期总金额(逾期金额>200元/卡)
                            $('.credit_creditCountsM60').html('--');//信用卡近60个月逾期次数
                            $('.credit_creditCountsM60D90').html('--');//信用卡近60个月逾期90天以上次数
                            $('.overdues_loanCounts').html('--');//贷款当前逾期笔数
                            $('.overdues_loanAmts').html('--');//贷款当前逾期总金额
                            $('.overdues_loanCountsM60').html('--');//贷款近60个月逾期次数
                            $('.overdues_loanCountsM60D90').html('--');//贷款近60个月逾期90天以上逾期次数
                            $('.overdues_countsM60').html('--');//汇总近60个月逾期次数
                            $('.overdues_countsM60D90').html('--');//汇总近60个月逾期90天以上次数
                        }
                        //负债情况
                        var _debts = _pbocReportRiskVO.debts;
                        if (_debts) {
                            $('.debts_creditLimitMax').html(nullFn(_debts.creditLimitMax));//信用卡单卡最大信用额度
                            $('.debts_creditLimitTotal').html(nullFn(_debts.creditLimitTotal));//信用卡总信用额度
                            $('.debts_creditOrgCounts').html(nullFn(_debts.creditOrgCounts));//信用卡机构总数-排除销户和准贷记卡
                            $('.debts_creditLimitUsed').html(nullFn(_debts.creditLimitUsed));//信用卡当前已使用信用额度合计
                            $('.debts_creditLimitUseRate').html(nullFn(_debts.creditLimitUseRate));//信用卡当前总信用额度使用率
                            $('.debts_loanAmts').html(nullFn(_debts.loanAmts));//所有贷款总额(含已结清)
                            $('.debts_loanAmtsNoSettle').html(nullFn(_debts.loanAmtsNoSettle));//未结清贷款发放总额
                            $('.debts_loanCounts').html(nullFn(_debts.loanCounts));//所有贷款总笔数(含已结清)
                            $('.debts_loanBalances').html(nullFn(_debts.loanBalances));//贷款总余额
                            $('.debts_loanBalanceCounts').html(nullFn(_debts.loanBalanceCounts));//未结清贷款总笔数
                            $('.debts_loanBalancesMortgage').html(nullFn(_debts.loanBalancesMortgage));//房贷总余额
                            $('.debts_loanBalancesCar').html(nullFn(_debts.loanBalancesCar));//车贷总余额
                            $('.debts_loanBalancesBiz').html(nullFn(_debts.loanBalancesBiz));//经营贷总余额
                            $('.debts_loanBalancesOther').html(nullFn(_debts.loanBalancesOther));//其他贷总余额
                            $('.debts_loanBalancesMonth').html(nullFn(_debts.loanBalancesMonth));//月还贷款总额
                            $('.debts_loanBalancesMortgageMonth').html(nullFn(_debts.loanBalancesMortgageMonth));//月还房贷金额
                            $('.debts_loanBalancesCarMonth').html(nullFn(_debts.loanBalancesCarMonth));//月还车贷
                            $('.debts_loanBalancesBizMonth').html(nullFn(_debts.loanBalancesBizMonth));//月还经营贷
                            $('.debts_loanBalancesOtherMonth').html(nullFn(_debts.loanBalancesOtherMonth));//月还其他贷总余额
                            //贷款余额详列
                            var _loanBalanceInfos = _debts.loanBalanceInfos;
                            if (_loanBalanceInfos.length > 0) {
                                var _loanInfos = $.map(_loanBalanceInfos, function (o, i) {
                                    return '<tr>' +
                                        '                <td>' + (i + 1) + '</td>' +
                                        '                <td>' + o.org + '</td>' +
                                        '                <td>' + o.amts + '</td>' +
                                        '                <td>' + o.balances + '</td>' +
                                        '                <td>' + o.debtMonths + '</td>' +
                                        '            </tr>';
                                })
                                $('.debts_balance_con').html('').append(_loanInfos);
                            } else {
                                $('.debts_balance_info .table').hide();
                                $('.debts_balance_null').show().html('贷款余额详列暂无信息');
                            }
                        } else {
                            $('.debts_creditLimitMax').html('--');//信用卡单卡最大信用额度
                            $('.debts_creditLimitTotal').html('--');//信用卡总信用额度
                            $('.debts_creditOrgCounts').html('--');//信用卡机构总数-排除销户和准贷记卡
                            $('.debts_creditLimitUsed').html('--');//信用卡当前已使用信用额度合计
                            $('.debts_creditLimitUseRate').html('--');//信用卡当前总信用额度使用率
                            $('.debts_loanAmts').html('--');//所有贷款总额(含已结清)
                            $('.debts_loanAmtsNoSettle').html('--');//未结清贷款发放总额
                            $('.debts_loanCounts').html('--');//所有贷款总笔数(含已结清)
                            $('.debts_loanBalances').html('--');//贷款总余额
                            $('.debts_loanBalanceCounts').html('--');//未结清贷款总笔数
                            $('.debts_loanBalancesMortgage').html('--');//房贷总余额
                            $('.debts_loanBalancesCar').html('--');//车贷总余额
                            $('.debts_loanBalancesBiz').html('--');//经营贷总余额
                            $('.debts_loanBalancesOther').html('--');//其他贷总余额
                            $('.debts_loanBalancesMonth').html('--');//月还贷款总额
                            $('.debts_loanBalancesMortgageMonth').html('--');//月还房贷金额
                            $('.debts_loanBalancesCarMonth').html('--');//月还车贷
                            $('.debts_loanBalancesBizMonth').html('--');//月还经营贷
                            $('.debts_loanBalancesOtherMonth').html('--');//月还其他贷总余额
                            $('.debts_balance_info .table').hide();
                            $('.debts_balance_null').show().html('贷款余额详列暂无信息');
                        }
                        //信贷历史
                        var _creditLoanHis = _pbocReportRiskVO.creditLoanHis;
                        if (_creditLoanHis) {
                            $('.creditLoanHis_creditMOB').html(nullFn(_creditLoanHis.creditMOB));//信用卡最大账龄
                            $('.creditLoanHis_loanMOB').html(nullFn(_creditLoanHis.loanMOB));//贷款最大账龄
                        } else {
                            $('.creditLoanHis_creditMOB').html('--');//信用卡最大账龄
                            $('.creditLoanHis_loanMOB').html('--');//贷款最大账龄
                        }
                        //近期信用需求
                        var _creditLoanNeeds = _pbocReportRiskVO.creditLoanNeeds;
                        if (_creditLoanNeeds) {
                            $('.creditLoanNeeds_creditOrgCountsM3').html(nullFn(_creditLoanNeeds.creditOrgCountsM3));//近3个月信用卡发卡机构数
                            $('.creditLoanNeeds_creditLimitTotalM3').html(nullFn(_creditLoanNeeds.creditLimitTotalM3));//近3个月内新增信用卡信用总额度
                            $('.creditLoanNeeds_loanCountsM3').html(nullFn(_creditLoanNeeds.loanCountsM3));//近3个月内新核发贷款笔数
                            $('.creditLoanNeeds_loanAmtsM3').html(nullFn(_creditLoanNeeds.loanAmtsM3));//近3个月内新核发贷款总金额
                            $('.creditLoanNeeds_loanQueriesM3').html(nullFn(_creditLoanNeeds.loanQueriesM3));//近3个月内“贷款审批”查询次数
                            $('.creditLoanNeeds_selfQueriesM3').html(nullFn(_creditLoanNeeds.selfQueriesM3));//近3个月内“本人查询”次数
                        } else {
                            $('.creditLoanNeeds_creditOrgCountsM3').html('--');//近3个月信用卡发卡机构数
                            $('.creditLoanNeeds_creditLimitTotalM3').html('--');//近3个月内新增信用卡信用总额度
                            $('.creditLoanNeeds_loanCountsM3').html('--');//近3个月内新核发贷款笔数
                            $('.creditLoanNeeds_loanAmtsM3').html('--');//近3个月内新核发贷款总金额
                            $('.creditLoanNeeds_loanQueriesM3').html('--');//近3个月内“贷款审批”查询次数
                            $('.creditLoanNeeds_selfQueriesM3').html('--');//近3个月内“本人查询”次数
                        }
                        //其他信息
                        var _others = _pbocReportRiskVO.others;
                        if (_others) {
                            $('.others_guarantees').html(nullFn(_others.guarantees));//当前为他人担保笔数
                            $('.others_guaranteeAmts').html(nullFn(_others.guaranteeAmts));//当前为他人担保金额
                            $('.others_month6TaxAmts').html(nullFn(_others.month6TaxAmts));//近6个月内欠税总额
                        } else {
                            $('.others_guarantees').html('--');//当前为他人担保笔数
                            $('.others_guaranteeAmts').html('--');//当前为他人担保金额
                            $('.others_month6TaxAmts').html('--');//近6个月内欠税总额
                        }
                    } else {
                        $('.risk_report_time').html('--');//报告时间
                        $('.risk_report_num').html('--');//报告编号
                        $('.risk_chaxun_time').html('--');//查询时间
                        $('.risk_name').html('--');//姓名
                        $('.risk_card_type').html('--');//证件类型
                        $('.risk_card_num').html('--');//证件号
                        $('.risk_marriage_status').html('--');//婚姻状态
                        $('.credit_delinquent_num').html('--');//信用卡当前逾期卡所属机构数
                        $('.credit_delinquent_200').html('--');//信用卡当前逾期卡所属机构数(逾期金额>200元/卡)
                        $('.overdue_total_amount').html('--');//信用卡当前逾期总金额
                        $('.overdue_amount_200').html('--');//信用卡当前逾期总金额(逾期金额>200元/卡)
                        $('.credit_creditCountsM60').html('--');//信用卡近60个月逾期次数
                        $('.credit_creditCountsM60D90').html('--');//信用卡近60个月逾期90天以上次数
                        $('.overdues_loanCounts').html('--');//贷款当前逾期笔数
                        $('.overdues_loanAmts').html('--');//贷款当前逾期总金额
                        $('.overdues_loanCountsM60').html('--');//贷款近60个月逾期次数
                        $('.overdues_loanCountsM60D90').html('--');//贷款近60个月逾期90天以上逾期次数
                        $('.overdues_countsM60').html('--');//汇总近60个月逾期次数
                        $('.overdues_countsM60D90').html('--');//汇总近60个月逾期90天以上次数
                        $('.debts_creditLimitMax').html('--');//信用卡单卡最大信用额度
                        $('.debts_creditLimitTotal').html('--');//信用卡总信用额度
                        $('.debts_creditOrgCounts').html('--');//信用卡机构总数-排除销户和准贷记卡
                        $('.debts_creditLimitUsed').html('--');//信用卡当前已使用信用额度合计
                        $('.debts_creditLimitUseRate').html('--');//信用卡当前总信用额度使用率
                        $('.debts_loanAmts').html('--');//所有贷款总额(含已结清)
                        $('.debts_loanAmtsNoSettle').html('--');//未结清贷款发放总额
                        $('.debts_loanCounts').html('--');//所有贷款总笔数(含已结清)
                        $('.debts_loanBalances').html('--');//贷款总余额
                        $('.debts_loanBalanceCounts').html('--');//未结清贷款总笔数
                        $('.debts_loanBalancesMortgage').html('--');//房贷总余额
                        $('.debts_loanBalancesCar').html('--');//车贷总余额
                        $('.debts_loanBalancesBiz').html('--');//经营贷总余额
                        $('.debts_loanBalancesOther').html('--');//其他贷总余额
                        $('.debts_loanBalancesMonth').html('--');//月还贷款总额
                        $('.debts_loanBalancesMortgageMonth').html('--');//月还房贷金额
                        $('.debts_loanBalancesCarMonth').html('--');//月还车贷
                        $('.debts_loanBalancesBizMonth').html('--');//月还经营贷
                        $('.debts_loanBalancesOtherMonth').html('--');//月还其他贷总余额
                        $('.debts_balance_info .table').hide();
                        $('.debts_balance_null').show().html('贷款余额详列暂无信息');
                        $('.creditLoanHis_creditMOB').html('--');//信用卡最大账龄
                        $('.creditLoanHis_loanMOB').html('--');//贷款最大账龄
                        $('.creditLoanNeeds_creditOrgCountsM3').html('--');//近3个月信用卡发卡机构数
                        $('.creditLoanNeeds_creditLimitTotalM3').html('--');//近3个月内新增信用卡信用总额度
                        $('.creditLoanNeeds_loanCountsM3').html('--');//近3个月内新核发贷款笔数
                        $('.creditLoanNeeds_loanAmtsM3').html('--');//近3个月内新核发贷款总金额
                        $('.creditLoanNeeds_loanQueriesM3').html('--');//近3个月内“贷款审批”查询次数
                        $('.creditLoanNeeds_selfQueriesM3').html('--');//近3个月内“本人查询”次数
                        $('.others_guarantees').html('--');//当前为他人担保笔数
                        $('.others_guaranteeAmts').html('--');//当前为他人担保金额
                        $('.others_month6TaxAmts').html('--');//近6个月内欠税总额
                    }
                    // 结构化报告表
                    var _pbocReportStructureVO = _data.report_structure;
                    if (_pbocReportStructureVO != null || _pbocReportStructureVO != '' || _pbocReportStructureVO != undefined) {
                        //基本信息
                        var _basic = _pbocReportStructureVO.basic;
                        if (_basic) {
                            $('.basic_idname').html(nullFn(_basic.idname));//姓名
                            $('.basic_idtype').html(nullFn(_basic.idtype));//证件类型
                            $('.basic_idno').html(nullFn(_basic.idno));//证件号
                            $('.basic_marital').html(nullFn(_basic.marital));//婚姻状态
                            $('.basic_operatorId').html(nullFn(_basic.operatorId));//操作人员ID
                            $('.basic_reportSn').html(nullFn(_basic.reportSn));//人行报告编号
                            $('.basic_queryTime').html(nullFn(timeFormat(_basic.queryTime)));//查询时间
                            $('.basic_reportTime').html(nullFn(timeFormat(_basic.reportTime)));//报告时间
                            $('.basic_assetFlag').html(nullFn(assetFlagFn(_basic.assetFlag)));//资产处置信息*
                            $('.basic_compensateFlag').html(nullFn(assetFlagFn(_basic.compensateFlag)));//保证人代偿信息*
                            $('.basic_creditFlag').html(nullFn(assetFlagFn(_basic.creditFlag)));//信用卡信息*
                            $('.basic_loanFlag').html(nullFn(assetFlagFn(_basic.loanFlag)));//贷款信息*
                            $('.basic_guaranteeFlag').html(nullFn(assetFlagFn(_basic.guaranteeFlag)));//为他人担保信息*
                            $('.basic_taxFlag').html(nullFn(assetFlagFn(_basic.taxFlag)));//欠税记录*
                            $('.basic_judgmentFlag').html(nullFn(assetFlagFn(_basic.judgmentFlag)));//民事判决记录*
                            $('.basic_enforcementFlag').html(nullFn(assetFlagFn(_basic.enforcementFlag)));//强制执行记录*
                            $('.basic_punishmentFlag').html(nullFn(assetFlagFn(_basic.punishmentFlag)));//行政处罚记录*
                            $('.basic_telecomFlag').html(nullFn(assetFlagFn(_basic.telecomFlag)));//电信欠费信息*
                            $('.basic_checks').html(nullFn(checksFn(_basic.checks)));//身份信息核对结果*
                            $('.basic_isfail').html(nullFn(isfailFn(_basic.isfail)));//是否失败*
                        } else {
                            $('.basic_idname').html('--');//姓名
                            $('.basic_idtype').html('--');//证件类型
                            $('.basic_idno').html('--');//证件号
                            $('.basic_marital').html('--');//婚姻状态
                            $('.basic_operatorId').html('--');//操作人员ID
                            $('.basic_reportSn').html('--');//人行报告编号
                            $('.basic_queryTime').html('--');//查询时间
                            $('.basic_reportTime').html('--');//报告时间
                            $('.basic_assetFlag').html('--');//资产处置信息*
                            $('.basic_compensateFlag').html('--');//保证人代偿信息*
                            $('.basic_creditFlag').html('--');//信用卡信息*
                            $('.basic_loanFlag').html('--');//贷款信息*
                            $('.basic_guaranteeFlag').html('--');//为他人担保信息*
                            $('.basic_taxFlag').html('--');//欠税记录*
                            $('.basic_judgmentFlag').html('--');//民事判决记录*
                            $('.basic_enforcementFlag').html('--');//强制执行记录*
                            $('.basic_punishmentFlag').html('--');//行政处罚记录*
                            $('.basic_telecomFlag').html('--');//电信欠费信息*
                            $('.basic_checks').html('--');//身份信息核对结果*
                            $('.basic_isfail').html('--');//是否失败*
                        }
                        //资产情况
                        var _general = _pbocReportStructureVO.general;
                        if (_general) {
                            $('.general_assetTotal').html(nullFn(_general.assetTotal));//资产处置信息笔数
                            $('.general_compensateTotal').html(nullFn(_general.compensateTotal));//保证人代偿笔数
                            $('.general_creditTotal').html(nullFn(_general.creditTotal));//信用卡账户总数
                            $('.general_creditActive').html(nullFn(_general.creditActive));//信用卡未结清/未销户账户数
                            $('.general_creditOverdue').html(nullFn(_general.creditOverdue));//信用卡发生过逾期账户数
                            $('.general_creditOverdue90').html(nullFn(_general.creditOverdue90));//信用卡90天以上逾期账户数
                            $('.general_creditGuarantee').html(nullFn(_general.creditGuarantee));//信用卡为他人担保数
                            $('.general_mortgageTotal').html(nullFn(_general.mortgageTotal));//住房贷款账户数
                            $('.general_mortgageActive').html(nullFn(_general.mortgageActive));//住房贷款未结清/未销户账户数
                            $('.general_mortgageOverdue').html(nullFn(_general.mortgageOverdue));//住房贷款发生过逾期账户数
                            $('.general_mortgageOverdue90').html(nullFn(_general.mortgageOverdue90));//住房贷款90天以上逾期账户数
                            $('.general_mortgageGuarantee').html(nullFn(_general.mortgageGuarantee));//住房贷款为他人担保数
                            $('.general_otherloanTotal').html(nullFn(_general.otherloanTotal));//其他贷款账户数
                            $('.general_otherloanActive').html(nullFn(_general.otherloanActive));//其他贷款未结清/未销户账户数
                            $('.general_otherloanOverdue').html(nullFn(_general.otherloanOverdue));//其他贷款发生过逾期账户数
                            $('.general_otherloanOverdue90').html(nullFn(_general.otherloanOverdue90));//其他贷款90天以上逾期账户数
                            $('.general_otherloanGuarantee').html(nullFn(_general.otherloanGuarantee));//其他贷款为他人担保数
                        } else {
                            $('.general_assetTotal').html('--');//资产处置信息笔数
                            $('.general_compensateTotal').html('--');//保证人代偿笔数
                            $('.general_creditTotal').html('--');//信用卡账户总数
                            $('.general_creditActive').html('--');//信用卡未结清/未销户账户数
                            $('.general_creditOverdue').html('--');//信用卡发生过逾期账户数
                            $('.general_creditOverdue90').html('--');//信用卡90天以上逾期账户数
                            $('.general_creditGuarantee').html('--');//信用卡为他人担保数
                            $('.general_mortgageTotal').html('--');//住房贷款账户数
                            $('.general_mortgageActive').html('--');//住房贷款未结清/未销户账户数
                            $('.general_mortgageOverdue').html('--');//住房贷款发生过逾期账户数
                            $('.general_mortgageOverdue90').html('--');//住房贷款90天以上逾期账户数
                            $('.general_mortgageGuarantee').html('--');//住房贷款为他人担保数
                            $('.general_otherloanTotal').html('--');//其他贷款账户数
                            $('.general_otherloanActive').html('--');//其他贷款未结清/未销户账户数
                            $('.general_otherloanOverdue').html('--');//其他贷款发生过逾期账户数
                            $('.general_otherloanOverdue90').html('--');//其他贷款90天以上逾期账户数
                            $('.general_otherloanGuarantee').html('--');//其他贷款为他人担保数
                        }
                        //资产处置信息列表
                        var _assets = _pbocReportStructureVO.assets;
                        if (_assets.length > 0) {
                            var _assetsInfos = $.map(_assets, function (o, i) {
                                return '<tr>' +
                                    '                <td>' + (i + 1) + '</td>' +
                                    '                <td>' + nullFn(o.original) + '</td>' +
                                    '                <td>' + nullFn(o.company) + '</td>' +
                                    '                <td>' + nullFn(timeFormat(o.debtDate)) + '</td>' +
                                    '                <td>' + nullFn(o.debtAmount) + '</td>' +
                                    '                <td>' + nullFn(timeFormat(o.lastRepayment)) + '</td>' +
                                    '                <td>' + nullFn(o.balance) + '</td>' +
                                    '                <td>' + nullFn(isfailFn(o.isfail)) + '</td>' +
                                    '            </tr>';
                            }).join('');
                            $('.assets_con').html('').append(_assetsInfos);
                        } else {
                            $('.assets_box .table').hide();
                            $('.assets_null').show().html('资产处置信息列表暂无信息');
                        }
                        //保证人代偿信息列表
                        var _compensates = _pbocReportStructureVO.compensates;
                        if (_compensates.length > 0) {
                            var _compensateInfos = $.map(_compensates, function (o, i) {
                                return '<tr>' +
                                    '                <td>' + (i + 1) + '</td>' +
                                    '                <td>' + nullFn(o.original) + '</td>' +
                                    '                <td>' + nullFn(o.organization) + '</td>' +
                                    '                <td>' + nullFn(timeFormat(o.lastCompensate)) + '</td>' +
                                    '                <td>' + nullFn(o.sumRepayment) + '</td>' +
                                    '                <td>' + nullFn(timeFormat(o.lastRepayment)) + '</td>' +
                                    '                <td>' + nullFn(o.balance) + '</td>' +
                                    '                <td>' + nullFn(isfailFn(o.isfail)) + '</td>' +
                                    '            </tr>';
                            }).join('');
                            $('.compensates_con').html('').append(_compensateInfos);
                        } else {
                            $('.compensates_box .table').hide();
                            $('.compensates_null').show().html('保证人代偿信息列表暂无信息');
                        }
                        //为他人担保信息列表
                        var _guarantees = _pbocReportStructureVO.guarantees;
                        if (_guarantees.length > 0) {
                            var _guaranteesInfos = $.map(_guarantees, function (o, i) {
                                return '<tr>' +
                                    '                <td>' + (i + 1) + '</td>' +
                                    '                <td>' + nullFn(o.original) + '</td>' +
                                    '                <td>' + nullFn(timeFormat(o.guaranteeTime)) + '</td>' +
                                    '                <td>' + nullFn(o.guaranteeIdtype) + '</td>' +
                                    '                <td>' + nullFn(o.guaranteeIdname) + '</td>' +
                                    '                <td>' + nullFn(o.guaranteeIdno) + '</td>' +
                                    '                <td>' + nullFn(o.organization) + '</td>' +
                                    '                <td>' + nullFn(o.contractAmount) + '</td>' +
                                    '                <td>' + nullFn(o.guaranteeAmount) + '</td>' +
                                    '                <td>' + nullFn(o.principaAmount) + '</td>' +
                                    '                <td>' + nullFn(timeFormat(o.recordTime)) + '</td>' +
                                    '                <td>' + nullFn(isfailFn(o.isfail)) + '</td>' +
                                    '            </tr>';
                            }).join('');
                            $('.guarantees_con').html('').append(_guaranteesInfos);
                        } else {
                            $('.guarantees_box .table').hide();
                            $('.guarantees_null').show().html('为他人担保信息列表暂无信息');
                        }
                        //信用卡列表
                        var _jigou_credits = _pbocReportStructureVO.credits;
                        if (_jigou_credits.length > 0) {
                            var jigou_creditsInfos = $.map(_jigou_credits, function (o, i) {
                                return '<tr>' +
                                    '                <td>' + (i + 1) + '</td>' +
                                    '                <td>' + nullFn(o.original) + '</td>' +
                                    '                <td>' + nullFn(o.creditStatus) + '</td>' +
                                    '                <td>' + nullFn(o.cardType) + '</td>' +
                                    '                <td>' + nullFn(o.accountStatus) + '</td>' +
                                    '                <td>' + nullFn(o.issueBank) + '</td>' +
                                    '                <td>' + nullFn(timeFormat(o.issueTime)) + '</td>' +
                                    '                <td>' + nullFn(o.creditUsed) + '</td>' +
                                    '                <td>' + nullFn(o.overAmount) + '</td>' +
                                    '                <td>' + nullFn(o.declaration) + '</td>' +
                                    '                <td>' + nullFn(isfailFn(o.isfail)) + '</td>' +
                                    '                <td>' + nullFn(o.overMonth) + '</td>' +
                                    '                <td>' + nullFn(o.overMonth90days) + '</td>' +
                                    '            </tr>';
                            }).join('');
                            $('.jiegou_credits_con').html('').append(jigou_creditsInfos);
                        } else {
                            $('.jiegou_credits_box .table').hide();
                            $('.jiegou_credits_null').show().html('信用卡列表暂无信息');
                        }
                        //贷款列表
                        var structured_loans = _pbocReportStructureVO.loans;
                        if (structured_loans.length > 0) {
                            var structured_loansInfos = $.map(structured_loans, function (o, i) {
                                return '<tr>' +
                                    '                <td>' + (i + 1) + '</td>' +
                                    '                <td>' + nullFn(o.original) + '</td>' +
                                    '                <td>' + nullFn(o.creditStatus) + '</td>' +
                                    '                <td>' + nullFn(o.accountStatus) + '</td>' +
                                    '                <td>' + nullFn(o.loanBank) + '</td>' +
                                    '                <td>' + nullFn(o.loanType) + '</td>' +
                                    '                <td>' + nullFn(timeFormat8(o.loanTime)) + '</td>' +
                                    '                <td>' + nullFn(o.loanAmount) + '</td>' +
                                    '                <td>' + nullFn(o.loanBalance) + '</td>' +
                                    '                <td>' + nullFn(timeFormat8(o.loanDeadline)) + '</td>' +
                                    '                <td>' + nullFn(timeFormat8(o.recordOrCancellation)) + '</td>' +
                                    '                <td>' + nullFn(o.overAmount) + '</td>' +//逾期金额
                                    '                <td>' + nullFn(o.overMonth) + '</td>' +
                                    '                <td>' + nullFn(o.overMonth90days) + '</td>' +
                                    '            </tr>';
                            }).join('');
                            $('.structured_loans_con').html('').append(structured_loansInfos);
                        } else {
                            $('.structured_loans_box .table').hide();
                            $('.structured_loans_null').show().html('贷款列表暂无信息');
                        }
                        //欠税记录列表
                        var structured_taxs = _pbocReportStructureVO.taxs;
                        if (structured_taxs.length > 0) {
                            var structured_taxsInfos = $.map(structured_taxs, function (o, i) {
                                return '<tr>' +
                                    '                <td>' + (i + 1) + '</td>' +
                                    '                <td>' + nullFn(o.original.amount) + ';' + nullFn(o.original.idNo) + ';' + nullFn(o.original.government) + ';' + nullFn(o.original.recordTime) + ';' + '</td>' +
                                    '                <td>' + nullFn(o.government) + '</td>' +
                                    '                <td>' + nullFn(timeFormat(o.recordTime)) + '</td>' +
                                    '                <td>' + nullFn(o.amount) + '</td>' +
                                    '                <td>' + nullFn(o.idNo) + '</td>' +
                                    '                <td>' + nullFn(isfailFn(o.isfail)) + '</td>' +
                                    '            </tr>';
                            })
                            $('.structured_taxs_con').html('').append(structured_taxsInfos);
                        } else {
                            $('.structured_taxs_box .table').hide();
                            $('.structured_taxs_null').show().html('欠税记录列表暂无信息');
                        }
                        //民事判决记录列表
                        var structured_judgments = _pbocReportStructureVO.judgments;
                        if (structured_judgments.length > 0) {
                            var structured_judgmentsInfos = $.map(structured_judgments, function (o, i) {
                                return '<tr>' +
                                    '                <td>' + (i + 1) + '</td>' +
                                    '                <td>' + nullFn(o.original) + '</td>' +
                                    '                <td>' + nullFn(o.court) + '</td>' +
                                    '                <td>' + nullFn(o.docketNo) + '</td>' +
                                    '                <td>' + nullFn(o.docketCause) + '</td>' +
                                    '                <td>' + nullFn(o.filingWay) + '</td>' +
                                    '                <td>' + nullFn(o.filingTime) + '</td>' +
                                    '                <td>' + nullFn(o.filingResult) + '</td>' +
                                    '                <td>' + nullFn(o.filingEffective) + '</td>' +
                                    '                <td>' + nullFn(o.litigationSubject) + '</td>' +
                                    '                <td>' + nullFn(o.litigationAmount) + '</td>' +
                                    '                <td>' + nullFn(isfailFn(o.isfail)) + '</td>' +
                                    '            </tr>';
                            })
                            $('.structured_judgments_con').html('').append(structured_judgmentsInfos);
                        } else {
                            $('.structured_judgments_box .table').hide();
                            $('.structured_judgments_null').show().html('民事判决记录列表暂无信息');
                        }
                        //强制执行记录表
                        var structured_enforcements = _pbocReportStructureVO.enforcements;
                        if (structured_enforcements.length > 0) {
                            var structured_enforcementsInfos = $.map(structured_enforcements, function (o, i) {
                                return '<tr>' +
                                    '                <td>' + (i + 1) + '</td>' +
                                    '                <td>' + nullFn(o.original.applyEnforceAmount) + ';' + nullFn(o.original.applyEnforceSubject) + ';' + nullFn(o.original.court) + ';' + nullFn(o.original.filingTime) + ';' + nullFn(o.original.executedEnforceAmount) + ';' + nullFn(o.original.closedTime) + ';' + nullFn(o.original.docketNo) + ';' + nullFn(o.original.docketCause) + ';' + nullFn(o.original.filingWay) + ';' + nullFn(o.original.executedEnforceSubject) + ';' + nullFn(o.original.docketStatus) + ';' + '</td>' +
                                    '                <td>' + nullFn(o.court) + '</td>' +
                                    '                <td>' + nullFn(o.docketNo) + '</td>' +
                                    '                <td>' + nullFn(o.docketCause) + '</td>' +
                                    '                <td>' + nullFn(o.filingWay) + '</td>' +
                                    '                <td>' + nullFn(timeFormat(o.filingTime)) + '</td>' +
                                    '                <td>' + nullFn(o.docketStatus) + '</td>' +
                                    '                <td>' + nullFn(o.applyEnforceSubject) + '</td>' +
                                    '                <td>' + nullFn(o.executedEnforceSubject) + '</td>' +
                                    '                <td>' + nullFn(o.applyEnforeAmount) + '</td>' +
                                    '                <td>' + nullFn(o.executedEnforceAmount) + '</td>' +
                                    '                <td>' + nullFn(timeFormat(o.closedTime)) + '</td>' +
                                    '                <td>' + nullFn(isfailFn(o.isfail)) + '</td>' +
                                    '            </tr>';
                            })
                            $('.structured_enforcements_con').html('').append(structured_enforcementsInfos);
                        } else {
                            $('.structured_enforcements_box .table').hide();
                            $('.structured_enforcements_null').show().html('强制执行记录表暂无信息');
                        }
                        //行政处罚记录表
                        var structured_punishments = _pbocReportStructureVO.punishments;
                        if (structured_punishments.length > 0) {
                            var structured_punishmentsInfos = $.map(structured_punishments, function (o, i) {
                                return '<tr>' +
                                    '                <td>' + (i + 1) + '</td>' +
                                    '                <td>' + nullFn(o.original.punishmentDeadline) + ';' + nullFn(o.original.reconsiderationFlag) + ';' + nullFn(o.original.docketNo) + ';' + nullFn(o.original.punishmentEffective) + ';' + nullFn(o.original.reconsideration) + ';' + nullFn(o.original.organization) + ';' + nullFn(o.original.punishmentAmount) + ';' + nullFn(o.original.punishmentContent) + ';' + '</td>' +
                                    '                <td>' + nullFn(o.organization) + '</td>' +
                                    '                <td>' + nullFn(o.docketNo) + '</td>' +
                                    '                <td>' + nullFn(o.reconsiderationFlag) + '</td>' +
                                    '                <td>' + nullFn(o.reconsideration) + '</td>' +
                                    '                <td>' + nullFn(o.punishmentContent) + '</td>' +
                                    '                <td>' + nullFn(o.punishmentAmount) + '</td>' +
                                    '                <td>' + nullFn(timeFormat(o.punishmentEffective)) + '</td>' +
                                    '                <td>' + nullFn(timeFormat(o.punishmentDeadline)) + '</td>' +
                                    '                <td>' + nullFn(isfailFn(o.isfail)) + '</td>' +
                                    '            </tr>';
                            })
                            $('.structured_punishments_con').html('').append(structured_punishmentsInfos);
                        } else {
                            $('.structured_punishments_box .table').hide();
                            $('.structured_punishments_null').show().html('行政处罚记录表暂无信息');
                        }
                        //电信欠费信息表
                        var structured_telecoms = _pbocReportStructureVO.telecoms;
                        if (structured_telecoms.length > 0) {
                            var structured_telecomsInfos = $.map(structured_telecoms, function (o, i) {
                                return '<tr>' +
                                    '                <td>' + (i + 1) + '</td>' +
                                    '                <td>' + nullFn(o.original.amount) + ';' + nullFn(o.original.business) + ';' + nullFn(o.original.businessTime) + ';' + nullFn(o.original.recordTime) + ';' + nullFn(o.original.telco) + ';' + '</td>' +
                                    '                <td>' + nullFn(o.telco) + '</td>' +
                                    '                <td>' + nullFn(o.business) + '</td>' +
                                    '                <td>' + nullFn(timeFormat(o.recordTime)) + '</td>' +
                                    '                <td>' + nullFn(timeFormat(o.businessTime)) + '</td>' +
                                    '                <td>' + nullFn(o.amount) + '</td>' +
                                    '                <td>' + nullFn(isfailFn(o.isfail)) + '</td>' +
                                    '            </tr>';
                            })
                            $('.structured_telecoms_con').html('').append(structured_telecomsInfos);
                        } else {
                            $('.structured_telecoms_box .table').hide();
                            $('.structured_telecoms_null').show().html('电信欠费信息表暂无信息');
                        }
                        //查询记录表
                        var structured_traces = _pbocReportStructureVO.traces;
                        if (structured_traces.length > 0) {
                            var structured_tracesInfos = $.map(structured_traces, function (o, i) {
                                return '<tr>' +
                                    '                <td>' + (i + 1) + '</td>' +
                                    '                <td>' + nullFn(timeFormat(o.queryTime)) + '</td>' +
                                    '                <td>' + nullFn(o.queryOperator) + '</td>' +
                                    '                <td>' + nullFn(o.queryReason) + '</td>' +
                                    '                <td>' + nullFn(isfailFn(o.isfail)) + '</td>' +
                                    '            </tr>';
                            })
                            $('.structured_traces_con').html('').append(structured_tracesInfos);
                        } else {
                            $('.structured_traces_box .table').hide();
                            $('.structured_traces_null').show().html('查询记录表暂无信息');
                        }
                    } else {
                        $('.basic_idname').html('--');//姓名
                        $('.basic_idtype').html('--');//证件类型
                        $('.basic_idno').html('--');//证件号
                        $('.basic_marital').html('--');//婚姻状态
                        $('.basic_operatorId').html('--');//操作人员ID
                        $('.basic_reportSn').html('--');//人行报告编号
                        $('.basic_queryTime').html('--');//查询时间
                        $('.basic_reportTime').html('--');//报告时间
                        $('.basic_assetFlag').html('--');//资产处置信息*
                        $('.basic_compensateFlag').html('--');//保证人代偿信息*
                        $('.basic_creditFlag').html('--');//信用卡信息*
                        $('.basic_loanFlag').html('--');//贷款信息*
                        $('.basic_guaranteeFlag').html('--');//为他人担保信息*
                        $('.basic_taxFlag').html('--');//欠税记录*
                        $('.basic_judgmentFlag').html('--');//民事判决记录*
                        $('.basic_enforcementFlag').html('--');//强制执行记录*
                        $('.basic_punishmentFlag').html('--');//行政处罚记录*
                        $('.basic_telecomFlag').html('--');//电信欠费信息*
                        $('.basic_checks').html('--');//身份信息核对结果*
                        $('.basic_isfail').html('--');//是否失败*
                        $('.general_assetTotal').html('--');//资产处置信息笔数
                        $('.general_compensateTotal').html('--');//保证人代偿笔数
                        $('.general_creditTotal').html('--');//信用卡账户总数
                        $('.general_creditActive').html('--');//信用卡未结清/未销户账户数
                        $('.general_creditOverdue').html('--');//信用卡发生过逾期账户数
                        $('.general_creditOverdue90').html('--');//信用卡90天以上逾期账户数
                        $('.general_creditGuarantee').html('--');//信用卡为他人担保数
                        $('.general_mortgageTotal').html('--');//住房贷款账户数
                        $('.general_mortgageActive').html('--');//住房贷款未结清/未销户账户数
                        $('.general_mortgageOverdue').html('--');//住房贷款发生过逾期账户数
                        $('.general_mortgageOverdue90').html('--');//住房贷款90天以上逾期账户数
                        $('.general_mortgageGuarantee').html('--');//住房贷款为他人担保数
                        $('.general_otherloanTotal').html('--');//其他贷款账户数
                        $('.general_otherloanActive').html('--');//其他贷款未结清/未销户账户数
                        $('.general_otherloanOverdue').html('--');//其他贷款发生过逾期账户数
                        $('.general_otherloanOverdue90').html('--');//其他贷款90天以上逾期账户数
                        $('.general_otherloanGuarantee').html('--');//其他贷款为他人担保数
                        $('.assets_box .table,.compensates_box .table,.guarantees_box .table,.jiegou_credits_box .table,.structured_loans_box .table,.structured_taxs_box .table,.structured_judgments_box .table,.structured_enforcements_box .table,.structured_punishments_box .table,.structured_telecoms_box .table,.structured_traces_box .table').hide();
                        $('.assets_null').show().html('资产处置信息列表暂无信息');
                        $('.compensates_null').show().html('保证人代偿信息列表暂无信息');
                        $('.guarantees_null').show().html('为他人担保信息列表暂无信息');
                        $('.jiegou_credits_null').show().html('信用卡列表暂无信息');
                        $('.structured_loans_null').show().html('贷款列表暂无信息');
                        $('.structured_taxs_null').show().html('欠税记录列表暂无信息');
                        $('.structured_judgments_null').show().html('民事判决记录列表暂无信息');
                        $('.structured_enforcements_null').show().html('强制执行记录表暂无信息');
                        $('.structured_punishments_null').show().html('行政处罚记录表暂无信息');
                        $('.structured_telecoms_null').show().html('电信欠费信息表暂无信息');
                        $('.structured_traces_null').show().html('查询记录表暂无信息');
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
                    $('.first_one_con').html('--');//资产处置信息笔数
                    $('.first_two_con').html('--');//保证人代偿信息笔数
                    $('.second_one_con').html('--');//信用卡账户数
                    $('.second_two_con').html('--');//信用卡未结清/未销户账户数
                    $('.second_three_con').html('--');//信用卡发生过90天以上逾期的账户数
                    $('.third_one_con').html('--');//信用卡为他人担保笔数
                    $('.third_two_con').html('--');//信用卡发生过逾期的账户数
                    $('.fourth_one_con').html('--');//购房贷款账户数
                    $('.fourth_two_con').html('--');//购房贷款未结清/未销户账户数
                    $('.fourth_three_con').html('--');//购房贷款发生过90天以上逾期的账户数
                    $('.fifth_one_con').html('--');//购房贷款为他人担保笔数
                    $('.fifth_two_con').html('--');//购房贷款发生过逾期的账户数
                    $('.six_one_con').html('--');//其他贷款账户数
                    $('.six_two_con').html('--');//其他贷款未结清/未销户账户数
                    $('.six_three_con').html('--');//其他贷款发生过90天以上逾期的账户数
                    $('.seven_one_con').html('--');//其他贷款为他人担保笔数
                    $('.seven_two_con').html('--');//其他贷款发生过逾期的账户数
                    $('.owe_count').html('--');//欠税记录个数
                    $('.civil_count').html('--');//民事判决记录个数
                    $('.coercion_count').html('--');//强制执行记录个数
                    $('.administrative_count').html('--');//行政处罚记录个数
                    $('.telecom_count').html('--');//电信欠费记录个数
                    $('.mechanism_count').html('--');//最近2年被机构查询次数
                    $('.individual_count').html('--');//最近2年个人查询次数
                    $('.agency_query_box .table,.individual_query_box .table').hide();
                    $('.agency_query_null').show().html('机构查询暂无信息');
                    $('.individual_query_null').show().html('个人查询暂无信息');
                    $('.risk_report_time').html('--');//报告时间
                    $('.risk_report_num').html('--');//报告编号
                    $('.risk_chaxun_time').html('--');//查询时间
                    $('.risk_name').html('--');//姓名
                    $('.risk_card_type').html('--');//证件类型
                    $('.risk_card_num').html('--');//证件号
                    $('.risk_marriage_status').html('--');//婚姻状态
                    $('.credit_delinquent_num').html('--');//信用卡当前逾期卡所属机构数
                    $('.credit_delinquent_200').html('--');//信用卡当前逾期卡所属机构数(逾期金额>200元/卡)
                    $('.overdue_total_amount').html('--');//信用卡当前逾期总金额
                    $('.overdue_amount_200').html('--');//信用卡当前逾期总金额(逾期金额>200元/卡)
                    $('.credit_creditCountsM60').html('--');//信用卡近60个月逾期次数
                    $('.credit_creditCountsM60D90').html('--');//信用卡近60个月逾期90天以上次数
                    $('.overdues_loanCounts').html('--');//贷款当前逾期笔数
                    $('.overdues_loanAmts').html('--');//贷款当前逾期总金额
                    $('.overdues_loanCountsM60').html('--');//贷款近60个月逾期次数
                    $('.overdues_loanCountsM60D90').html('--');//贷款近60个月逾期90天以上逾期次数
                    $('.overdues_countsM60').html('--');//汇总近60个月逾期次数
                    $('.overdues_countsM60D90').html('--');//汇总近60个月逾期90天以上次数
                    $('.debts_creditLimitMax').html('--');//信用卡单卡最大信用额度
                    $('.debts_creditLimitTotal').html('--');//信用卡总信用额度
                    $('.debts_creditOrgCounts').html('--');//信用卡机构总数-排除销户和准贷记卡
                    $('.debts_creditLimitUsed').html('--');//信用卡当前已使用信用额度合计
                    $('.debts_creditLimitUseRate').html('--');//信用卡当前总信用额度使用率
                    $('.debts_loanAmts').html('--');//所有贷款总额(含已结清)
                    $('.debts_loanAmtsNoSettle').html('--');//未结清贷款发放总额
                    $('.debts_loanCounts').html('--');//所有贷款总笔数(含已结清)
                    $('.debts_loanBalances').html('--');//贷款总余额
                    $('.debts_loanBalanceCounts').html('--');//未结清贷款总笔数
                    $('.debts_loanBalancesMortgage').html('--');//房贷总余额
                    $('.debts_loanBalancesCar').html('--');//车贷总余额
                    $('.debts_loanBalancesBiz').html('--');//经营贷总余额
                    $('.debts_loanBalancesOther').html('--');//其他贷总余额
                    $('.debts_loanBalancesMonth').html('--');//月还贷款总额
                    $('.debts_loanBalancesMortgageMonth').html('--');//月还房贷金额
                    $('.debts_loanBalancesCarMonth').html('--');//月还车贷
                    $('.debts_loanBalancesBizMonth').html('--');//月还经营贷
                    $('.debts_loanBalancesOtherMonth').html('--');//月还其他贷总余额
                    $('.debts_balance_info .table').hide();
                    $('.debts_balance_null').show().html('贷款余额详列暂无信息');
                    $('.creditLoanHis_creditMOB').html('--');//信用卡最大账龄
                    $('.creditLoanHis_loanMOB').html('--');//贷款最大账龄
                    $('.creditLoanNeeds_creditOrgCountsM3').html('--');//近3个月信用卡发卡机构数
                    $('.creditLoanNeeds_creditLimitTotalM3').html('--');//近3个月内新增信用卡信用总额度
                    $('.creditLoanNeeds_loanCountsM3').html('--');//近3个月内新核发贷款笔数
                    $('.creditLoanNeeds_loanAmtsM3').html('--');//近3个月内新核发贷款总金额
                    $('.creditLoanNeeds_loanQueriesM3').html('--');//近3个月内“贷款审批”查询次数
                    $('.creditLoanNeeds_selfQueriesM3').html('--');//近3个月内“本人查询”次数
                    $('.others_guarantees').html('--');//当前为他人担保笔数
                    $('.others_guaranteeAmts').html('--');//当前为他人担保金额
                    $('.others_month6TaxAmts').html('--');//近6个月内欠税总额
                    $('.basic_idname').html('--');//姓名
                    $('.basic_idtype').html('--');//证件类型
                    $('.basic_idno').html('--');//证件号
                    $('.basic_marital').html('--');//婚姻状态
                    $('.basic_operatorId').html('--');//操作人员ID
                    $('.basic_reportSn').html('--');//人行报告编号
                    $('.basic_queryTime').html('--');//查询时间
                    $('.basic_reportTime').html('--');//报告时间
                    $('.basic_assetFlag').html('--');//资产处置信息*
                    $('.basic_compensateFlag').html('--');//保证人代偿信息*
                    $('.basic_creditFlag').html('--');//信用卡信息*
                    $('.basic_loanFlag').html('--');//贷款信息*
                    $('.basic_guaranteeFlag').html('--');//为他人担保信息*
                    $('.basic_taxFlag').html('--');//欠税记录*
                    $('.basic_judgmentFlag').html('--');//民事判决记录*
                    $('.basic_enforcementFlag').html('--');//强制执行记录*
                    $('.basic_punishmentFlag').html('--');//行政处罚记录*
                    $('.basic_telecomFlag').html('--');//电信欠费信息*
                    $('.basic_checks').html('--');//身份信息核对结果*
                    $('.basic_isfail').html('--');//是否失败*
                    $('.general_assetTotal').html('--');//资产处置信息笔数
                    $('.general_compensateTotal').html('--');//保证人代偿笔数
                    $('.general_creditTotal').html('--');//信用卡账户总数
                    $('.general_creditActive').html('--');//信用卡未结清/未销户账户数
                    $('.general_creditOverdue').html('--');//信用卡发生过逾期账户数
                    $('.general_creditOverdue90').html('--');//信用卡90天以上逾期账户数
                    $('.general_creditGuarantee').html('--');//信用卡为他人担保数
                    $('.general_mortgageTotal').html('--');//住房贷款账户数
                    $('.general_mortgageActive').html('--');//住房贷款未结清/未销户账户数
                    $('.general_mortgageOverdue').html('--');//住房贷款发生过逾期账户数
                    $('.general_mortgageOverdue90').html('--');//住房贷款90天以上逾期账户数
                    $('.general_mortgageGuarantee').html('--');//住房贷款为他人担保数
                    $('.general_otherloanTotal').html('--');//其他贷款账户数
                    $('.general_otherloanActive').html('--');//其他贷款未结清/未销户账户数
                    $('.general_otherloanOverdue').html('--');//其他贷款发生过逾期账户数
                    $('.general_otherloanOverdue90').html('--');//其他贷款90天以上逾期账户数
                    $('.general_otherloanGuarantee').html('--');//其他贷款为他人担保数
                    $('.assets_box .table,.compensates_box .table,.guarantees_box .table,.jiegou_credits_box .table,.structured_loans_box .table,.structured_taxs_box .table,.structured_judgments_box .table,.structured_enforcements_box .table,.structured_punishments_box .table,.structured_telecoms_box .table,.structured_traces_box .table').hide();
                    $('.assets_null').show().html('资产处置信息列表暂无信息');
                    $('.compensates_null').show().html('保证人代偿信息列表暂无信息');
                    $('.guarantees_null').show().html('为他人担保信息列表暂无信息');
                    $('.jiegou_credits_null').show().html('信用卡列表暂无信息');
                    $('.structured_loans_null').show().html('贷款列表暂无信息');
                    $('.structured_taxs_null').show().html('欠税记录列表暂无信息');
                    $('.structured_judgments_null').show().html('民事判决记录列表暂无信息');
                    $('.structured_enforcements_null').show().html('强制执行记录表暂无信息');
                    $('.structured_punishments_null').show().html('行政处罚记录表暂无信息');
                    $('.structured_telecoms_null').show().html('电信欠费信息表暂无信息');
                    $('.structured_traces_null').show().html('查询记录表暂无信息');
                }
            }
        })
    }
    //魔蝎
    $('.scorpion').click(function(){
        moxieFn();
    })
    function moxieFn(){
        var obj = {
                'intoCode':getParam.intoCode
                // 'intoCode':'123456789'
            },
            _obj = JSON.stringify(obj,'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: 'POST',
            contentType: "text/html; charset=UTF-8",
            url: "/api/obtain/queryTeamscorpionData",// 魔蝎接口
            data: _obj,
            dataType: 'json',
            success : function(data){
                if(data.rspCode === '000000'){//请求成功
                    var _scorpionUrl = data.body.url;
                    $('.scorpionUrl>a').attr('href',_scorpionUrl);
                    $('.scorpionUrl>a').html('网址：' + _scorpionUrl);
                }else if (data.rspCode === '-999999') {
                    localStorage.removeItem("LoginName");
                    localStorage.removeItem("LoginToken");
                    localStorage.removeItem("userNo");
                    localStorage.removeItem("LoginJob");
                    localStorage.removeItem("LoginDepartment");
                    localStorage.removeItem("LoginRoleName");
                    showMsg($('.error-msg'), data.rspMsg);
                    window.location.href = 'login.html';
                } else if (data.rspCode === '999999'){//系统异常
                    $('.scorpionUrl').html('https://tenant.51datakey.com/zhengxin/report_data');
                }else if(data.rspCode === '600012'){//暂无报告
                    $('.scorpionUrl').html('暂无报告');
                }else{
                    showMsg($('.error-msg'), data.rspMsg);
                }
            }
        })
    }
    // 上海资信
    $(".zixin").click(function () {
        var obj = new Object();
        obj.intoCode = getParam.intoCode;
        // obj.intoCode = '120171212161912662995';
        obj.bigdataType = 'bigData3001';  // 上海资信
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: 'POST',
            contentType: "text/html; charset=UTF-8",
            url: "/api/obtain/bigdata",// 大数据接口
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if (data.rspCode === '000000') {
                    var _data = data.body;
                    if (_data.网络金融版个人信用报告 != null) {
                        // 网络金融版个人信用报告
                        if (_data.网络金融版个人信用报告.个人身份信息 == null || _data.网络金融版个人信用报告.个人身份信息 == '' || _data.网络金融版个人信用报告.个人身份信息 == undefined) {
                            $('.zixin_li1_one_1').html('--');  // 姓名
                            $('.zixin_li1_one_2').html('--');  // 性别
                            $('.zixin_li1_one_3').html('--');  // 出生日期
                            $('.zixin_li1_two_1').html('--');  // 证件类型
                            $('.zixin_li1_two_2').html('--');  // 证件号码
                            $('.zixin_li1_twelve_1').html('--');  // 配偶姓名
                            $('.zixin_li1_twelve_2').html('--');  // 配偶性别
                            $('.zixin_li1_twelve_3').html('--');  // 配偶出生日期
                            $('.zixin_li1_thirteen_1').html('--');  // 配偶证件类型
                            $('.zixin_li1_thirteen_2').html('--');  // 配偶证件号码
                            $('.zixin_li1_four_1').html('--');  // 手机号码
                            $('.zixin_li1_four_2').html('--');  // 信息获取日期
                            $('.zixin_li1_five_1').html('--');  // 婚姻明细
                            $('.zixin_li1_five_2').html('--');  // 信息获取日期
                            $('.zixin_li1_six_1').html('--');  // 最高学历
                            $('.zixin_li1_six_2').html('--');  // 信息获取日期
                            $('.zixin_li1_seven_1').html('--');  // 职称
                            $('.zixin_li1_seven_2').html('--');  // 信息获取日期
                            $('.zixin_li1_eight_1').html('--');  // 住宅电话
                            $('.zixin_li1_eight_2').html('--');  // 信息获取日期
                            $('.zixin_li1_nine_1').html('--');  // 电子邮箱
                            $('.zixin_li1_nine_2').html('--');  // 信息获取日期
                            $('.zixin_li1_fourteen_1').html('--');  // 配偶工作单位
                            $('.zixin_li1_fourteen_2').html('--');  // 配偶工作单位信息获取时间
                            $('.zixin_li1_fifteen_1').html('--');  // 配偶电话号码
                            $('.zixin_li1_fifteen_2').html('--');  // 配偶电话号码信息获取时间
                            $('.xindai_li1_lianxi01_box .table').hide();
                            $('.xindai_li1_lianxi01_null').show().html('第一联系人信息暂无');
                            $('.xindai_li1_lianxi02_box .table').hide();
                            $('.xindai_li1_lianxi02_null').show().html('第二联系人信息暂无');
                        } else {
                            $('.zixin_li1_one_1').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.姓名));  // 姓名
                            $('.zixin_li1_one_2').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.性别));  // 性别
                            $('.zixin_li1_one_3').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.出生日期));  // 出生日期
                            $('.zixin_li1_two_1').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.证件类型));  // 证件类型
                            $('.zixin_li1_two_2').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.证件号码));  // 证件号码
                            $('.zixin_li1_twelve_1').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.配偶姓名));  // 配偶姓名
                            $('.zixin_li1_twelve_2').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.配偶性别));  // 配偶性别
                            $('.zixin_li1_twelve_3').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.配偶出生日期));  // 配偶出生日期
                            $('.zixin_li1_thirteen_1').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.配偶证件类型));  // 配偶证件类型
                            $('.zixin_li1_thirteen_2').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.配偶证件号码));  // 配偶证件号码
                            if (_data.网络金融版个人信用报告.个人身份信息.手机号码 == null || _data.网络金融版个人信用报告.个人身份信息.手机号码 == '' || _data.网络金融版个人信用报告.个人身份信息.手机号码 == undefined) {
                                $('.zixin_li1_four_1').html('--');  // 手机号码
                                $('.zixin_li1_four_2').html('--');  // 信息获取日期
                            } else {
                                $('.zixin_li1_four_1').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.手机号码.手机号码明细));  // 手机号码
                                $('.zixin_li1_four_2').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.手机号码.信息获取日期));  // 信息获取日期
                            }
                            if (_data.网络金融版个人信用报告.个人身份信息.婚姻状况 == null || _data.网络金融版个人信用报告.个人身份信息.婚姻状况 == '' || _data.网络金融版个人信用报告.个人身份信息.婚姻状况 == undefined) {
                                $('.zixin_li1_five_1').html('--');  // 婚姻明细
                                $('.zixin_li1_five_2').html('--');  // 信息获取日期
                            } else {
                                $('.zixin_li1_five_1').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.婚姻状况.婚姻明细));  // 婚姻明细
                                $('.zixin_li1_five_2').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.婚姻状况.信息获取日期));  // 信息获取日期
                            }
                            if (_data.网络金融版个人信用报告.个人身份信息.最高学历 == null || _data.网络金融版个人信用报告.个人身份信息.最高学历 == '' || _data.网络金融版个人信用报告.个人身份信息.最高学历 == undefined) {
                                $('.zixin_li1_six_1').html('--');  // 最高学历
                                $('.zixin_li1_six_2').html('--');  // 信息获取日期
                            } else {
                                $('.zixin_li1_six_1').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.最高学历.学历明细));  // 最高学历
                                $('.zixin_li1_six_2').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.最高学历.信息获取日期));  // 信息获取日期
                            }
                            if (_data.网络金融版个人信用报告.个人身份信息.职称 == null || _data.网络金融版个人信用报告.个人身份信息.职称 == '' || _data.网络金融版个人信用报告.个人身份信息.职称 == undefined) {
                                $('.zixin_li1_seven_1').html('--');  // 职称
                                $('.zixin_li1_seven_2').html('--');  // 信息获取日期
                            } else {
                                $('.zixin_li1_seven_1').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.职称.职称明细));  // 职称
                                $('.zixin_li1_seven_2').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.职称.信息获取日期));  // 信息获取日期
                            }
                            if (_data.网络金融版个人信用报告.个人身份信息.住宅电话 == null || _data.网络金融版个人信用报告.个人身份信息.住宅电话 == '' || _data.网络金融版个人信用报告.个人身份信息.住宅电话 == undefined) {
                                $('.zixin_li1_eight_1').html('--');  // 住宅电话
                                $('.zixin_li1_eight_2').html('--');  // 信息获取日期
                            } else {
                                $('.zixin_li1_eight_1').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.住宅电话.住宅电话明细));  // 住宅电话
                                $('.zixin_li1_eight_2').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.住宅电话.信息获取日期));  // 信息获取日期
                            }
                            if (_data.网络金融版个人信用报告.个人身份信息.电子邮箱 == null || _data.网络金融版个人信用报告.个人身份信息.电子邮箱 == '' || _data.网络金融版个人信用报告.个人身份信息.电子邮箱 == undefined) {
                                $('.zixin_li1_nine_1').html('--');  // 电子邮箱
                                $('.zixin_li1_nine_2').html('--');  // 信息获取日期
                            } else {
                                $('.zixin_li1_nine_1').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.电子邮箱.电子邮箱明细));  // 住宅电话
                                $('.zixin_li1_nine_2').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.电子邮箱.信息获取日期));  // 信息获取日期
                            }
                            if (_data.网络金融版个人信用报告.个人身份信息.配偶工作单位 == null || _data.网络金融版个人信用报告.个人身份信息.配偶工作单位 == '' || _data.网络金融版个人信用报告.个人身份信息.配偶工作单位 == undefined) {
                                $('.zixin_li1_fourteen_1').html('--');  // 配偶工作单位
                                $('.zixin_li1_fourteen_2').html('--');  // 配偶工作单位信息获取时间
                            } else {
                                $('.zixin_li1_fourteen_1').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.配偶工作单位.配偶工作单位明细));  // 配偶工作单位
                                $('.zixin_li1_fourteen_2').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.配偶工作单位.信息获取日期));  // 配偶工作单位信息获取时间
                            }
                            if (_data.网络金融版个人信用报告.个人身份信息.配偶联系电话 == null || _data.网络金融版个人信用报告.个人身份信息.配偶联系电话 == '' || _data.网络金融版个人信用报告.个人身份信息.配偶联系电话 == undefined) {
                                $('.zixin_li1_fifteen_1').html('--');  // 配偶电话号码
                                $('.zixin_li1_fifteen_2').html('--');  // 配偶电话号码信息获取时间
                            } else {
                                $('.zixin_li1_fifteen_1').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.配偶联系电话.配偶联系电话明细));  // 配偶电话号码
                                $('.zixin_li1_fifteen_2').html(nullFn(_data.网络金融版个人信用报告.个人身份信息.配偶联系电话.信息获取日期));  // 配偶电话号码信息获取时间
                            }
                            if (_data.网络金融版个人信用报告.个人身份信息.第一联系人信息 == null || _data.网络金融版个人信用报告.个人身份信息.第一联系人信息 == '' || _data.网络金融版个人信用报告.个人身份信息.第一联系人信息 == undefined) {
                                $('.xindai_li1_lianxi01_box .table').hide();
                                $('.xindai_li1_lianxi01_null').show().html('第一联系人信息暂无');
                            } else {
                                var _lianxi01 = _data.网络金融版个人信用报告.个人身份信息.第一联系人信息;
                                var _lianxi01list = $.map(_lianxi01, function (v, i) {
                                    return '<tr>' +
                                        '<td>' + nullFn(v.联系人姓名) + '</td>' + '<td>' + nullFn(v.联系人关系) + '</td>' +
                                        '<td>' + nullFn(v.联系电话) + '</td>' + '<td>' + nullFn(v.信息获取日期) + '</td>' +
                                        '</tr>';
                                });
                                $('.xindai_li1_lianxi01_con').html('').append(_lianxi01list);
                            }
                            if (_data.网络金融版个人信用报告.个人身份信息.第二联系人信息 == null || _data.网络金融版个人信用报告.个人身份信息.第二联系人信息 == '' || _data.网络金融版个人信用报告.个人身份信息.第二联系人信息 == undefined) {
                                $('.xindai_li1_lianxi02_box .table').hide();
                                $('.xindai_li1_lianxi02_null').show().html('第二联系人信息暂无');
                            } else {
                                var _lianxi02 = _data.网络金融版个人信用报告.个人身份信息.第二联系人信息;
                                var _lianxi02list = $.map(_lianxi02, function (v, i) {
                                    return '<tr>' +
                                        '<td>' + nullFn(v.联系人姓名) + '</td>' + '<td>' + nullFn(v.联系人关系) + '</td>' +
                                        '<td>' + nullFn(v.联系电话) + '</td>' + '<td>' + nullFn(v.信息获取日期) + '</td>' +
                                        '</tr>';
                                });
                                $('.xindai_li1_lianxi02_con').html('').append(_lianxi02list);
                            }
                        }
                        if (_data.网络金融版个人信用报告.信用报告头 == null || _data.网络金融版个人信用报告.信用报告头 == '' || _data.网络金融版个人信用报告.信用报告头 == undefined) {
                            $('.zixin_li1_three_1').html('--');  // 报告编号
                            $('.zixin_li1_three_2').html('--');  // 报告时间
                            $('.zixin_li1_three_3').html('--');  // 查询原因
                        } else {
                            $('.zixin_li1_three_1').html(nullFn(_data.网络金融版个人信用报告.信用报告头.报告编号));  // 报告编号
                            $('.zixin_li1_three_2').html(nullFn(_data.网络金融版个人信用报告.信用报告头.报告时间));  // 报告时间
                            $('.zixin_li1_three_3').html(nullFn(_data.网络金融版个人信用报告.信用报告头.查询原因));  // 查询原因
                        }
                        if ((_data.网络金融版个人信用报告.贷款交易信息 == null || _data.网络金融版个人信用报告.贷款交易信息 == '' || _data.网络金融版个人信用报告.贷款交易信息 == undefined) &&
                            (_data.网络金融版个人信用报告.贷款交易信息.信息概要 == null || _data.网络金融版个人信用报告.贷款交易信息.信息概要 == '' || _data.网络金融版个人信用报告.贷款交易信息.信息概要 == undefined)) {
                            $('.zixin_li1_sixteen_1').html('--');  // 贷款笔数
                            $('.zixin_li1_sixteen_2').html('--');  // 首贷日
                            $('.zixin_li1_sixteen_3').html('--');  // 最大授信额度
                            $('.zixin_li1_seventeen_1').html('--');  // 贷款总额
                            $('.zixin_li1_seventeen_2').html('--');  // 贷款余额
                            $('.zixin_li1_seventeen_3').html('--');  // 协定月还款
                            $('.zixin_li1_eighteen_1').html('--');  // 当前逾期总额
                            $('.zixin_li1_eighteen_2').html('--');  // 最高逾期金额
                        } else {
                            $('.zixin_li1_sixteen_1').html(nullFn(_data.网络金融版个人信用报告.贷款交易信息.信息概要.贷款笔数));  // 贷款笔数
                            $('.zixin_li1_sixteen_2').html(nullFn(_data.网络金融版个人信用报告.贷款交易信息.信息概要.首贷日));  // 首贷日
                            $('.zixin_li1_sixteen_3').html(nullFn(_data.网络金融版个人信用报告.贷款交易信息.信息概要.最大授信额度));  // 最大授信额度
                            $('.zixin_li1_seventeen_1').html(nullFn(_data.网络金融版个人信用报告.贷款交易信息.信息概要.贷款总额));  // 贷款总额
                            $('.zixin_li1_seventeen_2').html(nullFn(_data.网络金融版个人信用报告.贷款交易信息.信息概要.贷款余额));  // 贷款余额
                            $('.zixin_li1_seventeen_3').html(nullFn(_data.网络金融版个人信用报告.贷款交易信息.信息概要.协定月还款));  // 协定月还款
                            $('.zixin_li1_eighteen_1').html(nullFn(_data.网络金融版个人信用报告.贷款交易信息.信息概要.当前逾期总额));  // 当前逾期总额
                            $('.zixin_li1_eighteen_2').html(nullFn(_data.网络金融版个人信用报告.贷款交易信息.信息概要.最高逾期金额));  // 最高逾期金额
                            $('.zixin_li1_eighteen_3').html(nullFn(_data.网络金融版个人信用报告.贷款交易信息.信息概要.最高逾期期数));  // 最高逾期期数
                        }
                        if (_data.网络金融版个人信用报告.贷款申请信息 != null && _data.网络金融版个人信用报告.贷款申请信息 != '' && _data.网络金融版个人信用报告.贷款申请信息 != undefined &&
                            _data.网络金融版个人信用报告.贷款申请信息.贷款申请信息记录 != null && _data.网络金融版个人信用报告.贷款申请信息.贷款申请信息记录 != '' && _data.网络金融版个人信用报告.贷款申请信息.贷款申请信息记录 != undefined) {
                            var _shenqing = _data.网络金融版个人信用报告.贷款申请信息.贷款申请信息记录;
                            var _shenqingList = $.map(_shenqing, function (v, i) {
                                return '<tr>' +
                                    '<td>' + nullFn(v.申请类型) + '</td>' + '<td>' + nullFn(v.申请机构) + '</td>' + '<td>' + nullFn(v.申请状态) + '</td>' +
                                    '<td>' + nullFn(v.申请月数) + '</td>' + '<td>' + nullFn(v.申请时间) + '</td>' + '<td>' + nullFn(v.申请金额) + '</td>' +
                                    '<td>' + nullFn(v.信息获取日期) + '</td>' +
                                    '</tr>';
                            });
                            $('.zixin_li1_shenqing_con').html('').append(_shenqingList);
                        } else {
                            $('.zixin_li1_shenqing_box .table').hide();
                            $('.zixin_li1_shenqing_null').show().html('贷款申请信息暂无');
                        }
                        if (_data.网络金融版个人信用报告.为他人担保信息 != null && _data.网络金融版个人信用报告.为他人担保信息 != '' && _data.网络金融版个人信用报告.为他人担保信息 != undefined &&
                            _data.网络金融版个人信用报告.为他人担保信息.担保信息记录 != null && _data.网络金融版个人信用报告.为他人担保信息.担保信息记录 != '' && _data.网络金融版个人信用报告.为他人担保信息.担保信息记录 != undefined) {
                            var _danbao = _data.网络金融版个人信用报告.为他人担保信息.担保信息记录;
                            var _danbaoList = $.map(_danbao, function (v, i) {
                                return '<tr>' +
                                    '<td>' + nullFn(v.担保项目) + '</td>' + '<td>' + nullFn(v.担保日期) + '</td>' +
                                    '<td>' + nullFn(v.担保金额) + '</td>' + '<td>' + nullFn(v.担保关系) + '</td>' +
                                    '<td>' + nullFn(v.信息获取日期) + '</td>' +
                                    '</tr>'
                            });
                            $('.zixin_li1_danbao_con').html('').append(_danbaoList);
                        } else {
                            $('.zixin_li1_danbao_box .table').hide();
                            $('.zixin_li1_danbao_null').show().html('为他人担保信息暂无');
                        }
                        if (_data.网络金融版个人信用报告.个人声明信息 != null && _data.网络金融版个人信用报告.个人声明信息 != '' && _data.网络金融版个人信用报告.个人声明信息 != undefined) {
                            var _shengming = _data.网络金融版个人信用报告.个人声明信息;
                            var _shengmingList = $.map(_shengming, function (v, i) {
                                return '<tr>' +
                                    '<td>' + nullFn(i) + '</td>' + '<td>' + nullFn(v.个人声明内容) + '</td>' +
                                    '<td>' + nullFn(v.声明日期) + '</td>' +
                                    '</tr>'
                            });
                            $('.zixin_li1_shengming_con').html('').append(_shengmingList);
                        } else {
                            $('.zixin_li1_shengming_box .table').hide();
                            $('.zixin_li1_shengming_null').show().html('个人声明信息暂无');
                        }

                        // 查询记录
                        var _cxRecord = _data.网络金融版个人信用报告.查询信息.查询记录;
                        if (_cxRecord != null && _cxRecord != '' && _cxRecord != undefined) {
                            var _cxrList = $.map(_cxRecord, function (v, i) {
                                return '<tr>' +
                                    '<td>' + nullFn(v.查询者类型) + '</td>' + '<td>' + nullFn(v.查询原因) + '</td>' +
                                    '<td>' + nullFn(v.查询日期) + '</td>' +
                                    '</tr>';
                            });
                            $('.zixin_li2_con').html('').append(_cxrList);
                        } else {
                            $('.zixin_li2_box .table').hide();
                            $('.zixin_li2_con_null').html('查询记录表暂无信息');
                        }

                        // 贷款
                        if ((_data.网络金融版个人信用报告.贷款交易信息 == null || _data.网络金融版个人信用报告.贷款交易信息 == '' || _data.网络金融版个人信用报告.贷款交易信息 == undefined) &&
                            _data.网络金融版个人信用报告.贷款交易信息.贷款 == null || _data.网络金融版个人信用报告.贷款交易信息.贷款 == '' || _data.网络金融版个人信用报告.贷款交易信息.贷款 == undefined) {
                            $('.zixin_li3_box .table').hide();
                            $('.zixin_li3_null').show().html('贷款暂无信息');
                        } else {
                            var _daikuan = _data.网络金融版个人信用报告.贷款交易信息.贷款;
                            var _daikuanList = $.map(_daikuan, function (o, i) {
                                return '<tr>' +
                                    '<td>' + nullFn(o.贷款项目) + '</td><td>' + nullFn(o.机构名称) + '</td><td>' + nullFn(o.授信额度) +
                                    '<td>' + nullFn(o.担保方式) + '</td><td>' + nullFn(o.开户日期) + '</td><td>' + nullFn(o.币种) + '</td><td>' + nullFn(o.发生地) + '</td>' +
                                    '<td>' + nullFn(o.共享授信额度) + '</td><td>' + nullFn(o.最大负债额) + '</td><td>' + nullFn(o.还款频率) + '</td><td>' + nullFn(o.期末贷款余额) + '</td>' +
                                    '<td>' + nullFn(o.剩余还款月数) + '</td><td>' + nullFn(o.本月应还款日期) + '</td><td>' + nullFn(o.本月应还款金额) + '</td>' +
                                    '<td>' + nullFn(o.帐户状态) + '</td><td>' + nullFn(o.实际还款日期) + '</td><td>' + nullFn(o.实际还款金额) + '</td>' +
                                    '<td>' + nullFn(o.当前逾期总额) + '</td><td>' + nullFn(o.当前逾期期数) + '</td><td>' + nullFn(o.累计逾期期数) + '</td>' +
                                    '<td>' + nullFn(o.最高逾期期数) + '</td><td>' + nullFn(o.二十四月内各月还款状况) + '</td><td>' + nullFn(o['逾期31-60天未归还贷款本金']) + '</td>' +
                                    '<td>' + nullFn(o['逾期61-90天未归还贷款本金']) + '</td><td>' + nullFn(o['逾期91-180天未归还贷款本金']) + '</td><td>' + nullFn(o['逾期180天以上未归还贷款本金']) + '</td>' +
                                    '<td>' + nullFn(o.信息获取日期) + '</td>' +
                                    '</tr >';
                            })
                            $('.zixin_li3_con').html('').append(_daikuanList);
                        }
                    } else {
                        $('.zixin_li1_one_1').html('--');  // 姓名
                        $('.zixin_li1_one_2').html('--');  // 性别
                        $('.zixin_li1_one_3').html('--');  // 出生日期
                        $('.zixin_li1_two_1').html('--');  // 证件类型
                        $('.zixin_li1_two_2').html('--');  // 证件号码
                        $('.zixin_li1_twelve_1').html('--');  // 配偶姓名
                        $('.zixin_li1_twelve_2').html('--');  // 配偶性别
                        $('.zixin_li1_twelve_3').html('--');  // 配偶出生日期
                        $('.zixin_li1_thirteen_1').html('--');  // 配偶证件类型
                        $('.zixin_li1_thirteen_2').html('--');  // 配偶证件号码
                        $('.zixin_li1_four_1').html('--');  // 手机号码
                        $('.zixin_li1_four_2').html('--');  // 信息获取日期
                        $('.zixin_li1_five_1').html('--');  // 婚姻明细
                        $('.zixin_li1_five_2').html('--');  // 信息获取日期
                        $('.zixin_li1_six_1').html('--');  // 最高学历
                        $('.zixin_li1_six_2').html('--');  // 信息获取日期
                        $('.zixin_li1_seven_1').html('--');  // 职称
                        $('.zixin_li1_seven_2').html('--');  // 信息获取日期
                        $('.zixin_li1_eight_1').html('--');  // 住宅电话
                        $('.zixin_li1_eight_2').html('--');  // 信息获取日期
                        $('.zixin_li1_nine_1').html('--');  // 电子邮箱
                        $('.zixin_li1_nine_2').html('--');  // 信息获取日期
                        $('.zixin_li1_fourteen_1').html('--');  // 配偶工作单位
                        $('.zixin_li1_fourteen_2').html('--');  // 配偶工作单位信息获取时间
                        $('.zixin_li1_fifteen_1').html('--');  // 配偶电话号码
                        $('.zixin_li1_fifteen_2').html('--');  // 配偶电话号码信息获取时间
                        $('.xindai_li1_lianxi01_box .table').hide();
                        $('.xindai_li1_lianxi01_null').show().html('第一联系人信息暂无');
                        $('.xindai_li1_lianxi02_box .table').hide();
                        $('.xindai_li1_lianxi02_null').show().html('第二联系人信息暂无');
                        $('.zixin_li1_three_1').html('--');  // 报告编号
                        $('.zixin_li1_three_2').html('--');  // 报告时间
                        $('.zixin_li1_three_3').html('--');  // 查询原因
                        $('.zixin_li1_shenqing_box .table').hide();
                        $('.zixin_li1_shenqing_null').show().html('贷款申请信息暂无');
                        $('.zixin_li1_danbao_box .table').hide();
                        $('.zixin_li1_danbao_null').show().html('为他人担保信息暂无');
                        $('.zixin_li1_shengming_box .table').hide();
                        $('.zixin_li1_shengming_null').show().html('个人声明信息暂无');
                        $('.zixin_li1_sixteen_1').html('--');  // 贷款笔数
                        $('.zixin_li1_sixteen_2').html('--');  // 首贷日
                        $('.zixin_li1_sixteen_3').html('--');  // 最大授信额度
                        $('.zixin_li1_seventeen_1').html('--');  // 贷款总额
                        $('.zixin_li1_seventeen_2').html('--');  // 贷款余额
                        $('.zixin_li1_seventeen_3').html('--');  // 协定月还款
                        $('.zixin_li1_eighteen_1').html('--');  // 当前逾期总额
                        $('.zixin_li1_eighteen_2').html('--');  // 最高逾期金额
                        $('.zixin_li1_eighteen_3').html('--');  // 最高逾期期数
                        $('.zixin_li2_box .table').hide();
                        $('.zixin_li2_con_null').html('查询记录表暂无信息');
                        $('.zixin_li3_box .table').hide();
                        $('.zixin_li3_null').show().html('贷款暂无信息');
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
                    $('.zixin_li1_one_1').html('--');  // 姓名
                    $('.zixin_li1_one_2').html('--');  // 性别
                    $('.zixin_li1_one_3').html('--');  // 出生日期
                    $('.zixin_li1_two_1').html('--');  // 证件类型
                    $('.zixin_li1_two_2').html('--');  // 证件号码
                    $('.zixin_li1_twelve_1').html('--');  // 配偶姓名
                    $('.zixin_li1_twelve_2').html('--');  // 配偶性别
                    $('.zixin_li1_twelve_3').html('--');  // 配偶出生日期
                    $('.zixin_li1_thirteen_1').html('--');  // 配偶证件类型
                    $('.zixin_li1_thirteen_2').html('--');  // 配偶证件号码
                    $('.zixin_li1_four_1').html('--');  // 手机号码
                    $('.zixin_li1_four_2').html('--');  // 信息获取日期
                    $('.zixin_li1_five_1').html('--');  // 婚姻明细
                    $('.zixin_li1_five_2').html('--');  // 信息获取日期
                    $('.zixin_li1_six_1').html('--');  // 最高学历
                    $('.zixin_li1_six_2').html('--');  // 信息获取日期
                    $('.zixin_li1_seven_1').html('--');  // 职称
                    $('.zixin_li1_seven_2').html('--');  // 信息获取日期
                    $('.zixin_li1_eight_1').html('--');  // 住宅电话
                    $('.zixin_li1_eight_2').html('--');  // 信息获取日期
                    $('.zixin_li1_nine_1').html('--');  // 电子邮箱
                    $('.zixin_li1_nine_2').html('--');  // 信息获取日期
                    $('.zixin_li1_fourteen_1').html('--');  // 配偶工作单位
                    $('.zixin_li1_fourteen_2').html('--');  // 配偶工作单位信息获取时间
                    $('.zixin_li1_fifteen_1').html('--');  // 配偶电话号码
                    $('.zixin_li1_fifteen_2').html('--');  // 配偶电话号码信息获取时间
                    $('.xindai_li1_lianxi01_box .table').hide();
                    $('.xindai_li1_lianxi01_null').show().html('第一联系人信息暂无');
                    $('.xindai_li1_lianxi02_box .table').hide();
                    $('.xindai_li1_lianxi02_null').show().html('第二联系人信息暂无');
                    $('.zixin_li1_three_1').html('--');  // 报告编号
                    $('.zixin_li1_three_2').html('--');  // 报告时间
                    $('.zixin_li1_three_3').html('--');  // 查询原因
                    $('.zixin_li1_shenqing_box .table').hide();
                    $('.zixin_li1_shenqing_null').show().html('贷款申请信息暂无');
                    $('.zixin_li1_danbao_box .table').hide();
                    $('.zixin_li1_danbao_null').show().html('为他人担保信息暂无');
                    $('.zixin_li1_shengming_box .table').hide();
                    $('.zixin_li1_shengming_null').show().html('个人声明信息暂无');
                    $('.zixin_li1_sixteen_1').html('--');  // 贷款笔数
                    $('.zixin_li1_sixteen_2').html('--');  // 首贷日
                    $('.zixin_li1_sixteen_3').html('--');  // 最大授信额度
                    $('.zixin_li1_seventeen_1').html('--');  // 贷款总额
                    $('.zixin_li1_seventeen_2').html('--');  // 贷款余额
                    $('.zixin_li1_seventeen_3').html('--');  // 协定月还款
                    $('.zixin_li1_eighteen_1').html('--');  // 当前逾期总额
                    $('.zixin_li1_eighteen_2').html('--');  // 最高逾期金额
                    $('.zixin_li1_eighteen_3').html('--');  // 最高逾期期数
                    $('.zixin_li2_box .table').hide();
                    $('.zixin_li2_con_null').html('查询记录表暂无信息');
                    $('.zixin_li3_box .table').hide();
                    $('.zixin_li3_null').show().html('贷款暂无信息');
                }
            }
        })
    });
    //聚信立接口调用
    $('.juxinli').click(function () {
        juxinliFn();
    })
    function juxinliFn(){
        var obj = {
            'intoCode':getParam.intoCode,
            // "intoCode":"120180112145725271265",
            'bigdataType':'bigData8001',
            'childType':'app_analysis'
        };
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: 'POST',
            contentType: "text/html; charset=UTF-8",
            url: "/api/obtain/getBigDataByType",//聚信立- 运营商
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if (data.rspCode === '000000') {
                    var _data = data.body;
                    //用户申请表检测
                    var _applicationCheck = _data.applicationCheck;
                    if (_applicationCheck) {
                        $(".ju_one_1").html("--");//申请表数据点
                        $(".ju_one_2").html("--");//数据检查点
                        $(".ju_one_3").html("--");////申请表数据值
                        $(".ju_two_1").html(nullFn(_applicationCheck.gender));//性别
                        $(".ju_two_2").html(nullFn(_applicationCheck.age));//年龄
                        $(".ju_two_3").html(nullFn(_applicationCheck.province));//省份
                        $(".ju_three_1").html(nullFn(_applicationCheck.city));//城市
                        $(".ju_three_2").html(nullFn(_applicationCheck.region));//区县
                        $(".ju_four_1").html(nullFn(_applicationCheck.website));//移动运营商
                        $(".ju_four_2").html(nullFn(_applicationCheck.cellPhoneReliability));//实名认证
                        $(".ju_four_3").html(nullFn(_applicationCheck.cellPhoneRegTime));//注册时间
                        $(".ju_five_1").html(nullFn(_applicationCheck.checkName));//姓名检查
                        $(".ju_five_2").html(nullFn(_applicationCheck.checkIdcard));//身份证号检查
                        $(".ju_five_3").html(nullFn(_applicationCheck.checkEbusiness));//电商使用号码检查
                        $(".ju_six_1").html("--");////地址检查
                        $(".ju_six_2").html("--");////电商使用地址检查
                        $(".ju_seven_1").html("--");////联系人关系
                        $(".ju_seven_2").html("--");////联系人姓名
                        $(".ju_seven_3").html("--");////临时小号检查
                        $(".ju_eight_1").html("--");////运营商联系号码检查
                        $(".ju_eight_2").html(nullFn(isCurror(_applicationCheck.isUiCourtBlacklist)));////身份证号法院黑名单检查
                        $(".ju_nine_1").html(nullFn(isCurror(_applicationCheck.isUcFinancialBlacklist)));////电话号码金融服务类机构黑名单检查
                        $(".ju_nine_2").html(nullFn(isCurror(_applicationCheck.isUiFinancialBlacklist)));////身份证号金融服务类机构黑名单检查
                        $(".ju_nine_3").html(nullFn(_applicationCheck.uiCourtBlackType) + ';' + nullFn(_applicationCheck.uiFinancialBlackType) + ';' + nullFn(_applicationCheck.ucFinancialBlackType));//// 黑名单机构类型
                    } else {
                        $(".ju_one_1,.ju_one_2,.ju_one_3,.ju_two_1,.ju_two_2,.ju_two_3,.ju_three_1,.ju_three_2,.ju_four_1,.ju_four_2,.ju_four_3,.ju_five_1,.ju_five_2,.ju_five_3,.ju_six_1,.ju_six_2,.ju_seven_1,.ju_seven_2,.ju_seven_3,.ju_eight_1,.ju_eight_2,.ju_eight_3,.ju_nine_1,.ju_nine_2,.ju_nine_3").html("--");//申请表数据点
                    }
                    //用户信息检测
                    var _infoCheck = _data.infoCheck;
                    if (_infoCheck) {
                        $(".ju1_one_1").html('--');////用户查询信息
                        if (_infoCheck.userSearchCheckDTO) {
                            $(".ju1_one_2").html(nullFn(_infoCheck.userSearchCheckDTO.searchedOrgCnt));//查询过该用户的相关企业数量
                            $(".ju1_one_3").html(nullFn(_infoCheck.userSearchCheckDTO.searchedOrgType));//查询过该用户的相关企业类型
                            $(".ju1_two_1").html(nullFn(_infoCheck.userSearchCheckDTO.idcardWithOtherNames));//身份证组合过的其他姓名
                            $(".ju1_two_2").html(nullFn(_infoCheck.userSearchCheckDTO.idcardWithOtherPhones));//身份证组合过其他电话
                            $(".ju1_three_1").html(nullFn(_infoCheck.userSearchCheckDTO.phoneWithOtherIdcards));//电话号码组合过其他身份证
                            $(".ju1_three_2").html(nullFn(_infoCheck.userSearchCheckDTO.arisedOpenWeb));//电话号码出现过的公开网站
                            $(".ju1_four_1").html(nullFn(_infoCheck.userSearchCheckDTO.registerOrgCnt));//电话号码注册过的相关企业数量
                            $(".ju1_four_2").html(nullFn(_infoCheck.userSearchCheckDTO.registerOrgType));//电话号码注册过的相关企业类型
                            $(".ju1_five_2").html(nullFn(_infoCheck.userBlackCheckDTO.phoneGrayScore));//用户号码联系黑中介分数
                            $(".ju1_five_3").html(nullFn(_infoCheck.userBlackCheckDTO.contactsClass1BlacklistCnt));//直接联系人中黑名单人数
                            $(".ju1_six_1").html(nullFn(_infoCheck.userBlackCheckDTO.contactsClass2BlacklistCnt));//间接联系人中黑名单人数
                            $(".ju1_six_2").html(nullFn(_infoCheck.userBlackCheckDTO.contactsClass1Cnt));// 直接联系人人数
                            $(".ju1_six_3").html(nullFn(_infoCheck.userBlackCheckDTO.contactsRouterCnt));//引起间接黑名单人数
                            $(".ju1_seven_1").html(nullFn(_infoCheck.userBlackCheckDTO.contactsRouterRatio));//直接联系人中引起间接黑名单占比
                            $(".ju1_two_3").html(nullFn(_infoCheck.userSearchCheckDTO.phoneWithOtherNames));//电话号码组合过其他姓名
                        } else {
                            $(".ju1_one_2,.ju1_one_3,.ju1_two_1,.ju1_two_2,.ju1_three_1,.ju1_four_1,.ju1_four_2,.ju1_five_2,.ju1_five_3,.ju1_six_1,.ju1_six_2,.ju1_six_3,.ju1_seven_1").html('--');//查询过该用户的相关企业数量
                        }

                        $(".ju1_five_1").html('--');////用户黑名单信息
                    } else {
                        $(".ju1_one_2,.ju1_one_3,.ju1_two_1,.ju1_two_2,.ju1_three_1,.ju1_four_1,.ju1_four_2,.ju1_five_2,.ju1_five_3,.ju1_six_1,.ju1_six_2,.ju1_six_3,.ju1_seven_1,.ju1_two_3,.ju1_five_1").html('--');
                    }
                    //用户行为检测
                    var _behaviorCheck = _data.behaviorCheck;
                    if (_behaviorCheck.length > 0) {
                        $(".ju2_one_1").html(nullFn(_behaviorCheck[0].result));//朋友圈在哪里
                        $(".ju2_one_2").html(nullFn(_behaviorCheck[1].result));//号码使用时间
                        $(".ju2_one_3").html(nullFn(_behaviorCheck[2].result));//手机静默情况
                        $(".ju2_two_1").html(nullFn(_behaviorCheck[3].result));//互通过电话的号码数量
                        $(".ju2_two_2").html(nullFn(_behaviorCheck[4].result));//澳门电话通话情况
                        $(".ju2_two_3").html(nullFn(_behaviorCheck[5].result));//110话通话情况
                        $(".ju2_three_1").html(nullFn(_behaviorCheck[6].result));//120话通话情况
                        $(".ju2_three_2").html(nullFn(_behaviorCheck[7].result));//律师号码通话情况
                        $(".ju2_three_3").html(nullFn(_behaviorCheck[8].result));//法院号码通话情况
                        $(".ju2_four_1").html(nullFn(_behaviorCheck[9].result));//夜间活动情况
                        $(".ju2_four_2").html(nullFn(_behaviorCheck[10].result));//贷款类号码联系情况
                        $(".ju2_four_3").html(nullFn(_behaviorCheck[11].result));//银行类号码联系情况
                        $(".ju2_five_1").html(nullFn(_behaviorCheck[12].result));//信用卡类号码联系情况
                        $(".ju2_five_2").html(nullFn(_behaviorCheck[13].result));//居住地本地(省份)地址在电商中使用时长
                        $(".ju2_five_3").html(nullFn(_behaviorCheck[14].result));//总体电商使用情况
                        $(".ju2_six_1").html(nullFn(_behaviorCheck[15].result));//申请人本人电商使用情况
                        $(".ju2_six_2").html(nullFn(_behaviorCheck[16].result));//虚拟商品购买情况
                        $(".ju2_six_3").html(nullFn(_behaviorCheck[17].result));//彩票购买情况
                        $(".ju2_seven_1").html(nullFn(_behaviorCheck[18].result));//申请人本人地址变化情况
                    } else {
                        $(".ju2_one_1,.ju2_one_2,.ju2_one_3,.ju2_two_1,.ju2_two_2,.ju2_two_3,.ju2_three_1,.ju2_three_2,.ju2_three_3,.ju2_four_1,.ju2_four_1,.ju2_four_2,.ju2_four_3,.ju2_five_1,.ju2_five_2,.ju2_five_3,.ju2_six_1,.ju2_six_2,.ju2_six_3,.ju2_seven_1").html('--');
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
                    $(".ju_one_1,.ju_one_2,.ju_one_3,.ju_two_1,.ju_two_2,.ju_two_3,.ju_three_1,.ju_three_2,.ju_four_1,.ju_four_2,.ju_four_3,.ju_five_1,.ju_five_2,.ju_five_3,.ju_six_1,.ju_six_2,.ju_seven_1,.ju_seven_2,.ju_seven_3,.ju_eight_1,.ju_eight_2,.ju_eight_3,.ju_nine_1,.ju_nine_2,.ju_nine_3").html("--");//申请表数据点
                    $(".ju1_one_2,.ju1_one_3,.ju1_two_1,.ju1_two_2,.ju1_three_1,.ju1_four_1,.ju1_four_2,.ju1_five_2,.ju1_five_3,.ju1_six_1,.ju1_six_2,.ju1_six_3,.ju1_seven_1,.ju1_two_3,.ju1_five_1").html('--');

                    $(".ju2_one_1,.ju2_one_2,.ju2_one_3,.ju2_two_1,.ju2_two_2,.ju2_two_3,.ju2_three_1,.ju2_three_2,.ju2_three_3,.ju2_four_1,.ju2_four_1,.ju2_four_2,.ju2_four_3,.ju2_five_1,.ju2_five_2,.ju2_five_3,.ju2_six_1,.ju2_six_2,.ju2_six_3,.ju2_seven_1").html('--');
                }
            }
        })
    }

    // 聚信立-蜜罐
    function comLabHeight() {
        $.each($('.secondCon_li .row'),function (i,v) {
            var _height = $(this).css('height');
            var _comLab = $(this).find('.com-lab');
            if(_height == '35px'|| _height == '36px'){
                _comLab.css('height','34px');
            }else if(_height == '69px' || _height == '70px'){
                _comLab.css('height','68px');
            }
        })
    }
    $(window).resize(comLabHeight);
    $('.miguan').click(function () {
        comLabHeight();
        var obj = new Object();
        obj.intoCode = getParam.intoCode;
        // obj.intoCode = 'AWFjpzRirZtTZYspscVX';
        obj.bigdataType = 'bigData8001';
        obj.childType = 'jxl_mg';
        var _obj = JSON.stringify(obj,'utf-8');
        $.ajax({
            headers:{
                token:localStorage.getItem('LoginToken')
            },
            type:'POST',
            contentType:'text/html; charset=UTF-8',
            url:"/api/obtain/getBigDataByType",  // 蜜罐
            data:_obj,
            dataType:'json',
            success:function (data) {
                if(data.rspCode === '000000'){
                    var _data = data.body;
                    if(_data && _data.JXL_MG_ACCESS_APPLY && _data.JXL_MG_ACCESS_APPLY.data){
                        var _dataAll = _data.JXL_MG_ACCESS_APPLY.data;
                        // 基本信息
                        var _user_basic = _dataAll.user_basic;
                        if(_user_basic){
                            $('.juxin_li41_row11').html(nullFn(_user_basic.user_name)); // 姓名
                            $('.juxin_li41_row12').html(nullFn(_user_basic.user_idcard)); // 身份证号
                            $('.juxin_li41_row21').html(nullFn(_user_basic.user_age)); // 年龄
                            $('.juxin_li41_row22').html(nullFn(idCardEnabled(_user_basic.user_idcard_valid))); // 身份证是否有效
                            $('.juxin_li41_row31').html(nullFn(_user_basic.user_gender)); // 性别
                            $('.juxin_li41_row32').html(nullFn(_user_basic.user_phone_operator)); // 运营商类别
                            $('.juxin_li41_row41').html(nullFn(_user_basic.user_phone)); // 手机号码
                            $('.juxin_li41_row42').html(nullFn(_user_basic.user_phone_province)+'&nbsp;'+nullFn(_user_basic.user_phone_city));//手机号归属地
                        }else{
                            $('.juxin_li41_row11, .juxin_li41_row12, .juxin_li41_row21, .juxin_li41_row22, .juxin_li41_row31, .juxin_li41_row32, .juxin_li41_row41, .juxin_li41_row42').html('--');
                        }
                        var _user_gray = _dataAll.user_gray;
                        if(_user_gray){
                            // 用户灰度分数信息
                            $('.juxin_li42_row11').html(nullFn(_user_gray.user_phone)); // 手机号码
                            $('.juxin_li42_row12').html(nullFn(timestampToTime(_user_gray.recent_active_time))); // 最近活跃时间
                            $('.juxin_li42_row21').html(nullFn(_user_gray.phone_gray_score)); // 灰度分
                            $('.juxin_li42_row22').html(nullFn(_user_gray.social_liveness)); // 社交活跃度
                            $('.juxin_li42_row31').html(nullFn(idCardEnabled(_user_gray.has_report))); // 是否成功产生过蜜蜂报告
                            $('.juxin_li42_row32').html(nullFn(_user_gray.social_influence)); // 社交影响力

                            // 联系人数相关字段
                            var _contacts_number_statistic = _user_gray.contacts_number_statistic;
                            if(_contacts_number_statistic){
                                $('.juxin_li43_row11').html(nullFn(_contacts_number_statistic.cnt_to_all)); // 主动联系人数
                                $('.juxin_li43_row12').html(nullFn(_contacts_number_statistic.pct_cnt_to_all)); // 主动联系人数在群体中的百分位
                                $('.juxin_li43_row21').html(nullFn(_contacts_number_statistic.cnt_be_all)); // 被动联系人数
                                $('.juxin_li43_row22').html(nullFn(_contacts_number_statistic.pct_cnt_be_all)); // 被动联系人数在群体中的百分位
                                $('.juxin_li43_row31').html(nullFn(_contacts_number_statistic.cnt_all)); // 一阶联系人总数
                                $('.juxin_li43_row32').html(nullFn(_contacts_number_statistic.pct_cnt_all)); // 一阶联系人总数在群体中的百分位
                                $('.juxin_li43_row41').html(nullFn(_contacts_number_statistic.cnt_router)); // 引起黑名单的一阶联系人数
                                $('.juxin_li43_row42').html(nullFn(_contacts_number_statistic.pct_cnt_router)); // 引起黑名单的一阶联系人数在群体中的百分位
                                $('.juxin_li43_row51').html(nullFn(_contacts_number_statistic.router_ratio)); // 引起黑名单的一阶联系人占比
                                $('.juxin_li43_row52').html(nullFn(_contacts_number_statistic.pct_router_ratio)); // 引起黑名单一阶联系人比例在群体中的百分位
                                $('.juxin_li43_row61').html(nullFn(_contacts_number_statistic.cnt_to_black)); // 主动联系的黑号数
                                $('.juxin_li43_row62').html(nullFn(_contacts_number_statistic.pct_cnt_to_black)); // 主动联系的黑号数在群体中的百分位
                                $('.juxin_li43_row71').html(nullFn(_contacts_number_statistic.cnt_be_black)); // 被动联系的黑号数
                                $('.juxin_li43_row72').html(nullFn(_contacts_number_statistic.pct_cnt_be_black)); // 被动联系的黑号数在群体中的百分位
                                $('.juxin_li43_row81').html(nullFn(_contacts_number_statistic.cnt_black)); // 一阶联系黑号总数
                                $('.juxin_li43_row82').html(nullFn(_contacts_number_statistic.pct_cnt_black)); // 一阶联系黑号总数在群体中的百分位
                                $('.juxin_li43_row91').html(nullFn(_contacts_number_statistic.black_ratio)); // 一阶联系黑号比例
                                $('.juxin_li43_row92').html(nullFn(_contacts_number_statistic.pct_black_ratio)); // 一阶联系黑号比例在群体中的百分位
                                $('.juxin_li43_row101').html(nullFn(_contacts_number_statistic.cnt_black2)); // 二阶联系黑号总数
                                $('.juxin_li43_row102').html(nullFn(_contacts_number_statistic.pct_cnt_black2)); // 二阶联系黑号总数在群体中的百分位
                                $('.juxin_li43_row111').html(nullFn(_contacts_number_statistic.cnt_to_applied)); // 主动联系人中曾为申请人的人数
                                $('.juxin_li43_row112').html(nullFn(_contacts_number_statistic.pct_cnt_to_applied)); // 主动联系人中曾为申请人的人数在群体中的百分位
                                $('.juxin_li43_row121').html(nullFn(_contacts_number_statistic.cnt_be_applied)); // 被动联系人中曾为申请人的人数
                                $('.juxin_li43_row122').html(nullFn(_contacts_number_statistic.pct_cnt_be_applied)); // 被动联系人中曾为申请人的人数在群体中的百分位
                                $('.juxin_li43_row131').html(nullFn(_contacts_number_statistic.cnt_applied)); // 联系人曾为申请人的人数
                                $('.juxin_li43_row132').html(nullFn(_contacts_number_statistic.pct_cnt_applied)); // 联系人曾为申请人的人数，前两项合并去重在群体中的百分位
                            }else{
                                $('.juxin_li43_row11, .juxin_li43_row12, .juxin_li43_row21, .juxin_li43_row22, .juxin_li43_row31, .juxin_li43_row32, .juxin_li43_row41, .juxin_li43_row42, .juxin_li43_row51, .juxin_li43_row52, .juxin_li43_row61, .juxin_li43_row62, .juxin_li43_row71, .juxin_li43_row72, .juxin_li43_row81, .juxin_li43_row82, .juxin_li43_row91, .juxin_li43_row92, .juxin_li43_row101, .juxin_li43_row102, .juxin_li43_row111, .juxin_li43_row112, .juxin_li43_row121, .juxin_li43_row122, .juxin_li43_row131, .juxin_li43_row132').html('--');
                            }

                            // 联系人权重R、F、M相关字段(rfm)
                            var _contacts_rfm = _user_gray.contacts_rfm;
                            if(_contacts_rfm){
                                $('.juxin_li44_row11').html(nullFn(timestampToTime(_contacts_rfm.recent_time_to_all))); // 与所有联系人的最近主动通话时间
                                $('.juxin_li44_row12').html(nullFn(_contacts_rfm.call_cnt_be_black)); // 与黑号的被动总通话次数
                                $('.juxin_li44_row21').html(nullFn(timestampToTime(_contacts_rfm.recent_time_be_all))); // 与所有联系人的最近被动通话时间
                                $('.juxin_li44_row22').html(nullFn(_contacts_rfm.call_cnt_to_applied)); // 与申请人的主动通话次数
                                $('.juxin_li44_row31').html(nullFn(timestampToTime(_contacts_rfm.recent_time_to_black))); // 与黑号的最近主动通话时间
                                $('.juxin_li44_row32').html(nullFn(_contacts_rfm.call_cnt_be_applied)); // 与申请人的被动通话次数
                                $('.juxin_li44_row41').html(nullFn(timestampToTime(_contacts_rfm.recent_time_be_black))); // 与黑号的最近被动通话时间
                                $('.juxin_li44_row42').html(nullFn(_contacts_rfm.time_spent_to_all)); // 与所有联系人的主动总通话时长秒
                                $('.juxin_li44_row51').html(nullFn(timestampToTime(_contacts_rfm.recent_time_to_applied))); // 与申请人的最近主动通话时间
                                $('.juxin_li44_row52').html(nullFn(_contacts_rfm.time_spent_be_all)); // 与所有联系人的被动总通话时长秒
                                $('.juxin_li44_row61').html(nullFn(timestampToTime(_contacts_rfm.recent_time_be_applied))); // 与申请人的最近被动通话时间
                                $('.juxin_li44_row62').html(nullFn(_contacts_rfm.time_spent_to_black)); // 与黑号的主动总通话时长秒
                                $('.juxin_li44_row71').html(nullFn(_contacts_rfm.call_cnt_to_all)); // 与所有联系人的主动总通话次数
                                $('.juxin_li44_row72').html(nullFn(_contacts_rfm.time_spent_be_black)); // 与黑号的被动总通话时长秒
                                $('.juxin_li44_row81').html(nullFn(_contacts_rfm.call_cnt_be_all)); // 与所有联系人的被动总通话次数
                                $('.juxin_li44_row82').html(nullFn(_contacts_rfm.time_spent_to_applied)); // 与申请人的主动通话时长秒
                                $('.juxin_li44_row91').html(nullFn(_contacts_rfm.call_cnt_to_black)); // 与黑号的主动总通话次数
                                $('.juxin_li44_row92').html(nullFn(_contacts_rfm.time_spent_be_applied)); // 与申请人的被动通话时长秒
                            }else{
                                $('.juxin_li44_row11, .juxin_li44_row12, .juxin_li44_row21, .juxin_li44_row22, .juxin_li44_row31, .juxin_li44_row32, .juxin_li44_row41, .juxin_li44_row42, .juxin_li44_row51, .juxin_li44_row52, .juxin_li44_row61, .juxin_li44_row62, .juxin_li44_row71, .juxin_li44_row72, .juxin_li44_row81, .juxin_li44_row82, .juxin_li44_row91, .juxin_li44_row92').html('--');
                            }

                            // 与联系人的最大亲密度
                            var _contacts_closest = _user_gray.contacts_closest;
                            if(_contacts_closest){
                                $('.juxin_li45_row11').html(nullFn(_contacts_closest.weight_to_all)); // 与所有联系人的最大主动联系亲密度
                                $('.juxin_li45_row12').html(nullFn(_contacts_closest.weight_black)); // 与黑号的最大互动联系亲密度
                                $('.juxin_li45_row21').html(nullFn(_contacts_closest.weight_be_all)); // 与所有联系人的最大被动联系亲密度
                                $('.juxin_li45_row22').html(nullFn(_contacts_closest.weight_to_applied)); // 与申请人的最大主动联系亲密度
                                $('.juxin_li45_row31').html(nullFn(_contacts_closest.weight_all)); // 与所有联系人的最大互动联系亲密度
                                $('.juxin_li45_row32').html(nullFn(_contacts_closest.weight_be_applied)); // 与申请人的最大被动联系亲密度
                                $('.juxin_li45_row41').html(nullFn(_contacts_closest.weight_to_black)); // 与黑号的最大主动联系亲密度
                                $('.juxin_li45_row42').html(nullFn(_contacts_closest.weight_applied)); // 与申请人的最大互动联系亲密度
                                $('.juxin_li45_row51').html(nullFn(_contacts_closest.weight_be_black)); // 与黑号的最大被动联系亲密度
                            }else{
                                $('.juxin_li45_row11, .juxin_li45_row12, .juxin_li45_row21, .juxin_li45_row22, .juxin_li45_row31, .juxin_li45_row32, .juxin_li45_row41, .juxin_li45_row42, .juxin_li45_row51').html('--');
                            }

                            // 联系人灰度分信息
                            var _contacts_gray_score = _user_gray.contacts_gray_score;
                            if(_contacts_gray_score){
                                $('.juxin_li46_row11').html(nullFn(_contacts_gray_score.most_familiar_to_all)); // 主动联系最亲密联系人的灰度分
                                $('.juxin_li46_row12').html(nullFn(_contacts_gray_score.to_min)); // 主动联系的联系人的最低灰度分
                                $('.juxin_li46_row21').html(nullFn(_contacts_gray_score.most_familiar_be_all)); // 被动联系最亲密联系人的灰度分
                                $('.juxin_li46_row22').html(nullFn(_contacts_gray_score.be_max)); // 被动联系的联系人的最高灰度分
                                $('.juxin_li46_row31').html(nullFn(_contacts_gray_score.most_familiar_all)); // 互动联系最亲密联系人的灰度分
                                $('.juxin_li46_row32').html(nullFn(_contacts_gray_score.be_mean)); // 被动联系的联系人的平均灰度分
                                $('.juxin_li46_row41').html(nullFn(_contacts_gray_score.most_familiar_to_applied)); // 主动联系最亲密申请人的灰度分
                                $('.juxin_li46_row42').html(nullFn(_contacts_gray_score.be_min)); // 被动联系的联系人的最低灰度分
                                $('.juxin_li46_row51').html(nullFn(_contacts_gray_score.most_familiar_be_all)); // 被动联系最亲密申请人的灰度分
                                $('.juxin_li46_row52').html(nullFn(_contacts_gray_score.max)); // 联系人的最高灰度分
                                $('.juxin_li46_row61').html(nullFn(_contacts_gray_score.most_familiar_applied)); // 互动联系最亲密申请人的灰度分
                                $('.juxin_li46_row62').html(nullFn(_contacts_gray_score.mean)); // 联系人的平均灰度分
                                $('.juxin_li46_row71').html(nullFn(_contacts_gray_score.to_max)); // 主动联系的联系人的最高灰度分
                                $('.juxin_li46_row72').html(nullFn(_contacts_gray_score.min)); // 联系人的最低灰度分
                                $('.juxin_li46_row81').html(nullFn(_contacts_gray_score.to_mean)); // 主动联系的联系人的平均灰度分
                            }else{
                                $('.juxin_li46_row11, .juxin_li46_row12, .juxin_li46_row21, .juxin_li46_row22, .juxin_li46_row31, .juxin_li46_row32, .juxin_li46_row41, .juxin_li46_row42, .juxin_li46_row51, .juxin_li46_row52, .juxin_li46_row61, .juxin_li46_row62, .juxin_li46_row71, .juxin_li46_row72, .juxin_li46_row81').html('--');
                            }

                            // 联系人的分布
                            var _contacts_relation_distribution = _user_gray.contacts_relation_distribution;
                            if(_contacts_relation_distribution){
                                $('.juxin_li47_row11').html(nullFn(_contacts_relation_distribution.to_is_familiar)); // 主动联系的亲密联系人数
                                $('.juxin_li47_row12').html(nullFn(_contacts_relation_distribution.be_not_familiar)); // 被动联系的非亲密联系人数
                                $('.juxin_li47_row21').html(nullFn(_contacts_relation_distribution.to_median_familiar)); // 主动联系的中等亲密联系人数
                                $('.juxin_li47_row22').html(nullFn(_contacts_relation_distribution.is_familiar)); // 互动联系的亲密联系人数
                                $('.juxin_li47_row31').html(nullFn(_contacts_relation_distribution.to_not_familiar)); // 主动联系的非亲密联系人数
                                $('.juxin_li47_row32').html(nullFn(_contacts_relation_distribution.median_familiar)); // 互动联系的中等亲密联系人数
                                $('.juxin_li47_row41').html(nullFn(_contacts_relation_distribution.be_is_familiar)); // 被动联系的亲密联系人数
                                $('.juxin_li47_row42').html(nullFn(_contacts_relation_distribution.not_familiar)); // 互动联系的非亲密联系人数
                                $('.juxin_li47_row51').html(nullFn(_contacts_relation_distribution.be_median_familiar)); // 被动联系的中等亲密联系人数
                            }else{
                                $('.juxin_li47_row11, .juxin_li47_row12, .juxin_li47_row21, .juxin_li47_row22, .juxin_li47_row31, .juxin_li47_row32, .juxin_li47_row41, .juxin_li47_row42, .juxin_li47_row51').html('--');
                            }

                            // 联系人的查询历史
                            var _contacts_query = _user_gray.contacts_query;
                            if(_contacts_query){
                                $('.juxin_li48_row11').html(nullFn(timestampToTime(_contacts_query.to_recent_query_time))); // 半年内主动联系的人的最近一次查询时间
                                $('.juxin_li48_row12').html(nullFn(_contacts_query.query_cnt_12)); // 12月内联系人的查询次数
                                $('.juxin_li48_row21').html(nullFn(timestampToTime(_contacts_query.be_recent_query_time))); // 半年内被动联系的人的最近一次查询时间
                                $('.juxin_li48_row22').html(nullFn(_contacts_query.to_org_cnt_05)); // 半月内主动联系的人的查询机构数
                                $('.juxin_li48_row31').html(nullFn(_contacts_query.to_query_cnt_05)); // 半月内主动联系的人的查询次数
                                $('.juxin_li48_row32').html(nullFn(_contacts_query.be_org_cnt_05)); // 半月内被动联系的人的查询机构数
                                $('.juxin_li48_row41').html(nullFn(_contacts_query.be_query_cnt_05)); // 半月内被动联系的人的查询次数
                                $('.juxin_li48_row42').html(nullFn(_contacts_query.org_cnt_05)); // 半月内联系人的查询机构数
                                $('.juxin_li48_row51').html(nullFn(_contacts_query.query_cnt_05)); // 半月内联系人的查询次数
                                $('.juxin_li48_row52').html(nullFn(_contacts_query.to_org_cnt_1)); // 1月内主动联系的人的查询机构数
                                $('.juxin_li48_row61').html(nullFn(_contacts_query.to_query_cnt_1)); // 1月内主动联系的人的查询次数
                                $('.juxin_li48_row62').html(nullFn(_contacts_query.be_org_cnt_1)); // 1月内被动联系的人的查询机构数
                                $('.juxin_li48_row71').html(nullFn(_contacts_query.be_query_cnt_1)); // 1月内被动联系的人的查询次数
                                $('.juxin_li48_row72').html(nullFn(_contacts_query.org_cnt_1)); // 1月内联系人的查询机构数
                                $('.juxin_li48_row81').html(nullFn(_contacts_query.query_cnt_1)); // 1月内联系人的查询次数
                                $('.juxin_li48_row82').html(nullFn(_contacts_query.to_org_cnt_2)); // 2月内主动联系的人的查询机构数
                                $('.juxin_li48_row91').html(nullFn(_contacts_query.to_query_cnt_2)); // 2月内主动联系的人的查询次数
                                $('.juxin_li48_row92').html(nullFn(_contacts_query.be_org_cnt_2)); // 2月内被动联系的人的查询机构数
                                $('.juxin_li48_row101').html(nullFn(_contacts_query.be_query_cnt_2)); // 2月内被动联系的人的查询次数
                                $('.juxin_li48_row102').html(nullFn(_contacts_query.org_cnt_2)); // 2月内联系人的查询机构数
                                $('.juxin_li48_row111').html(nullFn(_contacts_query.query_cnt_2)); // 2月内联系人的查询次数
                                $('.juxin_li48_row112').html(nullFn(_contacts_query.to_org_cnt_3)); // 3月内主动联系的人的查询机构数
                                $('.juxin_li48_row121').html(nullFn(_contacts_query.to_query_cnt_3)); // 3月内主动联系的人的查询次数
                                $('.juxin_li48_row122').html(nullFn(_contacts_query.be_org_cnt_3)); // 3月内被动联系的人的查询机构数
                                $('.juxin_li48_row131').html(nullFn(_contacts_query.be_query_cnt_3)); // 3月内被动联系的人的查询次数
                                $('.juxin_li48_row132').html(nullFn(_contacts_query.org_cnt_3)); // 3月内联系人的查询机构数
                                $('.juxin_li48_row141').html(nullFn(_contacts_query.query_cnt_3)); // 3月内联系人的查询次数
                                $('.juxin_li48_row142').html(nullFn(_contacts_query.to_org_cnt_6)); // 6月内主动联系的人的查询机构数
                                $('.juxin_li48_row151').html(nullFn(_contacts_query.to_query_cnt_6)); // 6月内主动联系的人的查询次数
                                $('.juxin_li48_row152').html(nullFn(_contacts_query.be_org_cnt_6)); // 6月内被动联系的人的查询机构数
                                $('.juxin_li48_row161').html(nullFn(_contacts_query.be_query_cnt_6)); // 6月内被动联系的人的查询次数
                                $('.juxin_li48_row162').html(nullFn(_contacts_query.org_cnt_6)); // 6月内联系人的查询机构数
                                $('.juxin_li48_row171').html(nullFn(_contacts_query.query_cnt_6)); // 6月内联系人的查询次数
                                $('.juxin_li48_row172').html(nullFn(_contacts_query.to_org_cnt_9)); // 9月内主动联系的人的查询机构数
                                $('.juxin_li48_row181').html(nullFn(_contacts_query.to_query_cnt_9)); // 9月内主动联系的人的查询次数
                                $('.juxin_li48_row182').html(nullFn(_contacts_query.be_org_cnt_9)); // 9月内被动联系的人的查询机构数
                                $('.juxin_li48_row191').html(nullFn(_contacts_query.be_query_cnt_9)); // 9月内被动联系的人的查询次数
                                $('.juxin_li48_row192').html(nullFn(_contacts_query.org_cnt_9)); // 9月内联系人的查询机构数
                                $('.juxin_li48_row201').html(nullFn(_contacts_query.query_cnt_9)); // 9月内联系人的查询次数
                                $('.juxin_li48_row202').html(nullFn(_contacts_query.to_org_cnt_12)); // 12月内主动联系的人的查询机构数
                                $('.juxin_li48_row211').html(nullFn(_contacts_query.to_query_cnt_12)); // 12月内主动联系的人的查询次数
                                $('.juxin_li48_row212').html(nullFn(_contacts_query.be_org_cnt_12)); // 12月内被动联系的人的查询机构数
                                $('.juxin_li48_row221').html(nullFn(_contacts_query.be_query_cnt_12)); // 12月内被动联系的人的查询次数
                                $('.juxin_li48_row222').html(nullFn(_contacts_query.org_cnt_12)); // 12月内联系人的查询机构数
                            }else{
                                $('.juxin_li48_row11, .juxin_li48_row12, .juxin_li48_row21, .juxin_li48_row22, .juxin_li48_row31, .juxin_li48_row32, .juxin_li48_row41, .juxin_li48_row42, .juxin_li48_row51, .juxin_li48_row52, .juxin_li48_row61, .juxin_li48_row62, .juxin_li48_row71, .juxin_li48_row72, .juxin_li48_row81, .juxin_li48_row82, .juxin_li48_row91, .juxin_li48_row92, .juxin_li48_row101, .juxin_li48_row102, .juxin_li48_row111, .juxin_li48_row112, .juxin_li48_row121, .juxin_li48_row122, .juxin_li48_row131, .juxin_li48_row132, .juxin_li48_row141, .juxin_li48_row142, .juxin_li48_row151, .juxin_li48_row152, .juxin_li48_row161, .juxin_li48_row162, .juxin_li48_row171, .juxin_li48_row172, .juxin_li48_row181, .juxin_li48_row182, .juxin_li48_row191, .juxin_li48_row192, .juxin_li48_row201, .juxin_li48_row202, .juxin_li48_row211, .juxin_li48_row212, .juxin_li48_row221, .juxin_li48_row222').html('--');
                            }
                        }else{
                            $('.juxin_li42_row11, .juxin_li42_row12, .juxin_li42_row21, .juxin_li42_row22, .juxin_li42_row31, .juxin_li42_row32').html('--');
                            $('.juxin_li43_row11, .juxin_li43_row12, .juxin_li43_row21, .juxin_li43_row22, .juxin_li43_row31, .juxin_li43_row32, .juxin_li43_row41, .juxin_li43_row42, .juxin_li43_row51, .juxin_li43_row52, .juxin_li43_row61, .juxin_li43_row62, .juxin_li43_row71, .juxin_li43_row72, .juxin_li43_row81, .juxin_li43_row82, .juxin_li43_row91, .juxin_li43_row92, .juxin_li43_row101, .juxin_li43_row102, .juxin_li43_row111, .juxin_li43_row112, .juxin_li43_row121, .juxin_li43_row122, .juxin_li43_row131, .juxin_li43_row132').html('--');
                            $('.juxin_li44_row11, .juxin_li44_row12, .juxin_li44_row21, .juxin_li44_row22, .juxin_li44_row31, .juxin_li44_row32, .juxin_li44_row41, .juxin_li44_row42, .juxin_li44_row51, .juxin_li44_row52, .juxin_li44_row61, .juxin_li44_row62, .juxin_li44_row71, .juxin_li44_row72, .juxin_li44_row81, .juxin_li44_row82, .juxin_li44_row91, .juxin_li44_row92').html('--');
                            $('.juxin_li45_row11, .juxin_li45_row12, .juxin_li45_row21, .juxin_li45_row22, .juxin_li45_row31, .juxin_li45_row32, .juxin_li45_row41, .juxin_li45_row42, .juxin_li45_row51').html('--');
                            $('.juxin_li46_row11, .juxin_li46_row12, .juxin_li46_row21, .juxin_li46_row22, .juxin_li46_row31, .juxin_li46_row32, .juxin_li46_row41, .juxin_li46_row42, .juxin_li46_row51, .juxin_li46_row52, .juxin_li46_row61, .juxin_li46_row62, .juxin_li46_row71, .juxin_li46_row72, .juxin_li46_row81').html('--');
                            $('.juxin_li47_row11, .juxin_li47_row12, .juxin_li47_row21, .juxin_li47_row22, .juxin_li47_row31, .juxin_li47_row32, .juxin_li47_row41, .juxin_li47_row42, .juxin_li47_row51').html('--');
                            $('.juxin_li48_row11, .juxin_li48_row12, .juxin_li48_row21, .juxin_li48_row22, .juxin_li48_row31, .juxin_li48_row32, .juxin_li48_row41, .juxin_li48_row42, .juxin_li48_row51, .juxin_li48_row52, .juxin_li48_row61, .juxin_li48_row62, .juxin_li48_row71, .juxin_li48_row72, .juxin_li48_row81, .juxin_li48_row82, .juxin_li48_row91, .juxin_li48_row92, .juxin_li48_row101, .juxin_li48_row102, .juxin_li48_row111, .juxin_li48_row112, .juxin_li48_row121, .juxin_li48_row122, .juxin_li48_row131, .juxin_li48_row132, .juxin_li48_row141, .juxin_li48_row142, .juxin_li48_row151, .juxin_li48_row152, .juxin_li48_row161, .juxin_li48_row162, .juxin_li48_row171, .juxin_li48_row172, .juxin_li48_row181, .juxin_li48_row182, .juxin_li48_row191, .juxin_li48_row192, .juxin_li48_row201, .juxin_li48_row202, .juxin_li48_row211, .juxin_li48_row212, .juxin_li48_row221, .juxin_li48_row222').html('--');
                        }

                        // 被机构查询数量统计(去重后)/用户注册信息情况
                        var _user_searched_statistic = _dataAll.user_searched_statistic;
                        if(_user_searched_statistic){
                            $('.juxin_li49_row11').html(nullFn(_user_searched_statistic.searched_org_cnt)); // 被机构查询数量
                        }else{
                            $('.juxin_li49_row11').html('--');
                        }
                        var _user_register_orgs = _dataAll.user_register_orgs;
                        if(_user_register_orgs){
                            $('.juxin_li49_row12').html(nullFn(_user_register_orgs.register_cnt)); // 注册总数量
                        }else{
                            $('.juxin_li49_row12').html('--');
                        }

                        // 黑名单信息
                        var _user_blacklist =  _dataAll.user_blacklist;
                        if(_user_blacklist){
                            $('.juxin_li410_row11').html(nullFn(idCardEnabled(_user_blacklist.blacklist_name_with_phone))); // 姓名和手机是否在黑名单
                            $('.juxin_li410_row12').html(nullFn(_user_blacklist.blacklist_update_time_name_phone)); // 姓名和手机黑名单信息更新时间
                            $('.juxin_li410_row21').html(nullFn(idCardEnabled(_user_blacklist.blacklist_name_with_idcard))); // 身份证和姓名是否在黑名单
                            $('.juxin_li410_row22').html(nullFn(_user_blacklist.blacklist_update_time_name_idcard)); // 身份证和姓名黑名单信息更新时间
                            $('.juxin_li410_row31').html(nullFn(_user_blacklist.blacklist_category)); // 黑名单分类
                        }else{
                            $('.juxin_li410_row11, .juxin_li410_row12, .juxin_li410_row21, .juxin_li410_row22, .juxin_li410_row31').html('--');
                        }

                        // 消费标签信息
                        var _consumer_label = _dataAll.consumer_label;
                        if(_consumer_label){
                            $('.juxin_li411_row11').html(nullFn(conLabelInfo(_consumer_label.if_own_cc))); // 是否有信用卡
                            $('.juxin_li411_row12').html(nullFn(conLabelInfo(_consumer_label.if_pay_ins))); // 是否购买保险产品
                            $('.juxin_li411_row21').html(nullFn(conLabelInfo(_consumer_label.own_wg_cc))); // 是否有白金卡
                            $('.juxin_li411_row22').html(nullFn(conLabelInfo(_consumer_label.if_fin_buy_pre6))); // 是否购买理财产品
                            $('.juxin_li411_row31').html(nullFn(conLabelInfo(_consumer_label.if_own_car))); // 是否有车
                            $('.juxin_li411_row32').html(nullFn(_consumer_label.cst_score_finally)); // 消费能力指数
                        }else{
                            $('.juxin_li411_row11, .juxin_li411_row12, .juxin_li411_row21, .juxin_li411_row22, .juxin_li411_row31, .juxin_li411_row32').html('--');
                        }

                        // 手机号码存疑
                        var _user_phone_suspicion = _dataAll.user_phone_suspicion;
                        if(_user_phone_suspicion){
                            // 用这个手机号码绑定的其他身份证
                            var _phone_with_other_idcards = _user_phone_suspicion.phone_with_other_idcards;
                            if(_phone_with_other_idcards.length > 0){
                                var _phone_with_other_idcards_detail = $.map(_phone_with_other_idcards, function (o, i) {
                                    return '<tr><td>'+(i+1)+'</td><td>'+nullFn(o.susp_idcard)+'</td><td>'+nullFn(o.susp_updt)+'</td></tr>';
                                });
                                $('._phone_with_other_idcards_con').html('').append(_phone_with_other_idcards_detail);
                            }

                            // 用这个手机号码绑定的其他姓名
                            var _phone_with_other_names = _user_phone_suspicion.phone_with_other_names;
                            if(_phone_with_other_names.length > 0){
                                var _phone_with_other_names_detail = $.map(_phone_with_other_names, function (o, i) {
                                    return '<tr><td>'+(i+1)+'</td><td>'+nullFn(o.susp_name)+'</td><td>'+nullFn(o.susp_updt)+'</td></tr>';
                                });
                                $('._phone_with_other_names_con').html('').append(_phone_with_other_names_detail);
                            }

                            // 电话号码在哪些类型的机构中使用过
                            var _phone_applied_in_orgs = _user_phone_suspicion.phone_applied_in_orgs;
                            if(_phone_applied_in_orgs.length > 0){
                                var _phone_applied_in_orgs_detail = $.map(_phone_applied_in_orgs, function (o, i) {
                                    return '<tr><td>'+(i+1)+'</td><td>'+nullFn(o.susp_org_type)+'</td><td>'+nullFn(o.susp_updt)+'</td></tr>';
                                });
                                $('.phone_applied_in_orgs_con').html('').append(_phone_applied_in_orgs_detail);
                            }
                        }

                        // 身份证号码存疑
                        var _user_idcard_suspicion = _dataAll.user_idcard_suspicion;
                        if(_user_idcard_suspicion){
                            // 用这个身份证号码绑定的其他姓名
                            var _idcard_with_other_names = _user_idcard_suspicion.idcard_with_other_names;
                            if(_idcard_with_other_names.length > 0){
                                var _idcard_with_other_names_detail = $.map(_idcard_with_other_names, function (o, i) {
                                    return '<tr><td>'+(i+1)+'</td><td>'+nullFn(o.susp_name)+'</td><td>'+nullFn(o.susp_updt)+'</td></tr>';
                                });
                                $('._idcard_with_other_names_con').html('').append(_idcard_with_other_names_detail);
                            }

                            // 存疑手机号码
                            var _idcard_with_other_phones = _user_idcard_suspicion.idcard_with_other_phones;
                            if(_idcard_with_other_phones.length > 0){
                                var _idcard_with_other_phones_detail = $.map(_idcard_with_other_phones, function (o, i) {
                                    return '<tr><td>'+(i+1)+'</td><td>'+nullFn(o.susp_phone)+'</td><td>'+nullFn(o.susp_updt)+'</td></tr>';
                                });
                                $('._idcard_with_other_phones_con').html('').append(_idcard_with_other_phones_detail);
                            }

                            // 身份证在那些类型的机构中使用过
                            var _idcard_applied_in_orgs = _user_idcard_suspicion.idcard_applied_in_orgs;
                            if(_idcard_applied_in_orgs.length > 0){
                                var _idcard_applied_in_orgs_detail = $.map(_idcard_applied_in_orgs, function (o, i) {
                                    return '<tr><td>'+(i+1)+'</td><td>'+nullFn(o.susp_org_type)+'</td><td>'+nullFn(o.susp_updt)+'</td></tr>';
                                });
                                $('._idcard_applied_in_orgs_con').html('').append(_idcard_applied_in_orgs_detail);
                            }
                        }

                        // 用户被机构查询历史
                        var _user_searched_history_by_orgs = _dataAll.user_searched_history_by_orgs;
                        if(_user_searched_history_by_orgs.length > 0){
                            var _user_searched_history_by_orgs_detail = $.map(_user_searched_history_by_orgs, function (o, i) {
                                return '<tr><td>'+(i+1)+'</td><td>'+nullFn(o.searched_org)+'</td><td>'+nullFn(isCurror(o.org_self))+'</td><td>'+nullFn(o.searched_date)+'</td></tr>';
                            });
                            $('._user_searched_history_by_orgs_con').html('').append(_user_searched_history_by_orgs_detail);
                        }
                    }else{
                        $('.juxin_li41_row11, .juxin_li41_row12, .juxin_li41_row21, .juxin_li41_row22, .juxin_li41_row31, .juxin_li41_row32, .juxin_li41_row41, .juxin_li41_row42').html('--');
                        $('.juxin_li42_row11, .juxin_li42_row12, .juxin_li42_row21, .juxin_li42_row22, .juxin_li42_row31, .juxin_li42_row32').html('--');
                        $('.juxin_li43_row11, .juxin_li43_row12, .juxin_li43_row21, .juxin_li43_row22, .juxin_li43_row31, .juxin_li43_row32, .juxin_li43_row41, .juxin_li43_row42, .juxin_li43_row51, .juxin_li43_row52, .juxin_li43_row61, .juxin_li43_row62, .juxin_li43_row71, .juxin_li43_row72, .juxin_li43_row81, .juxin_li43_row82, .juxin_li43_row91, .juxin_li43_row92, .juxin_li43_row101, .juxin_li43_row102, .juxin_li43_row111, .juxin_li43_row112, .juxin_li43_row121, .juxin_li43_row122, .juxin_li43_row131, .juxin_li43_row132').html('--');
                        $('.juxin_li44_row11, .juxin_li44_row12, .juxin_li44_row21, .juxin_li44_row22, .juxin_li44_row31, .juxin_li44_row32, .juxin_li44_row41, .juxin_li44_row42, .juxin_li44_row51, .juxin_li44_row52, .juxin_li44_row61, .juxin_li44_row62, .juxin_li44_row71, .juxin_li44_row72, .juxin_li44_row81, .juxin_li44_row82, .juxin_li44_row91, .juxin_li44_row92').html('--');
                        $('.juxin_li45_row11, .juxin_li45_row12, .juxin_li45_row21, .juxin_li45_row22, .juxin_li45_row31, .juxin_li45_row32, .juxin_li45_row41, .juxin_li45_row42, .juxin_li45_row51').html('--');
                        $('.juxin_li46_row11, .juxin_li46_row12, .juxin_li46_row21, .juxin_li46_row22, .juxin_li46_row31, .juxin_li46_row32, .juxin_li46_row41, .juxin_li46_row42, .juxin_li46_row51, .juxin_li46_row52, .juxin_li46_row61, .juxin_li46_row62, .juxin_li46_row71, .juxin_li46_row72, .juxin_li46_row81').html('--');
                        $('.juxin_li47_row11, .juxin_li47_row12, .juxin_li47_row21, .juxin_li47_row22, .juxin_li47_row31, .juxin_li47_row32, .juxin_li47_row41, .juxin_li47_row42, .juxin_li47_row51').html('--');
                        $('.juxin_li48_row11, .juxin_li48_row12, .juxin_li48_row21, .juxin_li48_row22, .juxin_li48_row31, .juxin_li48_row32, .juxin_li48_row41, .juxin_li48_row42, .juxin_li48_row51, .juxin_li48_row52, .juxin_li48_row61, .juxin_li48_row62, .juxin_li48_row71, .juxin_li48_row72, .juxin_li48_row81, .juxin_li48_row82, .juxin_li48_row91, .juxin_li48_row92, .juxin_li48_row101, .juxin_li48_row102, .juxin_li48_row111, .juxin_li48_row112, .juxin_li48_row121, .juxin_li48_row122, .juxin_li48_row131, .juxin_li48_row132, .juxin_li48_row141, .juxin_li48_row142, .juxin_li48_row151, .juxin_li48_row152, .juxin_li48_row161, .juxin_li48_row162, .juxin_li48_row171, .juxin_li48_row172, .juxin_li48_row181, .juxin_li48_row182, .juxin_li48_row191, .juxin_li48_row192, .juxin_li48_row201, .juxin_li48_row202, .juxin_li48_row211, .juxin_li48_row212, .juxin_li48_row221, .juxin_li48_row222').html('--');
                        $('.juxin_li49_row11, .juxin_li49_row12').html('--');
                        $('.juxin_li410_row11, .juxin_li410_row12, .juxin_li410_row21, .juxin_li410_row22, .juxin_li410_row31').html('--');
                        $('.juxin_li411_row11, .juxin_li411_row12, .juxin_li411_row21, .juxin_li411_row22, .juxin_li411_row31, .juxin_li411_row32').html('--');
                    }
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
                    $('.juxin_li41_row11, .juxin_li41_row12, .juxin_li41_row21, .juxin_li41_row22, .juxin_li41_row31, .juxin_li41_row32, .juxin_li41_row41, .juxin_li41_row42').html('--');
                    $('.juxin_li42_row11, .juxin_li42_row12, .juxin_li42_row21, .juxin_li42_row22, .juxin_li42_row31, .juxin_li42_row32').html('--');
                    $('.juxin_li43_row11, .juxin_li43_row12, .juxin_li43_row21, .juxin_li43_row22, .juxin_li43_row31, .juxin_li43_row32, .juxin_li43_row41, .juxin_li43_row42, .juxin_li43_row51, .juxin_li43_row52, .juxin_li43_row61, .juxin_li43_row62, .juxin_li43_row71, .juxin_li43_row72, .juxin_li43_row81, .juxin_li43_row82, .juxin_li43_row91, .juxin_li43_row92, .juxin_li43_row101, .juxin_li43_row102, .juxin_li43_row111, .juxin_li43_row112, .juxin_li43_row121, .juxin_li43_row122, .juxin_li43_row131, .juxin_li43_row132').html('--');
                    $('.juxin_li44_row11, .juxin_li44_row12, .juxin_li44_row21, .juxin_li44_row22, .juxin_li44_row31, .juxin_li44_row32, .juxin_li44_row41, .juxin_li44_row42, .juxin_li44_row51, .juxin_li44_row52, .juxin_li44_row61, .juxin_li44_row62, .juxin_li44_row71, .juxin_li44_row72, .juxin_li44_row81, .juxin_li44_row82, .juxin_li44_row91, .juxin_li44_row92').html('--');
                    $('.juxin_li45_row11, .juxin_li45_row12, .juxin_li45_row21, .juxin_li45_row22, .juxin_li45_row31, .juxin_li45_row32, .juxin_li45_row41, .juxin_li45_row42, .juxin_li45_row51').html('--');
                    $('.juxin_li46_row11, .juxin_li46_row12, .juxin_li46_row21, .juxin_li46_row22, .juxin_li46_row31, .juxin_li46_row32, .juxin_li46_row41, .juxin_li46_row42, .juxin_li46_row51, .juxin_li46_row52, .juxin_li46_row61, .juxin_li46_row62, .juxin_li46_row71, .juxin_li46_row72, .juxin_li46_row81').html('--');
                    $('.juxin_li47_row11, .juxin_li47_row12, .juxin_li47_row21, .juxin_li47_row22, .juxin_li47_row31, .juxin_li47_row32, .juxin_li47_row41, .juxin_li47_row42, .juxin_li47_row51').html('--');
                    $('.juxin_li48_row11, .juxin_li48_row12, .juxin_li48_row21, .juxin_li48_row22, .juxin_li48_row31, .juxin_li48_row32, .juxin_li48_row41, .juxin_li48_row42, .juxin_li48_row51, .juxin_li48_row52, .juxin_li48_row61, .juxin_li48_row62, .juxin_li48_row71, .juxin_li48_row72, .juxin_li48_row81, .juxin_li48_row82, .juxin_li48_row91, .juxin_li48_row92, .juxin_li48_row101, .juxin_li48_row102, .juxin_li48_row111, .juxin_li48_row112, .juxin_li48_row121, .juxin_li48_row122, .juxin_li48_row131, .juxin_li48_row132, .juxin_li48_row141, .juxin_li48_row142, .juxin_li48_row151, .juxin_li48_row152, .juxin_li48_row161, .juxin_li48_row162, .juxin_li48_row171, .juxin_li48_row172, .juxin_li48_row181, .juxin_li48_row182, .juxin_li48_row191, .juxin_li48_row192, .juxin_li48_row201, .juxin_li48_row202, .juxin_li48_row211, .juxin_li48_row212, .juxin_li48_row221, .juxin_li48_row222').html('--');
                    $('.juxin_li49_row11, .juxin_li49_row12').html('--');
                    $('.juxin_li410_row11, .juxin_li410_row12, .juxin_li410_row21, .juxin_li410_row22, .juxin_li410_row31').html('--');
                    $('.juxin_li411_row11, .juxin_li411_row12, .juxin_li411_row21, .juxin_li411_row22, .juxin_li411_row31, .juxin_li411_row32').html('--');
                }
            }
        })
    });

    //face++&face++接口调用
    $('.Face').click(function () {
        $(".facemore").click();
    })
    $(".facemore").click(function () {
        var obj = new Object();
        obj.intoCode = getParam.intoCode;
        // obj.intoCode = '120171215142909644727';
        obj.bigdataType = 'bigData8001';
        obj.childType = 'app_verifyface';
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: 'POST',
            contentType: "text/html; charset=UTF-8",
            url: "/api/obtain/getBigDataByType",//FACE++
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if (data.rspCode === '000000') {
                    var _data = data.body;
                    if (_data != null) {
                        var _result_faceid = _data.result_faceid;
                        if(_result_faceid != null && _result_faceid != ''){
                            $(".face_one_1").html(nullFn(_result_faceid.confidence)); // 申请表数据点
                            var _thresholds =  _result_faceid.thresholds;
                            if(_thresholds != null && _thresholds != ''){
                                $(".face_one_2").html(nullFn(_thresholds['1e-3'])); // 对比置信度阈值_1e_3
                                $(".face_one_3").html(nullFn(_thresholds['1e-4'])); // 对比置信度阈值_1e_4
                                $(".face_two_1").html(nullFn(_thresholds['1e-5'])); // 对比置信度阈值_1e_5
                            }else{
                                $(".face_one_2, .face_one_3, .face_one_4").html('--');
                            }
                        }else{
                            $(".face_one_1, .face_one_2, .face_one_3, .face_one_4").html('--');
                        }
                        var _face_genuineness = _data.face_genuineness;
                        if(_face_genuineness != null && _face_genuineness != ''){
                            $(".face_two_2").html(nullFn(_face_genuineness.synthetic_face_confidence)); // 软件合成脸的置信度
                            $(".face_two_3").html(nullFn(_face_genuineness.synthetic_face_threshold)); // 软件合成脸的置信度阈值
                            $(".face_three_1").html(nullFn(_face_genuineness.mask_confidence)); // 面具的置信度
                            $(".face_three_2").html(nullFn(_face_genuineness.mask_threshold)); // 面具的置信度阈值
                            $(".face_four_1").html(nullFn(_face_genuineness.screen_replay_confidence)); // 屏幕翻拍的置信度
                            $(".face_four_2").html(nullFn(_face_genuineness.screen_replay_threshold)); // 屏幕翻拍的置信度阈值
                        }else{
                            $(".face_two_2,.face_two_3,.face_three_1,.face_three_2,.face_four_1,.face_four_2").html('--');
                        }
                    } else {
                        $(".face_one_1,.face_one_2,.face_one_3,.face_two_1,.face_two_2,.face_two_3,.face_three_1,.face_three_2,.face_four_1,.face_four_2").html('--');
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
                    $(".face_one_1,.face_one_2,.face_one_3,.face_two_1,.face_two_2,.face_two_3,.face_three_1,.face_three_2,.face_four_1,.face_four_2").html('--');
                }
            }
        })
    });
    // 百融
    $(".bairong_one_tit").click(function () {
        var obj = new Object();
        obj.intoCode = getParam.intoCode;
        // obj.intoCode = '120171215174252198885';
        obj.bigdataType = 'bigData6001';  // 百融
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: 'POST',
            contentType: "text/html; charset=UTF-8",
            url: "/api/obtain/bigdata",// 大数据-百融
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if (data.rspCode === '000000') {
                    var _data = data.body;
                    if (_data != null && _data != '' && _data != undefined) {
                        // _data.br_id_exist ==> -99:暂无数据; 0:未命中; 1:命中
                        if (_data.br_id_exist == '1') {
                            $('.bairong_one_1').html('是');
                        } else if (_data.br_id_exist == '0') {
                            $('.bairong_one_1').html('否');
                        } else if (_data.br_id_exist == '-99') {
                            $('.bairong_one_1').html(_data.msg);
                        }
                    } else {
                        $('.bairong_one_1').html('--');
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
                    $('.bairong_one_1').html('--');
                }
            }
        })
    });
    //汇法网
    $('.huifa').click(function () {
        $('.huifa_perCase_con,.huifa_perTax_con,.huifa_perPerform_con,.huifa_perRushOwe_con,.huifa_perBrkProm_con,.huifa_perLoanOver_con').html('');
        var obj = new Object();
        obj.intoCode = getParam.intoCode;
        // obj.intoCode = '120171212161912662995';
        // obj.intoCode = '120180101082901609485';//代梦飞
        obj.bigdataType = 'bigData4001';
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: 'POST',
            contentType: "text/html; charset=UTF-8",
            url: "/api/obtain/bigdata",//大数据-征信评分
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if (data.rspCode === '000000') {
                    var _data = data.body;
                    if (_data != null) {
                        $('.hfw_crml_case_num').html(nullFn(_data.hfw_crml_case_num));//汇法网刑事案件数量
                        $('.hfw_nsetd_amt_gt_1k_case_num').html(nullFn(_data.hfw_nsetd_amt_gt_1k_case_num));//汇法网未结案执行大于1000的数量
                        $('.hfw_2year_setd_amt_ge_5k_case_num').html(nullFn(_data.hfw_2year_setd_amt_ge_5k_case_num));//汇法网2年内已结案执行大于5000的数量
                        var person_con = _data.HFW01_7001_01.models;
                        if (person_con.length > 0) {
                            //个人案例信息表
                            for (var i = 0; i < person_con.length; i++) {
                                if (person_con[i].type == '案例信息') {
                                    var perCaseList = '<tr>' +
                                        '                <td>' + nullFn(person_con[i].name) + '</td>' +//姓名
                                        '                <td>' + nullFn(person_con[i].json.sex) + '</td>' +//性别
                                        '                <td>' + nullFn(person_con[i].cidorcode) + '</td>' +//身份证号
                                        '                <td>' + nullFn(person_con[i].json.birthday) + '</td>' +//生日
                                        '                <td>' + nullFn(person_con[i].json.ptype) + '</td>' +//当事人类型
                                        '                <td>' + nullFn(person_con[i].json.date) + '</td>' +//审结日期
                                        '                <td>' + nullFn(person_con[i].json.title) + '</td>' +//案件标题
                                        '                <td>' + nullFn(person_con[i].json.casetype) + '</td>' +//案件类型
                                        '                <td>' + nullFn(person_con[i].json.casenum) + '</td>' +//案件字号
                                        '                <td>' + nullFn(person_con[i].json.objection) + '</td>' +//异议内容
                                        '                <td>' + nullFn(person_con[i].json.objectiontime) + '</td>' +//异议时间
                                        '                <td>' + nullFn(person_con[i].json.ownfile) + '</td>' +//原件下载地址
                                        '                <td>' + nullFn(person_con[i].json.pdf) + '</td>' +//PDF下载地址
                                        '                <td>' + nullFn(person_con[i].json.contenthref) + '</td>' +//内容查看地址
                                        '            </tr>';
                                    $('.huifa_perCase_con').append(perCaseList);
                                    $('.huifa_perCase_null').hide();
                                } else if (person_con[i].type == '税务信息') {
                                    var perTaxList = '<tr>' +
                                        '                <td>' + replaceFn(nullFn(person_con[i].json.allmsg)) + '</td>' +//数据所有内容
                                        '                <td>' + nullFn(person_con[i].json.objection) + '</td>' +//异议内容
                                        '                <td>' + nullFn(person_con[i].json.objectiontime) + '</td>' +//异议时间
                                        '            </tr>';
                                    $('.huifa_perTax_con').append(perTaxList);
                                    $('.huifa_perTax_null').hide();
                                } else if (person_con[i].type == '执行信息') {
                                    var perPerformList = '<tr>' +
                                        '                <td>' + nullFn(person_con[i].name) + '</td>' +//	被执行人姓名
                                        '                <td>' + nullFn(person_con[i].json.cidorcode) + '</td>' +//被执行人身份证
                                        '                <td>' + nullFn(person_con[i].json.court) + '</td>' +//执行法院
                                        '                <td>' + nullFn(person_con[i].json.casenum) + '</td>' +//案号
                                        '                <td>' + nullFn(person_con[i].json.statute) + '</td>' +//案件状态
                                        '                <td>' + nullFn(person_con[i].json.money) + '</td>' + //执行标的
                                        '                <td>' + nullFn(person_con[i].json.putrecord) + '</td>' +//立案时间
                                        '                <td>' + nullFn(person_con[i].json.objection) + '</td>' + //异议内容
                                        '                <td>' + nullFn(person_con[i].json.objectiontime) + '</td>' + //异议时间
                                        '            </tr>';
                                    $('.huifa_perPerform_con').append(perPerformList);
                                    $('.huifa_perPerform_null').hide();
                                } else if (person_con[i].type == '催欠公告') {
                                    var perRushOweList = '<tr>' +
                                        '                <td>' + replaceFn(nullFn(person_con[i].json.allmsg)) + '</td>' +//数据所有内容
                                        '                <td>' + nullFn(person_con[i].json.objection) + '</td>' +//异议内容
                                        '                <td>' + nullFn(person_con[i].json.objectiontime) + '</td>' +//异议时间
                                        '            </tr>';
                                    $('.huifa_perRushOwe_con').append(perRushOweList);
                                    $('.huifa_perRushOwe_null').hide();
                                } else if (person_con[i].type == '失信信息') {
                                    var perBrkPromList = '<tr>' +
                                        '                <td>' + nullFn(person_con[i].name) + '</td>' +//	失信人姓名
                                        '                <td>' + nullFn(person_con[i].cidorcode) + '</td>' +//失信人身份证
                                        '                <td>' + nullFn(person_con[i].json.court) + '</td>' +//执行法院
                                        '                <td>' + nullFn(person_con[i].json.casenum) + '</td>' +//案号
                                        '                <td>' + nullFn(person_con[i].json.region) + '</td>' +//省份
                                        '                <td>' + nullFn(person_con[i].json.situation) + '</td>' + //被执行人的履行情况
                                        '                <td>' + nullFn(person_con[i].json.situation2) + '</td>' +//失信被执行人行为具体情形
                                        '                <td>' + nullFn(person_con[i].json.release) + '</td>' + //发布时间
                                        '                <td>' + nullFn(person_con[i].json.putrecord) + '</td>' + //立案时间
                                        '                <td>' + nullFn(person_con[i].json.objection) + '</td>' + //异议内容
                                        '                <td>' + nullFn(person_con[i].json.objectiontime) + '</td>' + //异议时间
                                        '            </tr>';
                                    $('.huifa_perBrkProm_con').append(perBrkPromList);
                                    $('.huifa_perBrkProm_null').hide();
                                } else if (person_con[i].type == '网贷逾期') {
                                    var perLoanOverList = '<tr>' +
                                        '                <td>' + replaceFn(nullFn(person_con[i].json.allmsg)) + '</td>' +//数据所有内容
                                        '                <td>' + nullFn(person_con[i].json.objection) + '</td>' +//异议内容
                                        '                <td>' + nullFn(person_con[i].json.objectiontime) + '</td>' +//异议时间
                                        '            </tr>';
                                    $('.huifa_perLoanOver_con').append(perLoanOverList);
                                    $('.huifa_perLoanOver_null').hide();
                                } else {
                                    $('.huifa_perCase_box .table,.huifa_perTax_box .table,.huifa_perPerform_box .table,.huifa_perRushOwe_box .table,.huifa_perBrkProm_box .table,.huifa_perLoanOver_box .table,.huifa_bigData_box .table').hide();
                                    $('.huifa_perCase_null').show().html('个人案例信息表暂无信息');
                                    $('.huifa_perTax_null').show().html('个人税务信息表暂无信息');
                                    $('.huifa_perPerform_null').show().html('个人执行信息表暂无信息');
                                    $('.huifa_perRushOwe_null').show().html('个人催欠公告表暂无信息');
                                    $('.huifa_perBrkProm_null').show().html('个人失信信息表暂无信息');
                                    $('.huifa_perLoanOver_null').show().html('个人网贷逾期表暂无信息');
                                }
                            }
                        } else {
                            $('.huifa_perCase_box .table,.huifa_perTax_box .table,.huifa_perPerform_box .table,.huifa_perRushOwe_box .table,.huifa_perBrkProm_box .table,.huifa_perLoanOver_box .table,.huifa_bigData_box .table').hide();
                            $('.huifa_perCase_null').show().html('个人案例信息表暂无信息');
                            $('.huifa_perTax_null').show().html('个人税务信息表暂无信息');
                            $('.huifa_perPerform_null').show().html('个人执行信息表暂无信息');
                            $('.huifa_perRushOwe_null').show().html('个人催欠公告表暂无信息');
                            $('.huifa_perBrkProm_null').show().html('个人失信信息表暂无信息');
                            $('.huifa_perLoanOver_null').show().html('个人网贷逾期表暂无信息');
                        }
                    } else {
                        $('.huifa_perCase_box .table,.huifa_perTax_box .table,.huifa_perPerform_box .table,.huifa_perRushOwe_box .table,.huifa_perBrkProm_box .table,.huifa_perLoanOver_box .table,.huifa_bigData_box .table').hide();
                        $('.huifa_perCase_null').show().html('个人案例信息表暂无信息');
                        $('.huifa_perTax_null').show().html('个人税务信息表暂无信息');
                        $('.huifa_perPerform_null').show().html('个人执行信息表暂无信息');
                        $('.huifa_perRushOwe_null').show().html('个人催欠公告表暂无信息');
                        $('.huifa_perBrkProm_null').show().html('个人失信信息表暂无信息');
                        $('.huifa_perLoanOver_null').show().html('个人网贷逾期表暂无信息');
                        $('.hfw_crml_case_num').html('--');//汇法网刑事案件数量
                        $('.hfw_nsetd_amt_gt_1k_case_num').html('--');//汇法网未结案执行大于1000的数量
                        $('.hfw_2year_setd_amt_ge_5k_case_num').html('--');//汇法网2年内已结案执行大于5000的数量
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
                    $('.huifa_perCase_box .table,.huifa_perTax_box .table,.huifa_perPerform_box .table,.huifa_perRushOwe_box .table,.huifa_perBrkProm_box .table,.huifa_perLoanOver_box .table,.huifa_bigData_box .table').hide();
                    $('.huifa_perCase_null').show().html('个人案例信息表暂无信息');
                    $('.huifa_perTax_null').show().html('个人税务信息表暂无信息');
                    $('.huifa_perPerform_null').show().html('个人执行信息表暂无信息');
                    $('.huifa_perRushOwe_null').show().html('个人催欠公告表暂无信息');
                    $('.huifa_perBrkProm_null').show().html('个人失信信息表暂无信息');
                    $('.huifa_perLoanOver_null').show().html('个人网贷逾期表暂无信息');
                    $('.hfw_crml_case_num').html('--');//汇法网刑事案件数量
                    $('.hfw_nsetd_amt_gt_1k_case_num').html('--');//汇法网未结案执行大于1000的数量
                    $('.hfw_2year_setd_amt_ge_5k_case_num').html('--');//汇法网2年内已结案执行大于5000的数量
                }
            }
        })
    })
    //数美
    $('.shumei').click(function () {
        $('.shumei_bulls').click();
    })
    //数美多头
    $('.shumei_bulls').click(function () {
        var obj = new Object();
        obj.intoCode = getParam.intoCode;
        // obj.intoCode = '120171225170338170009';
        obj.bigdataType = 'bigData5001';
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: 'POST',
            contentType: "text/html; charset=UTF-8",
            url: "/api/obtain/bigdata",//大数据-征信评分
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if (data.rspCode === '000000') {
                    var _data = data.body;
                    if (_data != null) {
                        var _detial = _data.SHUMEI01_8009.detail;
                        if (_detial) {
                            $('._loan_applications_7d').html(nullFn(_detial.itfin_loan_applications_7d));//7天内在多少不同网贷平台提出过申请
                            $('._loan_applications_30d').html(nullFn(_detial.itfin_loan_applications_30d));//30天内在多少不同网贷平台提出过申请
                            $('._loan_applications_60d').html(nullFn(_detial.itfin_loan_applications_60d));//60天内在多少不同网贷平台提出过申请
                            $('._loan_applications_90d').html(nullFn(_detial.itfin_loan_applications_90d));//90天内在多少不同网贷平台提出过申请
                            $('._loan_applications_180d').html(nullFn(_detial.itfin_loan_applications_180d));//180天内在多少不同网贷平台提出过申请
                        } else {
                            $('._loan_applications_7d,._loan_applications_30d,._loan_applications_60d,._loan_applications_90d,._loan_applications_180d').html('--');
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
                    $('._loan_applications_7d,._loan_applications_30d,._loan_applications_60d,._loan_applications_90d,._loan_applications_180d').html('--');
                }
            }
        })
    })
    // 数美黑名单 shumei_blacklist
    $('.shumei_blacklist').click(function () {
        var obj = new Object();
        obj.intoCode = getParam.intoCode;
        // obj.intoCode = '120171225170338170009';
        obj.bigdataType = 'bigData5002';
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: 'POST',
            contentType: "text/html; charset=UTF-8",
            url: "/api/obtain/bigdata",//大数据-征信评分
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if (data.rspCode === '000000') {
                    var _data = data.body;
                    if (_data != null) {
                        var _detial = _data.SHUMEI02_8009.detail;
                        $('._bL_overdues').html(nullFn(_detial.itfin_loan_overdues));//该用户在多少不同网贷平台发生了逾期
                        $('._bL_overdue_duration').html(nullFn(_detial.itfin_loan_overdue_duration));//网贷最大逾期时长级别
                        $('._bL_overdues_7d').html(nullFn(_detial.itfin_loan_overdues_7d));//在最近 7 天中，该用户在多少不同网贷平台发生了逾期
                        $('._bL_overdue_duration_7d').html(nullFn(_detial.itfin_loan_overdue_duration_7d));//在最近 7 天中，网贷最大逾期时长级别
                        $('._bL_overdues_30d').html(nullFn(_detial.itfin_loan_overdues_30d));//在最近 30 天中，该用户在多少不同网贷平台发生了逾期
                        $('._bL_overdue_duration_30d').html(nullFn(_detial.itfin_loan_overdue_duration_30d));//在最近 30 天中，网贷最大逾期时长级别
                        $('._bL_overdues_60d').html(nullFn(_detial.itfin_loan_overdues_60d));//在最近 60 天中，该用户在多少不同网贷平台发生了逾期
                        $('._bL_overdue_duration_60d').html(nullFn(_detial.itfin_loan_overdue_duration_60d));//在最近 60 天中，网贷最大逾期时长级别
                        $('._bL_overdues_90d').html(nullFn(_detial.itfin_loan_overdues_90d));//在最近 90 天中，该用户在多少不同网贷平台发生了逾期
                        $('._bL_overdue_duration_90d').html(nullFn(_detial.itfin_loan_overdue_duration_90d));//在最近 90 天中，网贷最大逾期时长级别
                        $('._bL_overdues_180d').html(nullFn(_detial.itfin_loan_overdues_180d));//在最近 180 天中，该用户在多少不同网贷平台发生了逾期
                        $('._bL_overdue_duration_180d').html(nullFn(_detial.itfin_loan_overdue_duration_180d));//在最近 180 天中，网贷最大逾期时长级别
                    } else {
                        $('._bL_overdues,._bL_overdue_duration,._bL_overdues_7d,._bL_overdue_duration_7d,._bL_overdues_30d,._bL_overdue_duration_30d,._bL_overdues_60d,._bL_overdue_duration_60d,._bL_overdues_90d,._bL_overdue_duration_90d,._bL_overdues_180d,._bL_overdue_duration_180d').html('--');
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
                    $('._bL_overdues,._bL_overdue_duration,._bL_overdues_7d,._bL_overdue_duration_7d,._bL_overdues_30d,._bL_overdue_duration_30d,._bL_overdues_60d,._bL_overdue_duration_60d,._bL_overdues_90d,._bL_overdue_duration_90d,._bL_overdues_180d,._bL_overdue_duration_180d').html('--');
                }
            }
        })
    })
    //征信评分
    $('.zhengxin').click(function () {
        var obj = new Object();
        obj.intoCode = getParam.intoCode;
        // obj.intoCode = '120171225212525925725';
        obj.bigdataType = 'bigData7001';
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: 'POST',
            contentType: "text/html; charset=UTF-8",
            url: "/api/obtain/bigdata",//大数据-征信评分
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if (data.rspCode === '000000') {
                    var _data = data.body;
                    if (_data != null) {
                        $('.tdn_afrud_score').html(nullFn(_data.tdn_afrud_score));//同盾反欺诈分数
                        $('.br_afrud_score').html(nullFn(_data.br_afrud_score));//百融反欺诈分数
                        $('.tx_riskScore').html(nullFn(_data.riskScore));//腾讯欺诈积分
                        $('.br_zhengxin_score').html(nullFn(_data.scorelargecashv2));//百融征信分数
                        $('.baidu_score').html(nullFn(_data.score));//百度征信分数
                    } else {
                        $('.tdn_afrud_score,.br_afrud_score,.tx_riskScore,.br_zhengxin_score,.baidu_score').html('--');
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
                    $('.tdn_afrud_score,.br_afrud_score,.tx_riskScore,.br_zhengxin_score,.baidu_score').html('--');
                }
            }
        })
    })
    // 公信宝
    $("#gxbDataWraper").load("gxbDataFile.html");
    $("#tbDetail-content-wraper").load("gxbTbDetail.html");
    $(".gongxinbao").click(function(){
        getGxbData();
    });
    $('.gxb-report-tit').click(function () {
        gxb_report();
    });
    var ff = new SellerScroll({
        lButton: "left_scroll",
        rButton: "right_scroll",
        oList: "carousel_ul",
        showSum: 4,
        parent: "#huotilist "
    });
    var ff = new SellerScroll({
        lButton: "left_scroll",
        rButton: "right_scroll",
        oList: "carousel_ul",
        showSum: 4,
        parent: "#shenfenzhenglist "
    });
    $("#risk").find("li").each(function (index, val) {
        if (index % 2 == 1) {
            $(val).addClass("bk");
        }
    })
    $(".radio-span").on("click", function () {
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
    // toastr.info('恭喜您，您已升级为财富合伙人！')

    $("#huotilist .carousel_ul").on("click", "li", function () {
        $(this).parent().find("li").removeClass("active");
        $(this).addClass("active")
        var src = $(this).find("img").attr("src");
        $("#huotiImg").attr("src", src);
    })
    $("#shenfenzhenglist .carousel_ul").on("click", "li", function () {
        $(this).parent().find("li").removeClass("active");
        $(this).addClass("active")
        var src = $(this).find("img").attr("src");
        $("#shenfenzhengImg").attr("src", src);
    })
    //交易明细模板
    function getlsHtml(data,_fqdata) {
        var fq = '';//分期table
        if(data.length > 0){
            var jy = $.map(data, function (o, i) {
                fq = getfqHtml(_fqdata);
                return '<tr>' +
                    '                    <td>' + (i + 1) + '</td>' +
                    '                    <td>--</td>' +
                    '                    <td>' + nullFn(o.cardNo) + '</td>' +
                    '                    <td>' + nullFn(currencyTypeFn(o.currencyType)) + '</td>' +
                    '                    <td>' + nullFn(o.transDate.substring(0, 10)) + '</td>' +
                    '                    <td>' + nullFn(o.transAddr) + '</td>' +
                    '                    <td>' + nullFn(o.amountMoney) + '</td>' +
                    '                    <td>' + nullFn(o.description) + '</td>' +
                    '                    <td>' + nullFn(o.oppositeBank) + '</td>' +
                    '                    <td>' + nullFn(o.oppositeCardNo) + '</td>' +
                    '                    <td>' + nullFn(o.nameOnOppositeCard) + '</td>' +
                    '                    <td>' + nullFn(o.postDate.substring(0, 10)) + '</td>' +
                    '               </tr>';
            }).join('');
            return '<div class="transact_detail">' +
                '                        <div class="detial">交易明细</div>' +
                '                        <div class="detial_table">' +
                '                            <table class="table table-bordered">' +
                '                                <thead>' +
                '                                <tr>' +
                '                                    <th>序号</th>' +
                '                                    <th>银行卡列表</th>' +
                '                                    <th>卡片号码后4位</th>' +
                '                                    <th>货币类型</th>' +
                '                                    <th>交易时间</th>' +
                '                                    <th>交易地址</th>' +
                '                                    <th>交易金额</th>' +
                '                                    <th>交易摘要</th>' +
                '                                    <th>对方银行</th>' +
                '                                    <th>对方卡号</th>' +
                '                                    <th>对方卡主姓名</th>' +
                '                                    <th>入账时间</th>' +
                '                                </tr>' +
                '                                </thead>' +
                '                                <tbody class="tableCon transactListCon">' + jy + '</tbody>' +
                '                            </table>' +
                '                        </div>' +
                '                    </div>' + fq;
        }else{
            return '<div class="transact_detail">' +
                '                        <div class="detial">交易明细</div>' +
                '                        <div class="detial_table"><div style="line-height:30px;padding:0 20px;color:#666;border-bottom:1px solid #dfdfdf;">暂无交易记录</div></div>' +
                '                    </div>';
        }
    }
    //分期明细模板
    function getfqHtml(data) {
        if(data.length > 0){
            var html = $.map(data, function (o, i) {
                return '<tr>' +
                    '      <td>' + (i + 1) + '</td>' +
                    '      <td>' + nullFn(o.cardNo) + '</td>' +
                    '      <td>' + nullFn(currencyTypeFn(o.currencyType)) + '</td>' +
                    '      <td>' + nullFn(o.transDate.substring(0, 10)) + '</td>' +
                    '      <td>' + nullFn(installmentTypeFn(o.installmentType)) + '</td>' +
                    '      <td>' + nullFn(o.installmentDesc) + '</td>' +
                    '      <td>' + nullFn(o.amountMoney) + '</td>' +
                    '      <td>' + nullFn(o.handingFeeDesc) + '</td>' +
                    '      <td>' + nullFn(o.handingFee) + '</td>' +
                    '      <td>' + nullFn(o.transferFeeDesc) + '</td>' +
                    '      <td>' + nullFn(o.transferFee) + '</td>' +
                    '      <td>' + nullFn(o.totalMonth) + '</td>' +
                    '      <td>' + nullFn(o.currentMonth) + '</td>' +
                    '      <td>' + nullFn(o.postDate.substring(0, 10)) + '</td>' +
                    '    </tr>';
            }).join('');
            return '<div class="installment_details">' +
                '                        <div class="detial">分期明细</div>' +
                '                        <div class="detial_table">' +
                '                            <table class="table table-bordered">' +
                '                                <thead>' +
                '                                <tr>' +
                '                                    <th>序号</th>' +
                '                                    <th>卡片号码后4位</th>' +
                '                                    <th>货币类型</th>' +
                '                                    <th>交易时间</th>' +
                '                                    <th>分期类型</th>' +
                '                                    <th>分期摘要</th>' +
                '                                    <th>分期金额</th>' +
                '                                    <th>手续费摘要</th>' +
                '                                    <th>手续费</th>' +
                '                                    <th>交易费摘要</th>' +
                '                                    <th>交易费</th>' +
                '                                    <th>总期数</th>' +
                '                                    <th>当前期数</th>' +
                '                                    <th>入账时间</th>' +
                '                                </tr>' +
                '                                </thead>' +
                '                                <tbody class="tableCon installmentListCon">' + html + '</tbody>' +
                '                            </table>' +
                '                        </div>' +
                '                    </div>';
        }else{
            return '<div class="installment_details">' +
                '                        <div class="detial">分期明细</div>' +
                '                        <div class="detial_table"><div style="line-height:30px;padding:0 20px;color:#666;border-bottom:1px solid #dfdfdf;">暂无分期记录</div></div>' +
                '                    </div>';
        }
    }
    //账单信息详情
    function getDetialsHtml(o){
        var billCon = '<div class="bill-con">' +//账单详情
            '                        <div class="row">' +
            '                            <div class="col-lg-6 col-md-6 col-sm-6">' +
            '                                <label class="com-lab">银行ID</label>' +
            '                                <span class="com-span">' + nullFn(o.bankId) + '</span>' +
            '                            </div>' +
            '                            <div class="col-lg-6 col-md-6 col-sm-6">' +
            '                                <label class="com-lab">美元上期月账单金额</label>' +
            '                                <span class="com-span">' + nullFn(o.usdLastBalance) + '</span>' +
            '                            </div>' +
            '                        </div>' +
            '                        <div class="row">' +
            '                            <div class="col-lg-6 col-md-6 col-sm-6">' +
            '                                <label class="com-lab">银行卡列表</label>' +
            '                                <span class="com-span">--</span>' +
            '                            </div>' +
            '                            <div class="col-lg-6 col-md-6 col-sm-6">' +
            '                                <label class="com-lab">美元上期还款额</label>' +
            '                                <span class="com-span">' + nullFn(o.usdLastPayment) + '</span>' +
            '                            </div>' +
            '                        </div>' +
            '                        <div class="row">' +
            '                            <div class="col-lg-6 col-md-6 col-sm-6">' +
            '                                <label class="com-lab">账单日</label>' +
            '                                <span class="com-span">' + nullFn(o.billDate.substring(0, 10)) + '</span>' +
            '                            </div>' +
            '                            <div class="col-lg-6 col-md-6 col-sm-6">' +
            '                                <label class="com-lab">美元利息</label>' +
            '                                <span class="com-span">' + nullFn(o.usdInterest) + '</span>' +
            '                            </div>' +
            '                        </div>' +
            '                        <div class="row">' +
            '                            <div class="col-lg-6 col-md-6 col-sm-6">' +
            '                                <label class="com-lab">还款日</label>' +
            '                                <span class="com-span">' + nullFn(o.paymentDueDate.substring(0, 10)) + '</span>' +
            '                            </div>' +
            '                            <div class="col-lg-6 col-md-6 col-sm-6">' +
            '                                <label class="com-lab">美元月账单金额</label>' +
            '                                <span class="com-span">' + nullFn(o.usdNewBalance) + '</span>' +
            '                            </div>' +
            '                        </div>' +
            '                        <div class="row">' +
            '                            <div class="col-lg-6 col-md-6 col-sm-6">' +
            '                                <label class="com-lab">账单月</label>' +
            '                                <span class="com-span">' + nullFn(o.billMonth.substring(0, 10)) + '</span>' +
            '                            </div>' +
            '                            <div class="col-lg-6 col-md-6 col-sm-6">' +
            '                                <label class="com-lab">美元最低还款额</label>' +
            '                                <span class="com-span">' + nullFn(o.usdMinPayment) + '</span>' +
            '                            </div>' +
            '                        </div>' +
            '                        <div class="row">' +
            '                            <div class="col-lg-6 col-md-6 col-sm-6">' +
            '                                <label class="com-lab">上期月账单金额</label>' +
            '                                <span class="com-span">' + nullFn(o.lastBalance) + '</span>' +
            '                            </div>' +
            '                            <div class="col-lg-6 col-md-6 col-sm-6">' +
            '                                <label class="com-lab">额度</label>' +
            '                                <span class="com-span">' + nullFn(o.creditLimit) + '</span>' +
            '                            </div>' +
            '                        </div>' +
            '                        <div class="row">' +
            '                            <div class="col-lg-6 col-md-6 col-sm-6">' +
            '                                <label class="com-lab">上期还款额</label>' +
            '                                <span class="com-span">' + nullFn(o.lastPayment) + '</span>' +
            '                            </div>' +
            '                            <div class="col-lg-6 col-md-6 col-sm-6">' +
            '                                <label class="com-lab">美元额度</label>' +
            '                                <span class="com-span">' + nullFn(o.usdCreditlimit) + '</span>' +
            '                            </div>' +
            '                        </div>' +
            '                        <div class="row">' +
            '                            <div class="col-lg-6 col-md-6 col-sm-6">' +
            '                                <label class="com-lab">利息</label>' +
            '                                <span class="com-span">' + nullFn(o.interest) + '</span>' +
            '                            </div>' +
            '                            <div class="col-lg-6 col-md-6 col-sm-6">' +
            '                                <label class="com-lab">取现额度</label>' +
            '                                <span class="com-span">' + nullFn(o.cashLimit) + '</span>' +
            '                            </div>' +
            '                        </div>' +
            '                        <div class="row">' +
            '                            <div class="col-lg-6 col-md-6 col-sm-6">' +
            '                                <label class="com-lab">月账单金额</label>' +
            '                                <span class="com-span">' + nullFn(o.newBalance) + '</span>' +
            '                            </div>' +
            '                            <div class="col-lg-6 col-md-6 col-sm-6">' +
            '                                <label class="com-lab">美元取现额度</label>' +
            '                                <span class="com-span">' + nullFn(o.usdCashLimit) + '</span>' +
            '                            </div>' +
            '                        </div>' +
            '                        <div class="row">' +
            '                            <div class="col-lg-6 col-md-6 col-sm-6">' +
            '                                <label class="com-lab">最低还款额</label>' +
            '                                <span class="com-span">' + nullFn(o.minPayment) + '</span>' +
            '                            </div>' +
            '                            <div class="col-lg-6 col-md-6 col-sm-6">' +
            '                                <label class="com-lab">&nbsp;&nbsp;</label>' +
            '                                <span class="com-span">--</span>' +
            '                            </div>' +
            '                        </div>' +
            '                    </div>';
        return billCon;
    }
    //风险提示查看接口
    TdragFn('.blackContainer','.heiList-box');//拖拽风险提示查看
    TdragFn('.blackContainer','.Taobao-credit-box');//拖拽风险提示查看
    TdragFn('.blackContainer','.TaobaoTB13-credit-box');//拖拽风险提示查看
    TdragFn('.blackContainer','.pboc-box');//拖拽风险提示查看-人行报告
    fnTab($('.risk-pboc-tit-hock'), $('.risk-pboc-con-hock'), 'click');//风险提示查看-人行报告tab切换
    $(document).on('click', '.heiL', function () {
        var _strategyCode = $(this).prev().html();
        riskWarnView(_strategyCode);
    })
    function riskWarnView(e){
        $('body').addClass('ovfHiden');//使网页不可滚动
        $('.heiList-box,.mask,.blackContainer').show();
        $('.heiList').html('');
        $('.table-tit').html('');
        $('.thead').html('');
        $('.heiList-body').html('');
        var obj = new Object();
        obj.intoCode = getParam.intoCode;
        obj.strategyCode = e;
        obj.idcard = $('#idcard').html();
        obj.mobile = $('#mobile').html();
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: 'POST',
            contentType: "text/html; charset=UTF-8",
            url: "/api/manage/user/selectRiskWarning",//风险提示查看接口
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if (data.rspCode === '000000') {
                    var _data = data.body.collLogList;
                    if(_data.type == '' || _data.type == null ||_data.type == undefined){
                        $('.heiList-body').html('<p class="empt-msg">暂无数据</p>');
                    }else if (_data.type == 'blacklist') {
                        $('.heiList-box').show();
                        $('.pboc-box').hide();
                        $('.table-tit').html('内部黑名单');
                        var _list = _data.data;
                        var blackLast = $.map(_list, function (o, i) {
                            return '<tr>' +
                                '                <td>' + (i + 1) + '</td>' +
                                '                <td>' + o.custName + '</td>' +
                                '                <td>' + o.cardId + '</td>' +
                                '                <td>' + o.telephone + '</td>' +
                                '                <td>' + o.reason + '</td>' +
                                '            </tr>';
                        })
                        var tableHtml = '<table class="table table-hover">' +
                            '            <thead class="thead">' +
                            '            <tr>' +
                            '                <th>序</th>  ' +
                            '                <th>姓名</th>   ' +
                            '                <th>身份证号</th>   ' +
                            '                <th>手机号</th>   ' +
                            '                <th>加入黑名单原因</th>    ' +
                            '            </tr>' +
                            '       </thead>' +
                            '       <tbody class="heiList">'+ blackLast + '</tbody>' +
                            '   </table>';
                        $('.heiList-body').html('').append(tableHtml);
                    } else if (_data.type == 'historyRejectionList') {
                        $('.heiList-box').show();
                        $('.pboc-box').hide();
                        $('.table-tit').html('历史拒贷信息');
                        var rej_list = _data.data;
                        var rejectList = $.map(rej_list, function (o, index) {
                            return '<tr>' +
                                '                <td>' + (index + 1) + '</td>' +
                                '                <td>' + o.custName + '</td>' +
                                '                <td>' + o.cardId + '</td>' +
                                '                <td>' + o.appProductType + '</td>' +
                                '                <td>' + o.appAmount + '</td>' +
                                '                <td>' + o.applyPeriod + '</td>' +
                                '                <td>' + o.oneReason + '</td>' +
                                '                <td>' + o.twoReason + '</td>' +
                                '            </tr>';
                        }).join('');
                        var tableHtml = '<table class="table table-hover">' +
                            '            <thead class="thead">' +
                            '            <tr>' +
                            '                <th>序</th>' +
                            '                <th>借款人姓名</th>' +
                            '                <th>身份证号</th>' +
                            '                <th>申请产品</th>' +
                            '                <th>申请金额</th>' +
                            '                <th>申请期限</th>' +
                            '                <th>拒绝原因</th>' +
                            '                <th>拒绝子原因</th>' +
                            '            </tr>' +
                            '       </thead>' +
                            '       <tbody class="heiList">'+ rejectList + '</tbody>' +
                            '   </table>';
                        $('.heiList-body').html('').append(tableHtml);
                    } else if (_data.type == 'historyBorrowList') {
                        $('.heiList-box').show();
                        $('.pboc-box').hide();
                        $('.table-tit').html('历史借款信息');
                        var borrow_list = _data.data;
                        var borrowList = $.map(borrow_list, function (o, index) {
                            var restPeriods = o.totalPeriod - o.curPeriod;   //剩余期数=借款期数-已还期数
                            return '<tr>' +
                                '                <td>' + (index + 1) + '</td>' +
                                '                <td>' + o.custName + '</td>' +
                                '                <td>' + o.cardId + '</td>' +
                                '                <td>' + o.productType + '</td>' +
                                '                <td>' + o.loanAmount + '</td>' +
                                '                <td>' + o.totalPeriod + '</td>' +
                                '                <td>' + o.status + '</td>' +
                                '                <td>' + o.remainingAmount + '</td>' +
                                '                <td>' + o.curPeriod + '</td>' +
                                '                <td>' + restPeriods + '</td>' +
                                '            </tr>';
                        }).join('');
                        var tableHtml = '<table class="table table-hover">' +
                            '            <thead class="thead">' +
                            '            <tr>' +
                            '                <th>序</th>' +
                            '                <th>借款人姓名</th>' +
                            '                <th>身份证号</th>' +
                            '                <th>借款产品</th>' +
                            '                <th>借款金额</th>' +
                            '                <th>借款期限</th>' +
                            '                <th>借款状态</th>' +
                            '                <th>剩余本金</th>' +
                            '                <th>已还期数</th>' +
                            '                <th>剩余期数</th>' +
                            '            </tr>' +
                            '       </thead>' +
                            '       <tbody class="heiList">'+ borrowList + '</tbody>' +
                            '   </table>';
                        $('.heiList-body').html('').append(tableHtml);
                    } else if (_data.type == 'customManagerList') {
                        $('.heiList-box').show();
                        $('.pboc-box').hide();
                        $('.table-tit').html('客户经理号码库');
                        var customer_list = _data.data;
                        var ManagerList = $.map(customer_list, function (o, index) {
                            return '<tr>' +
                                '                <td>' + (index + 1) + '</td>' +
                                '                <td>' + o.name + '</td>' +
                                '                <td>' + o.phone + '</td>' +
                                '                <td>' + o.quarters + '</td>' +
                                '            </tr>';
                        }).join('');
                        var tableHtml = '<table class="table table-hover">' +
                            '            <thead class="thead">' +
                            '            <tr>' +
                            '                <th>序号</th>' +
                            '                <th>姓名</th>' +
                            '                <th>手机号</th>' +
                            '                <th>岗位</th>' +
                            '            </tr>' +
                            '       </thead>' +
                            '       <tbody class="heiList">'+ ManagerList + '</tbody>' +
                            '   </table>';
                        $('.heiList-body').html('').append(tableHtml);
                    } else if (_data.type == 'creditCardList') {
                        $('.heiList-box').show();
                        $('.pboc-box').hide();
                        $('.table-tit').html('坚果信用卡信息');
                        if(_data.data.length > 0){
                            //卡片信息
                            var nut_list = _data.data[0];
                            if(nut_list){
                                if(nut_list.bankCardInfos[0]){
                                    var _nameOnCard = nullFn(nut_list.bankCardInfos[0].nameOnCard);//卡主姓名
                                    var _bankId = nullFn(nut_list.bankCardInfos[0].bankId);//银行ID
                                    var _fullCardNo = nullFn(nut_list.bankCardInfos[0].fullCardNo);//卡片完整号码
                                    var cardInfo = '<div class="nut_person_info">' +
                                        '                <div class="row">' +
                                        '                    <div class="col-lg-6 col-md-6 col-sm-6">' +
                                        '                        <label class="com-lab">卡主姓名</label>' +
                                        '                        <span class="com-span">' + _nameOnCard + '</span>' +
                                        '                    </div>' +
                                        '                    <div class="col-lg-6 col-md-6 col-sm-6">' +
                                        '                        <label class="com-lab">银行ID</label>' +
                                        '                        <span class="com-span">' + _bankId + '</span>' +
                                        '                    </div>' +
                                        '                </div>' +
                                        '                <div class="row">' +
                                        '                    <div class="col-lg-6 col-md-6 col-sm-6">' +
                                        '                        <label class="com-lab">卡片完整号码</label>' +
                                        '                        <span class="com-span">' + _fullCardNo + '</span>' +
                                        '                    </div>' +
                                        '                    <div class="col-lg-6 col-md-6 col-sm-6">' +
                                        '                        <label class="com-lab">是否一手账单</label>' +
                                        '                        <span class="com-span">--</span>' +
                                        '                    </div>' +
                                        '                </div>' +
                                        '                <div class="row">' +
                                        '                    <div class="col-lg-6 col-md-6 col-sm-6">' +
                                        '                        <label class="com-lab">账单接收邮箱</label>' +
                                        '                        <span class="com-span">--</span>' +
                                        '                    </div>' +
                                        '                    <div class="col-lg-6 col-md-6 col-sm-6">' +
                                        '                        <label class="com-lab">&nbsp;&nbsp;</label>' +
                                        '                        <span class="com-span">--</span>' +
                                        '                    </div>' +
                                        '                </div>' +
                                        '            </div>';
                                }
                            }
                            //账单信息
                            var billList = nut_list.billMonthDtos;
                            if (billList.length > 0) {
                                var billInfo = $.map(billList, function (o, x) {
                                    var billTit = '<div class="bill_tit">账单信息<span>（' + nullFn(timeTransforFn(o.billMonth)) + '）</span></div>';//账单期数
                                    var fqmx = [];
                                    var transactDetailList = billList[x].shoppingRecordInfos.map(function(item) {
                                        fqmx=fqmx.concat(item.bankShoppingInstallMents);
                                        return item;
                                    });//交易明细
                                    //账单期数+账单信息详情+交易明细
                                    var billDetial ='<div class="bill_info">'+ billTit + getDetialsHtml(o) + getlsHtml(transactDetailList,fqmx)+ '</div>';
                                    return billDetial;
                                }).join('');
                                var billHtml = '<div class="bill_info_box">' + billInfo + '</div>'
                            }
                            var nutBody = '<div class="nut-body">' + cardInfo + billHtml + '</div>';//卡信息+ 明细
                            $('.heiList-body').html('').append(nutBody);
                        }else{
                            $('.heiList-body').html('<p class="empt-msg">暂无数据</p>');
                        }
                    }else if(_data.type == 'ZR210' || _data.type == 'NF5'){
                        //人行报告
                        $('.heiList-box').hide();
                        $('.pboc-box,.pboc-box .renhang-con-hock').show();
                        PBOCReportFn();
                    }
                    else if(_data.type == 'TB9'|| _data.type == 'TB10'|| _data.type == 'TB11'|| _data.type == 'TB12'){
                        $('.heiList-box,.pboc-box,.pboc-box .renhang-con-hock,.TaobaoTB13-credit-box').hide();
                        $('.Taobao-credit-box').show();
                        $('.strategyNum').html(_data.type.substring(0,2)+'-'+_data.type.substring(2,_data.type.length));//展示策略编号
                        var TBList = _data.data;
                        if(TBList){
                            $("#TB-credit-wrap,#Taobao-credit-page").html('');
                            $("#TB-credit-wrap").setTemplateElement("Taobao-credit-template");
                            getPageForTempalte(TBList, 1, $("#TB-credit-wrap"), "Taobao-credit-page");
                            // var TBListCon = $.map(TBList,function(o,i){
                            //     return '<tr>' +
                            //         '<td>'+ (i+1) +'</td>' +
                            //         '<td>'+ nullFn(o.title) +'</td>' +
                            //         '<td>'+ nullFn(o.amount) +'</td>' +
                            //         '<td>'+ nullFn(o.tradeNo) +'</td>' +
                            //         '<td>'+ nullFn(o.tradeTime) +'</td>' +
                            //         '<td>'+ nullFn(o.tradeStatusName) +'</td>' +
                            //         '<td>'+ nullFn(o.txTypeName) +'</td>' +
                            //         '<td>'+ nullFn(o.behaviorLableName) +'</td>' +
                            //         '<td>'+ nullFn(o.tradeDetailUrl) +'</td>' +
                            //         '<td>'+ nullFn(o.otherSide) +'</td>' +
                            //         '<td>'+ nullFn(o.otherSideAccount) +'</td>' +
                            //         '<td>'+ nullFn(o.otherSideName) +'</td>' +
                            //         '<td>'+ nullFn(payTypeFn(o.payType)) +'</td>' +
                            //         '<td>'+ nullFn(isDeleteFn(o.isDelete)) +'</td>' +
                            //         '</tr>';
                            // }).join('');
                            // $('.TBCreditList').html('').append(TBListCon);
                        }else{
                            $('.Taobao-credit-box .table').hide();
                            $('.Taobao-credit-box .gxb-tradingRecord-box').html('<p class="empt-msg">暂无数据</p>');
                        }
                    }else if(_data.type == 'TB13'){
                        $('.heiList-box,.pboc-box,.pboc-box .renhang-con-hock,.Taobao-credit-box').hide();
                        $('.TaobaoTB13-credit-box').show();
                        var TB13List = _data.data;
                        if(TB13List){
                            $("#TB13-credit-wrap").setTemplateElement("TB13-credit-template");
                            getPageForTempalte(TB13List, 1, $("#TB13-credit-wrap"), "TB13-credit-page");
                            // var TB13ListCon = $.map(TB13List,function(o,i){
                            //     return '<tr>' +
                            //         '<td>'+ (i+1) +'</td>' +
                            //         '<td>'+ nullFn(o.mobile) +'</td>' +
                            //         '<td style="text-align:left;">'+ nullFn(o.name) +'</td>' +
                            //         '<td>'+ nullFn(o.count) +'</td>' +
                            //         '<td>'+ contactTypeFn(o.type) +'</td>' +
                            //         '</tr>';
                            // }).join('');
                            // $('.TB13CreditList').html('').append(TB13ListCon);
                        }else{
                            $('.TaobaoTB13-credit-box .table').hide();
                            $('.TaobaoTB13-credit-box .gxb-tradingRecord-box').html('<p class="empt-msg">暂无数据</p>');
                        }
                    }
                    else {
                        $('.heiList').html('<p class="empt-msg">暂无数据</p>');
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
    //淘宝TB9-12
    function payTypeFn(e){
        var str = '';
        if(e == 1){
            str  = '支付宝余额宝';
        }else if(e == 2){
            str  = '花呗';
        }else if(e == 3){
            str = '银行卡';
        }
        return str;
    }
    function isDeleteFn(item){
        var str = '';
        if(item == 0){
            str = '否';
        }else if(item == 1){
            str = '是';
        }
        return str;
    }
    //淘宝TB13
    function contactTypeFn(e){
        var str ='';
        if(e > 0){
            str = '联系人'+ e;
        }else if(e == null || e == undefined || e == ''){
            str = '--';
        }
        return str;
    }
    $('.heiList-close').click(function () {
        $('body').removeClass('ovfHiden');//使网页可滚动
        $('.mask,.heiList-box,.blackContainer').hide();
    })
    //通话明细
    TdragFn('.phoneContainer','.phone-box');//拖拽通话明细
    $(document).on('click', '.phoneL', function () {
        $('body').addClass('ovfHiden');//使网页不可滚动
        $('.mask,.phone-box,.phoneContainer').show();
        var _userName = $(this).data('name');
        var obj = new Object();
        obj.intoCode = getParam.intoCode;
        obj.mobile = $(this).data('mobile');
        var _obj = JSON.stringify(obj, 'utf-8');
        $.ajax({
            headers: {
                token: localStorage.getItem('LoginToken')
            },
            type: 'POST',
            contentType: "text/html; charset=UTF-8",
            url: "/api/manage/user/selectCallLogMessage",//联系人通话记录明细接口
            data: _obj,
            dataType: 'json',
            success: function (data) {
                if (data.rspCode === '000000') {
                    var _data = data.body;
                    if(_data != null){
                        var list = _data.callLogList;
                        if (list.length > 0) {
                            var callList = $.map(list, function (o, index) {
                                return '<tr>' +
                                    '                <td>' + (index + 1) + '</td>' +
                                    '                <td>' + nullFn(_userName) + '</td>' +
                                    '                <td>' + nullFn(o.mobile) + '</td>' +
                                    '                <td>' + nullFn(o.initType) + '</td>' +
                                    '                <td>' + nullFn(o.callPlace) + '</td>' +
                                    '                <td>' + nullFn(o.startTime) + '</td>' +
                                    '                <td>' + nullFn(o.userTimes) + '</td>' +
                                    '                <td>' + nullFn(o.callType) + '</td>' +
                                    '            </tr>';
                            }).join('');
                            $('.tableCon').html('').append(callList);
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
    })
    $('.phone-close').click(function () {
        $('body').removeClass('ovfHiden');//使网页可滚动
        $('.mask,.phoneContainer,.phone-box').hide();
    })
    //返回审批历史
    var hashStrings = getParam.pageNo || '1';
    $(document).on('click', '.row_return_btn', function () {
        window.location.href = 'approvalHistory.html#pageNo=' + hashStrings;
    })

    // 买家/卖家淘宝订单详情
    $(document).on("click",'.clickToDetail',function(){
        console.log($(this).attr("data"))
        var Height = $(document).scrollTop();
        $('.tbOrderDetail-box').css({'top': Height + 150 + 'px'});
        $('.tbOrderDetail-box,.tbMask').show();
        $("#tbDetailWrap").text($(this).attr("data"))
    })
    $(document).on("click",'.tbDetail-close',function(){
        $('.tbOrderDetail-box,.tbMask').hide();
    })
    // $('').click(function () {
    //     $('.tbOrderDetail-box,.tbMask').hide();
    // })
})

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

function StatusFn(str) {
    switch (str) {
        case '0':
            str = '通过';
            break;
        case '1':
            str = '拒绝';
            break;
        case '2':
            str = '拒接并加入黑名单';
            break;
        case '3':
            str = '审批中撤销';
            break;
    }
    return str;
}

//拒绝原因
// function RefuseReasonFn(code) {
//     var str = '';
//     switch (code) {
//         case 'RJ1':
//             str = 'RJ1-资格不符';
//             break;
//         case 'RJ2':
//             str = 'RJ2-信用不符';
//             break;
//         case 'RJ3':
//             str = 'RJ3-反欺诈';
//             break;
//         case 'RJ4':
//             str = 'RJ4-高风险';
//             break;
//         case 'RJ5':
//             str = 'RJ5-其他';
//             break;
//     }
//     return str;
// }

//加入黑名单项
function ListItemFn(item) {
    var str = '';
    switch (item) {
        case '0':
            str = '证件号';
            break;
        case '1':
            str = '手机号';
            break;
        case '2':
            str = '证件号&手机号';
            break;
    }
    return str;
}
//审批结论-审批中撤销原因
function cancelCodeFn(value){
    var str ='';
    switch(value){
        case '1' :
            str = '信息有误，重新申请';
            break;
        case '5' :
            str = '流程复杂，时间太长';
            break;
        case '6' :
            str = '已在其他公司或渠道申请';
            break;
        case '7' :
            str = '其他原因';
            break;
    }
    return str;
}
//公信宝-电商淘宝数据
function getGxbData() {
    var obj = {
        "intoCode":getParam.intoCode,
        //"intoCode":"120180111200038313811",
        "bigdataType":"bigData8001",
        "childType":"gxb_dssj"
    };
    var _obj = JSON.stringify(obj, 'utf-8');
    $.ajax({
        headers: {
            token: localStorage.getItem('LoginToken')
        },
        type: "POST",
        contentType: "text/html; charset=UTF-8",
        url: "/api/obtain/getBigDataByType",
        data: _obj,
        dataType: 'json',
        success: function (data) {
            if (data.rspCode === '000000') {
                //基本信息
                $("#ecommerceBaseInfoWrap").setTemplateElement("ecommerceBaseInfoTemplate");
                $("#ecommerceBaseInfoWrap").processTemplate(data.body.ecommerceBaseInfo);
                //交易记录
                var ecommerceTrades =  data.body.ecommerceTrades;
                $("#ecommerceTradesWrap").setTemplateElement("ecommerceTradesTemplate");
                getPageForTempalte(ecommerceTrades,1,$("#ecommerceTradesWrap"),"gxbDataPage");
                //收货地址
                var addressList =  data.body.ecommerceConsigneeAddresses;
                $("#ecommerceConsigneeAddressesWrap").setTemplateElement("ecommerceConsigneeAddressesTemplate");
                getPageForTempalte(addressList,1,$("#ecommerceConsigneeAddressesWrap"),"gxbDataPage2");
                //绑卡信息
                var ecommerceBindedBankCards = data.body.ecommerceBindedBankCards;
                $("#ecommerceBindedBankCardsWrap").setTemplateElement("ecommerceBindedBankCardsTemplate");
                getPageForTempalte(ecommerceBindedBankCards,1,$("#ecommerceBindedBankCardsWrap"),"gxbDataPage3");
                //水电煤缴费账户
                var ecommercePaymentAccounts = data.body.ecommercePaymentAccounts;
                $("#ecommercePaymentAccountsWrap").setTemplateElement("ecommercePaymentAccountsTemplate");
                getPageForTempalte(ecommercePaymentAccounts,1,$("#ecommercePaymentAccountsWrap"),"gxbDataPage4");
                //买家淘宝订单
                var taobaoOrders = data.body.taobaoOrders;
                $("#taobaoOrdersWrap").setTemplateElement("taobaoOrdersTemplate");
                getPageForTempalte(taobaoOrders,1,$("#taobaoOrdersWrap"),"gxbDataPage5");
                //卖家淘宝订单
                var soldOrders = data.body.soldOrders;
                $("#soldOrdersWrap").setTemplateElement("soldOrdersTemplate");
                getPageForTempalte(soldOrders,1,$("#soldOrdersWrap"),"gxbDataPage6");
                //花呗支付记录
                var huabeiConsumeList = data.body.huabeiConsumeList;
                $("#huabeiConsumeListWrap").setTemplateElement("huabeiConsumeListTemplate");
                getPageForTempalte(huabeiConsumeList,1,$("#huabeiConsumeListWrap"),"gxbDataPage7");
                //借呗信息
                var jiebeiInfo = data.body.jiebeiInfo;
                $("#jiebeiInfoWrap").setTemplateElement("jiebeiInfoTemplate");
                $("#jiebeiInfoWrap").processTemplate(jiebeiInfo);
                //花呗信息
                var huabeiInfo = data.body.huabeiInfo;
                $("#huabeiInfoWrap").setTemplateElement("huabeiInfoTemplate");
                $("#huabeiInfoWrap").processTemplate(huabeiInfo);
                //历史转账银行储蓄卡
                var transferBankCards = data.body.transferBankCards;
                $("#transferBankCardsWrap").setTemplateElement("transferBankCardsTemplate");
                getPageForTempalte(transferBankCards,1,$("#transferBankCardsWrap"),"gxbDataPage8");
                //花呗月账单
                var huabeiBills = data.body.huabeiBills;
                $("#huabeiBillsWrap").setTemplateElement("huabeiBillsTemplate");
                getPageForTempalte(huabeiBills,1,$("#huabeiBillsWrap"),"gxbDataPage9");

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
                showMsg('.error-msg', data.rspMsg);
            }
        }
    });
}
// 公信宝-淘宝电商报告
function gxb_report() {
    var obj = {
        'intoCode':getParam.intoCode,
        // 'intoCode':'120180111200038313811',
        'bigdataType':'bigData8001',
        'childType':'gxb_dsbg'
    }
    var _obj = JSON.stringify(obj, 'utf-8');
    $.ajax({
        headers:{
            token:localStorage.getItem('LoginToken')
        },
        type:'POST',
        contentType:'text/html; charset=UTF-8',
        url:"/api/obtain/getBigDataByType",  // 公信宝电商报告
        data:_obj,
        dataType:'json',
        success:function (data) {
            if(data.rspCode === '000000'){
                var _data = data.body;
                // 报告摘要
                var _reportSummary = _data.reportSummary;
                if(_reportSummary){
                    var _baseInfo = _reportSummary.baseInfo;
                    if (_baseInfo) {
                        $('.gxb-li21-11').html(nullFn(_baseInfo.name)); // 支付宝处登记姓名
                        $('.gxb-li21-12').html(nullFn(_baseInfo.phone)); // 支付宝处登记手机
                        $('.gxb-li21-21').html(nullFn(_baseInfo.idCard)); // 身份证信息
                        $('.gxb-li21-22').html(nullFn(conLabelInfo(_baseInfo.isVarified))); // 是否实名认证
                        $('.gxb-li21-31').html(nullFn(_baseInfo.alipayAccountType)); // 支付宝账户类型
                        $('.gxb-li21-32').html(nullFn(_baseInfo.alipayAccount)); // 支付宝账号
                        $('.gxb-li21-41').html(nullFn(_baseInfo.taobaoAccount)); // 绑定的淘宝账号
                        $('.gxb-li21-42').html(nullFn(_baseInfo.alipayEmail)); // 支付宝处登记邮箱
                        $('.gxb-li21-51').html(nullFn(_baseInfo.registerDate)); // 支付宝注册时间
                        $('.gxb-li21-52').html(nullFn(_baseInfo.creditLevelAsBuyer)); // 买家信用额度
                        $('.gxb-li21-61').html(nullFn(isOneself(_baseInfo.status))); // 是否本人
                        $('.gxb-li21-62').html(nullFn(_baseInfo.totalExpenditureOf6m)); // 近6个月支出交易成功总金额
                        $('.gxb-li21-71').html(nullFn(_baseInfo.totalIncomeOf6m)); // 近6个月收入交易成功总金额
                        $('.gxb-li21-72').html(nullFn(_baseInfo.fundTranseOf6m)); // 近6个月资金往来交易成功总人数
                        $('.gxb-li21-81').html(nullFn(_baseInfo.totalRepayOf6m)); // 近6个月还款交易成功总金额
                        // 亲密付列表
                        var _intimacyPayList = _baseInfo.intimacyPayList;
                        if(_intimacyPayList != null) {
                            if (_intimacyPayList.length > 0 && _intimacyPayList ) {
                                var _intimacyPayList_detail = $.map(_intimacyPayList, function (o, i) {
                                    return '<tr><td>' + (i + 1) + '</td><td>' + nullFn(o.intimacyPayAccount) + '</td><td>' + nullFn(o.intimacyPayName) + '</td></tr>';
                                });
                                $('._intimacyPayList_con').html('').append(_intimacyPayList_detail);
                            }
                        }
                    } else {
                        $('.gxb-li21-11, .gxb-li21-12, .gxb-li21-21, .gxb-li21-22, .gxb-li21-31, .gxb-li21-32, .gxb-li21-41, .gxb-li21-42, .gxb-li21-51, .gxb-li21-52, .gxb-li21-61, .gxb-li21-62, .gxb-li21-71, .gxb-li21-72, .gxb-li21-81').html('--');
                    }
                    // 资产信息
                    var _assetsInfo = _reportSummary.assetsInfo;
                    if (_assetsInfo) {
                        $('.gxb-li23-11').html(nullFn(_assetsInfo.alipayBalance)); // 支付宝余额
                        $('.gxb-li23-12').html(nullFn(_assetsInfo.yuebaoBalance)); // 余额宝余额
                        $('.gxb-li23-21').html(nullFn(_assetsInfo.huabeiAmount)); // 花呗当前额度
                        $('.gxb-li23-22').html(nullFn(_assetsInfo.huabeiOriginalAmount)); // 花呗原始信用额度
                        $('.gxb-li23-31').html(nullFn(_assetsInfo.huabeiBalance)); // 花呗余额
                        $('.gxb-li23-32').html(nullFn(_assetsInfo.huabeiPenaltyAmount)); // 花呗的罚息
                        $('.gxb-li23-41').html(nullFn(_assetsInfo.huabeiOverdueDays)); // 花呗的逾期天数
                        $('.gxb-li23-42').html(nullFn(freezeMode(_assetsInfo.huabeiStatus))); // 花呗的冻结状态
                        $('.gxb-li23-51').html(nullFn(_assetsInfo.huabeiNextMonthPayment)); // 花呗下月还款额
                        $('.gxb-li23-52').html(nullFn(_assetsInfo.huabeiCurrentMonthPayment)); // 花呗当月还款额
                        $('.gxb-li23-61').html(nullFn(_assetsInfo.huabeiPayDay)); // 花呗还款日
                        $('.gxb-li23-62').html(nullFn(_assetsInfo.huabeiOverdueBillCnt)); // 花呗逾期账单数
                        $('.gxb-li23-71').html(nullFn(conLabelInfo(_assetsInfo.huabeiHasAnyOverdue))); // 花呗逾期
                        $('.gxb-li23-72').html(nullFn(_assetsInfo.jiebeiAmount)); // 借呗额度
                        $('.gxb-li23-81').html(nullFn(_assetsInfo.jiebeiBalance)); // 借呗余额
                        $('.gxb-li23-82').html(nullFn(_assetsInfo.jiebeiRiskRate)); // 借呗日利率
                        $('.gxb-li23-91').html(nullFn(conLabelInfo(_assetsInfo.jiebeiOvdAble))); // 借呗是否逾期
                        $('.gxb-li23-92').html(nullFn(_assetsInfo.jiebeiUnClearLoanCount)); // 未还期数
                        $('.gxb-li23-101').html(nullFn(haveJieBei(_assetsInfo.jiebeiStatus))); // 是否有借呗
                    } else {
                        $('.gxb-li23-11, .gxb-li23-12, .gxb-li23-21, .gxb-li23-22, .gxb-li23-31, .gxb-li23-32, .gxb-li23-41, .gxb-li23-42, .gxb-li23-51, .gxb-li23-52, .gxb-li23-61, .gxb-li23-62, .gxb-li23-71, .gxb-li23-72, .gxb-li23-81, .gxb-li23-82, .gxb-li23-91, .gxb-li23-92, .gxb-li23-101').html('--');
                    }
                    // 可疑行为统计
                    var _behaviorInfo = _reportSummary.behaviorInfo;
                    if (_behaviorInfo) {
                        $('.gxb-li24-11').html(nullFn(_behaviorInfo.lieCount)); // 疑似诈骗记录数
                        $('.gxb-li24-12').html(nullFn(_behaviorInfo.gambleCount)); // 疑似赌博记录数
                        $('.gxb-li24-21').html(nullFn(_behaviorInfo.drugCount)); // 疑似吸毒记录数
                        $('.gxb-li24-22').html(nullFn(_behaviorInfo.highRiskAreaCount)); // 高风险地区消费记录数
                        $('.gxb-li24-31').html(nullFn(_behaviorInfo.sensitiveCount)); // 敏感字段记录数
                        $('.gxb-li24-32').html(nullFn(_behaviorInfo.otherCount)); // 其他可疑记录数
                    } else {
                        $('.gxb-li24-11, .gxb-li24-12, .gxb-li24-21, .gxb-li24-22, .gxb-li24-31, .gxb-li24-32').html('--');
                    }
                    // 淘宝交易地址统计
                    var _taobaoAddressList = _reportSummary.taobaoAddressList;
                    $("#gxbReport_tradingAddr_wrap").setTemplateElement("gxbReport_tradingAddr_template");
                    getPageForTempalte(_taobaoAddressList, 1, $("#gxbReport_tradingAddr_wrap"), "gbxReport_page1");

                    // 淘宝店铺统计
                    var _taobaoShopList = _reportSummary.taobaoShopList;
                    $("#gxbReport_shop_wrap").setTemplateElement("gxbReport_shop_template");
                    getPageForTempalte(_taobaoShopList, 1, $("#gxbReport_shop_wrap"), "gbxReport_page2");
                }else{
                    $('.gxb-li21-11, .gxb-li21-12, .gxb-li21-21, .gxb-li21-22, .gxb-li21-31, .gxb-li21-32, .gxb-li21-41, .gxb-li21-42, .gxb-li21-51, .gxb-li21-52, .gxb-li21-61, .gxb-li21-62, .gxb-li21-71, .gxb-li21-72, .gxb-li21-81').html('--');
                    $('.gxb-li23-11, .gxb-li23-12, .gxb-li23-21, .gxb-li23-22, .gxb-li23-31, .gxb-li23-32, .gxb-li23-41, .gxb-li23-42, .gxb-li23-51, .gxb-li23-52, .gxb-li23-61, .gxb-li23-62, .gxb-li23-71, .gxb-li23-72, .gxb-li23-81, .gxb-li23-82, .gxb-li23-91, .gxb-li23-92, .gxb-li23-101').html('--');
                    $('.gxb-li24-11, .gxb-li24-12, .gxb-li24-21, .gxb-li24-22, .gxb-li24-31, .gxb-li24-32').html('--');
                    $('#gxbReport_tradingAddr_template .tableData_exist, #gbxReport_page1, #gxbReport_shop_template .tableData_exist, #gbxReport_page2').hide();
                    $('#gxbReport_tradingAddr_wrap .tableData_null, #gxbReport_shop_wrap .tableData_null').show();
                }

                // 出账报告
                var _expenditureReport = _data.expenditureReport;
                if (_expenditureReport) {
                    // 还款月度统计
                    var _repaymentList = _expenditureReport.repaymentList;
                    $("#gxbReport_repayment_wrap").setTemplateElement("gxbReport_repayment_template");
                    getPageForTempalte(_repaymentList, 1, $("#gxbReport_repayment_wrap"), "gbxReport_page3");
                    // 消费月度统计
                    var _consumptionList  = _expenditureReport.consumptionList;
                    $("#gxbReport_consume_wrap").setTemplateElement("gxbReport_consume_template");
                    getPageForTempalte(_consumptionList, 1, $("#gxbReport_consume_wrap"), "gbxReport_page4");
                }else{
                    $('#gxbReport_repayment_template .tableData_exist, #gbxReport_page3, #gxbReport_consume_template .tableData_exist, #gbxReport_page4').hide();
                    $('#gxbReport_repayment_wrap .tableData_null, #gxbReport_consume_wrap .tableData_null').show();
                }

                // 入账报告
                var _incomeReport = _data.incomeReport;
                if(_incomeReport){
                    // 收入月度统计
                    var _incomeList   = _incomeReport.incomeList;
                    $("#gxbReport_income_wrap").setTemplateElement("gxbReport_income_template");
                    getPageForTempalte(_incomeList, 1, $("#gxbReport_income_wrap"), "gbxReport_page5");
                }else{
                    $('#gxbReport_income_template .tableData_exist, #gbxReport_page5').hide();
                    $('#gxbReport_income_wrap .tableData_null').show();
                }
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
                $('.gxb-li21-11, .gxb-li21-12, .gxb-li21-21, .gxb-li21-22, .gxb-li21-31, .gxb-li21-32, .gxb-li21-41, .gxb-li21-42, .gxb-li21-51, .gxb-li21-52, .gxb-li21-61, .gxb-li21-62, .gxb-li21-71, .gxb-li21-72, .gxb-li21-81').html('--');
                $('.gxb-li23-11, .gxb-li23-12, .gxb-li23-21, .gxb-li23-22, .gxb-li23-31, .gxb-li23-32, .gxb-li23-41, .gxb-li23-42, .gxb-li23-51, .gxb-li23-52, .gxb-li23-61, .gxb-li23-62, .gxb-li23-71, .gxb-li23-72, .gxb-li23-81, .gxb-li23-82, .gxb-li23-91, .gxb-li23-92, .gxb-li23-101').html('--');
                $('.gxb-li24-11, .gxb-li24-12, .gxb-li24-21, .gxb-li24-22, .gxb-li24-31, .gxb-li24-32').html('--');
                $('#gxbReport_tradingAddr_template .tableData_exist, #gbxReport_page1, #gxbReport_shop_template .tableData_exist, #gbxReport_page2').hide();
                $('#gxbReport_tradingAddr_wrap .tableData_null, #gxbReport_shop_wrap .tableData_null').show();
                $('#gxbReport_repayment_template .tableData_exist, #gbxReport_page3, #gxbReport_consume_template .tableData_exist, #gbxReport_page4').hide();
                $('#gxbReport_repayment_wrap .tableData_null, #gxbReport_consume_wrap .tableData_null').show();
                $('#gxbReport_income_template .tableData_exist, #gbxReport_page5').hide();
                $('#gxbReport_income_wrap .tableData_null').show();
            }
        }
    })
}

//风险提示淘宝TB13
function contactTypeFn(e){
    var str ='';
    if(e > 0){
        str = '联系人'+ e;
    }else if(e == null || e == undefined || e == ''){
        str = '--';
    }
    return str;
}
//风险提示淘宝TB9-12
function payTypeFn(e){
    var str = '';
    if(e == 1){
        str  = '支付宝余额宝';
    }else if(e == 2){
        str  = '花呗';
    }else if(e == 3){
        str = '银行卡';
    }
    return str;
}

// 淘宝交易地址统计-淘宝交易地址统计-详细地址定位
function mouseOverDetail(detail){
    var _serialNumHtml = detail.parent().siblings('.serialNum').html();
    var _serialNumLength = _serialNumHtml.length;
    var _serialNum = _serialNumHtml.substring(_serialNumLength-1);
    var _length = detail.css('height').length-2; // 弹框高度数字长度（-2为去掉'px'的长度）
    var _height = detail.css('height').substring(0,_length); // 获取弹框高度
    var _top = -_height+4+'px'; // 弹框定位的高度
    if(_serialNum ==1 && (-_height+4)<-35){ // 序号尾号为1，且top的值超过34px
        detail.css('top','-34px');
    }else{
        detail.css('top',_top);
    }
}
// function getPageForTempalte(data,page,$tempalte,pageName){
//     var table;
//     var totalPage;
//     if(!data){
//         table = [];
//         totalPage = 1;
//     }else {
//         table = data.slice((page - 1) * 10, page * 10);
//         totalPage = Math.ceil(data.length/10);
//     }
//     $tempalte.processTemplate({"table":table,"page":page});
//     if(data!=null&&$('#'+pageName).html()=="分页") {
//         $('#' + pageName).pagination({
//             pageCount: totalPage,
//             coping: true,
//             homePage: '首页',
//             endPage: '末页',
//             isHide:true,
//             keepShowPN:true,
//             mode: 'fixed',
//             callback: function (api) {
//                 console.log(api);
//                 var n = api.getCurrent();
//                 getPageForTempalte(data, n, $tempalte, pageName);
//             }
//         });
//     }
// }
function getPageForTempalte(data,page,$tempalte,pageName){
    var table;
    var totalPage;
    if(!data){
        table = [];
        totalPage = 1;
        $('#'+pageName).hide(); // data不存在时隐藏分页
    }else {
        table = data.slice((page - 1) * 10, page * 10);
        totalPage = Math.ceil(data.length/10);
    }
    $tempalte.processTemplate({"table":table,"page":page});
    if(data!=null && data!=''){
        $tempalte.find('.table_null').hide(); // data不为空时隐藏（table_null为未加载到数据时显示的空表格样式,参见html页面）
    }
    if(data!=null&&$('#'+pageName).html()=="") {
        if(data.length <= 10){ // data数据小于等于10条（即分页只有一页）时，隐藏跳转，隐藏首尾页
            $('#' + pageName).pagination({
                pageCount: totalPage,
                totalData: data.length,
                keepShowPN: true,
                mode: 'fixed',
                callback: function (api) {
                    var n = api.getCurrent();
                    getPageForTempalte(data, n, $tempalte, pageName);
                }
            });
        }else{
            $('#' + pageName).pagination({
                pageCount: totalPage,
                totalData: data.length,
                coping: true,
                homePage: '首页',
                endPage: '尾页',
                jump: true,
                keepShowPN:true,
                mode: 'fixed',
                callback: function (api) {
                    var n = api.getCurrent();
                    getPageForTempalte(data, n, $tempalte, pageName);
                }
            });
        }
    }
}
var tbDetailTitleVk = {"address":"交易地址详情","seller":"淘宝卖家详情","logistics":"物流详情","subOrders":"子订单详情"};
function getTbDetalTemplate(_obj){
    var data = JSON.parse(_obj.attr("data"));
    var type = _obj.attr("type");
    if(data==null||data=="--"){
        data = [];
    }else if(!(data instanceof Array)){
        var arr = [];
        arr.push(data);
        data = arr;
    }
    $(".tbDetail-head .tbDetail-tit").html(tbDetailTitleVk[type]);
    $("#tbDetailWrap").setTemplateElement(type+"Template");
    $("#tbDetailWrap").processTemplate(data);
}
function getPayTypeName(value){
    //1支付宝余额宝，2花呗，3银行卡
    if(value==1){
        return "余额宝";
    }else if(value==2){
        return "花呗";
    }else if(value==3){
        return "银行卡";
    }else{
        return ""
    }
}