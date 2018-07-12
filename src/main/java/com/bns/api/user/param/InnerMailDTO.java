package com.bns.api.user.param;

import java.util.Date;

/**
 * 消息与通知的扩展bean
 */
public class InnerMailDTO {

    private String title;

    private String context;

    private String bisType;

    private String custCode;

    private Date effectiveTime;

    public String getCustCode() {
        return custCode;
    }

    public void setCustCode(String custCode) {
        this.custCode = custCode;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public String getBisType() {
        return bisType;
    }

    public void setBisType(String bisType) {
        this.bisType = bisType;
    }

    public Date getEffectiveTime() {
        return effectiveTime;
    }

    public void setEffectiveTime(Date effectiveTime) {
        this.effectiveTime = effectiveTime;
    }
}
