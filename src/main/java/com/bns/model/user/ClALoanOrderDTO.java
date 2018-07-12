package com.bns.model.user;

import java.math.BigDecimal;
import java.util.Date;

public class ClALoanOrderDTO {
    private Long id;

    private String orderNo;

    private String intoCode;

    private String contractNo;

    private String custCode;

    private Integer contractAmt;

    private Integer fundAmt;

    private Integer loanPeriods;

    private String productCode;

    private String loanPurpose;

    private String source;

    private Integer status;

    private String remark;

    private String dkIntoCode;

    private Date fundTime;

    private Integer factFundAmt;

    private Integer fundStatus;

    private String lostReason;

    private Integer cancelCode;

    private String refuseReason;

    private Date refuseDate;

    private Integer refuseDays;

    private Date approveReqTime;

    private Date approveRetTime;

    private Date humanReviewTime;

    private BigDecimal rate;

    private Date signTime;

    private Integer nodeRecord;

    private Date createTime;

    private Date updateTime;

    private String dkLoanResults;

    private String email;

    private String applyTerminal;

    public String getApplyTerminal() {
        return applyTerminal;
    }

    public void setApplyTerminal(String applyTerminal) {
        this.applyTerminal = applyTerminal;
    }

    /**
     * 标签 用于区分是否给三方api 推送消息
     * @return
     */
    private Integer flag;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo == null ? null : orderNo.trim();
    }

    public String getIntoCode() {
        return intoCode;
    }

    public void setIntoCode(String intoCode) {
        this.intoCode = intoCode == null ? null : intoCode.trim();
    }

    public String getContractNo() {
        return contractNo;
    }

    public void setContractNo(String contractNo) {
        this.contractNo = contractNo == null ? null : contractNo.trim();
    }

    public String getCustCode() {
        return custCode;
    }

    public void setCustCode(String custCode) {
        this.custCode = custCode == null ? null : custCode.trim();
    }

    public Integer getContractAmt() {
        return contractAmt;
    }

    public void setContractAmt(Integer contractAmt) {
        this.contractAmt = contractAmt;
    }

    public Integer getFundAmt() {
        return fundAmt;
    }

    public void setFundAmt(Integer fundAmt) {
        this.fundAmt = fundAmt;
    }

    public Integer getLoanPeriods() {
        return loanPeriods;
    }

    public void setLoanPeriods(Integer loanPeriods) {
        this.loanPeriods = loanPeriods;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode == null ? null : productCode.trim();
    }

    public String getLoanPurpose() {
        return loanPurpose;
    }

    public void setLoanPurpose(String loanPurpose) {
        this.loanPurpose = loanPurpose == null ? null : loanPurpose.trim();
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source == null ? null : source.trim();
    }



    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public String getDkIntoCode() {
        return dkIntoCode;
    }

    public void setDkIntoCode(String dkIntoCode) {
        this.dkIntoCode = dkIntoCode == null ? null : dkIntoCode.trim();
    }

    public Date getFundTime() {
        return fundTime;
    }

    public void setFundTime(Date fundTime) {
        this.fundTime = fundTime;
    }

    public Integer getFactFundAmt() {
        return factFundAmt;
    }

    public void setFactFundAmt(Integer factFundAmt) {
        this.factFundAmt = factFundAmt;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getFundStatus() {
        return fundStatus;
    }

    public void setFundStatus(Integer fundStatus) {
        this.fundStatus = fundStatus;
    }

    public String getLostReason() {
        return lostReason;
    }

    public void setLostReason(String lostReason) {
        this.lostReason = lostReason == null ? null : lostReason.trim();
    }

    public Integer getCancelCode() {
        return cancelCode;
    }

    public void setCancelCode(Integer cancelCode) {
        this.cancelCode = cancelCode;
    }

    public String getRefuseReason() {
        return refuseReason;
    }

    public void setRefuseReason(String refuseReason) {
        this.refuseReason = refuseReason == null ? null : refuseReason.trim();
    }

    public Date getRefuseDate() {
        return refuseDate;
    }

    public void setRefuseDate(Date refuseDate) {
        this.refuseDate = refuseDate;
    }

    public Integer getRefuseDays() {
        return refuseDays;
    }

    public void setRefuseDays(Integer refuseDays) {
        this.refuseDays = refuseDays;
    }

    public Date getApproveReqTime() {
        return approveReqTime;
    }

    public void setApproveReqTime(Date approveReqTime) {
        this.approveReqTime = approveReqTime;
    }

    public Date getApproveRetTime() {
        return approveRetTime;
    }

    public void setApproveRetTime(Date approveRetTime) {
        this.approveRetTime = approveRetTime;
    }

    public Date getHumanReviewTime() {
        return humanReviewTime;
    }

    public void setHumanReviewTime(Date humanReviewTime) {
        this.humanReviewTime = humanReviewTime;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public void setRate(BigDecimal rate) {
        this.rate = rate;
    }

    public Date getSignTime() {
        return signTime;
    }

    public void setSignTime(Date signTime) {
        this.signTime = signTime;
    }

    public Integer getNodeRecord() {
        return nodeRecord;
    }

    public void setNodeRecord(Integer nodeRecord) {
        this.nodeRecord = nodeRecord;
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

    public String getDkLoanResults() {
        return dkLoanResults;
    }

    public void setDkLoanResults(String dkLoanResults) {
        this.dkLoanResults = dkLoanResults == null ? null : dkLoanResults.trim();
    }

    public Integer getFlag() {
        return flag;
    }

    public void setFlag(Integer flag) {
        this.flag = flag;
    }
}