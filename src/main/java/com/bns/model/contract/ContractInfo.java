package com.bns.model.contract;

public class ContractInfo {

    //合同编号
    private String contractNo;
    //贷款发布日期
    private String fundDate;
    //贷款到期日期
    private String endDate;
    //贷款状态
    private String loanStatus;
    //贷款余额
    private String loanBalance;
    //当前贷款期次
    private String curLoanPeriod;

    public String getContractNo() {
        return contractNo;
    }

    public void setContractNo(String contractNo) {
        this.contractNo = contractNo;
    }

    public String getFundDate() {
        return fundDate;
    }

    public void setFundDate(String fundDate) {
        this.fundDate = fundDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getLoanStatus() {
        return loanStatus;
    }

    public void setLoanStatus(String loanStatus) {
        this.loanStatus = loanStatus;
    }

    public String getLoanBalance() {
        return loanBalance;
    }

    public void setLoanBalance(String loanBalance) {
        this.loanBalance = loanBalance;
    }

    public String getCurLoanPeriod() {
        return curLoanPeriod;
    }

    public void setCurLoanPeriod(String curLoanPeriod) {
        this.curLoanPeriod = curLoanPeriod;
    }
}
