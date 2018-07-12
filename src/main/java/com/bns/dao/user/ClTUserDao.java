package com.bns.dao.user;

import com.bns.model.user.CITUserVoDTO;
import com.bns.model.user.ClTUserDTO;
import com.bns.model.user.UserPromotionSourceDTO;
import common.annotation.MyBatisRepository;

import java.util.List;
import java.util.Map;

/**
 * @classname: ClTUserDao
 * @description: 定义  cl_t_user 持久层 接口
 * 通过@MapperScannerConfigurer扫描目录中的所有接口, 动态在Spring Context中生成实现.
 * 方法名称必须与Mapper.xml中保持一致.
 * @author:  Administrator
 */
@MyBatisRepository
public interface ClTUserDao {

    //估计clTUserDTO对象查询数据
    List<CITUserVoDTO> findPaging(ClTUserDTO clTUserDTO);

    //根据进件编号查询用户编号+用户渠道来源
    UserPromotionSourceDTO queryUserPromotionSource(String intoCode);

    //根据CustCode更改用户信息
    public void updateClTUserByCustCode(Map<String, Object> paramMap);

    List<ClTUserDTO> queryUserByParam(Map recordQuery);

    ClTUserDTO findClTUserByOrderNo(String orderNo);
}
