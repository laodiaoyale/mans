package com.bns.dao.user;

import com.bns.model.user.ClALoanOrderDTO;
import com.bns.model.user.ClTManagerInfoDTO;
import common.annotation.MyBatisRepository;

import java.util.Map;

@MyBatisRepository
public interface ClTManagerInfoDao {
    int deleteByPrimaryKey(Long id);

    int insert(ClTManagerInfoDTO info);

    int updateByPrimaryKey(ClTManagerInfoDTO info);

    ClALoanOrderDTO selectByMap(Map<String, Object> paramMap);

}