package com.bns.model.user;

import java.sql.Timestamp;

public class CITUserVoDTO {
    /**客户统一编号*/
    private String custCode;
    /**手机号*/
    private String mobile;
    /**姓名*/
    private String name;

    private String idCard;

    private int sex;
    /**是否有效*/
    private String validateState;
    /**应用市场渠道*/
    private String marketChannel;
    /**创建时间*/
    private Timestamp createTime;
    //最近的登陆时间
    private Timestamp loginTime;
    /**运营推广来源*/
    private String promotionSource;
    /**终端来源*/
    private String terminalType;

    public String getTerminalType() {
        return terminalType;
    }

    public void setTerminalType(String terminalType) {
        this.terminalType = terminalType;
    }

    public String getPromotionSource() {
        return promotionSource;
    }

    public void setPromotionSource(String promotionSource) {
        this.promotionSource=promotionSource;
    }

    public String getCustCode() {
        return custCode;
    }

    public void setCustCode(String custCode) {
        this.custCode=custCode;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile=mobile;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name=name;
    }

    public String getValidateState() {
        return validateState;
    }

    public void setValidateState(String validateState) {
        this.validateState=validateState;
    }

    public String getMarketChannel() {
        return marketChannel;
    }

    public void setMarketChannel(String marketChannel) {
        this.marketChannel=marketChannel;
    }

    public Timestamp getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Timestamp createTime) {
        this.createTime=createTime;
    }

    public Timestamp getLoginTime() {
        return loginTime;
    }

    public void setLoginTime(Timestamp loginTime) {
        this.loginTime=loginTime;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public int getSex() {
        return sex;
    }

    public void setSex(int sex) {
        this.sex = sex;
    }
}
