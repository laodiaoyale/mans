package com.bns.api.sys.controller;

import com.github.pagehelper.PageInfo;
import com.bns.api.sys.service.SysConfigService;
import com.bns.api.sys.vo.SysConfigVo;
import common.exception.BaseException;
import common.message.BaseController;
import common.message.JsonResult;
import common.message.RespCodeCostant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;

/**
 * 用户管理系统配置的controller层
 * @Author xiangzebing
 */
@Controller
@RequestMapping(value = "api/sys")
public class SysConfigController extends BaseController {

    @Autowired
    private SysConfigService sysConfigService;

    /**
     * 显示系统配置列表
     * @param sysConfigVo
     * @return
     */
    @RequestMapping("/selectAll/v1/")
    public JsonResult selectAll(SysConfigVo sysConfigVo){
        JsonResult json = initJsonResult();
        PageInfo pageInfo=sysConfigService.selectAll(sysConfigVo);
        json.setBody(pageInfo);
        return json;
    }

    /**
     * 修改指定配置名称的状态
     * @param sysConfigVo
     * @return
     */
    @RequestMapping("/updateStatus/v1/")
    public JsonResult updateStatus(SysConfigVo sysConfigVo){
        JsonResult json = initJsonResult();
        int num = sysConfigService.updateById(sysConfigVo);
        if(num != 1){
            json.setError(RespCodeCostant.SYS_CONFIG_UPDATE_FAIL);
        }
        json.setBody(new HashMap<>());
        return json;
    }

    /**
     * 添加系统配置
     * @param sysConfigVo
     * @return
     */
    @RequestMapping("/insert/v1/")
    public JsonResult insert(SysConfigVo sysConfigVo){
        JsonResult json = initJsonResult();
        int num = sysConfigService.insert(sysConfigVo);
        if(num != 1){
            json.setError(RespCodeCostant.SYS_CONFIG_INSERT_FAIL);
        }
        json.setBody(new HashMap<>());
        return json;
    }

    /**
     * 一键刷新redis中的系统配置
     * @return
     */
    @RequestMapping("/updateByAll/v1/")
    public JsonResult updateByAll(){
        JsonResult json = initJsonResult();
        int num = sysConfigService.updateByAll();
        if(num != 1){
            json.setError(RespCodeCostant.SYS_CONFIG_UPDATE_REDIS_FAIL);
        }
        json.setBody(new HashMap<>());
        return json;
    }
    /**
     * 一键刷新redis中的系统配置
     * @return
     */
    @RequestMapping("/Test/v1/")
    public JsonResult testsys(){
        JsonResult json = initJsonResult();
        int num = sysConfigService.updateByAll();
        if(num != 1){
            json.setError(RespCodeCostant.SYS_CONFIG_UPDATE_REDIS_FAIL);
        }
        json.setBody(new HashMap<>());
        return json;
    }

    /**
     * wujinfeng
     * 数据字典
     */
    @ResponseBody
    @RequestMapping(value = "/dataDictionary/v1/")
    public JsonResult appDataDictionary(String datatype)throws Exception{
        JsonResult json = initJsonResult();
        if(datatype.isEmpty()){
            throw new BaseException("请求参数为空");
        }
        return sysConfigService.judgmentRequest(datatype);
    }

}
