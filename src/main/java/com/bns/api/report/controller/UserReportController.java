package com.bns.api.report.controller;

import com.bns.api.report.param.UserReportParam;
import com.bns.api.report.service.UserReportService;
import common.exception.BaseException;
import common.message.BaseController;
import common.message.JsonResult;
import common.message.ResultGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author zhaolei
 * @date 2017年11月10日13:40:22
 * 用户报表相关
 */
@Controller
@RequestMapping(value = "api/userReport")
public class UserReportController extends BaseController{

    @Autowired
    private UserReportService userReportService;
    /**
     * 查询报表列表
     * @param param
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/list")
    public JsonResult list(UserReportParam param){
        return  ResultGenerator.goSuccessResult(userReportService.pageLite(param));
    }

    @RequestMapping(value="/getUserCount")
    public JsonResult getEnterprise() throws BaseException {
        JsonResult json = initJsonResult();
        json.setBody(userReportService.getUserCount());
        return json;
    }


    /**
     * OK
     * @param userNo
     * @return
     * 删除
     */
//    @RequestMapping(value="/getEnterprise")
//    public JsonResult getEnterprise(String userNo) throws BaseException {
//        JsonResult json = initJsonResult();
//        json.setBody(userReportService.getEnterprise(userNo));
//        return json;
//    }

}
