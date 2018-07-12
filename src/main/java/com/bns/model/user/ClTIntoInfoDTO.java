package com.bns.model.user;

import java.util.Date;

public class ClTIntoInfoDTO {
    private Long id;

    private String intoCode;

    private String custCode;

    private String productCode;

    private Integer applyPeriod;

    private Integer applyAmount;

    private Integer creditAmount;

    private Date creditReqTime;

    private Date creditRetTime;

    private Integer approveAmount;

    private Double approveRate;

    private String purposeType;

    private String state;

    private Integer calculateTimeLen;

    private Integer chooseContactTime;

    private String validateState;

    private Date createTime;

    private Date updateTime;

    private String applyTerminal;

    private String applyProduct;

    public String getApplyProduct() {
        return applyProduct;
    }

    public void setApplyProduct(String applyProduct) {
        this.applyProduct = applyProduct;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIntoCode() {
        return intoCode;
    }

    public void setIntoCode(String intoCode) {
        this.intoCode = intoCode == null ? null : intoCode.trim();
    }

    public String getCustCode() {
        return custCode;
    }

    public void setCustCode(String custCode) {
        this.custCode = custCode == null ? null : custCode.trim();
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode == null ? null : productCode.trim();
    }

    public Integer getApplyPeriod() {
        return applyPeriod;
    }

    public void setApplyPeriod(Integer applyPeriod) {
        this.applyPeriod = applyPeriod;
    }

    public Integer getApplyAmount() {
        return applyAmount;
    }

    public void setApplyAmount(Integer applyAmount) {
        this.applyAmount = applyAmount;
    }

    public Integer getCreditAmount() {
        return creditAmount;
    }

    public void setCreditAmount(Integer creditAmount) {
        this.creditAmount = creditAmount;
    }

    public Date getCreditReqTime() {
        return creditReqTime;
    }

    public void setCreditReqTime(Date creditReqTime) {
        this.creditReqTime = creditReqTime;
    }

    public Date getCreditRetTime() {
        return creditRetTime;
    }

    public void setCreditRetTime(Date creditRetTime) {
        this.creditRetTime = creditRetTime;
    }

    public Integer getApproveAmount() {
        return approveAmount;
    }

    public void setApproveAmount(Integer approveAmount) {
        this.approveAmount = approveAmount;
    }

    public Double getApproveRate() {
        return approveRate;
    }

    public void setApproveRate(Double approveRate) {
        this.approveRate = approveRate;
    }

    public String getPurposeType() {
        return purposeType;
    }

    public void setPurposeType(String purposeType) {
        this.purposeType = purposeType == null ? null : purposeType.trim();
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state == null ? null : state.trim();
    }

    public Integer getCalculateTimeLen() {
        return calculateTimeLen;
    }

    public void setCalculateTimeLen(Integer calculateTimeLen) {
        this.calculateTimeLen = calculateTimeLen;
    }

    public Integer getChooseContactTime() {
        return chooseContactTime;
    }

    public void setChooseContactTime(Integer chooseContactTime) {
        this.chooseContactTime = chooseContactTime;
    }

    public String getValidateState() {
        return validateState;
    }

    public void setValidateState(String validateState) {
        this.validateState = validateState == null ? null : validateState.trim();
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

    public String getApplyTerminal() {
        return applyTerminal;
    }

    public void setApplyTerminal(String applyTerminal) {
        this.applyTerminal = applyTerminal;
    }
}