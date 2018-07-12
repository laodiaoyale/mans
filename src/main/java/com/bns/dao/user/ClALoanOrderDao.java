package com.bns.dao.user;

import com.bns.model.user.ClALoanOrderDTO;
import common.annotation.MyBatisRepository;

import java.util.Date;
import java.util.List;
import java.util.Map;

@MyBatisRepository
public interface ClALoanOrderDao {
    int deleteByPrimaryKey(Long id);

    int insert(ClALoanOrderDTO record);

    int insertSelective(ClALoanOrderDTO record);

    ClALoanOrderDTO selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ClALoanOrderDTO record);

    int updateByPrimaryKeyWithBLOBs(ClALoanOrderDTO record);

    int updateByPrimaryKey(ClALoanOrderDTO record);

    //修改订单表中的状态
    int updateByOrderNo(ClALoanOrderDTO clALoanOrderDTO);

    //根据进件编号获取订单信息
    ClALoanOrderDTO selectByIntoCode(String intoCode);

    ClALoanOrderDTO selectByCode(Map<String, Object> paramMap);

    Integer selectByCreateTime();

    Integer selectByCreateTimeAndStatus();

    Integer selectFundAmt();

    Integer selectBytime(Map map);

    List<Date> selectByApproveReqTime(Map map);

    ClALoanOrderDTO selectDTOByCode(Map<String, Object> paramMap);

    void approveOrderUpdate(ClALoanOrderDTO clALoanOrder);
}