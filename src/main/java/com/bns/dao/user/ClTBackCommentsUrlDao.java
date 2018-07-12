package com.bns.dao.user;


import com.bns.model.user.ClTBackCommentsUrlDTO;
import common.annotation.MyBatisRepository;

import java.util.List;

@MyBatisRepository
public interface ClTBackCommentsUrlDao {

    int insert(ClTBackCommentsUrlDTO record);

    List selectImageByCommentId(String commentId);
}