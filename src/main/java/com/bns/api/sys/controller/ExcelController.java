package com.bns.api.sys.controller;

import com.bns.api.sys.service.BackCommentsService;
import com.bns.api.user.param.BackCommentParam;
import common.exception.BaseException;
import common.message.BaseController;
import common.message.JsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

@Controller
@RequestMapping(value = "excel/",method = RequestMethod.POST)
public class ExcelController extends BaseController{
    @Autowired
    private BackCommentsService backCommentsService;

    @ResponseBody
    @RequestMapping(value = "/exportLarge")
    public JsonResult excelExport(HttpServletRequest request, HttpServletResponse response, @ModelAttribute BackCommentParam param) throws BaseException, UnsupportedEncodingException {
        JsonResult json = initJsonResult();
        param.setHeaders(URLDecoder.decode(param.getHeaders() , "utf-8"));
        return backCommentsService.excelExport(param,response);
    }
}
