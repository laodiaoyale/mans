package com.bns.model.sms;
import java.util.Date;

public class ClTSmRecord {
    /**
     * 
     */
    private Long id;

    /**
     * 手机号
     */
    private String mobile;

    /**
     * 业务流水号
     */
    private String serialNo;

    /**
     * 短信模板类型
     */
    private String templateType;

    /**
     * 返回值状态
     */
    private String reqCode;

    /**
     * 
     */
    private String reqId;

    /**
     * 请求时间
     */
    private Date reqTime;

    /**
     * 返回时间
     */
    private Date retTime;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 更新时间
     */
    private Date updateTime;

    /**
     * 短信发送内容
     */
    private String reqBody;

    /**
     * 返回内容
     */
    private String retBody;

    /**
     * 短信条数
     */
    private int smsNo;

    public int getSmsNo() {
        return smsNo;
    }

    public void setSmsNo(int smsNo) {
        this.smsNo = smsNo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile == null ? null : mobile.trim();
    }

    public String getSerialNo() {
        return serialNo;
    }

    public void setSerialNo(String serialNo) {
        this.serialNo = serialNo == null ? null : serialNo.trim();
    }

    public String getTemplateType() {
        return templateType;
    }

    public void setTemplateType(String templateType) {
        this.templateType = templateType == null ? null : templateType.trim();
    }

    public String getReqCode() {
        return reqCode;
    }

    public void setReqCode(String reqCode) {
        this.reqCode = reqCode == null ? null : reqCode.trim();
    }

    public String getReqId() {
        return reqId;
    }

    public void setReqId(String reqId) {
        this.reqId = reqId == null ? null : reqId.trim();
    }

    public Date getReqTime() {
        return reqTime;
    }

    public void setReqTime(Date reqTime) {
        this.reqTime = reqTime;
    }

    public Date getRetTime() {
        return retTime;
    }

    public void setRetTime(Date retTime) {
        this.retTime = retTime;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getReqBody() {
        return reqBody;
    }

    public void setReqBody(String reqBody) {
        this.reqBody = reqBody == null ? null : reqBody.trim();
    }

    public String getRetBody() {
        return retBody;
    }

    public void setRetBody(String retBody) {
        this.retBody = retBody == null ? null : retBody.trim();
    }
}