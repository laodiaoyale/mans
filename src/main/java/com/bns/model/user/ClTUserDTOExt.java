package com.bns.model.user;

/**
 * 用户信息的扩展bean
 * @Author xiangzebing
 */
public class ClTUserDTOExt extends ClTUserDTO{

    //所属行业
    private String industry;
    //最高学历
    private String degree;
    //进件编号
    private String intoCode;
    //年龄
    private int age;
    //当前住址
    private String currentAddr;
    //省市
    private String provinces;
    //终端来源  取进件表apply_terminal字段
    private String applyTerminal;

    public String getApplyTerminal() {
        return applyTerminal;
    }

    public void setApplyTerminal(String applyTerminal) {
        this.applyTerminal = applyTerminal;
    }

    public String getProvinces() {
        return provinces;
    }

    public void setProvinces(String provinces) {
        this.provinces = provinces;
    }

    public String getCurrentAddr() {
        return currentAddr;
    }

    public void setCurrentAddr(String currentAddr) {
        this.currentAddr = currentAddr;
    }

    public String getIntoCode() {
        return intoCode;
    }

    public void setIntoCode(String intoCode) {
        this.intoCode = intoCode;
    }

    public String getIndustry() {
        return industry;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
