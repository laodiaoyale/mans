package com.bns.api.sys.bo;

import java.util.Date;

public class RefuseRespBo {
    private Long id;

    private String leve1Code;
    private String leve1Des;
    private String leve2Code;
    private String leve2Des;
    private String leve3Code;
    private String leve3Des;

    private int validateState;

    private Date createTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLeve1Code() {
        return leve1Code;
    }

    public void setLeve1Code(String leve1Code) {
        this.leve1Code = leve1Code;
    }

    public String getLeve1Des() {
        return leve1Des;
    }

    public void setLeve1Des(String leve1Des) {
        this.leve1Des = leve1Des;
    }

    public String getLeve2Code() {
        return leve2Code;
    }

    public void setLeve2Code(String leve2Code) {
        this.leve2Code = leve2Code;
    }

    public String getLeve2Des() {
        return leve2Des;
    }

    public void setLeve2Des(String leve2Des) {
        this.leve2Des = leve2Des;
    }

    public String getLeve3Code() {
        return leve3Code;
    }

    public void setLeve3Code(String leve3Code) {
        this.leve3Code = leve3Code;
    }

    public String getLeve3Des() {
        return leve3Des;
    }

    public void setLeve3Des(String leve3Des) {
        this.leve3Des = leve3Des;
    }

    public int getValidateState() {
        return validateState;
    }

    public void setValidateState(int validateState) {
        this.validateState = validateState;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}
