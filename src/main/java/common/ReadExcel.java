package common;

import com.bns.model.user.BnsUserVo;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.*;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

public class ReadExcel {

    public static void main(String[] args) {
        Workbook wb =null;
        Sheet sheet = null;
        Row row = null;
        List<BnsUserVo> list = null;
        String cellData = null;
        String filePath = "D:\\导入模板.xlsx";
        wb = readExcel(filePath);
        //设置背景色
        CellStyle cellStyle = wb.createCellStyle();
        cellStyle.setFillForegroundColor(IndexedColors.RED.getIndex());
        cellStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
        if(wb != null){
            //用来存放表中数据
            list = new ArrayList<BnsUserVo>();
            //获取第一个sheet
            sheet = wb.getSheetAt(0);
            //获取最大行数
            int rownum = sheet.getPhysicalNumberOfRows();
            for (int i = 1; i<rownum; i++) {
                BnsUserVo info = new BnsUserVo();
                row = sheet.getRow(i);
                if(row !=null){
                    info.setName((String) getCellFormatValue(row.getCell(0)));
                    info.setIdCard((String) getCellFormatValue(row.getCell(1)));
                    info.setMobile((String) getCellFormatValue(row.getCell(2)));
                    info.setRealName((String) getCellFormatValue(row.getCell(3)));
                    info.setRealCard((String) getCellFormatValue(row.getCell(4)));
                    info.setSex(sexFn((String) getCellFormatValue(row.getCell(5))));
                    info.setAge((String)getCellFormatValue(row.getCell(6)));
                    info.setCity((String) getCellFormatValue(row.getCell(7)));
                    info.setAddress((String) getCellFormatValue(row.getCell(8)));
                    info.setWechatCode((String) getCellFormatValue(row.getCell(9)));
                    info.setQqCode((String) getCellFormatValue(row.getCell(10)));
                    info.setEducation(educationFn((String) getCellFormatValue(row.getCell(11))));
                    info.setSource((String) getCellFormatValue(row.getCell(12)));
                    info.setSkill((String) getCellFormatValue(row.getCell(13)));
                    info.setHistory((String) getCellFormatValue(row.getCell(14)));
                    info.setJob((String) getCellFormatValue(row.getCell(15)));
                    info.setStatus(statusFn((String) getCellFormatValue(row.getCell(16))));
                    info.setEnterprise((String) getCellFormatValue(row.getCell(17)));
                    //通过企业找到Code码
                    info.setEntryDate((String) getCellFormatValue(row.getCell(18)));
                    info.setLeaveDate((String) getCellFormatValue(row.getCell(19)));
                    info.setBankCard((String) getCellFormatValue(row.getCell(20)));
                    info.setBankName((String) getCellFormatValue(row.getCell(21)));
                    info.setContacts((String) getCellFormatValue(row.getCell(22)));
                    info.setRelation(relationFn((String) getCellFormatValue(row.getCell(23))));
                    info.setContactNumber((String) getCellFormatValue(row.getCell(24)));
                    info.setInsurance(insuranceFn((String) getCellFormatValue(row.getCell(25))));
                    info.setRemark((String) getCellFormatValue(row.getCell(26)));
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
        for (BnsUserVo info : list) {
                System.out.println(""+info.toString());
        }
        System.out.println("一共"+list.size()+"行。");
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
        return "0";
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
        return "";
    }
    public static String sexFn(String sex){
        switch (sex){
            case "男":
                return "0";
            case "女":
                return "1";
        }
        return "";
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
        return "";
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
        return "";
    }

    /**
     * 大陆手机号码11位数，匹配格式：前三位固定格式+后8位任意数
     * 此方法中前三位格式有：
     * 13+任意数
     * 15+除4的任意数
     * 18+除1和4的任意数
     * 17+除2、5、9的任意数
     * 141/145/146/147
     * 198
     * 166
     */
    public static boolean isChinaPhoneLegal(String str) throws PatternSyntaxException {
        String regExp = "^((13[0-9])|(15[^4])|(18[0-9])|(17[^2^5^9])|(14[1567])|(198)|(166))\\d{8}$";
        Pattern p = Pattern.compile(regExp);
        Matcher m = p.matcher(str);
        return m.matches();
    }

    //读取excel
    public static Workbook readExcel(String filePath){
        Workbook wb = null;
        if(filePath==null){
            return null;
        }
        String extString = filePath.substring(filePath.lastIndexOf("."));
        InputStream is = null;
        try {
            is = new FileInputStream(filePath);
            if(".xls".equals(extString)){
                return wb = new HSSFWorkbook(is);
            }else if(".xlsx".equals(extString)){
                return wb = new XSSFWorkbook(is);
            }else{
                return wb = null;
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return wb;
    }
    public static Object getCellFormatValue(Cell cell){
        Object cellValue = null;
        if(cell!=null){
            //判断cell类型
            switch(cell.getCellType()){
                case Cell.CELL_TYPE_NUMERIC:{
                    if (org.apache.poi.ss.usermodel.DateUtil.isCellDateFormatted(cell)) {
                        Date theDate = cell.getDateCellValue();
                        SimpleDateFormat dff = new SimpleDateFormat("yyyy/MM/dd");
                        cellValue = dff.format(theDate);
                    }else{
                        DecimalFormat df = new DecimalFormat("0");
                        cellValue = df.format(cell.getNumericCellValue());
                    }
                    break;
                }
                case Cell.CELL_TYPE_FORMULA:{
                    //判断cell是否为日期格式
                    if(DateUtil.isCellDateFormatted(cell)){
                        //转换为日期格式YYYY-mm-dd
                        cellValue = cell.getDateCellValue();
                    }else{
                        //数字
                        cellValue = String.valueOf(cell.getNumericCellValue());
                    }
                    break;
                }
                case Cell.CELL_TYPE_STRING:{
                    cellValue = cell.getRichStringCellValue().getString().trim();
                    break;
                }
                default:
                    cellValue = "";
            }
        }else{
            cellValue = "";
        }
        return cellValue;
    }

}