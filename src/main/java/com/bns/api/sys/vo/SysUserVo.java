package com.bns.api.sys.vo;

/**
 * 接受参数
 */
public class SysUserVo extends SysPageVo{


    private String userName;
    private Long roleId;


    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }
}
