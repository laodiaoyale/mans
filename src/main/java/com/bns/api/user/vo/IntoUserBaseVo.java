package com.bns.api.user.vo;

import com.bns.model.befloan.ClALoanOrderQueueDTO;

import java.util.Date;

/**
 * 用于接收审核队列详情中审批决策信息
 * @Author xiangzebing
 */
public class IntoUserBaseVo extends ClALoanOrderQueueDTO {

    //拒接原因
    private String refuseReason;

    //客户手机号
    private String mobile;

    //客户名字
    private String name;

    //进件编号
    private String intoCode;

    //客户身份证
    private String idCard;

    //策略编号
    private String strategyCode;

    //拒绝天数
    private int  refuseDays;

    //拒绝截止日期
    private Date refuseDate;

    private String reviewUserId;

    private String type;

    private String applyTerminal;

    public String getApplyTerminal() {
        return applyTerminal;
    }

    public void setApplyTerminal(String applyTerminal) {
        this.applyTerminal = applyTerminal;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    /**
     * 拒绝 原因 (人工审核)
     * @return
     */
    private String leve1RefuseCode;
    private String leve1RefuseDes;

    private String leve2RefuseCode;
    private String leve2RefuseDes;
    private String leve3RefuseCode;
    private String leve3RefuseDes;
    public int getRefuseDays() {
        return refuseDays;
    }

    public void setRefuseDays(int refuseDays) {
        this.refuseDays = refuseDays;
    }

    public Date getRefuseDate() {
        return refuseDate;
    }

    public void setRefuseDate(Date refuseDate) {
        this.refuseDate = refuseDate;
    }

    public String getStrategyCode() {
        return strategyCode;
    }

    public void setStrategyCode(String strategyCode) {
        this.strategyCode = strategyCode;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public String getIntoCode() {
        return intoCode;
    }

    public void setIntoCode(String intoCode) {
        this.intoCode = intoCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getRefuseReason() {
        return refuseReason;
    }

    public void setRefuseReason(String refuseReason) {
        this.refuseReason = refuseReason;
    }

    public String getReviewUserId() {
        return reviewUserId;
    }

    public void setReviewUserId(String reviewUserId) {
        this.reviewUserId = reviewUserId;
    }

    public String getLeve1RefuseCode() {
        return leve1RefuseCode;
    }

    public void setLeve1RefuseCode(String leve1RefuseCode) {
        this.leve1RefuseCode = leve1RefuseCode;
    }

    public String getLeve1RefuseDes() {
        return leve1RefuseDes;
    }

    public void setLeve1RefuseDes(String leve1RefuseDes) {
        this.leve1RefuseDes = leve1RefuseDes;
    }

    public String getLeve2RefuseCode() {
        return leve2RefuseCode;
    }

    public void setLeve2RefuseCode(String leve2RefuseCode) {
        this.leve2RefuseCode = leve2RefuseCode;
    }

    public String getLeve2RefuseDes() {
        return leve2RefuseDes;
    }

    public void setLeve2RefuseDes(String leve2RefuseDes) {
        this.leve2RefuseDes = leve2RefuseDes;
    }

    public String getLeve3RefuseCode() {
        return leve3RefuseCode;
    }

    public void setLeve3RefuseCode(String leve3RefuseCode) {
        this.leve3RefuseCode = leve3RefuseCode;
    }

    public String getLeve3RefuseDes() {
        return leve3RefuseDes;
    }

    public void setLeve3RefuseDes(String leve3RefuseDes) {
        this.leve3RefuseDes = leve3RefuseDes;
    }
}
