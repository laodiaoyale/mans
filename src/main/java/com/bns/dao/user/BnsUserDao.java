package com.bns.dao.user;

import com.bns.api.user.param.UserReqParam;
import com.bns.model.user.BnsUser;
import com.bns.model.user.BnsUserVo;
import common.annotation.MyBatisRepository;

import java.util.List;

@MyBatisRepository
public interface BnsUserDao {
    int deleteByPrimaryKey(Integer id);

    int insert(BnsUser record);

    BnsUser selectByPrimaryKey(Integer id);

    List<BnsUser> selectAll();

    int updateByPrimaryKey(BnsUser record);

    List<BnsUser> findPaging(UserReqParam userReqParam);

    List<String> getCity();

    void insertVo(BnsUserVo info);

    List<BnsUser> selectCountByIdCard(String idCard);

    void batchUpdate(BnsUser bnsUser);
}