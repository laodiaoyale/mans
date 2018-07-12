package com.bns.api.user.vo;

/**
 * 还款明细
 */

public class RepayPlanVo {
    //还款期数
    private String term;
    //还款日期
    private String repayDate;
    //应还金额
    private String repayMoney;
    //应还利息
    private String mustInst;
    //应还本金
    private String mustBase;
    //剩余本金
    private String leftPrincipal;

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public String getRepayDate() {
        return repayDate;
    }

    public void setRepayDate(String repayDate) {
        this.repayDate = repayDate;
    }

    public String getRepayMoney() {
        return repayMoney;
    }

    public void setRepayMoney(String repayMoney) {
        this.repayMoney = repayMoney;
    }

    public String getMustInst() {
        return mustInst;
    }

    public void setMustInst(String mustInst) {
        this.mustInst = mustInst;
    }

    public String getMustBase() {
        return mustBase;
    }

    public void setMustBase(String mustBase) {
        this.mustBase = mustBase;
    }

    public String getLeftPrincipal() {
        return leftPrincipal;
    }

    public void setLeftPrincipal(String leftPrincipal) {
        this.leftPrincipal = leftPrincipal;
    }
}
