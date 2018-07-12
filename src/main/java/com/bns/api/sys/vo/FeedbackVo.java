package com.bns.api.sys.vo;

/**
 * chenyuifan
 * 意见反馈
 */
public class FeedbackVo {
    //反馈信息编号
    private int feedbackId;
    //反馈信息
    private String feedbackmessage;

    public FeedbackVo(int feedbackId, String feedbackmessage) {
        this.feedbackId=feedbackId;
        this.feedbackmessage=feedbackmessage;
    }

    public FeedbackVo() {
    }

    public int getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(int feedbackId) {
        this.feedbackId = feedbackId;
    }

    public String getFeedbackmessage() {
        return feedbackmessage;
    }

    public void setFeedbackmessage(String feedbackmessage) {
        this.feedbackmessage = feedbackmessage;
    }
}
