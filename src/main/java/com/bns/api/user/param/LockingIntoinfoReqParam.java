package com.bns.api.user.param;

public class LockingIntoinfoReqParam<T> {

    private String intoCode;

    private String reviewUserName;

    private String reviewUserId;

    private String type;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getIntoCode() {
        return intoCode;
    }

    public void setIntoCode(String intoCode) {
        this.intoCode = intoCode;
    }

    public String getReviewUserName() {
        return reviewUserName;
    }

    public void setReviewUserName(String reviewUserName) {
        this.reviewUserName = reviewUserName;
    }

    public String getReviewUserId() {
        return reviewUserId;
    }

    public void setReviewUserId(String reviewUserId) {
        this.reviewUserId = reviewUserId;
    }
}
