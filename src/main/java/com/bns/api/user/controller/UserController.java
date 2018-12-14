package com.bns.api.user.controller;

import com.bns.api.user.param.UserReqParam;
import com.bns.api.user.service.UserService;
import com.bns.model.user.BnsUser;
import com.github.pagehelper.PageInfo;
import common.exception.BaseException;
import common.message.BaseController;
import common.message.JsonResult;
import common.util.FastJsonUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Iterator;

/**
 * @author zhaolei
 * @date 2017年11月10日13:40:22
 * 用户相关
 */
@Controller
@RequestMapping(value = "api/user")
public class UserController extends BaseController{

    @Autowired
    private UserService userService;
    /**
     * 客户信息展示+根据账户信息模糊查询(手机号)
     * @param userReqParam
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/list")
    public JsonResult list(UserReqParam userReqParam){
        JsonResult json = initJsonResult();
        PageInfo pageInfo=userService.pageLite(userReqParam);
//        if(pageInfo.getList().size()==0){
//            //若用户列表为0则查找不到该用户
//            json.setError(RespCodeCostant.ACCOUNTMANAGEMENT);
//            json.setBody(new HashMap<>());
//            return json;
//        }
        json.setBody(pageInfo);
        return json;
    }


    /**
     * OK
     * @param bnsUser
     * @return
     * 删除
     */
    @RequestMapping(value="/addOrUpdate")
    public JsonResult addOrUpdate(BnsUser bnsUser) throws BaseException {
        userService.addOrUpdate(bnsUser);
        return initJsonResult();
    }
    /**
     * OK
     * @param bnsUser
     * @return
     * 删除
     */
    @RequestMapping(value="/getCity")
    public JsonResult getCity(BnsUser bnsUser) throws BaseException {
        JsonResult json = initJsonResult();
        json.setBody(userService.getCity());
        return json;
    }

    /**
     * OK
     * @param userNo
     * @return
     * 删除
     */
    @RequestMapping(value="/getEnterprise")
    public JsonResult getEnterprise(String userNo) throws BaseException {
        JsonResult json = initJsonResult();
        json.setBody(userService.getEnterprise(userNo));
        return json;
    }

    /**
     * OK
     * @param id
     * @return
     * 删除
     */
    @RequestMapping(value="/del")
    public JsonResult delete(String id) throws BaseException {
        Integer i = Integer.valueOf(id);
        userService.delete(i);
        return initJsonResult();
    }

    /**
     * OK
     * @return
     * 删除
     */
    @RequestMapping(value="/importData")
    public void importData(HttpServletRequest request,HttpServletResponse response) throws Exception {
        InputStream is=null;
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/json;charset=UTF-8");
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(request.getSession().getServletContext());
        if(multipartResolver.isMultipart(request)){
            MultipartHttpServletRequest multiRequest=(MultipartHttpServletRequest)request;
            Iterator<String> iterator = multiRequest.getFileNames();
            while (iterator.hasNext()) {
                MultipartFile multipartFile = multiRequest.getFile(iterator.next());
                if(multipartFile !=null){
                    is=new ByteArrayInputStream(multipartFile.getBytes());
                }
            }
        }
        Workbook wb=new XSSFWorkbook(is);
        String result = userService.importData(wb);
        PrintWriter out=response.getWriter();
        response.setCharacterEncoding("utf-8");  //防止ajax接受到的中文信息乱码
        out.print(result);
        out.flush();
        out.close();
    }

    /**
     * OK
     * @return
     * 删除
     */
    @RequestMapping(value="/exportData")
    @ResponseBody
    public void exportData(HttpServletRequest request,HttpServletResponse response,@RequestParam String data) throws Exception {
        //响应到客户端
        try {
            UserReqParam userReqParam = (UserReqParam)FastJsonUtil.jsonToObj(data,UserReqParam.class);
            String fileName = "员工信息表"+System.currentTimeMillis()+".xls";
            HSSFWorkbook wb = userService.exportExcel(userReqParam);
            response.reset();
            response.setHeader("Content-disposition", "attachment; filename="+fileName);
            response.setContentType("application/msexcel");
            response.addHeader("Pargam", "no-cache");
            response.addHeader("Cache-Control", "no-cache");               OutputStream os = response.getOutputStream();
            wb.write(os);
            os.flush();
            os.close();
         } catch (Exception e) {
            e.printStackTrace();
         }
    }
}
