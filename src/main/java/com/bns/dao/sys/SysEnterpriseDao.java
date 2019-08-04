package com.bns.dao.sys;

import com.bns.api.sys.param.EnterpriseParam;
import com.bns.api.sys.vo.SysEnterpriseVo;
import com.bns.model.sys.SysEnterpriseDTO;
import com.bns.model.sys.SysUserEnterpriseDTO;
import common.annotation.MyBatisRepository;

import java.util.List;

@MyBatisRepository
public interface SysEnterpriseDao {

    List<SysEnterpriseDTO> queryEnterprise(EnterpriseParam param);

    int deleteByPrimaryKey(Integer id);

    int insert(SysEnterpriseDTO record);

    SysEnterpriseDTO selectByPrimaryKey(Integer id);

    int updateByPrimaryKey(SysEnterpriseDTO record);

    List<SysEnterpriseVo> queryAllEnterprise();

    void batchInsert(List<SysUserEnterpriseDTO> sysUserEnterpriseDTOS);

    void deleteByUserNo(String userNo);

    String getEnterPrise(String userNo);

    List<SysEnterpriseVo> queryEnterpriseByUserNo(String userNo);

    SysEnterpriseDTO getEnterpriseByName(String enterprise);

    List<SysEnterpriseDTO> getEnterpriseByEnterprises(String enterprise);
}