package com.bns.api.ddenum;

/**
 * <p>取消订单原因枚举类</p>
 * <BR>	修改记录
 * <BR>-----------------------------------------------
 * <BR>	修改日期			修改人			修改内容
 * </PRE>
 *
 * @author weili.chen
 * @version V1.0
 * @date 2017/11/13  9:50
 */
public enum CancelLoanStatusEnum {

    APPROVAL(1,"信息有误，重新申请"),
    FAIL(5,"流程复杂，时间太长"),
    COMPLETED(6,"已在其他公司或渠道申请"),
    REPAYMENT(7,"其他原因");
    //取消状态码，
    private int statusCode;
    //取消状态描述
    private String statusValue;


    public static CancelLoanStatusEnum getStatusValueByStatusCode(int statusCode) {
        for (CancelLoanStatusEnum cancelLoanStatusEnum : CancelLoanStatusEnum.values()) {
            if (statusCode==cancelLoanStatusEnum.getStatusCode()) {
                return cancelLoanStatusEnum;
            }

        }
        return null;
    }
    CancelLoanStatusEnum(int statusCode, String statusValue) {
        this.statusCode = statusCode;
        this.statusValue = statusValue;
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
}
