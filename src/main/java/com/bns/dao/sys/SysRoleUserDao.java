package com.bns.dao.sys;

import com.bns.model.sys.SysRoleUserDTO;
import common.annotation.MyBatisRepository;

@MyBatisRepository
public interface SysRoleUserDao {
    int deleteByPrimaryKey(Long id);

    int insertSelective(SysRoleUserDTO record);

    SysRoleUserDTO selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(SysRoleUserDTO record);

    int updateByPrimaryKey(SysRoleUserDTO record);

    //根据 用户id 修改角色用户关系
    void updateUserRoleByUserId(SysRoleUserDTO sysRoleUser);

    //添加 角色用户关系
    int insertRoleUser(SysRoleUserDTO record);

    void delRoleByTargetId(Long id);
}