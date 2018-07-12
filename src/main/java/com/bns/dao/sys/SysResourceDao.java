package com.bns.dao.sys;

import com.bns.api.sys.bo.ResourceRespBo;
import common.annotation.MyBatisRepository;

import java.util.List;
import java.util.Map;

@MyBatisRepository
public interface SysResourceDao {

    List getSysResourceRole(Map paramMap);

    List<ResourceRespBo> querySysResource();
}