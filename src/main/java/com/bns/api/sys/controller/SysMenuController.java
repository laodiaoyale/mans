package com.bns.api.sys.controller;

import com.bns.api.sys.service.SysMenuService;
import common.message.BaseController;
import common.message.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "api/sysMenu")
public class SysMenuController extends BaseController {
    @Autowired
    private SysMenuService sysMenuService;

    /**
     * OK
     * s初始化用戶菜單
     * @param userNo
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value="/queryMenuByUserId/v2")
    public JsonResult queryMenuByUserId(String userNo) throws Exception {
        JsonResult json = initJsonResult();
        json=sysMenuService.queryMenuByUserId(userNo);
        return json;
    }

}
