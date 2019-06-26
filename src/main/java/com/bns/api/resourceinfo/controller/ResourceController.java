package com.bns.api.resourceinfo.controller;

import com.bns.api.resourceinfo.param.ResourceReqParam;
import com.bns.api.resourceinfo.service.ResourceService;
import com.bns.api.user.param.UserReqParam;
import com.bns.model.resource.ResourceInfo;
import com.bns.model.user.BnsUser;
import com.github.pagehelper.PageInfo;
import common.exception.BaseException;
import common.message.BaseController;
import common.message.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author zhaolei
 * @date 2017年11月10日13:40:22
 * 资源管理
 */
@Controller
@RequestMapping(value = "api/resource")
public class ResourceController extends BaseController{

    @Autowired
    private ResourceService resourceService;
    /**
     * 客户信息展示+根据账户信息模糊查询(手机号)
     * @param resourceReqParam
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/list")
    public JsonResult list(ResourceReqParam resourceReqParam){
        JsonResult json = initJsonResult();
        PageInfo pageInfo=resourceService.pageLite(resourceReqParam);
        json.setBody(pageInfo);
        return json;
    }


    /**
     * @param info
     * @return
     * 新增或修改
     */
    @RequestMapping(value="/addOrUpdate")
    public JsonResult addOrUpdate(ResourceInfo info) throws BaseException {
        resourceService.addOrUpdate(info);
        return initJsonResult();
    }

    /**
     * @param id
     * @return
     * 删除
     */
    @RequestMapping(value="/del")
    public JsonResult delete(String id) throws BaseException {
        Integer i = Integer.valueOf(id);
        resourceService.delete(i);
        return initJsonResult();
    }

    /**
     * @param type
     * @return
     * 获取公司下拉列表
     */
    @RequestMapping(value="/getCompany")
    public JsonResult getCompany(String type) throws BaseException {
        JsonResult json = initJsonResult();
        json.setBody(resourceService.getCompany(Integer.valueOf(type)));
        return json;
    }

    /**
     * @param type
     * @return
     * 获取区域下拉框
     */
    @RequestMapping(value="/getRegion")
    public JsonResult getRegion(String type) throws BaseException {
        JsonResult json = initJsonResult();
        json.setBody(resourceService.getRegion(Integer.valueOf(type)));
        return json;
    }
}
