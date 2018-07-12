package com.bns.api.user.bo;

import java.util.Date;

public class BackCommentsRespBO {
    private Long id;
    /**
     * 用户编码
     */
    private String custCode;

    /**
     * 用户手机号
     */
    private String mobile;

    /**
     * 用户姓名
     */
    private String userName;


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

    public String getCustCode() {
        return custCode;
    }

    public void setCustCode(String custCode) {
        this.custCode = custCode;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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
        this.backComments = backComments;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
