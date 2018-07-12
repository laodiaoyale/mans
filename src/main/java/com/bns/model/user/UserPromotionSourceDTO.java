package com.bns.model.user;

public class UserPromotionSourceDTO {

    /**客户统一编号*/
    private String custCode;

    /**进件编号*/
    private String intoCode;

    /**运营推广来源*/
    private String promotionSource;

    public String getCustCode() {
        return custCode;
    }

    public void setCustCode(String custCode) {
        this.custCode=custCode;
    }

    public String getIntoCode() {
        return intoCode;
    }

    public void setIntoCode(String intoCode) {
        this.intoCode=intoCode;
    }

    public String getPromotionSource() {
        return promotionSource;
    }

    public void setPromotionSource(String promotionSource) {
        this.promotionSource=promotionSource;
    }
}
