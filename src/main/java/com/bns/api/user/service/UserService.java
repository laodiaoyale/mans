package com.bns.api.user.service;

import com.bns.api.user.param.UserReqParam;
import com.bns.dao.user.BnsUserDao;
import com.bns.model.user.BnsUser;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import common.message.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author zhaolei
 * @date 2017年11月12日14:35:06
 */
@Service
public class UserService extends BaseController{

    @Autowired
    private BnsUserDao userDao ;

    /**
     * 客户信息展示
     * @param userReqParam
     * @return
     */
    public PageInfo pageLite(UserReqParam userReqParam){
        PageHelper.startPage(userReqParam.getPageNum(), userReqParam.getPageSize());
        BnsUser user = new BnsUser();
        user.setName(userReqParam.getName());
        user.setMobile(userReqParam.getMobile());
        user.setIdCard(userReqParam.getIdCard());
        //可以增加其他参数。。。
        List<BnsUser> pageList = userDao.findPaging(user);
        return  new PageInfo(pageList);
    }

}
