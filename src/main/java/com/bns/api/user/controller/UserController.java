package com.bns.api.user.controller;

import com.github.pagehelper.PageInfo;
import com.bns.api.user.param.UserReqParam;
import com.bns.api.user.service.UserService;
import common.message.BaseController;
import common.message.JsonResult;
import common.message.RespCodeCostant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;

/**
 * @author zhaolei
 * @date 2017年11月10日13:40:22
 * 用户相关
 */
@Controller
@RequestMapping(value = "api/manage/user",method = RequestMethod.POST)
public class UserController extends BaseController{

    @Autowired
    private UserService userService;
    /**
     * 客户信息展示+根据账户信息模糊查询(手机号)
     * @param userReqParam
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/list")
    public JsonResult list(UserReqParam userReqParam){
        JsonResult json = initJsonResult();
        PageInfo pageInfo=userService.pageLite(userReqParam);
        if(pageInfo.getList().size()==0){
            //若用户列表为0则查找不到该用户
            json.setError(RespCodeCostant.ACCOUNTMANAGEMENT);
            json.setBody(new HashMap<>());
            return json;
        }
        json.setBody(pageInfo);
        return json;
    }

}
