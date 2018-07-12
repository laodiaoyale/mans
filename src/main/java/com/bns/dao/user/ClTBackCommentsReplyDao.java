package com.bns.dao.user;

import com.bns.model.user.ClTBackCommentsReplyDTO;
import common.annotation.MyBatisRepository;

@MyBatisRepository
public interface ClTBackCommentsReplyDao {

    int insert(ClTBackCommentsReplyDTO record);

    int insertSelective(ClTBackCommentsReplyDTO record);

    ClTBackCommentsReplyDTO selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ClTBackCommentsReplyDTO record);

    int updateByPrimaryKey(ClTBackCommentsReplyDTO record);

    //根据commentId 查询处理意见
    ClTBackCommentsReplyDTO  selectByCommentId(Integer commentId);

    int updateStatusByCommentId(ClTBackCommentsReplyDTO dto);
}