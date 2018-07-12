package com.bns.model.user;

import java.util.Date;

public class ClTIntoUserbaseDTO {
    private Long id;

    private String custCode;

    private String intoCode;

    private String purposeType;

    private String degree;

    private String industry;

    private String liveProvinceCode;

    private String liveCityCode;

    private String liveCountyCode;

    private String liveStreet;

    private String remark1;

    private String remark2;

    private Date createTime;

    private Date updateTime;

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

    public String getIntoCode() {
        return intoCode;
    }

    public void setIntoCode(String intoCode) {
        this.intoCode = intoCode == null ? null : intoCode.trim();
    }

    public String getPurposeType() {
        return purposeType;
    }

    public void setPurposeType(String purposeType) {
        this.purposeType = purposeType == null ? null : purposeType.trim();
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree == null ? null : degree.trim();
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry == null ? null : industry.trim();
    }

    public String getLiveProvinceCode() {
        return liveProvinceCode;
    }

    public void setLiveProvinceCode(String liveProvinceCode) {
        this.liveProvinceCode = liveProvinceCode == null ? null : liveProvinceCode.trim();
    }

    public String getLiveCityCode() {
        return liveCityCode;
    }

    public void setLiveCityCode(String liveCityCode) {
        this.liveCityCode = liveCityCode == null ? null : liveCityCode.trim();
    }

    public String getLiveCountyCode() {
        return liveCountyCode;
    }

    public void setLiveCountyCode(String liveCountyCode) {
        this.liveCountyCode = liveCountyCode == null ? null : liveCountyCode.trim();
    }

    public String getLiveStreet() {
        return liveStreet;
    }

    public void setLiveStreet(String liveStreet) {
        this.liveStreet = liveStreet == null ? null : liveStreet.trim();
    }

    public String getRemark1() {
        return remark1;
    }

    public void setRemark1(String remark1) {
        this.remark1 = remark1 == null ? null : remark1.trim();
    }

    public String getRemark2() {
        return remark2;
    }

    public void setRemark2(String remark2) {
        this.remark2 = remark2 == null ? null : remark2.trim();
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
}