package com.bns.api.exit.controller;

import com.github.pagehelper.PageInfo;
import com.bns.api.exit.service.ExitService;
import com.bns.api.user.param.UserReqParam;
import com.bns.model.user.ClWWechatRecord;
import com.bns.model.user.ClWWechatUserDTO;
import common.message.BaseController;
import common.message.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping(value = "api/exit",method = RequestMethod.POST)
public class ExitController extends BaseController{
    @Autowired
    private ExitService exitService;

    //退出并且删除缓存中用户
    @ResponseBody
    @RequestMapping(value = "/deleteToken")
    public JsonResult deleteToken(String token){
        JsonResult jsonResult=initJsonResult();
        return  exitService.deleteToken(token);
    }
    //展示登录的所有用户
    @ResponseBody
    @RequestMapping(value = "/showUser")
    public JsonResult  showUser(UserReqParam userReqParam){
       JsonResult json=initJsonResult();
       PageInfo pageInfo= exitService.showUser(userReqParam);
        json.setBody(pageInfo);
        return json;
    }
    //添加到权限用户中
    @ResponseBody
    @RequestMapping(value = "/insertUser")
    public JsonResult insertUser(ClWWechatRecord clWWechatRecord, ClWWechatUserDTO clWWechatUserDTO){
        JsonResult jsonResult=initJsonResult();
        return  exitService.insertUser(clWWechatRecord,clWWechatUserDTO);
    }
}
