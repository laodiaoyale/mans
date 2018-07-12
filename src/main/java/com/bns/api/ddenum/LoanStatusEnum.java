package com.bns.api.ddenum;

/**
 * 订单状态
 * Created by TianTianLi on 下午2:39 2017/11/10.
 */
public enum LoanStatusEnum {
    APPROVAL(1,"审批中",1,"审批中",0),
    GO_SIGN(2,"待签约",2,"去签约",0),
    CANCEL(3,"已撤消",3,"已撤消",0),
    INVALID(4,"已失效",4,"已失效",0),
    FAIL(5,"放款失败",6,"待放款",0),
    COMPLETED(6,"待放款",6,"已完成",2),
    REPAYMENT(7,"待还款",6,"待还款",1),
    OVERDUE(8,"已逾期",6,"已逾期",0),
    CLEARED(9,"已结清",6,"已结清",3),
    TEMP_REFUSE(10,"暂时拒绝",5,"未通过",0),
    TEMP_REFUSE_OK(100,"暂时拒绝可进件",5,"未通过",0),
    PERMANENT_REFUSE(11,"暂时拒绝并加入黑名单",5,"未通过",0),
    PERSON_REVIEWED(12,"人工审核",1,"审批中",0),
    AUTOMATIC_CHECK_PASS(201,"自动审核通过",0,"自动审核通过",0),
    MAN_CHECK_PASS(202,"人工审核通过",0,"人工审核通过",0),
    AUTOMATIC_CHECK_REFUSE(1001,"自动拒绝",0,"审批中撤消",0),
    MAN_CHECK_REFUSE(1002,"人工审核拒绝",0,"待签约撤销",0),
    AUTOMATIC_CHECK_REFUSE_BLACK(1101,"自动拒绝并加入黑名单",0,"审批中撤消",0),
    MAN_CHECK_REFUSE_BLACK(1102,"人工审核拒绝并加入黑名单",0,"待签约撤销",0),
    APPROVAL_CANCEL(301,"审批中撤消",0,"审批中撤消",0),
    SIGN_CANCEL(302,"待签约撤销",0,"待签约撤销",0),
//0-通过，1-拒绝，2-拒接并加入黑名单
    QUEUE_SIGN(0,"通过",0,null),
    QUEUE_REFUSE(1,"拒绝",0,null),
    QUEUE_REFUSE_BLACK(2,"拒接并加入黑名单",0,null);

    //订单状态，
    private int statusCode;
    //订单状态描述
    private String statusValue;
    //页面显示用的大大状态值
    private int displayCode;
    //app描述
    private String statusDesc;
    //排序优先级,用于还款列表
    private int sortLevel;


    LoanStatusEnum(int statusCode, String statusValue, int displayCode, String statusDesc) {
        this.statusCode = statusCode;
        this.statusValue = statusValue;
        this.displayCode = displayCode;
        this.statusDesc = statusDesc;
    }

    LoanStatusEnum(int statusCode, String statusValue, int displayCode, String statusDesc, int sortLevel) {
        this.statusCode = statusCode;
        this.statusValue = statusValue;
        this.displayCode = displayCode;
        this.statusDesc = statusDesc;
        this.sortLevel = sortLevel;
    }

    /**
     * @Author: TianTianLi
     * @Description:
     * @Date:下午8:27 2017/11/10
     */
    public static LoanStatusEnum getStatusValuByCode(int statusCode) {
        for (LoanStatusEnum loanStatusEnum : LoanStatusEnum.values()) {
            if (statusCode==loanStatusEnum.getStatusCode()) {
                return loanStatusEnum;
            }

        }
        return null;
    }


    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getStatusValue() {
        return statusValue;
    }

    public void setStatusValue(String statusValue) {
        this.statusValue = statusValue;
    }

    public String getStatusDesc() {
        return statusDesc;
    }

    public void setStatusDesc(String statusDesc) {
        this.statusDesc = statusDesc;
    }

    public int getDisplayCode() {
        return displayCode;
    }

    public void setDisplayCode(int displayCode) {
        this.displayCode = displayCode;
    }

    public int getSortLevel() {
        return sortLevel;
    }

    public void setSortLevel(int sortLevel) {
        this.sortLevel = sortLevel;
    }
}
