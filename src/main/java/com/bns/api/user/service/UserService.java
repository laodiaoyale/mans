package com.bns.api.user.service;

import com.bns.api.sys.vo.SysEnterpriseVo;
import com.bns.api.user.param.UserReqParam;
import com.bns.dao.sys.SysEnterpriseDao;
import com.bns.dao.user.BnsUserDao;
import com.bns.model.user.BnsUser;
import com.bns.model.user.BnsUserVo;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import common.ReadExcel;
import common.exception.BaseException;
import common.message.BaseController;
import common.util.StringUtil;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * @author zhaolei
 * @date 2017年11月12日14:35:06
 */
@Service
public class UserService extends BaseController{

    @Autowired
    private BnsUserDao userDao ;
    @Autowired
    private SysEnterpriseDao sysEnterpriseDao;

    /**
     * 客户信息展示
     * @param userReqParam
     * @return
     */
    public PageInfo pageLite(UserReqParam userReqParam){
        String[] ens = userReqParam.getEnNos();
        if(ens!=null&&ens.length>0){
            //删除之前的记录
            StringBuffer buf = new StringBuffer();
            for(String s :ens){
                buf.append(s);
                buf.append(",");
            }
            userReqParam.setEnNo(buf.substring(0,buf.length()-1));
        }
        if(!"admin".equals(userReqParam.getRoleCode())&& StringUtil.isBlank( userReqParam.getEnNo())){
            List<SysEnterpriseVo> list =  sysEnterpriseDao.queryEnterpriseByUserNo(userReqParam.getUserNo());
            if(list!=null&&list.size()>0){
                //删除之前的记录
                StringBuffer buf = new StringBuffer();
                for(SysEnterpriseVo s :list){
                    buf.append(s.getId());
                    buf.append(",");
                }
                userReqParam.setEnNo(buf.substring(0,buf.length()-1));
            }
        }

        PageHelper.startPage(userReqParam.getPageNum(), userReqParam.getPageSize());
        List<BnsUser> pageList = userDao.findPaging(userReqParam);
        return  new PageInfo(pageList);
    }
    /**
     * @param id
     * @return
     * 删除
     */
    public void delete(Integer id)throws BaseException {
        BnsUser user = userDao.selectByPrimaryKey(id);//查询员工
        if(user ==null){
            throw new BaseException("员工不存在");
        }
        user.setDelFlag((byte) 0);
        int num = userDao.updateByPrimaryKey(user);
        if(num==0){
            throw new BaseException("信息删除失败");
        }
    }

    /**
     * 新增或修改用户信息
     * @param bnsUser
     */
    public void addOrUpdate(BnsUser bnsUser) throws BaseException{
        if(bnsUser.getId()==null||bnsUser.getId()==0){
            //估计身份证号查询是否有录入
            UserReqParam userReqParam = new UserReqParam();
            userReqParam.setIdCard(bnsUser.getIdCard());
            List<BnsUser> bnsUsers = userDao.findPaging(userReqParam);
            if(bnsUsers!=null&&bnsUsers.size()>0){
                throw  new BaseException("该身份证号已存在");
            }
            userDao.insert(bnsUser);
        }else{
            bnsUser.setDelFlag((byte)1);
            userDao.updateByPrimaryKey(bnsUser);
        }
    }

    public List<String> getCity() {
        List<String> list = userDao.getCity();
        return list;
    }

    public List<String> getEnterprise(String userNo) {
        List<String> list = userDao.getCity();
        return list;
    }

    /**
     * 插入消息
     * @param
     * @return
     */
    public String importData( Workbook wb){
        List<BnsUserVo> list = vifyExcel(wb);
        int i=0,j=0;
        for(BnsUserVo info:list){
            //验证是否存在
//            int count = userDao.selectCountByIdCard(info.getIdCard());
            try {
                userDao.insertVo(info);
                i++;
                continue;
            }catch (Exception e){
                j++;
            }
        }
        return "文件导入完成！成功"+i+"条，失败"+j+"条";
    }

    public List<BnsUserVo> vifyExcel(Workbook wb){
        List<BnsUserVo> list = new ArrayList<BnsUserVo>();
        //设置背景色
        CellStyle cellStyle = wb.createCellStyle();
        cellStyle.setFillForegroundColor(IndexedColors.RED.getIndex());
        cellStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
        //设置背景色
        if(wb != null){
            //用来存放表中数据
            //获取第一个sheet
            Sheet sheet = wb.getSheetAt(0);
            //获取最大行数
            int rownum = sheet.getPhysicalNumberOfRows();
            for (int i = 1; i<rownum; i++) {
                BnsUserVo info = new BnsUserVo();
                Row row = sheet.getRow(i);
                if(row !=null){
                    info.setName((String) ReadExcel.getCellFormatValue(row.getCell(0)));
                    info.setIdCard((String) ReadExcel.getCellFormatValue(row.getCell(1)));
                    info.setMobile((String) ReadExcel.getCellFormatValue(row.getCell(2)));
                    info.setRealName((String) ReadExcel.getCellFormatValue(row.getCell(3)));
                    info.setRealCard((String) ReadExcel.getCellFormatValue(row.getCell(4)));
                    info.setSex(sexFn((String) ReadExcel.getCellFormatValue(row.getCell(5))));
                    info.setAge((String)ReadExcel.getCellFormatValue(row.getCell(6)));
                    info.setCity((String) ReadExcel.getCellFormatValue(row.getCell(7)));
                    info.setAddress((String) ReadExcel.getCellFormatValue(row.getCell(8)));
                    info.setWechatCode((String) ReadExcel.getCellFormatValue(row.getCell(9)));
                    info.setQqCode((String) ReadExcel.getCellFormatValue(row.getCell(10)));
                    info.setEducation(educationFn((String) ReadExcel.getCellFormatValue(row.getCell(11))));
                    info.setSource((String) ReadExcel.getCellFormatValue(row.getCell(12)));
                    info.setSkill((String) ReadExcel.getCellFormatValue(row.getCell(13)));
                    info.setHistory((String) ReadExcel.getCellFormatValue(row.getCell(14)));
                    info.setJob((String) ReadExcel.getCellFormatValue(row.getCell(15)));
                    info.setStatus(statusFn((String) ReadExcel.getCellFormatValue(row.getCell(16))));
                    info.setEnterprise((String) ReadExcel.getCellFormatValue(row.getCell(17)));
                    //通过企业找到Code码
                    info.setEntryDate((String) ReadExcel.getCellFormatValue(row.getCell(18)));
                    info.setLeaveDate((String) ReadExcel.getCellFormatValue(row.getCell(19)));
                    info.setBankCard((String) ReadExcel.getCellFormatValue(row.getCell(20)));
                    info.setBankName((String) ReadExcel.getCellFormatValue(row.getCell(21)));
                    info.setContacts((String) ReadExcel.getCellFormatValue(row.getCell(22)));
                    info.setRelation(relationFn((String) ReadExcel.getCellFormatValue(row.getCell(23))));
                    info.setContactNumber((String) ReadExcel.getCellFormatValue(row.getCell(24)));
                    info.setInsurance(insuranceFn((String) ReadExcel.getCellFormatValue(row.getCell(25))));
                    info.setRemark((String) ReadExcel.getCellFormatValue(row.getCell(26)));
                    list.add(info);
                }else{
                    break;
                }
            }
        }
        //遍历解析出来的list
        for (BnsUserVo info : list) {
            System.out.println(""+info.toString());
        }
        System.out.println("一共"+list.size()+"行。");
        return list;
    }

    public static String insuranceFn(String insurance){
        switch (insurance){
            case "已购买保险":
                return "1";
            case "离职已替换":
                return "2";
            case "离职未替换":
                return "3";
            case "待购买保险":
                return "4";
        }
        return null;
    }
    public static String relationFn(String relation){
        switch (relation){
            case "父亲":
                return "1";
            case "母亲":
                return "2";
            case "子女":
                return "3";
            case "其他亲属":
                return "4";
            case "朋友":
                return "5";
            case "其他":
                return "6";
        }
        return null;
    }
    public static String sexFn(String sex){
        switch (sex){
            case "男":
                return "0";
            case "女":
                return "1";
        }
        return null;
    }
    public static String educationFn(String education){
        switch (education){
            case "小学":
                return "1";
            case "初中":
                return "2";
            case "高中":
                return "3";
            case "专科":
                return "4";
            case "本科":
                return "5";
            case "研究生":
                return "6";
            case "研究生以上":
                return "7";
        }
        return null;
    }
    public static String statusFn(String status){
        switch (status){
            case "在职":
                return "1";
            case "离职":
                return "2";
            case "已请假":
                return "3";
        }
        return null;
    }

}
