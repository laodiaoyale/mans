package com.bns.api.user.param;

import common.annotation.NotBlank;

/**
 * chenyifan
 * 接收账户编号，用户编号，状态信息
 */
public class UserOperation extends UserReqParam {

    /**客户统一编号*/
    @NotBlank
    private String custCode;

    /**是否有效*/
    @NotBlank
    private String validateState;

    public String getCustCode() {
        return custCode;
    }

    public void setCustCode(String custCode) {
        this.custCode=custCode;
    }

    public String getValidateState() {
        return validateState;
    }

    public void setValidateState(String validateState) {
        this.validateState=validateState;
    }


}
