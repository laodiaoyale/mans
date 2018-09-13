package com.bns.model.user;


import java.util.Date;

public class BnsUserVo {
    /**
     * 
     */
    private Integer id;

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
    private String sex;

    private String city;

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
    private String createTime;

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
    private String age;

    /**
     * 学历
     */
    private String education;

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

    /**
     * 状态1在职，2离职
     */
    private String status;
    /**
     * 状态1正常，0删除
     */
    private String delFlag;

    private String remark;

    private String enNo;
    /**
     * 所属企业
     */
    private String enterprise;

    public String getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(String entryDate) {
        if("".equals(entryDate)){
            this.entryDate =null;
        }else{
            this.entryDate = entryDate;
        }
    }

    public String getLeaveDate() {
        return leaveDate;
    }

    public void setLeaveDate(String leaveDate) {
        if("".equals(leaveDate)){
            this.leaveDate =null;
        }else{
            this.leaveDate = leaveDate;
        }
    }

    /**
     * 入职时间
     */
    private String entryDate;

    /**
     * 离职时间
     */
    private String leaveDate;

    private String bankCard;

    private String bankName;

    private String contacts;

    private String relation;

    private String contactNumber;

    private String insurance;

    private String realName;

    private String realCard;

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getRealCard() {
        return realCard;
    }

    public void setRealCard(String realCard) {
        this.realCard = realCard;
    }

    public String getContacts() {
        return contacts;
    }

    public void setContacts(String contacts) {
        this.contacts = contacts;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }


    public String getBankCard() {
        return bankCard;
    }

    public void setBankCard(String bankCard) {
        this.bankCard = bankCard;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile == null ? null : mobile.trim();
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard == null ? null : idCard.trim();
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation == null ? null : nation.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }

    public String getWechatCode() {
        return wechatCode;
    }

    public void setWechatCode(String wechatCode) {
        this.wechatCode = wechatCode == null ? null : wechatCode.trim();
    }

    public String getQqCode() {
        return qqCode;
    }

    public void setQqCode(String qqCode) {
        this.qqCode = qqCode == null ? null : qqCode.trim();
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source == null ? null : source.trim();
    }

    public String getSkill() {
        return skill;
    }

    public void setSkill(String skill) {
        this.skill = skill == null ? null : skill.trim();
    }

    public String getHistory() {
        return history;
    }

    public void setHistory(String history) {
        this.history = history == null ? null : history.trim();
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job == null ? null : job.trim();
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(String delFlag) {
        this.delFlag = delFlag;
    }

    public String getEnNo() {
        return enNo;
    }

    public void setEnNo(String enNo) {
        this.enNo = enNo;
    }

    public String getRelation() {
        return relation;
    }

    public void setRelation(String relation) {
        this.relation = relation;
    }

    public String getInsurance() {
        return insurance;
    }

    public void setInsurance(String insurance) {
        this.insurance = insurance;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getEnterprise() {
        return enterprise;
    }

    public void setEnterprise(String enterprise) {
        this.enterprise = enterprise;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Override
    public String toString() {
        return "BnsUserVo{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", mobile='" + mobile + '\'' +
                ", idCard='" + idCard + '\'' +
                ", sex='" + sex + '\'' +
                ", city='" + city + '\'' +
                ", nation='" + nation + '\'' +
                ", address='" + address + '\'' +
                ", createTime='" + createTime + '\'' +
                ", wechatCode='" + wechatCode + '\'' +
                ", qqCode='" + qqCode + '\'' +
                ", age='" + age + '\'' +
                ", education='" + education + '\'' +
                ", source='" + source + '\'' +
                ", skill='" + skill + '\'' +
                ", history='" + history + '\'' +
                ", job='" + job + '\'' +
                ", status='" + status + '\'' +
                ", delFlag='" + delFlag + '\'' +
                ", remark='" + remark + '\'' +
                ", enNo='" + enNo + '\'' +
                ", enterprise='" + enterprise + '\'' +
                ", entryDate='" + entryDate + '\'' +
                ", leaveDate='" + leaveDate + '\'' +
                ", bankCard='" + bankCard + '\'' +
                ", bankName='" + bankName + '\'' +
                ", contacts='" + contacts + '\'' +
                ", relation='" + relation + '\'' +
                ", contactNumber='" + contactNumber + '\'' +
                ", insurance='" + insurance + '\'' +
                ", realName='" + realName + '\'' +
                ", realCard='" + realCard + '\'' +
                '}';
    }
}