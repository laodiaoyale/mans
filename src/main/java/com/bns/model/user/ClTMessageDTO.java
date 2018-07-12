package com.bns.model.user;

import java.util.Date;

public class ClTMessageDTO {
    /**
     * 
     */
    private Integer id;

    /**
     * 系统公告表id
     */
    private Integer sysMsgId;

    /**
     * 接收客户统一编号
     */
    private String custCode;

    /**
     * 业务类型（1：出借，2：转让，3：充值，4：提现，5：系统公告)
     */
    private String bisType;

    /**
     * 消息标题
     */
    private String msgTitle;

    /**
     * 消息内容
     */
    private String msgContent;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 修改时间
     */
    private Date updateTime;

    /**
     * 推送状态(1：已推送，0：未推送)
     */
    private String pushType;

    /**
     * 读取状态(1：已读，0：未读)  消息类型为站内信息
     */
    private String isRead;

    /**
     * 数据有效性(1：有效，0：无效)
     */
    private String validateState;

    public String getCustCode() {
        return custCode;
    }

    public void setCustCode(String custCode) {
        this.custCode = custCode;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getSysMsgId() {
        return sysMsgId;
    }

    public void setSysMsgId(Integer sysMsgId) {
        this.sysMsgId = sysMsgId;
    }

    public String getBisType() {
        return bisType;
    }

    public void setBisType(String bisType) {
        this.bisType = bisType == null ? null : bisType.trim();
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

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getPushType() {
        return pushType;
    }

    public void setPushType(String pushType) {
        this.pushType = pushType == null ? null : pushType.trim();
    }

    public String getIsRead() {
        return isRead;
    }

    public void setIsRead(String isRead) {
        this.isRead = isRead == null ? null : isRead.trim();
    }

    public String getValidateState() {
        return validateState;
    }

    public void setValidateState(String validateState) {
        this.validateState = validateState == null ? null : validateState.trim();
    }
}