package com.bns.dao.user;

import com.bns.model.user.ClTMessageDTO;
import common.annotation.MyBatisRepository;

import java.util.List;

@MyBatisRepository
public interface ClTMessageDao {
    int deleteByPrimaryKey(Integer id);

    int insert(ClTMessageDTO record);

    ClTMessageDTO selectByPrimaryKey(Integer id);

    List<ClTMessageDTO> selectAll();

    int updateByPrimaryKey(ClTMessageDTO record);

    int insertSelective(ClTMessageDTO record);
}