package com.bns.api.user.param;

import java.util.Date;

public class UserReqParam {

    /**
     * 姓名
     */
    private String name;

    /**
     * 手机号
     */
    private String mobile;

    /**
     * 身份证号
     */
    private String idCard;

    /**
     * 0-男/1-女
     */
    private Byte sex;

    /**
     *
     */
    private String nation;

    /**
     *
     */
    private String city;

    /**
     *
     */
    private Date createTime;

    /**
     * 微信号
     */
    private String wechatCode;

    /**
     * qq号
     */
    private String qqCode;

    /**
     * 年龄
     */
    private Byte minAge;

    /**
     * 年龄
     */
    private Byte maxAge;

    /**
     * 学历
     */
    private Byte education;

    /**
     * 来源
     */
    private String source;

    /**
     *
     */
    private String skill;

    /**
     * 曾入职企业
     */
    private String history;

    /**
     * 职位
     */
    private String job;

    private String department;

    private Byte status;

    private int pageNum = 1;

    private int pageSize = 10;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public Byte getSex() {
        return sex;
    }

    public void setSex(Byte sex) {
        this.sex = sex;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getWechatCode() {
        return wechatCode;
    }

    public void setWechatCode(String wechatCode) {
        this.wechatCode = wechatCode;
    }

    public String getQqCode() {
        return qqCode;
    }

    public void setQqCode(String qqCode) {
        this.qqCode = qqCode;
    }

    public Byte getMinAge() {
        return minAge;
    }

    public void setMinAge(Byte minAge) {
        this.minAge = minAge;
    }

    public Byte getMaxAge() {
        return maxAge;
    }

    public void setMaxAge(Byte maxAge) {
        this.maxAge = maxAge;
    }

    public Byte getEducation() {
        return education;
    }

    public void setEducation(Byte education) {
        this.education = education;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getSkill() {
        return skill;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }

    public String getHistory() {
        return history;
    }

    public void setHistory(String history) {
        this.history = history;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}
