package com.bns.dao.user;

import com.bns.model.user.BnsUser;
import common.annotation.MyBatisRepository;

import java.util.List;

@MyBatisRepository
public interface BnsUserDao {
    int deleteByPrimaryKey(Integer id);

    int insert(BnsUser record);

    BnsUser selectByPrimaryKey(Integer id);

    List<BnsUser> selectAll();

    int updateByPrimaryKey(BnsUser record);

    List<BnsUser> findPaging(BnsUser bnsUser);
}