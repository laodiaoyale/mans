package com.bns.api.sys.controller;

import com.github.pagehelper.PageInfo;
import com.bns.api.sys.service.SysUserService;
import com.bns.api.sys.vo.LoginUserVO;
import com.bns.api.sys.vo.SysUserRegisterVO;
import com.bns.api.sys.vo.SysUserVo;
import common.exception.BaseException;
import common.message.BaseController;
import common.message.JsonResult;
import common.message.ReqHeader;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping(value = "api/sysUser")
public class SysUserController extends BaseController {
    private final Logger logger = LogManager.getLogger(this.getClass());

    @Autowired
    private SysUserService sysUserService;

    /***
     * OK
     * 登录
     * @param loginUserVO
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value = "/login/v2")
    public JsonResult sysLogin(LoginUserVO loginUserVO) throws Exception {
        JsonResult json = initJsonResult();
        json = sysUserService.sysLogin(loginUserVO);
        return json;
    }

    /**
     * OK
     * 密码 修改
     *
     * @param loginUserVO
     * @return
     * @throws Exception
     */
    @RequestMapping("/passwordUpdate/v1")
    public JsonResult passwordUpdate(LoginUserVO loginUserVO) throws Exception {
        JsonResult json = initJsonResult();
        return sysUserService.passwordUpdate(loginUserVO);
    }

    /**
     * OK
     * 显示列表
     */
    @RequestMapping("/selectUserList/v1")
    public JsonResult selectUserList(SysUserVo sysUserVo){
        JsonResult json = initJsonResult();
        PageInfo pageInfo=sysUserService.selectUserList(sysUserVo);

        json.setBody(pageInfo);
        return  json;
    }


    /**
     * OK
     * @param registerVO
     * @return
     * 员工注册
     */
    @RequestMapping(value="/sysUserRegister/v1")
    public JsonResult sysUserRegister(SysUserRegisterVO registerVO) throws BaseException {
        JsonResult json = initJsonResult();
        return sysUserService.sysUserRegister(registerVO);
    }

    /**
     * OK
     * @param vo
     * @return
     * 删除
     */
    @RequestMapping(value="/sysUserDel/v1")
    public JsonResult sysUserDel(SysUserRegisterVO vo) throws BaseException {
        JsonResult json = initJsonResult();
        return sysUserService.sysUserDel(vo);
    }

    /**
     * OK
     * 修改
     * @param vo
     * @param
     * @return
     */
    @RequestMapping("/updateUser/v1")
    public JsonResult updateUser(SysUserRegisterVO vo) throws BaseException {
        JsonResult json = initJsonResult();
        return sysUserService.updateUser(vo);
    }

    //退出并且删除缓存中用户
    @ResponseBody
    @RequestMapping(value = "/logout/v2")
    public JsonResult logout(String userNo, ReqHeader reqHeader) {
        JsonResult jsonResult = initJsonResult();
        return sysUserService.logout(userNo, reqHeader.getToken());
    }


}