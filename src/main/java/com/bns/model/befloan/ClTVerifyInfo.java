package com.bns.model.befloan;

public class ClTVerifyInfo {
    private Integer id;

    private String custCode;

    private String intoCode;

    private String verifyUrl;

    private String imageRef1;

    private String imageRef2;

    private String imageRef3;

    private String validateState;

    private String createTime;

    private String updateTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public String getVerifyUrl() {
        return verifyUrl;
    }

    public void setVerifyUrl(String verifyUrl) {
        this.verifyUrl = verifyUrl == null ? null : verifyUrl.trim();
    }

    public String getImageRef1() {
        return imageRef1;
    }

    public void setImageRef1(String imageRef1) {
        this.imageRef1 = imageRef1 == null ? null : imageRef1.trim();
    }

    public String getImageRef2() {
        return imageRef2;
    }

    public void setImageRef2(String imageRef2) {
        this.imageRef2 = imageRef2 == null ? null : imageRef2.trim();
    }

    public String getImageRef3() {
        return imageRef3;
    }

    public void setImageRef3(String imageRef3) {
        this.imageRef3 = imageRef3 == null ? null : imageRef3.trim();
    }

    public String getValidateState() {
        return validateState;
    }

    public void setValidateState(String validateState) {
        this.validateState = validateState == null ? null : validateState.trim();
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime == null ? null : createTime.trim();
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime == null ? null : updateTime.trim();
    }
}