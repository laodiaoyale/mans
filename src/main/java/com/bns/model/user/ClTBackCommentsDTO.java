package com.bns.model.user;

import java.util.Date;

public class ClTBackCommentsDTO {
    /**
     * id
     */
    private Long id;

    /**
     * 用户编码
     */
    private String custCode;


    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 意见内容
     */
    private String backComments;

    /***
     * 反馈类型
     * @return
     */
    private String serverType;

    /***
     * 处理状态（0：未处理   1：已处理）
     * @return
     */
    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustCode() {
        return custCode;
    }

    public void setCustCode(String custCode) {
        this.custCode = custCode == null ? null : custCode.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getBackComments() {
        return backComments;
    }

    public void setBackComments(String backComments) {
        this.backComments = backComments == null ? null : backComments.trim();
    }

    public String getServerType() {
        return serverType;
    }

    public void setServerType(String serverType) {
        this.serverType = serverType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}