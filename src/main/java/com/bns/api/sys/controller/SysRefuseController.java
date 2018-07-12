package com.bns.api.sys.controller;

import com.github.pagehelper.PageInfo;
import com.bns.api.sys.service.SysRefuseService;
import com.bns.api.sys.vo.SysPageVo;
import com.bns.api.sys.vo.SysRefuseAddVo;
import common.message.BaseController;
import common.message.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping(value = "api/sysRefuse")
public class SysRefuseController extends BaseController{
    @Autowired
    private SysRefuseService sysRefuseService;
    /***
     * OK
     * 查询资源树
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value="/queryRefuseAll/v1")
    public JsonResult queryRefuseAll(SysPageVo pageVo) throws Exception {
        JsonResult json = initJsonResult();
        PageInfo pageInfo = sysRefuseService.queryRefuseAll(pageVo);
        json.setBody(pageInfo);
        return json;
    }


    /***
     * OK
     * 查询拒绝代码联动
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value="/queryRefuseByParent/v1")
    public JsonResult queryRefuseByParent(Integer parentId) throws Exception {
        JsonResult json = initJsonResult();
        return sysRefuseService.queryRefuseByParent(parentId);

    }

    /***
     * OK
     * 拒绝代码 添加
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value="/refuseAdd/v1")
    public JsonResult refuseAdd(SysRefuseAddVo addVo) throws Exception {
        JsonResult json = initJsonResult();
        return sysRefuseService.refuseAdd(addVo);

    }

    /***
     * OK
     * 拒绝代码 停用
     * @return
     * @throws Exception
     */
    @ResponseBody
    @RequestMapping(value="/refuseLose/v1")
    public JsonResult refuseLose(SysRefuseAddVo addVo) throws Exception {
        JsonResult json = initJsonResult();
        return sysRefuseService.refuseLose(addVo);

    }
}
