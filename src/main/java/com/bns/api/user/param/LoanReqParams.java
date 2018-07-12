package com.bns.api.user.param;


import common.annotation.NotBlank;

public class LoanReqParams {

    @NotBlank(message = "订单编号不能为空")
    private String orderNo;
    @NotBlank(message = "撤销原因编号不能为空")
    private String causeCode;

    private String reviewUser;

    private String type;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getReviewUser() {
        return reviewUser;
    }

    public void setReviewUser(String reviewUser) {
        this.reviewUser = reviewUser;
    }

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getCauseCode() {
        return causeCode;
    }

    public void setCauseCode(String causeCode) {
        this.causeCode = causeCode;
    }
}
