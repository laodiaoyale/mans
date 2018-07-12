package com.bns.model.contract;

import java.math.BigDecimal;
import java.util.Date;

public class SignManagerDTO {
    //进件编号
    private String intoCode;

    //订单编号
    private String orderNo;

    //用户姓名
    private String name;

    //手机号码
    private String mobile;

    //批核金额/元(订单表放款金额)
    private Integer fundAmt;

    //核批期限(订单表借款期限)
    private String loanPeriods;

    //产品月综合费率
    private BigDecimal productRate;

    //签约状态
    private String contractStatus;

    // 操作时间operation time
    private String operationTime;

    //签约有效截止日期Signing a valid deadline
    private String signDeadline;

    //取消订单原因的编码(订单表)
    private Integer  cancelCode;

    //取消状态描述
    private String statusValue;

    //业务类型（产品表的名称）
    private String productName;

    //订单状态
    private Integer status;

    //节点记录：201自动审核通过；202人工审核通过；301审批中撤消；302待签约撤销 1001:自动拒绝 1002:人工拒绝',
    private Integer nodeRecord;

    //签约提交时间
    private String signTime="";

    //修改时间
    private String updateTime="";

    //审批结果返回时间
    private Date approveRetTime;
    //人工审核时间
    private Date humanReviewTime;

    public Date getHumanReviewTime() {
        return humanReviewTime;
    }

    public void setHumanReviewTime(Date humanReviewTime) {
        this.humanReviewTime = humanReviewTime;
    }

    public Integer getNodeRecord() {
        return nodeRecord;
    }

    public void setNodeRecord(Integer nodeRecord) {
        this.nodeRecord = nodeRecord;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getOperationTime() {
        return operationTime;
    }

    public void setOperationTime(String operationTime) {
        this.operationTime = operationTime;
    }

    public String getSignTime() {
        return signTime;
    }

    public void setSignTime(String signTime) {
        this.signTime = signTime;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }

    public Date getApproveRetTime() {
        return approveRetTime;
    }

    public void setApproveRetTime(Date approveRetTime) {
        this.approveRetTime = approveRetTime;
    }

    public String getContractStatus() {
        return contractStatus;
    }

    public void setContractStatus(String contractStatus) {
        this.contractStatus = contractStatus;
    }

    public String getSignDeadline() {
        return signDeadline;
    }

    public void setSignDeadline(String signDeadline) {
        this.signDeadline = signDeadline;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getStatusValue() {
        return statusValue;
    }

    public void setStatusValue(String statusValue) {
        this.statusValue = statusValue;
    }

    public String getIntoCode() {
        return intoCode;
    }

    public void setIntoCode(String intoCode) {
        this.intoCode = intoCode;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
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

    public Integer getFundAmt() {
        return fundAmt;
    }

    public void setFundAmt(Integer fundAmt) {
        this.fundAmt = fundAmt;
    }

    public String getLoanPeriods() {
        return loanPeriods;
    }

    public void setLoanPeriods(String loanPeriods) {
        this.loanPeriods = loanPeriods;
    }

    public BigDecimal getProductRate() {
        return productRate;
    }

    public void setProductRate(BigDecimal productRate) {
        this.productRate = productRate;
    }

    public Integer getCancelCode() {
        return cancelCode;
    }

    public void setCancelCode(Integer cancelCode) {
        this.cancelCode = cancelCode;
    }
}
