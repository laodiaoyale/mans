package com.bns.model.loan;

import java.util.Date;

public class RepayPlan {
    /**
     * 
     */
    private Integer id;

    /**
     * 还款ID
     */
    private String repayId;

    /**
     * 借款人ID
     */
    private String loanUserId;

    /**
     * 当期还款金额
     */
    private Integer repayAmount;

    /**
     * 本金
     */
    private Integer corpus;

    /**
     * 利息
     */
    private Integer interest;

    /**
     * 当前期数
     */
    private Byte period;

    /**
     * 订单ID
     */
    private String orderId;

    /**
     * 实际还款金额
     */
    private Integer actualPayment;

    /**
     * 还款卡号
     */
    private String paymentCard;

    /**
     * 所属银行
     */
    private String paymentBankName;

    /**
     * 应还款日期
     */
    private Date repayTime;

    /**
     * 实际还款日期
     */
    private Date operationTime;

    /**
     * 还款状态：逾期、未还、已还、M+
     */
    private Integer status;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 修改时间
     */
    private Date updateTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRepayId() {
        return repayId;
    }

    public void setRepayId(String repayId) {
        this.repayId = repayId == null ? null : repayId.trim();
    }

    public String getLoanUserId() {
        return loanUserId;
    }

    public void setLoanUserId(String loanUserId) {
        this.loanUserId = loanUserId == null ? null : loanUserId.trim();
    }

    public Integer getRepayAmount() {
        return repayAmount;
    }

    public void setRepayAmount(Integer repayAmount) {
        this.repayAmount = repayAmount;
    }

    public Integer getCorpus() {
        return corpus;
    }

    public void setCorpus(Integer corpus) {
        this.corpus = corpus;
    }

    public Integer getInterest() {
        return interest;
    }

    public void setInterest(Integer interest) {
        this.interest = interest;
    }

    public Byte getPeriod() {
        return period;
    }

    public void setPeriod(Byte period) {
        this.period = period;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId == null ? null : orderId.trim();
    }

    public Integer getActualPayment() {
        return actualPayment;
    }

    public void setActualPayment(Integer actualPayment) {
        this.actualPayment = actualPayment;
    }

    public String getPaymentCard() {
        return paymentCard;
    }

    public void setPaymentCard(String paymentCard) {
        this.paymentCard = paymentCard == null ? null : paymentCard.trim();
    }

    public String getPaymentBankName() {
        return paymentBankName;
    }

    public void setPaymentBankName(String paymentBankName) {
        this.paymentBankName = paymentBankName == null ? null : paymentBankName.trim();
    }

    public Date getRepayTime() {
        return repayTime;
    }

    public void setRepayTime(Date repayTime) {
        this.repayTime = repayTime;
    }

    public Date getOperationTime() {
        return operationTime;
    }

    public void setOperationTime(Date operationTime) {
        this.operationTime = operationTime;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}