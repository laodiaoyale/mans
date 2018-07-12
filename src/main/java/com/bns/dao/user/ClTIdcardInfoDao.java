package com.bns.dao.user;

import com.bns.model.user.ClTIdcardInfoDTO;
import common.annotation.MyBatisRepository;

@MyBatisRepository
public interface ClTIdcardInfoDao {
    int deleteByPrimaryKey(Long id);

    int insert(ClTIdcardInfoDTO record);

    int insertSelective(ClTIdcardInfoDTO record);

    ClTIdcardInfoDTO selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ClTIdcardInfoDTO record);

    int updateByPrimaryKey(ClTIdcardInfoDTO record);

    //根据客户编号获取客户的身份证正反照片
    ClTIdcardInfoDTO selectByCustCode(String custCode);

}