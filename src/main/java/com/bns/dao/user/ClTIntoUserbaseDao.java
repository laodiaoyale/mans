package com.bns.dao.user;

import com.bns.model.contract.CurrentAddrDTO;
import com.bns.model.user.ClTIntoUserbaseDTO;
import com.bns.model.user.ClTUserDTOExt;
import common.annotation.MyBatisRepository;

@MyBatisRepository
public interface ClTIntoUserbaseDao {
    int deleteByPrimaryKey(Long id);

    int insert(ClTIntoUserbaseDTO record);

    int insertSelective(ClTIntoUserbaseDTO record);

    ClTIntoUserbaseDTO selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ClTIntoUserbaseDTO record);

    int updateByPrimaryKey(ClTIntoUserbaseDTO record);

    //根据进件编号查询用户信息
    ClTUserDTOExt selectByIntoCode(String intoCode);

    //根据进件编号查询用户的居住地址
    CurrentAddrDTO findCurrentAddrByIntoCode(String intoCode);
}