package com.bns.api.user.service;

import com.bns.api.sys.vo.SysEnterpriseVo;
import com.bns.api.user.param.UserReqParam;
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
        setEnNo(userReqParam);
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
            //通过企业名称找到企业编号
            if(StringUtil.isBlank(info.getEnterprise())){
                j++;
                continue;
            }
            SysEnterpriseDTO enterpriseDTO =sysEnterpriseDao.getEnterpriseByName(info.getEnterprise());
            if(enterpriseDTO==null){
                j++;
                continue;
            }
//            验证是否存在
            List<BnsUser> list1 = userDao.selectCountByIdCard(info.getIdCard());
            if(list1!=null&&list1.size()>0){
                j++;
                continue;
            }
            try {
                info.setEnNo(String.valueOf(enterpriseDTO.getId()));
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
                return "1";
            case "女":
                return "2";
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

    private void setEnNo(UserReqParam userReqParam){
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
    }

    public HSSFWorkbook exportExcel(UserReqParam userReqParam) {
        userReqParam.setPageNum(0);
        userReqParam.setPageSize(0);
        setEnNo(userReqParam);
        List<BnsUser> list = userDao.findPaging(userReqParam);
        //获取数据
        String sheetName = "员工信息表";
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet(sheetName);
        HSSFRow row = sheet.createRow(0);
        HSSFCellStyle style = wb.createCellStyle();
        style.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式
        //声明列对象
        HSSFCell cell = null;
        String[] title = {"姓名","身份证号","手机号","真实姓名","真实身份证号","性别","年龄","城市",
                "地址","微信号","qq号","学历","来源","专业技能","曾入职企业","职位","员工状态","所属企业","入职日期","离职日期",
                "银行卡号","银行名称","紧急联系人姓名","紧急联系人关系","紧急联系人电话","保险","备注"};
        //创建标题
        for(int i=0;i<title.length;i++){
            cell = row.createCell(i);
            cell.setCellValue(title[i]);
            cell.setCellStyle(style);
        }
        //创建内容
        for(int i=0;i<list.size();i++){
            row = sheet.createRow(i + 1);
            //将内容按顺序赋给对应的列对象
            BnsUser obj = list.get(i);
            row.createCell(0).setCellValue(obj.getName());
            row.createCell(1).setCellValue(obj.getIdCard());
            row.createCell(2).setCellValue(obj.getMobile());
            row.createCell(3).setCellValue(obj.getRealName());
            row.createCell(4).setCellValue(obj.getRealCard());
            row.createCell(5).setCellValue(sexCn(obj.getSex()));
            row.createCell(6).setCellValue(obj.getAge());
            row.createCell(7).setCellValue(obj.getCity());
            row.createCell(8).setCellValue(obj.getAddress());
            row.createCell(9).setCellValue(obj.getWechatCode());
            row.createCell(10).setCellValue(obj.getQqCode());
            row.createCell(11).setCellValue(educationCn(obj.getEducation()));
            row.createCell(12).setCellValue(obj.getSource());
            row.createCell(13).setCellValue(obj.getSkill());
            row.createCell(14).setCellValue(obj.getHistory());
            row.createCell(15).setCellValue(obj.getJob());
            row.createCell(16).setCellValue(statusCn(obj.getStatus()));
            row.createCell(17).setCellValue(obj.getEnterprise());
            if(obj.getEntryDate()!=null){
                row.createCell(18).setCellValue(DateUtils.formatDate(obj.getEntryDate(),"yyyy-MM-dd"));
            }
            if(obj.getLeaveDate()!=null){
                row.createCell(19).setCellValue(DateUtils.formatDate(obj.getLeaveDate(),"yyyy-MM-dd"));
            }
            row.createCell(20).setCellValue(obj.getBankCard());
            row.createCell(21).setCellValue(obj.getBankName());
            row.createCell(22).setCellValue(obj.getContacts());
            row.createCell(23).setCellValue(relationCn(obj.getRelation()));
            row.createCell(24).setCellValue(obj.getContactNumber());
            row.createCell(25).setCellValue(insuranceCn(obj.getInsurance()));
            row.createCell(26).setCellValue(obj.getRemark());
        }
        return  wb;
    }


    public static String insuranceCn(Byte insurance){
        if(insurance==null)return null;
        switch (insurance){
            case 1:
                return "已购买保险";
            case 2:
                return "离职已替换";
            case 3:
                return "离职未替换";
            case 4:
                return "待购买保险";
        }
        return null;
    }
    public static String relationCn(Byte relation){
        if(relation==null)return null;
        switch (relation){
            case 1:
                return "父亲";
            case 2:
                return "母亲";
            case 3:
                return "子女";
            case 4:
                return "其他亲属";
            case 5:
                return "朋友";
            case 6:
                return "其他";
        }
        return null;
    }
    public static String sexCn(Byte sex){
        if(sex==null)return null;
        switch (sex){
            case 1:
                return "男";
            case 2:
                return "女";
        }
        return null;
    }
    public static String educationCn(Byte education){
        if(education==null)return null;
        switch (education){
            case 1:
                return "小学";
            case 2:
                return "初中";
            case 3:
                return "高中";
            case 4:
                return "专科";
            case 5:
                return "本科";
            case 6:
                return "研究生";
            case 7:
                return "研究生以上";
        }
        return null;
    }
    public static String statusCn(Byte status){
        if(status==null)return null;
        switch (status){
            case 1:
                return "在职";
            case 2:
                return "离职";
            case 3:
                return "已请假";
        }
        return null;
    }
}
