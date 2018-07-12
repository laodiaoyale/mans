package com.bns.model.loan;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 贷款系统费用表
 */
public class ClALoanCost {
    /**主键id*/
    private Long id;
    /**订单编号*/
    private String orderNo;
    /**产品编号*/
    private String productCode;
    /**产品期限单位：1:天，2：月*/
    private Integer periodUnit;
    /**每期时间间隔*/
    private Integer periodStep;
    /**捷越日利率*/
    private BigDecimal jydayRate;
    /**捷越年利率*/
    private BigDecimal jyyearRate;
    /**总利息*/
    private Integer totalInst;
    /**合计日利率*/
    private BigDecimal wfdayRate;
    /**合计费用*/
    private Integer totalFee;
    /**信用审核费*/
    private Integer auditFee;
    /**平台费用*/
    private Integer platformFee;
    /**捷越费用*/
    private Integer jyFee;
    /**合作机构费用*/
    private Integer wfFee;
    /**罚息利率*/
    private BigDecimal fxRate;
    /**罚息计息方式（固定值：01）*/
    private Integer fxType;
    /**创建时间*/
    private Date createTime;
    /**修改时间*/
    private Date updateTime;

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

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode == null ? null : productCode.trim();
    }

    public Integer getPeriodUnit() {
        return periodUnit;
    }

    public void setPeriodUnit(Integer periodUnit) {
        this.periodUnit = periodUnit;
    }

    public Integer getPeriodStep() {
        return periodStep;
    }

    public void setPeriodStep(Integer periodStep) {
        this.periodStep = periodStep;
    }

    public BigDecimal getJydayRate() {
        return jydayRate;
    }

    public void setJydayRate(BigDecimal jydayRate) {
        this.jydayRate = jydayRate;
    }

    public BigDecimal getJyyearRate() {
        return jyyearRate;
    }

    public void setJyyearRate(BigDecimal jyyearRate) {
        this.jyyearRate = jyyearRate;
    }

    public Integer getTotalInst() {
        return totalInst;
    }

    public void setTotalInst(Integer totalInst) {
        this.totalInst = totalInst;
    }

    public BigDecimal getWfdayRate() {
        return wfdayRate;
    }

    public void setWfdayRate(BigDecimal wfdayRate) {
        this.wfdayRate = wfdayRate;
    }

    public Integer getTotalFee() {
        return totalFee;
    }

    public void setTotalFee(Integer totalFee) {
        this.totalFee = totalFee;
    }

    public Integer getAuditFee() {
        return auditFee;
    }

    public void setAuditFee(Integer auditFee) {
        this.auditFee = auditFee;
    }

    public Integer getPlatformFee() {
        return platformFee;
    }

    public void setPlatformFee(Integer platformFee) {
        this.platformFee = platformFee;
    }

    public Integer getJyFee() {
        return jyFee;
    }

    public void setJyFee(Integer jyFee) {
        this.jyFee = jyFee;
    }

    public Integer getWfFee() {
        return wfFee;
    }

    public void setWfFee(Integer wfFee) {
        this.wfFee = wfFee;
    }

    public BigDecimal getFxRate() {
        return fxRate;
    }

    public void setFxRate(BigDecimal fxRate) {
        this.fxRate = fxRate;
    }

    public Integer getFxType() {
        return fxType;
    }

    public void setFxType(Integer fxType) {
        this.fxType = fxType;
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