package com.bns.model.operationpanel;

import org.jetbrains.annotations.NotNull;

/**
 * 日期查询
 */
public class OperationPanelDTO  implements Comparable<OperationPanelDTO> {
    //时间
    private String thattime;
    //数量
    private String thatNumber;

    public OperationPanelDTO(String thattime, String thatNumber) {
        this.thattime=thattime;
        this.thatNumber=thatNumber;
    }

    public OperationPanelDTO() {
    }

    public String getThattime() {
        return thattime;
    }

    public void setThattime(String thattime) {
        this.thattime=thattime;
    }

    public String getThatNumber() {
        return thatNumber;
    }

    public void setThatNumber(String thatNumber) {
        this.thatNumber=thatNumber;
    }

    @Override
    public int compareTo(@NotNull OperationPanelDTO o) {
        return this.thattime.compareTo(o.thattime);
    }
}
