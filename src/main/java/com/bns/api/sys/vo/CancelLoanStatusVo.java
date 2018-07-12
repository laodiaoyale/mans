package com.bns.api.sys.vo;

/**
 * chenyifan
 *  取消订单原因
 */
public class CancelLoanStatusVo {
    //取消订单原因编号
    private int statusid;
   //取消订单原因
    private String statusmesssage;

    public int getStatusid() {
        return statusid;
    }

    public void setStatusid(int statusid) {
        this.statusid=statusid;
    }

    public String getStatusmesssage() {
        return statusmesssage;
    }

    public void setStatusmesssage(String statusmesssage) {
        this.statusmesssage=statusmesssage;
    }

    public CancelLoanStatusVo(int statusid, String statusmesssage) {
        this.statusid=statusid;
        this.statusmesssage=statusmesssage;
    }

    public CancelLoanStatusVo() {
    }
}
