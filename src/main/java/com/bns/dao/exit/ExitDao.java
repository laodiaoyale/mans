package com.bns.dao.exit;


import com.bns.model.user.ClWWechatRecord;
import com.bns.model.user.ClWWechatUserDTO;
import common.annotation.MyBatisRepository;
import java.util.List;

@MyBatisRepository
public interface ExitDao {

    List<ClWWechatRecord> findUser(ClWWechatRecord clWWechatRecord);

    int insertUser(ClWWechatUserDTO clWWechatUserDTO);

    int updateType(ClWWechatRecord clWWechatRecord);
}
