package com.bns.api.user.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.bns.api.user.param.UserOperation;
import com.bns.api.user.param.UserReqParam;
import com.bns.dao.user.ClTUserDao;
import com.bns.model.user.CITUserVoDTO;
import com.bns.model.user.ClTUserDTO;
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
    private ClTUserDao clTUserDao ;

    /**
     * 客户信息展示
     * @param userReqParam
     * @return
     */
    public PageInfo pageLite(UserReqParam userReqParam){
        PageHelper.startPage(userReqParam.getPageNum(), userReqParam.getPageSize());
        ClTUserDTO clTUserDTO = new ClTUserDTO();
        clTUserDTO.setName(userReqParam.getName());
        clTUserDTO.setMobile(userReqParam.getMobile());
        clTUserDTO.setIdCard(userReqParam.getIdCard());
        //可以增加其他参数。。。
        List<CITUserVoDTO> pageList = clTUserDao.findPaging(clTUserDTO);
        return  new PageInfo(pageList);
    }

    /**
     * chenyifan
     * 冻结账户
     * @param userOperation
     * @return
     */
    public JsonResult freezingOperation(UserOperation userOperation){
        PageHelper.startPage(userOperation.getPageNum(), userOperation.getPageSize());
        JsonResult jsonResult=initJsonResult();
        ClTUserDTO clTUserDTO=new ClTUserDTO();
        clTUserDTO.setCustCode(userOperation.getCustCode());
        //根据进件编号查询该用户
        List<CITUserVoDTO> paging=clTUserDao.findPaging(clTUserDTO);
        //判断该用户是否存在
        if(paging.size()==0){
            jsonResult.setError(RespCodeCostant.USER_NO);
            return jsonResult;
        }
        //判断账号与用户的手机号是否匹配
        if(paging.get(0).getMobile().equals(userOperation.getMobile())){
            //判断进行解冻行为还是冻结行为
            clTUserDTO.setValidateState(userOperation.getValidateState().equals("1")? "0":"1");
            Map<String, Object> map=new HashMap<>();
            map.put("dto",clTUserDTO);
            //修改该用户账户状态
            clTUserDao.updateClTUserByCustCode(map);
            jsonResult.setError(RespCodeCostant.OK);
            return jsonResult;
        }
        jsonResult.setError(RespCodeCostant.ACCOUNTNUMBER_ERROR);
        return jsonResult;

    }
}
