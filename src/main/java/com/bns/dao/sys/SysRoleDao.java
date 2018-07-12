package com.bns.dao.sys;

import com.bns.model.sys.SysRoleDTO;
import common.annotation.MyBatisRepository;

import java.util.List;
import java.util.Map;

@MyBatisRepository
public interface SysRoleDao {
    int deleteByPrimaryKey(Long id);

    int insert(SysRoleDTO record);

    int insertSelective(SysRoleDTO record);

    SysRoleDTO selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(SysRoleDTO record);

    int updateByPrimaryKey(SysRoleDTO record);

    SysRoleDTO selectRoleByParam(Map param);

    List selectRole(Map param);

    List<SysRoleDTO> queryRoleList();

    SysRoleDTO queryRoleDTOByParam(Map param);


    List<Map<String,String>> selectUserByRole(SysRoleDTO sysRoleDTO);
}