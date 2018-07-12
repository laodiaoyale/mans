package com.bns.dao.sys;

import com.bns.api.sys.bo.MenuRespBo;
import com.bns.model.sys.SysMenuDTO;
import common.annotation.MyBatisRepository;

import java.util.List;
import java.util.Map;

@MyBatisRepository
public interface SysMenuDao {
    int deleteByPrimaryKey(Long id);

    int insert(SysMenuDTO record);

    int insertSelective(SysMenuDTO record);

    SysMenuDTO selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(SysMenuDTO record);

    int updateByPrimaryKey(SysMenuDTO record);

    List searchSysMenu(Map map);

    List<MenuRespBo> searchSysMenu1(Map map);
}