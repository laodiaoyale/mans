package com.bns.dao.sys;

import com.bns.api.sys.vo.SysConfigVo;
import com.bns.model.sys.SysConfigDTO;
import common.annotation.MyBatisRepository;

import java.util.HashMap;
import java.util.List;

@MyBatisRepository
public  interface SysConfigDao {

    List<SysConfigDTO> selectAll(SysConfigVo sysConfigVo);

    int updateById(SysConfigVo sysConfigVo);

    String selectByCode(String configCode);

    int insertSelective(SysConfigVo sysConfigVo);

    HashMap<String,Object> selectByConfigCode(String configType) ;
}