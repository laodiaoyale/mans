package com.bns.model.user;

import java.util.Date;

public class ClTSysMsgDTO {
    /**
     * 
     */
    private Integer id;

    /**
     * 系统公告类别
     */
    private String msgType;

    /**
     * 系统公告标题
     */
    private String msgTitle;

    /**
     * 系统公告内容
     */
    private String msgContent;

    /**
     * 系统公告推送时间
     */
    private Date effectiveTime;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 数据有效性(1：有效，0：无效)
     */
    private String validateState;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMsgType() {
        return msgType;
    }

    public void setMsgType(String msgType) {
        this.msgType = msgType == null ? null : msgType.trim();
    }

    public String getMsgTitle() {
        return msgTitle;
    }

    public void setMsgTitle(String msgTitle) {
        this.msgTitle = msgTitle == null ? null : msgTitle.trim();
    }

    public String getMsgContent() {
        return msgContent;
    }

    public void setMsgContent(String msgContent) {
        this.msgContent = msgContent == null ? null : msgContent.trim();
    }

    public Date getEffectiveTime() {
        return effectiveTime;
    }

    public void setEffectiveTime(Date effectiveTime) {
        this.effectiveTime = effectiveTime;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getValidateState() {
        return validateState;
    }

    public void setValidateState(String validateState) {
        this.validateState = validateState == null ? null : validateState.trim();
    }
}