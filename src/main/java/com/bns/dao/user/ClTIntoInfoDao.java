package com.bns.dao.user;

import com.bns.model.datareport.UserIntoInfoStatus;
import com.bns.model.user.ClTInfoInfoDTOExt;
import com.bns.model.user.ClTIntoInfoDTO;
import common.annotation.MyBatisRepository;

import java.util.List;
import java.util.Map;

@MyBatisRepository
public interface ClTIntoInfoDao {
    int deleteByPrimaryKey(Long id);

    int insert(ClTIntoInfoDTO record);

    int insertSelective(ClTIntoInfoDTO record);

    ClTIntoInfoDTO selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(ClTIntoInfoDTO record);

    int updateByPrimaryKey(ClTIntoInfoDTO record);

    //查询审批列队
    List<ClTInfoInfoDTOExt> selectByAsk(ClTInfoInfoDTOExt clTInfoInfoDTOExt);

    //审批历史查询
    List<ClTInfoInfoDTOExt> selectIntoInfoHistoryByBsk(ClTInfoInfoDTOExt clTInfoInfoDTOExt);
    List<UserIntoInfoStatus> selectUserIntoInfoStatus();

    void updateValidateStateByCustCode(Map<String, Object> paramMap);

    //内匹
    List<ClTInfoInfoDTOExt> selectInternalMatch(ClTInfoInfoDTOExt clTInfoInfoDTOExt);
    //查询出某个审批队列中所有的orderCode
    List<String> selectAllOrderCodeByQueue(Integer type);
}