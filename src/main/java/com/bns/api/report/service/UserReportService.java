package com.bns.api.report.service;

import com.bns.api.report.param.UserReportParam;
import com.bns.api.sys.vo.SysEnterpriseVo;
import com.bns.api.user.param.UserReqParam;
import com.bns.dao.report.BnsUserReportDao;
import com.bns.dao.sys.SysEnterpriseDao;
import com.bns.dao.user.BnsUserDao;
import com.bns.model.sys.SysEnterpriseDTO;
import com.bns.model.user.BnsUser;
import com.bns.model.user.BnsUserVo;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import common.ReadExcel;
import common.exception.BaseException;
import common.message.BaseController;
import common.util.StringUtil;
import common.util.date.DateUtils;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

/**
 * @author zhaolei
 * @date 2019-7-30 19:13:20
 * @desc 用户报表服务
 */
@Service
public class UserReportService extends BaseController{

    @Autowired
    private BnsUserReportDao userReportDao ;

    @Autowired
    private SysEnterpriseDao sysEnterpriseDao;

    /**
     * @param param
     * @return
     */
    public PageInfo pageLite(UserReportParam param){
        setEnNo(param);
        PageHelper.startPage(param.getPageNum(), param.getPageSize());
        //判断是实时查询，还是查询历史数据
        if(param.isFlag()){
            //实时数据统计
            List<BnsUser> pageList = userReportDao.findPagingByTime(param);
            return  new PageInfo(pageList);
        }else{
            //查询历史数据统计
            List<BnsUser> pageList = userReportDao.findPaging(param);
            return  new PageInfo(pageList);
        }
    }


//    public List<String> getCity() {
//        List<String> list = userDao.getCity();
//        return list;
//    }

    private void setEnNo(UserReportParam userReportParam){
        String[] ens = userReportParam.getEnNos();
        if(ens!=null&&ens.length>0){
            //删除之前的记录
            StringBuffer buf = new StringBuffer();
            for(String s :ens){
                buf.append(s);
                buf.append(",");
            }
            userReportParam.setEnNo(buf.substring(0,buf.length()-1));
        }
        if(!"admin".equals(userReportParam.getRoleCode())&& StringUtil.isBlank( userReportParam.getEnNo())){
            List<SysEnterpriseVo> list =  sysEnterpriseDao.queryEnterpriseByUserNo(userReportParam.getUserNo());
            if(list!=null&&list.size()>0){
                //删除之前的记录
                StringBuffer buf = new StringBuffer();
                for(SysEnterpriseVo s :list){
                    buf.append(s.getId());
                    buf.append(",");
                }
                userReportParam.setEnNo(buf.substring(0,buf.length()-1));
            }
        }
    }

}