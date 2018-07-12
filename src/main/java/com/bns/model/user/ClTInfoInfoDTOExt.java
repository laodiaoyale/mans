package com.bns.model.user;

import java.util.Date;

/**
 * 审批列队扩展bean
 */
public class ClTInfoInfoDTOExt extends ClTIntoInfoDTO{

    //客户姓名
    private String name;

    //客户手机号
    private String mobile;

    //申请提交时间
    private Date approveReqTime;

    //业务类型
    private String productName;

    //审批状态
    private Byte status;

    //列队
    private Integer manualReviewQueue;

    //当前列队
    private int type;

    //审批时间
    private Date reviewTime;

    //放款金额
    private Integer fundAmt;

    //还款日期
    private Date approveRetTime;

    //批核期限
    private String promotionSource;

    //是否锁定
    private boolean isLocking;

    //锁定人id
    private String lockUserId ;
    //锁定人姓名
    private String lockUserName;
    //撤销原因码
    private String cancelCode;
    //是否命中 默认为false 命中为true
    private boolean flagZP01;

    //申请终端
    private String applyTerminal;
    //进件渠道
    private String applyChannel;

    public String getApplyChannel() {
        return applyChannel;
    }

    public void setApplyChannel(String applyChannel) {
        this.applyChannel = applyChannel;
    }

    @Override
    public String getApplyTerminal() {
        return applyTerminal;
    }

    @Override
    public void setApplyTerminal(String applyTerminal) {
        this.applyTerminal = applyTerminal;
    }


    //命中策略码
    private String reviewStrategyCode;
    //客户来源
    private String marketChannel;

    public String getMarketChannel() {
        return marketChannel;
    }

    public void setMarketChannel(String marketChannel) {
        this.marketChannel = marketChannel;
    }

    public boolean isFlagZP01() {
        return flagZP01;
    }

    public void setFlagZP01(boolean flagZP01) {
        this.flagZP01 = flagZP01;
    }

    public String getReviewStrategyCode() {
        return reviewStrategyCode;
    }

    public void setReviewStrategyCode(String reviewStrategyCode) {
        this.reviewStrategyCode = reviewStrategyCode;
    }

    public String getCancelCode() {
        return cancelCode;
    }

    public void setCancelCode(String cancelCode) {
        this.cancelCode = cancelCode;
    }

    public String getLockUserName() {
        return lockUserName;
    }

    public void setLockUserName(String lockUserName) {
        this.lockUserName = lockUserName;
    }

    //运营推广来源 1-百融 2-卡牛
    public String getPromotionSource() {
        return promotionSource;
    }

    public void setPromotionSource(String promotionSource) {
        this.promotionSource = promotionSource;
    }

    //批核期限
    private String loanPeriods;

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

    public Date getReviewTime() {
        return reviewTime;
    }

    public void setReviewTime(Date reviewTime) {
        this.reviewTime = reviewTime;
    }

    public Date getApproveRetTime() {
        return approveRetTime;
    }

    public void setApproveRetTime(Date approveRetTime) {
        this.approveRetTime = approveRetTime;
    }

    private int pageNum;

    private int pageSize;

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getApproveReqTime() {
        return approveReqTime;
    }

    public void setApproveReqTime(Date approveReqTime) {
        this.approveReqTime = approveReqTime;
    }

    public boolean isLocking() {
        return isLocking;
    }

    public void setLocking(boolean locking) {
        isLocking = locking;
    }

    public String getLockUserId() {
        return lockUserId;
    }

    public void setLockUserId(String lockUserId) {
        this.lockUserId = lockUserId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    public Integer getManualReviewQueue() {
        return manualReviewQueue;
    }

    public void setManualReviewQueue(Integer manualReviewQueue) {
        this.manualReviewQueue = manualReviewQueue;
    }
}
