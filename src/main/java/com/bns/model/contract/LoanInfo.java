package com.bns.model.contract;

import java.util.Date;

public class LoanInfo {

    //合同编号
    private String contractNo;

    //进件编号
    private String intoCode;

    // 业务类型
    private String productName="大额现金贷";
    //授信额度
    private Integer fundAmt;

    //借款金额
    private Integer factFundAmt;

    //借款期限
    private String loanPeriods;

    //核批时间
    private Date approveRetTime;

    public Date getApproveRetTime() {
        return approveRetTime;
    }

    public void setApproveRetTime(Date approveRetTime) {
        this.approveRetTime = approveRetTime;
    }

    public String getIntoCode() {
        return intoCode;
    }

    public void setIntoCode(String intoCode) {
        this.intoCode = intoCode;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getContractNo() {
        return contractNo;
    }

    public void setContractNo(String contractNo) {
        this.contractNo = contractNo;
    }

    public Integer getFundAmt() {
        return fundAmt;
    }

    public void setFundAmt(Integer fundAmt) {
        this.fundAmt = fundAmt;
    }

    public Integer getFactFundAmt() {
        return factFundAmt;
    }

    public void setFactFundAmt(Integer factFundAmt) {
        this.factFundAmt = factFundAmt;
    }

    public String getLoanPeriods() {
        return loanPeriods;
    }

    public void setLoanPeriods(String loanPeriods) {
        this.loanPeriods = loanPeriods;
    }


}
