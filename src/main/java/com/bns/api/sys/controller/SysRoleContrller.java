package com.bns.api.sys.controller;

import com.bns.api.sys.service.SysRoleService;
import com.bns.api.sys.vo.SysRoleVo;
import common.exception.BaseException;
import common.message.BaseController;
import common.message.JsonResult;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping(value = "api/sysUserRole")
public class SysRoleContrller extends BaseController {


    private final Logger logger = LogManager.getLogger(this.getClass());

    @Autowired
    private SysRoleService sysRoleService;
    /**
     * OK
     * 查询角色下拉框
     * @param
     * @return
     */
    @RequestMapping("/selectRoleAll/v1")
    public JsonResult selectRoleAll(){
        JsonResult json = initJsonResult();
        return sysRoleService.selectRole();
    }

    /**
     * OK
     * 查询角色 角色列表（菜单名称等）
     * @param
     * @return
     */
    @RequestMapping("/queryRoleList/v1")
    public JsonResult queryRoleList(){
        JsonResult json = initJsonResult();
        return sysRoleService.queryRoleList();
    }



    /**
     * OK
     * 新增角色
     * @param
     * @return
     */
    @RequestMapping("/addRole/v1")
    public JsonResult addRole(SysRoleVo sysRoleVo) throws BaseException {
        JsonResult json = initJsonResult();
        return sysRoleService.addRole(sysRoleVo);
    }
    /**
     * OK
     * 修改角色
     * @param
     * @return
     */
    @RequestMapping("/updateRole/v1")
    public JsonResult updateRole(SysRoleVo sysRoleVo) throws BaseException {
        JsonResult json = initJsonResult();
        return sysRoleService.updateRole(sysRoleVo);
    }
    /***
     * OK
     * 角色删除
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value="/delRole/v1")
    public JsonResult queryMenuAll(SysRoleVo sysRoleVo) throws Exception {
        JsonResult json = initJsonResult();
        json = sysRoleService.delRole(sysRoleVo);
        return json;
    }
}
