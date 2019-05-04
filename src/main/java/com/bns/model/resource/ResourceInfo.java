package com.bns.model.resource;


import java.util.Date;

public class ResourceInfo {
    /**
     * 
     */
    private Integer id;

    private Byte type;

    public Byte getType() {
        return type;
    }

    public void setType(Byte type) {
        this.type = type;
    }

    /**
     * 姓名
     */
    private String name;

    /**
     * 手机号
     */
    private String mobile1;
    /**
     * 手机号
     */
    private String mobile2;

    /**
     * 身份证号
     */
    private String idCard;

    /**
     * 0-男/1-女
     */
    private Byte sex;

    /**
     * 区域
     */
    private String region;

    private String bankCard;

    private String bankName;

    private String supplierLev;

    public String getSupplierLev() {
        return supplierLev;
    }

    public void setSupplierLev(String supplierLev) {
        this.supplierLev = supplierLev;
    }

    /**
     *
     */
    private String bankAddress;

    private Byte distribution;

    public Byte getDistribution() {
        return distribution;
    }

    public void setDistribution(Byte distribution) {
        this.distribution = distribution;
    }

    /**
     * 公司
     */
    private String company;

    /**
     *
     */
    private String address;

    /**
     * 
     */
    private Date createTime;


    /**
     * 状态1正常，0删除
     */
    private Byte delFlag;


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
        this.name = name;
    }

    public String getMobile1() {
        return mobile1;
    }

    public void setMobile1(String mobile1) {
        this.mobile1 = mobile1;
    }

    public String getMobile2() {
        return mobile2;
    }

    public void setMobile2(String mobile2) {
        this.mobile2 = mobile2;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public Byte getSex() {
        return sex;
    }

    public void setSex(Byte sex) {
        this.sex = sex;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
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

    public String getBankAddress() {
        return bankAddress;
    }

    public void setBankAddress(String bankAddress) {
        this.bankAddress = bankAddress;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
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

    public Byte getDelFlag() {
        return delFlag;
    }

    public void setDelFlag(Byte delFlag) {
        this.delFlag = delFlag;
    }
}