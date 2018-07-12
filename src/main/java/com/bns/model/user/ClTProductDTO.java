package com.bns.model.user;

import java.math.BigDecimal;
import java.util.Date;

public class ClTProductDTO {
    private Integer id;

    private String productChannel;

    private String productCode;

    private String productName;

    private Integer productPeroid;

    private String peroidType;

    private BigDecimal productRate;

    private BigDecimal monthRate;

    private BigDecimal trialRate;

    private String creatorId;

    private Integer safeFee;

    private String remarks;

    private String validateState;

    private Date createTime;

    private Date updateTime;

    private BigDecimal yearTotalRate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProductChannel() {
        return productChannel;
    }

    public void setProductChannel(String productChannel) {
        this.productChannel = productChannel == null ? null : productChannel.trim();
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode == null ? null : productCode.trim();
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName == null ? null : productName.trim();
    }

    public Integer getProductPeroid() {
        return productPeroid;
    }

    public void setProductPeroid(Integer productPeroid) {
        this.productPeroid = productPeroid;
    }

    public String getPeroidType() {
        return peroidType;
    }

    public void setPeroidType(String peroidType) {
        this.peroidType = peroidType == null ? null : peroidType.trim();
    }

    public BigDecimal getProductRate() {
        return productRate;
    }

    public void setProductRate(BigDecimal productRate) {
        this.productRate = productRate;
    }

    public BigDecimal getMonthRate() {
        return monthRate;
    }

    public void setMonthRate(BigDecimal monthRate) {
        this.monthRate = monthRate;
    }

    public BigDecimal getTrialRate() {
        return trialRate;
    }

    public void setTrialRate(BigDecimal trialRate) {
        this.trialRate = trialRate;
    }

    public String getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(String creatorId) {
        this.creatorId = creatorId == null ? null : creatorId.trim();
    }

    public Integer getSafeFee() {
        return safeFee;
    }

    public void setSafeFee(Integer safeFee) {
        this.safeFee = safeFee;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks == null ? null : remarks.trim();
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

    public BigDecimal getYearTotalRate() {
        return yearTotalRate;
    }

    public void setYearTotalRate(BigDecimal yearTotalRate) {
        this.yearTotalRate = yearTotalRate;
    }
}