package com.bns.dao.sys;

import com.bns.api.sys.bo.RefuseRespBo;
import com.bns.model.sys.SysRefuseDTO;
import common.annotation.MyBatisRepository;

import java.util.List;
import java.util.Map;

@MyBatisRepository
public interface SysRefuseDao {
    int deleteByPrimaryKey(Integer id);

    int insertSelective(SysRefuseDTO record);

    int updateByPrimaryKeySelective(SysRefuseDTO record);

    int updateByPrimaryKey(SysRefuseDTO record);

    //查询所有 决绝代码 列表
    List<RefuseRespBo> queryRefuseAll();

    //拒绝代码 联动
    List<RefuseRespBo> queryRefuseByParent(Integer parentId);

    //批量添加
    int insertMore(Map refuse);

    int insert(SysRefuseDTO record);

    SysRefuseDTO selectByRefuseCode(String refuseCode);
}