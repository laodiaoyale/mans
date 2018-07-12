package com.bns.model.operationpanel;

/**
 * 今日统计数据
 */
public class StatisticsTodayDTO {
    //申请总数
    private String applyTotal;
    //审批拒绝总数
    private String refuseTotal;
    //审批通过总数
    private String adoptTotal;

    public StatisticsTodayDTO(String applyTotal, String refuseTotal, String adoptTotal) {
        this.applyTotal=applyTotal;
        this.refuseTotal=refuseTotal;
        this.adoptTotal=adoptTotal;
    }

    public StatisticsTodayDTO() {
    }

    public String getApplyTotal() {
        return applyTotal;
    }

    public void setApplyTotal(String applyTotal) {
        this.applyTotal=applyTotal;
    }

    public String getRefuseTotal() {
        return refuseTotal;
    }

    public void setRefuseTotal(String refuseTotal) {
        this.refuseTotal=refuseTotal;
    }

    public String getAdoptTotal() {
        return adoptTotal;
    }

    public void setAdoptTotal(String adoptTotal) {
        this.adoptTotal=adoptTotal;
    }
}
