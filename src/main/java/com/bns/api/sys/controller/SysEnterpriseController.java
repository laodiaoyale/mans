package com.bns.api.sys.controller;

import com.bns.api.sys.service.SysEnterpriseService;
import common.message.BaseController;
import common.message.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "api/sysEnterprise")
public class SysEnterpriseController extends BaseController {
    @Autowired
    private SysEnterpriseService sysEnterpriseService;

    /**
     * OK
     * s初始化用戶菜單
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value="/list")
    public JsonResult queryEnterprise() throws Exception {
        JsonResult json = initJsonResult();
        json=sysEnterpriseService.queryEnterprise();
        return json;
    }

}
