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
        List<BnsUser> pageList = userDao.findPaging(userReqParam);
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
        user.setDelFlag((byte) 0);
        int num = userDao.updateByPrimaryKey(user);
        if(num==0){
            throw new BaseException("信息删除失败");
        }
    }

    /**
     * 新增或修改用户信息
     * @param bnsUser
     */
    public void addOrUpdate(BnsUser bnsUser) throws BaseException{
        if(bnsUser.getId()==null||bnsUser.getId()==0){
            //估计身份证号查询是否有录入
            UserReqParam userReqParam = new UserReqParam();
            userReqParam.setIdCard(bnsUser.getIdCard());
            List<BnsUser> bnsUsers = userDao.findPaging(userReqParam);
            if(bnsUsers!=null&&bnsUsers.size()>0){
                throw  new BaseException("该身份证号已存在");
            }
            userDao.insert(bnsUser);
        }else{
            bnsUser.setDelFlag((byte)1);
            userDao.updateByPrimaryKey(bnsUser);
        }
    }

    public List<String> getCity() {
        List<String> list = userDao.getCity();
        return list;
    }
}
