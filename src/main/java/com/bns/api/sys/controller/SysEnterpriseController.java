package com.bns.api.sys.controller;

import com.bns.api.sys.service.SysEnterpriseService;
import com.bns.api.sys.vo.SysRoleVo;
import com.bns.model.sys.SysEnterpriseDTO;
import com.bns.model.sys.SysUserDTO;
import common.exception.BaseException;
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


    /**
     * OK
     * 新增角色
     * @param
     * @return
     */
    @RequestMapping("/addOrUpdate")
    public JsonResult addOrUpdate(SysEnterpriseDTO sysEnterpriseDTO) throws BaseException {
        JsonResult json = initJsonResult();
        return sysEnterpriseService.addOrUpdate(sysEnterpriseDTO);
    }
    /***
     * OK
     * 角色删除
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value="/del")
    public JsonResult delEnterprise(String id) throws Exception {
        Integer i = Integer.valueOf(id);
        sysEnterpriseService.delEnterprise(i);
        return initJsonResult();
    }

    /**
     * OK
     * @param roleCode
     * @return
     * 删除
     */
    @RequestMapping(value="/getEnterprise")
    public JsonResult getEnterprise(String roleCode,String userNo) throws BaseException {
        JsonResult json = initJsonResult();
        json.setBody(sysEnterpriseService.getEnterprise(roleCode,userNo));
        return json;
    }

}
