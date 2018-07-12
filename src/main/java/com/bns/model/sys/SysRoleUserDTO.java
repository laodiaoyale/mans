package com.bns.model.sys;

import java.util.Date;

public class SysRoleUserDTO {
    private Long id;

    private Long roleId;

    private Long targetId;

    private Long appId;

    private String tagetType;

    private String validateState;

    private Long version;

    private Date createTime;

    private Date updateTime;

    private String createUser;

    private String updateUser;

    public SysRoleUserDTO(String tagetType, Date createTime, Date updateTime) {
        this.tagetType = tagetType;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    public SysRoleUserDTO(){

    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public Long getTargetId() {
        return targetId;
    }

    public void setTargetId(Long targetId) {
        this.targetId = targetId;
    }

    public Long getAppId() {
        return appId;
    }

    public void setAppId(Long appId) {
        this.appId = appId;
    }

    public String getTagetType() {
        return tagetType;
    }

    public void setTagetType(String tagetType) {
        this.tagetType = tagetType;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getValidateState() {
        return validateState;
    }

    public void setValidateState(String validateState) {
        this.validateState = validateState == null ? null : validateState.trim();
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
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
}