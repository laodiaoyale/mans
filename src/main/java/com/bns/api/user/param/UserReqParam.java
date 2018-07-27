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
    private String address;

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
    private Byte age;

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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public Byte getAge() {
        return age;
    }

    public void setAge(Byte age) {
        this.age = age;
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
}
