package com.bns.model.datareport;

import com.bns.model.user.ClTIntoInfoDTO;

import java.util.Date;

//用户进件信息状态查询数据
public class UserIntoInfoStatus extends ClTIntoInfoDTO {
    private String name;  //用户名
    private String dkCustCode;//'贷款系统客户编号'
    private String mobile;// '手机号',
    private String sex;//性别
    private String nation; //'民族',
    private String birthday; //'出生日期',
    private String marketChannel;// '应用市场渠道',
    private String terminalType;// '终端类型（android、ios、h5、pad）',
    private String promotionSource;//运营推广来源 1-百融 2-卡牛
    private String authState;//是否实名认证 0-否 1-是
    private Date authTime;// '实名认证时间',
    private String faceCertState;//活体认证状态  0-未认证 1-已认证 -1 已失效
    private Date faceCertTime;// '活体认证时间',
    private String faceCertMsg;// '活体认证结果描述',
    private String bankCertState;//银行卡认证状态  0-未认证 1-已认证 -1 已失效
    private Date bankCertTime;// '银行卡认证时间',
    private String bankCertMsg;// '银行卡认证结果描述',
    private String crcardCertState;//信用卡认证状态  0-未认证 1-已认证 -1 已失效
    private Date crcardCertTime;// '信用卡认证时间',
    private String crcardCertMsg;// '信用卡认证结果描述',
    private String mobileCertState;// 手机运营商认证状态  0-未认证 1-已认证 -1 已失效
    private Date mobileCertTime;// '手机运营商认证时间',
    private String mobileCertMsg;// '手机运营商认证结果描述',
    private String baseCertState;// 基本信息状态  0-未认证 1-已认证 -1 已失效
    private Date baseCertTime;// '基本信息认证时间',
    private String baseCertMsg;// '基本信息认证结果描述',
    private String creditCertState;// 征信认证状态  0-未认证 1-已认证 -1 已失效
    private Date creditCertTime;// '征信认证时间',
    private String creditCertMsg;// '征信认证结果描述',
    private Date regCreateTime;// '注册时间',

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDkCustCode() {
        return dkCustCode;
    }

    public void setDkCustCode(String dkCustCode) {
        this.dkCustCode = dkCustCode;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getNation() {
        return nation;
    }

    public void setNation(String nation) {
        this.nation = nation;
    }

    public String getBirthday() {
        return birthday;
    }

    public void setBirthday(String birthday) {
        this.birthday = birthday;
    }

    public String getMarketChannel() {
        return marketChannel;
    }

    public void setMarketChannel(String marketChannel) {
        this.marketChannel = marketChannel;
    }

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
        this.promotionSource = promotionSource;
    }

    public String getAuthState() {
        return authState;
    }

    public void setAuthState(String authState) {
        this.authState = authState;
    }

    public Date getAuthTime() {
        return authTime;
    }

    public void setAuthTime(Date authTime) {
        this.authTime = authTime;
    }

    public String getFaceCertState() {
        return faceCertState;
    }

    public void setFaceCertState(String faceCertState) {
        this.faceCertState = faceCertState;
    }

    public Date getFaceCertTime() {
        return faceCertTime;
    }

    public void setFaceCertTime(Date faceCertTime) {
        this.faceCertTime = faceCertTime;
    }

    public String getFaceCertMsg() {
        return faceCertMsg;
    }

    public void setFaceCertMsg(String faceCertMsg) {
        this.faceCertMsg = faceCertMsg;
    }

    public String getBankCertState() {
        return bankCertState;
    }

    public void setBankCertState(String bankCertState) {
        this.bankCertState = bankCertState;
    }

    public Date getBankCertTime() {
        return bankCertTime;
    }

    public void setBankCertTime(Date bankCertTime) {
        this.bankCertTime = bankCertTime;
    }

    public String getBankCertMsg() {
        return bankCertMsg;
    }

    public void setBankCertMsg(String bankCertMsg) {
        this.bankCertMsg = bankCertMsg;
    }

    public String getCrcardCertState() {
        return crcardCertState;
    }

    public void setCrcardCertState(String crcardCertState) {
        this.crcardCertState = crcardCertState;
    }

    public Date getCrcardCertTime() {
        return crcardCertTime;
    }

    public void setCrcardCertTime(Date crcardCertTime) {
        this.crcardCertTime = crcardCertTime;
    }

    public String getCrcardCertMsg() {
        return crcardCertMsg;
    }

    public void setCrcardCertMsg(String crcardCertMsg) {
        this.crcardCertMsg = crcardCertMsg;
    }

    public String getMobileCertState() {
        return mobileCertState;
    }

    public void setMobileCertState(String mobileCertState) {
        this.mobileCertState = mobileCertState;
    }

    public Date getMobileCertTime() {
        return mobileCertTime;
    }

    public void setMobileCertTime(Date mobileCertTime) {
        this.mobileCertTime = mobileCertTime;
    }

    public String getMobileCertMsg() {
        return mobileCertMsg;
    }

    public void setMobileCertMsg(String mobileCertMsg) {
        this.mobileCertMsg = mobileCertMsg;
    }

    public String getBaseCertState() {
        return baseCertState;
    }

    public void setBaseCertState(String baseCertState) {
        this.baseCertState = baseCertState;
    }

    public Date getBaseCertTime() {
        return baseCertTime;
    }

    public void setBaseCertTime(Date baseCertTime) {
        this.baseCertTime = baseCertTime;
    }

    public String getBaseCertMsg() {
        return baseCertMsg;
    }

    public void setBaseCertMsg(String baseCertMsg) {
        this.baseCertMsg = baseCertMsg;
    }

    public String getCreditCertState() {
        return creditCertState;
    }

    public void setCreditCertState(String creditCertState) {
        this.creditCertState = creditCertState;
    }

    public Date getCreditCertTime() {
        return creditCertTime;
    }

    public void setCreditCertTime(Date creditCertTime) {
        this.creditCertTime = creditCertTime;
    }

    public String getCreditCertMsg() {
        return creditCertMsg;
    }

    public void setCreditCertMsg(String creditCertMsg) {
        this.creditCertMsg = creditCertMsg;
    }

    public Date getRegCreateTime() {
        return regCreateTime;
    }

    public void setRegCreateTime(Date regCreateTime) {
        this.regCreateTime = regCreateTime;
    }
}