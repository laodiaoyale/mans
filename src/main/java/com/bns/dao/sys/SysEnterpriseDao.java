package com.bns.dao.sys;

import com.bns.api.sys.bo.MenuRespBo;
import com.bns.model.sys.SysMenuDTO;
import com.bns.model.sys.SysRoleDTO;
import common.annotation.MyBatisRepository;

import java.util.List;
import java.util.Map;

@MyBatisRepository
public interface SysEnterpriseDao {

    List<SysRoleDTO> queryEnterprise();
}