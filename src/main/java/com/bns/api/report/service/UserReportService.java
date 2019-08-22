package com.bns.api.report.service;

import com.bns.api.report.param.UserReportParam;
import com.bns.api.sys.vo.SysEnterpriseVo;
import com.bns.api.user.param.UserReqParam;
import com.bns.dao.report.BnsUserReportDao;
import com.bns.dao.sys.SysEnterpriseDao;
import com.bns.dao.user.BnsUserDao;
import com.bns.model.report.BnsUserReport;
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
import org.apache.commons.collections.CollectionUtils;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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
            List<BnsUserReport> pageList = userReportDao.findPagingByTime(param);
            return  new PageInfo(pageList);
        }else{
            //查询历史数据统计
            List<BnsUserReport> pageList = userReportDao.findPaging(param);
            return  new PageInfo(pageList);
        }
    }
//    public Map searchUserBehavior(UserReportParam param) {
//
//        //获取当前用户下的企业
//        List<SysEnterpriseVo> list =  sysEnterpriseDao.queryEnterpriseByUserNo(param.getUserNo());
//        if(list!=null&&list.size()>0){
//
//        }
//        List<BnsUserReport> list = userReportDao.selectAll(param);
//        //定义X轴
//        List xAxis = new ArrayList();
//        int[] y1 = new int[list.size()];
//        int[] y2 = new int[list.size()];
//        int[] y3 = new int[list.size()];
//        int[] y4 = new int[list.size()];
//        int[] y5 = new int[list.size()];
//        int[] y6 = new int[list.size()];
//        int[] y7 = new int[list.size()];
//        int[] y8 = new int[list.size()];
//        int[] y9 = new int[list.size()];
//        int[] y10 = new int[list.size()];
//        int[] y11 = new int[list.size()];
//        int[] y12 = new int[list.size()];
//        for(int i = 0;i<list.size();i++){
//            BnsUserReport dto = list.get(i);
//            String dataTime = dto.getDataTime();
//            //判断日期，x轴时间
//            if(i==0 || !dataTime.equals(list.get(i-1).getDataTime())){
//                xAxis.add(dataTime);
//                continue;
//            }
//            //公司名称
//            String enName = dto.getEnName();
//            y1[i] = dto.getFiveMinutes();
//            y2[i] = dto.getHalfHour();
//            y3[i] = dto.getOneHour();
//            y4[i] = dto.getHalfDay();
//            y5[i] = dto.getOneDay();
//            y6[i] = dto.getThreeDays();
//            y7[i] = dto.getOneWeek();
//            y8[i] = dto.getTwoWeeks();
//            y9[i] = dto.getOneMonth();
//            y10[i] = dto.getTwoMonths();
//            y11[i] = dto.getThreeMonths();
//            y12[i] = dto.getMoreThan();
//        }
//        List series = new ArrayList();
//        series.add(y1);//公司1
//        series.add(y2);//公司2
//        series.add(y3);
//        series.add(y4);
//        series.add(y5);
//        series.add(y6);
//        series.add(y7);
//        series.add(y8);
//        series.add(y9);
//        series.add(y10);
//        series.add(y11);
//        series.add(y12);
//        Map map = new HashMap();
//        map .put("xAxis",xAxis);
//        map .put("series",series);
//        map.put("stageType",UserBehavior.getName(stageType));
//        return map;
//    }


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

    public Map<String ,Object> getUserCount() {
        Map<String ,Object> map  = new HashMap<>();
        BnsUserReport param = new BnsUserReport();
        BnsUserReport reportAll = userReportDao.queryUserCount(param);
        map.put("reportAll",reportAll);
        param.setType((byte) 1);
        BnsUserReport reportToday = userReportDao.queryUserCount(param);
        map.put("reportToday",reportToday);
        return map;
    }
}