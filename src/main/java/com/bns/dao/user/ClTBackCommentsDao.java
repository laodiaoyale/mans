package com.bns.dao.user;


import com.bns.api.user.bo.BackCommentsRespBO;
import com.bns.api.user.param.BackCommentParam;
import com.bns.model.user.ClTBackCommentsDTO;
import common.annotation.MyBatisRepository;

import java.util.List;
import java.util.Map;

@MyBatisRepository
public interface ClTBackCommentsDao {
    int deleteByPrimaryKey(Long id);

    int insert(ClTBackCommentsDTO record);

    List<ClTBackCommentsDTO> selectAll();

    int updateByPrimaryKey(ClTBackCommentsDTO record);

    List<ClTBackCommentsDTO> selectBackComments(Map<String, String> param);

    List<BackCommentsRespBO> queryListByPage(BackCommentParam param);

    List<BackCommentsRespBO> queryListExcel(BackCommentParam param);

    BackCommentsRespBO selectByPrimaryKey(Long id);
}