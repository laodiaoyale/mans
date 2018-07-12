package com.bns.dao.user;

import com.bns.model.user.ClTSysMsgDTO;
import common.annotation.MyBatisRepository;

import java.util.List;

@MyBatisRepository
public interface ClTSysMsgDao {
    int deleteByPrimaryKey(Integer id);

    int insert(ClTSysMsgDTO record);

    ClTSysMsgDTO selectByPrimaryKey(Integer id);

    List<ClTSysMsgDTO> selectAll();

    int updateByPrimaryKey(ClTSysMsgDTO record);

    int insertSelective(ClTSysMsgDTO record);
}