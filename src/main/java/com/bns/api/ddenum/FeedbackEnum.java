package com.bns.api.ddenum;

/**
 * chenyifan
 * 意见反馈
 */
public enum FeedbackEnum {
    Credit_card(1,"信用卡"),
    Operator(2,"运营商"),
    Pbcc(3,"征信报告"),
    ID_Card(4,"身份证"),
    Faceid(5,"人脸识别"),
    AmountIsTooLow(6,"额度太低"),
    Reapply(7,"重新申请"),
    tooLong(8,"时间太长"),
    others(9,"其它");


    public static FeedbackEnum getFeedbackEnumByCode(int feedbackId) {
        for (FeedbackEnum feedbackEnum : FeedbackEnum.values()) {
            if (feedbackId==feedbackEnum.getFeedbackId()) {
                return feedbackEnum;
            }

        }
        return null;
    }
    //反馈信息编号
    private int feedbackId;
    //反馈信息
    private String feedbackmessage;

    FeedbackEnum(int feedbackId, String feedbackmessage) {
        this.feedbackId=feedbackId;
        this.feedbackmessage=feedbackmessage;
    }

    /**
     * @Author: TianTianLi
     * @Description:
     * @Date:下午8:27 2017/11/10
     */
    public static FeedbackEnum getStatusValuByCode(int statusCode) {
        for (FeedbackEnum loanStatusEnum : FeedbackEnum.values()) {
            if (statusCode==loanStatusEnum.getFeedbackId()) {
                return loanStatusEnum;
            }

        }
        return null;
    }
    FeedbackEnum(int feedbackId) {
        this.feedbackId=feedbackId;
    }

    public int getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(int feedbackId) {
        this.feedbackId=feedbackId;
    }

    public String getFeedbackmessage() {
        return feedbackmessage;
    }

    public void setFeedbackmessage(String feedbackmessage) {
        this.feedbackmessage=feedbackmessage;
    }
}
