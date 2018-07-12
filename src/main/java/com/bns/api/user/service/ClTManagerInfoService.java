package com.bns.api.user.service;

import com.bns.dao.user.ClTManagerInfoDao;
import com.bns.model.user.ClTManagerInfoDTO;
import common.ReadExcel;
import common.util.StringUtil;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * 用户管理用户站内信的service类
 */
@Service
public class ClTManagerInfoService implements Serializable {

    @Autowired
    private ClTManagerInfoDao clTManagerInfoDao;


    public List<ClTManagerInfoDTO> vifyExcel(String filePath){
        Workbook wb = ReadExcel.readExcel(filePath);
        List<ClTManagerInfoDTO> list = new ArrayList<ClTManagerInfoDTO>();
        //设置背景色
        CellStyle cellStyle = wb.createCellStyle();
        cellStyle.setFillForegroundColor(IndexedColors.RED.getIndex());
        cellStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
        if(wb != null){
            //用来存放表中数据
            //获取第一个sheet
            Sheet sheet = wb.getSheetAt(0);
            //获取最大行数
            int rownum = sheet.getPhysicalNumberOfRows();
            for (int i = 1; i<rownum; i++) {
                ClTManagerInfoDTO info = new ClTManagerInfoDTO();
                Row row = sheet.getRow(i);
                if(row !=null){
                    info.setOneDepartment((String) ReadExcel.getCellFormatValue(row.getCell(0)));
                    info.setTwoDepartment((String) ReadExcel.getCellFormatValue(row.getCell(1)));
                    info.setThreeDepartment((String) ReadExcel.getCellFormatValue(row.getCell(2)));
                    info.setFourDepartment((String) ReadExcel.getCellFormatValue(row.getCell(3)));
                    info.setFiveDepartment((String) ReadExcel.getCellFormatValue(row.getCell(4)));
                    info.setStoreLevel((String) ReadExcel.getCellFormatValue(row.getCell(5)));
                    String oaNumber = (String) ReadExcel.getCellFormatValue(row.getCell(6));
                    if(StringUtil.isBlank(oaNumber)||oaNumber.length()!=8) {
                        row.getCell(6).setCellStyle(cellStyle);
                    }
                    info.setOaWorkNumber(oaNumber);
                    info.setSuperior((String) ReadExcel.getCellFormatValue(row.getCell(7)));
                    info.setName((String) ReadExcel.getCellFormatValue(row.getCell(8)));
                    info.setSex((String) ReadExcel.getCellFormatValue(row.getCell(9)));
                    String idCard = (String) ReadExcel.getCellFormatValue(row.getCell(10));
                    if(StringUtil.isBlank(idCard)||idCard.length()!=18) {
                        row.getCell(10).setCellStyle(cellStyle);
                    }
                    info.setIdCardNum(idCard);
                    info.setEmail((String) ReadExcel.getCellFormatValue(row.getCell(11)));
                    String mobile = (String) ReadExcel.getCellFormatValue(row.getCell(12));
                    if(StringUtil.isBlank(mobile)||!ReadExcel.isChinaPhoneLegal(mobile)) {
                        row.getCell(12).setCellStyle(cellStyle);
                    }
                    info.setMobile(mobile);
                    info.setStaffStatus((String) ReadExcel.getCellFormatValue(row.getCell(13)));
                    info.setDateOfEntry((String) ReadExcel.getCellFormatValue(row.getCell(14)));
                    String leaveDate = (String) ReadExcel.getCellFormatValue(row.getCell(15));
                    if(StringUtil.isNotBlank(leaveDate)){
                        info.setLeaveDate(leaveDate);
                    }
//                    info.setImportTime((String) ReadExcel.getCellFormatValue(row.getCell(16)));
                    info.setPost((String) ReadExcel.getCellFormatValue(row.getCell(17)));
                    info.setOrCode((String) ReadExcel.getCellFormatValue(row.getCell(18)));
//                    info.setExpiredTime((String) ReadExcel.getCellFormatValue(row.getCell(19)));
                    list.add(info);
                }else{
                    break;
                }
            }
        }
        try{
            //对修改后的Excel进行保存
            FileOutputStream excelFileOutPutStream = new FileOutputStream(filePath);
            wb.write(excelFileOutPutStream);
            excelFileOutPutStream.flush();
            excelFileOutPutStream.close();
        }catch (Exception e){
            e.printStackTrace();
        }

        //遍历解析出来的list
        for (ClTManagerInfoDTO info : list) {
            System.out.println(""+info.toString());
        }
        System.out.println("一共"+list.size()+"行。");
        return list;
    }
    /**
     * 插入消息
     * @param
     * @return
     */
    public String insert(String url){
        List<ClTManagerInfoDTO> list = vifyExcel(url);
        for(ClTManagerInfoDTO info:list){
            //验证是否存在
            clTManagerInfoDao.insert(info);
        }
        return "成功";
    }

}
