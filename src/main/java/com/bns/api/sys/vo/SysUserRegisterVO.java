package com.bns.api.sys.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SysUserRegisterVO {

    private String userNo;

    private String newUserNo;

    private String userName;

    private String password;

    private String department;

    private String job;

    private String mobile;

    private  Long roleId;

    private String createUser;

    private String updateUser;

    private String[] enNos;

    public String getNewUserNo() { return newUserNo; }

    public void setNewUserNo(String newUserNo) { this.newUserNo = newUserNo; }

    public String getUserNo() { return userNo; }

    public void setUserNo(String userNo) { this.userNo = userNo; }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public String getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(String updateUser) {
        this.updateUser = updateUser;
    }

    public String[] getEnNos() {
        return enNos;
    }

    public void setEnNos(String[] enNos) {
        this.enNos = enNos;
    }
}
