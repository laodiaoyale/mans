package com.bns.model.contract;

public class CurrentAddrDTO {

    private String liveProvince="";// 现居住地省编码
    private String liveCity="";// 现居住地省市编码
    private String liveCounty="";//现居住地省区县编码
    private String liveStreet="";//街道

    public String getLiveProvince() {
        return liveProvince;
    }

    public void setLiveProvince(String liveProvince) {
        this.liveProvince = liveProvince;
    }

    public String getLiveCity() {
        return liveCity;
    }

    public void setLiveCity(String liveCity) {
        this.liveCity = liveCity;
    }

    public String getLiveCounty() {
        return liveCounty;
    }

    public void setLiveCounty(String liveCounty) {
        this.liveCounty = liveCounty;
    }

    public String getLiveStreet() {
        return liveStreet;
    }

    public void setLiveStreet(String liveStreet) {
        this.liveStreet = liveStreet;
    }
}
