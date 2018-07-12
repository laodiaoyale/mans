package com.bns.model.contract;

import java.math.BigDecimal;
import java.util.Date;

public class ContractManagerDTO {

    //客户编号
    private String custCode;

    //合同编号
    private String contractNo;

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

    //放款状态(订单表订单状态)
    private Integer  status;

    //放款日期
    private Date fundDate;

    //业务类型(产品表中产品名称)
    private String productName;

    //放款状态
    private String loanStatus;

    public String getContractNo() {
        return contractNo;
    }

    public void setContractNo(String contractNo) {
        this.contractNo = contractNo;
    }

    public String getCustCode() {
        return custCode;
    }

    public void setCustCode(String custCode) {
        this.custCode = custCode;
    }

    public String getLoanStatus() {
        return loanStatus;
    }

    public void setLoanStatus(String loanStatus) {
        this.loanStatus = loanStatus;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
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

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getFundDate() {
        return fundDate;
    }

    public void setFundDate(Date fundDate) {
        this.fundDate = fundDate;
    }
}
