package common;

import java.io.*;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

import com.bns.model.user.ClTManagerInfoDTO;
import common.util.StringUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ReadExcel {

    public static void main(String[] args) {
        Workbook wb =null;
        Sheet sheet = null;
        Row row = null;
        List<ClTManagerInfoDTO> list = null;
        String cellData = null;
        String filePath = "D:\\韦星喜_O2O名单变更【20180709】(修改后)v1.0.xlsx";
        String columns[] = {"name","age","score"};
        wb = readExcel(filePath);

        //设置背景色
        CellStyle cellStyle = wb.createCellStyle();
        cellStyle.setFillForegroundColor(IndexedColors.RED.getIndex());
        cellStyle.setFillPattern(CellStyle.SOLID_FOREGROUND);
        if(wb != null){
            //用来存放表中数据
            list = new ArrayList<ClTManagerInfoDTO>();
            //获取第一个sheet
            sheet = wb.getSheetAt(0);
            //获取最大行数
            int rownum = sheet.getPhysicalNumberOfRows();
            for (int i = 1; i<rownum; i++) {
                ClTManagerInfoDTO info = new ClTManagerInfoDTO();
                row = sheet.getRow(i);
                if(row !=null){
                    info.setOneDepartment((String) getCellFormatValue(row.getCell(0)));
                    info.setTwoDepartment((String) getCellFormatValue(row.getCell(1)));
                    info.setThreeDepartment((String) getCellFormatValue(row.getCell(2)));
                    info.setFourDepartment((String) getCellFormatValue(row.getCell(3)));
                    info.setFiveDepartment((String) getCellFormatValue(row.getCell(4)));
                    info.setStoreLevel((String) getCellFormatValue(row.getCell(5)));
                    String oaNumber = (String) getCellFormatValue(row.getCell(6));
                    if(StringUtil.isBlank(oaNumber)||oaNumber.length()!=8) {
                        row.getCell(6).setCellStyle(cellStyle);
                    }
                    info.setOaWorkNumber(oaNumber);
                    info.setSuperior((String) getCellFormatValue(row.getCell(7)));
                    info.setName((String) getCellFormatValue(row.getCell(8)));
                    info.setSex((String) getCellFormatValue(row.getCell(9)));
                    String idCard = (String) getCellFormatValue(row.getCell(10));
                    if(StringUtil.isBlank(idCard)||idCard.length()!=18) {
                        row.getCell(10).setCellStyle(cellStyle);
                    }
                    info.setIdCardNum(idCard);
                    info.setEmail((String) getCellFormatValue(row.getCell(11)));
                    String mobile = (String) getCellFormatValue(row.getCell(12));
                    if(StringUtil.isBlank(mobile)||!isChinaPhoneLegal(mobile)) {
                        row.getCell(12).setCellStyle(cellStyle);
                    }
                    info.setMobile(mobile);
                    info.setStaffStatus((String) getCellFormatValue(row.getCell(13)));
                    info.setDateOfEntry((String) getCellFormatValue(row.getCell(14)));
                    info.setLeaveDate((String) getCellFormatValue(row.getCell(15)));
                    info.setImportTime((String) getCellFormatValue(row.getCell(16)));
                    info.setPost((String) getCellFormatValue(row.getCell(17)));
                    info.setOrCode((String) getCellFormatValue(row.getCell(18)));
                    info.setExpiredTime((String) getCellFormatValue(row.getCell(19)));
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