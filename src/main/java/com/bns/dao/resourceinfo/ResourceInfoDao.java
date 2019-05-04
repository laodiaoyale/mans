package com.bns.dao.resourceinfo;

import com.bns.api.resourceinfo.param.ResourceReqParam;
import com.bns.api.user.param.UserReqParam;
import com.bns.model.resource.ResourceInfo;
import com.bns.model.user.BnsUser;
import com.bns.model.user.BnsUserVo;
import common.annotation.MyBatisRepository;

import java.util.List;

/**
 * Created by zhaolei on 2019/5/3.
 */
@MyBatisRepository
public interface ResourceInfoDao {

    int deleteByPrimaryKey(Integer id);

    int insert(ResourceInfo record);

    ResourceInfo selectByPrimaryKey(Integer id);

    List<BnsUser> selectAll();

    int updateByPrimaryKey(ResourceInfo record);

    List<BnsUser> findPaging(ResourceReqParam userReqParam);

    List<String> getCity();

}
