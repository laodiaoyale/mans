package com.bns.model.report;

import java.util.Date;

public class BnsUserReport {
    /**
     * 
     */
    private Integer id;

    /**
     * 用户编号(企业管理员)
     */
    private Integer userNo;

    /**
     * 用户名称(企业管理员)
     */
    private String userName;

    /**
     * 企业编号
     */
    private Integer enNo;

    /**
     * 企业名称
     */
    private String enName;

    /**
     * 类型，1周、2月、3年、0 ALL
     */
    private Byte type;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 总人数
     */
    private Integer sumNum;

    /**
     * 入职人数
     */
    private Integer inNum;

    /**
     * 离职人数
     */
    private Integer outNum;

    /**
     * 稳定率
     */
    private String rate;

    private String dataTime;

    public String getDataTime() {
        return dataTime;
    }

    public void setDataTime(String dataTime) {
        this.dataTime = dataTime;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserNo() {
        return userNo;
    }

    public void setUserNo(Integer userNo) {
        this.userNo = userNo;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName == null ? null : userName.trim();
    }

    public Integer getEnNo() {
        return enNo;
    }

    public void setEnNo(Integer enNo) {
        this.enNo = enNo;
    }

    public String getEnName() {
        return enName;
    }

    public void setEnName(String enName) {
        this.enName = enName == null ? null : enName.trim();
    }

    public Byte getType() {
        return type;
    }

    public void setType(Byte type) {
        this.type = type;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Integer getSumNum() {
        return sumNum;
    }

    public void setSumNum(Integer sumNum) {
        this.sumNum = sumNum;
    }

    public Integer getInNum() {
        return inNum;
    }

    public void setInNum(Integer inNum) {
        this.inNum = inNum;
    }

    public Integer getOutNum() {
        return outNum;
    }

    public void setOutNum(Integer outNum) {
        this.outNum = outNum;
    }

    public String getRate() {
        return rate;
    }

    public void setRate(String rate) {
        this.rate = rate;
    }
}