package com.bns.dao.sys;

import com.bns.model.sys.SysAclDTO;
import common.annotation.MyBatisRepository;

import java.util.Map;

@MyBatisRepository
public interface SysAclDao {
    int deleteByPrimaryKey(Long id);

    int insert(SysAclDTO record);

    int insertSelective(SysAclDTO record);

    SysAclDTO selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(SysAclDTO record);

    int updateByPrimaryKey(SysAclDTO record);

    void insertMore(Map sysacl);

    void deleteByParam(Long roleId);
}