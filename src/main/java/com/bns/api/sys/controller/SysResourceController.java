package com.bns.api.sys.controller;

import com.bns.api.sys.bo.ResourceRespBo;
import com.bns.api.sys.service.SysResourceService;
import common.message.BaseController;
import common.message.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;


@Controller
@RequestMapping(value = "api/sysResource")
public class SysResourceController extends BaseController{
    @Autowired
    private SysResourceService sysResourceService;
    /***
     * OK
     * 查询资源树
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value="/querySysResourceTree/v1")
    public JsonResult querySysResourceTree() throws Exception {
        JsonResult json = initJsonResult();
        List<ResourceRespBo> list = sysResourceService.querySysResourceTree();
        json.setBody(list);
        return json;
    }
}
