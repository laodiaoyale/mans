package com.bns.dao.sys;

import com.bns.api.sys.vo.SysEnterpriseVo;
import com.bns.model.sys.SysEnterpriseDTO;
import common.annotation.MyBatisRepository;

import java.util.List;

@MyBatisRepository
public interface SysEnterpriseDao {

    List<SysEnterpriseDTO> queryEnterprise();

    int deleteByPrimaryKey(Integer id);

    int insert(SysEnterpriseDTO record);

    SysEnterpriseDTO selectByPrimaryKey(Integer id);

    int updateByPrimaryKey(SysEnterpriseDTO record);

    List<SysEnterpriseVo> queryAllEnterprise();
}