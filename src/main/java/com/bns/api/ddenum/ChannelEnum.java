package com.bns.api.ddenum;

/**
 * 渠道 枚举
 * Created by TianTianLi on 下午8:43 2017/11/10.
 */
public enum ChannelEnum {
    APP(0,"APP"),
    H5(1,"H5"),
    KANIU(2,"API-KN"),
    IOS(3,"iOS"),
    ANDROID(4,"android"),
    WAP(5,"wap");

    //订单状态，
    private int code;
    //订单状态描述
    private String value;

    ChannelEnum(int code, String value) {
        this.code = code;
        this.value = value;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
