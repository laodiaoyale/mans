package com.bns.api.user.service;

import com.bns.api.sys.vo.SysUserRegisterVO;
import com.bns.api.user.param.UserReqParam;
import com.bns.dao.user.BnsUserDao;
import com.bns.model.user.BnsUser;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import common.exception.BaseException;
import common.message.BaseController;
import common.message.JsonResult;
import common.message.RespCodeCostant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    /**
     * @param id
     * @return
     * 删除
     */
    public void delete(Integer id)throws BaseException {
        BnsUser user = userDao.selectByPrimaryKey(id);//查询员工
        if(user ==null){
            throw new BaseException("员工不存在");
        }
        user.setStatus((byte) 0);
        int num = userDao.updateByPrimaryKey(user);
        if(num==0){
            throw new BaseException("信息删除失败");
        }
    }

    /**
     * 新增或修改用户信息
     * @param bnsUser
     */
    public void addOrUpdate(BnsUser bnsUser) {
        if(bnsUser.getId()==0){
            userDao.insert(bnsUser);
        }else{
            userDao.updateByPrimaryKey(bnsUser);
        }
    }
}
