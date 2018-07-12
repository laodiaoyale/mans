package com.bns.api.sys.vo;

import com.bns.model.sys.SysRefuseDTO;

import java.util.List;

public class SysRefuseAddVo {
    private String createUser;
    private int id;
    private Integer status;
    private List<SysRefuseDTO> refuseDTOList;
    private String updateUser;

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }

    public List<SysRefuseDTO> getRefuseDTOList() {
        return refuseDTOList;
    }

    public void setRefuseDTOList(List<SysRefuseDTO> refuseDTOList) {
        this.refuseDTOList = refuseDTOList;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(String updateUser) {
        this.updateUser = updateUser;
    }
}
