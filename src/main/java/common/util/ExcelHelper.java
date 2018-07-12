package common.util;

import common.util.excel.MapUtil;
import common.util.excel.SelectValue;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddressList;
import org.apache.poi.xssf.streaming.SXSSFCell;
import org.apache.poi.xssf.streaming.SXSSFRow;
import org.apache.poi.xssf.streaming.SXSSFSheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFDataValidation;
import org.apache.poi.xssf.usermodel.XSSFDataValidationConstraint;
import org.apache.poi.xssf.usermodel.XSSFRichTextString;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

public class ExcelHelper {

    /**
      * @Description:    导出excel 表格 分页
      * @Author:         jinFeng.Wu
      * @CreateDate:     2018/3/26 0026 13:38
      * @UpdateUser:     dell
      * @UpdateDate:     2018/3/26 0026 13:38
      * @UpdateRemark:   The modified content
      * @Version:        1.0
      * @param sheetName 文件名称
      * @param headers   文件头
     *  @param dataset 文件数据
     *  @param propertiesName 文件数据字段名称
     * @param pageNum sheet页码
      **/
    public static SXSSFWorkbook ExcelHelper(String sheetName, String[] headers, String[] types, List dataset, String[] propertiesName, List attributesOfDateType, Map comboxColumn, SXSSFWorkbook workbook ,int pageNum, String isTime) throws Exception {
        String msg;
        try {
            SXSSFSheet sheet = null;
            msg = null;
            /**
             * 设置样式
             */
            XSSFCellStyle XSSFCellStyle = (XSSFCellStyle)createHeadStyle(workbook);
            XSSFCellStyle cellStyle = (XSSFCellStyle)createCellStyle(workbook);
            XSSFCellStyle cellDateStyle = (XSSFCellStyle)createDateCellStyle(workbook);
            XSSFCellStyle cellMoneyStyle = (XSSFCellStyle)createMoneyCellStyle(workbook);
            int i;
            int j;
            int index = 0;
            DataValidationHelper dataValidationHelper;
            SXSSFRow row;
            if (pageNum == 1) {
                sheet = (SXSSFSheet)createSheet(workbook, sheetName, headers);
                row = (SXSSFRow)sheet.createRow(0);
                for(i = 0; i < headers.length; ++i) {
                    Cell cell = row.createCell(i);
                    cell.setCellType(1);
                    cell.setCellValue(new XSSFRichTextString(headers[i]));
                    cell.setCellStyle(XSSFCellStyle);
                    if (comboxColumn != null && comboxColumn.containsKey(propertiesName[i])) {
                        SelectValue[] selectValue = (SelectValue[])((SelectValue[])comboxColumn.get(propertiesName[i]));
                        String[] combox = new String[selectValue.length];
                        StringBuilder builder = new StringBuilder();
                        builder.append(headers[i] + ";");
                        for(j = 0; j < selectValue.length; ++j) {
                            if (selectValue[j].getValue() != null && selectValue[j].getValue().length() != 0) {
                                builder.append(selectValue[j].getText() + ";");
                            }
                        }
                        String bldStr = builder.toString();
                        combox = bldStr.substring(0, bldStr.length() - 1).split(";");
                        dataValidationHelper = sheet.getDataValidationHelper();
                        XSSFDataValidationConstraint constraint = new XSSFDataValidationConstraint(combox);
                        CellRangeAddressList regions = new CellRangeAddressList(cell.getRowIndex(), sheet.getLastRowNum(), cell.getColumnIndex(), cell.getColumnIndex());
                        DataValidation dataValidation = dataValidationHelper.createValidation(constraint, regions);
                        if (dataValidation instanceof XSSFDataValidation) {
                            dataValidation.setSuppressDropDownArrow(true);
                            dataValidation.setShowErrorBox(true);
                        } else {
                            dataValidation.setSuppressDropDownArrow(false);
                        }
                        sheet.addValidationData(dataValidation);
                    }
                }
                index = 1;
            }else {
                sheet = (SXSSFSheet)workbook.getSheet(sheetName);
                index = sheet.getLastRowNum() + 1;
            }

            /**
             * 数据解析
             */
            for(Iterator it = dataset.iterator(); it.hasNext(); ++index) {
                row = (SXSSFRow)sheet.createRow(index);
                Map t = MapUtil.beanToMap(it.next());//new HashMap<>();
                for(j = 0; j < propertiesName.length; ++j) {
                    String fieldName = propertiesName[j];
                    SXSSFCell cell = (SXSSFCell)row.createCell(j);
                    cell.setCellStyle(cellStyle);
                    for(int k = 0; k < attributesOfDateType.size(); ++k) {
                        if (fieldName != null && attributesOfDateType.get(k) != null && fieldName.equalsIgnoreCase(attributesOfDateType.get(k).toString())) {
                            cell.setCellType(0);
                            cell.setCellStyle(cellDateStyle);
                        }
                    }
                    if ("rowNum".equals(fieldName)) {
                        cell.setCellValue((double)index);
                    } else {
                        Object objValue = t.get(fieldName);
                        if (objValue != null) {
                            if (DateUtil.isCellDateFormatted(cell)) {
                                dataValidationHelper = null;
                                SimpleDateFormat format;
                                if ("true".equals(isTime)) {
                                    format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                                } else {
                                    format = new SimpleDateFormat("yyyy-MM-dd");
                                }
                                try {
                                    Date dat = new Date(Long.parseLong(objValue.toString()));
                                    GregorianCalendar gc = new GregorianCalendar();
                                    gc.setTime(dat);
                                    cell.setCellValue(format.format(gc.getTime()));
                                } catch (Exception var28) {
                                    try {
                                        Date dat = new Date(objValue.toString());
                                        GregorianCalendar gc = new GregorianCalendar();
                                        gc.setTime(dat);
                                        cell.setCellValue(format.format(gc.getTime()));
                                    } catch (Exception ex) {
                                        cell.setCellType(1);
                                        cell.setCellValue(objValue.toString());
                                    }
                                }
                            } else {
                                cell.setCellType(1);
                                cell.setCellValue(objValue.toString());
                            }
                        } else if (objValue == null) {
                            cell.setCellType(0);
                            cell.setCellStyle(cellMoneyStyle);
                            cell.setCellValue("");
                        } else {
                            cell.setCellValue("");
                        }
                    }
                }
            }
            return workbook;
        } catch (Exception ex) {
            msg = ex.getMessage();
            if (msg == null) {
                msg = "null";
            }
            throw new Exception(msg);
        }
    }

    protected Sheet createSheet(Workbook workbook, String sheetName, String[] headers) {
        Sheet sheet = workbook.createSheet(sheetName);
        sheet.createFreezePane(0, 1);

        for(int i = 0; i < headers.length; ++i) {
            sheet.setColumnWidth(i, 5000);
        }

        return sheet;
    }

    protected static Sheet createSheet(SXSSFWorkbook workbook, String sheetName, String[] headers) {
        Sheet sheet = workbook.createSheet(sheetName);
        sheet.createFreezePane(0, 1);

        for(int i = 0; i < headers.length; ++i) {
            sheet.setColumnWidth(i, 5000);
        }

        return sheet;
    }

    public static CellStyle createHeadStyle(Workbook workbook) {
        Font headfont = workbook.createFont();
        headfont.setFontName("宋体");
        headfont.setFontHeightInPoints((short)12);
        headfont.setBoldweight((short)700);
        CellStyle headstyle = workbook.createCellStyle();
        headstyle.setFont(headfont);
        headstyle.setAlignment((short)2);
        return headstyle;
    }

    public static CellStyle createCellStyle(Workbook workbook) {
        Font font = workbook.createFont();
        font.setFontName("宋体");
        font.setFontHeightInPoints((short)12);
        CellStyle style = workbook.createCellStyle();
        style.setFont(font);
        style.setAlignment((short)2);
        return style;
    }

    private static CellStyle createDateCellStyle(Workbook workbook) {
        Font font = workbook.createFont();
        font.setFontName("宋体");
        font.setFontHeightInPoints((short)12);
        CellStyle dateStyle = workbook.createCellStyle();
        dateStyle.setFont(font);
        dateStyle.setAlignment((short)2);
        dateStyle.setDataFormat(workbook.createDataFormat().getFormat("yyyy-MM-dd"));
        return dateStyle;
    }

    private static CellStyle createMoneyCellStyle(Workbook workbook) {
        CellStyle moneyStyle = workbook.createCellStyle();
        moneyStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("0.00"));
        moneyStyle.setAlignment((short)2);
        return moneyStyle;
    }

    public static HttpServletResponse downloadFile(File file, HttpServletResponse response) {
        InputStream fis = null;
        BufferedOutputStream toClient = null;

        try {
            fis = new BufferedInputStream(new FileInputStream(file.getPath()));
            byte[] buffer = new byte[fis.available()];
            fis.read(buffer);
            response.reset();
            toClient = new BufferedOutputStream(response.getOutputStream());
            response.setContentType("application/vnd.ms-excel");
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setCharacterEncoding("UTF-8");
            response.setHeader("content-disposition", "attachment;filename=" + new String(file.getName().getBytes("gb2312"), "ISO8859-1"));
            toClient.write(buffer);
            toClient.flush();
            toClient.close();
        } catch (IOException var18) {
            var18.printStackTrace();
        } finally {
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException var17) {
                    var17.printStackTrace();
                }
            }

            if (toClient != null) {
                try {
                    toClient.close();
                } catch (IOException var16) {
                    var16.printStackTrace();
                }
            }

            file.delete();
        }

        return response;
    }

    public static void write(SXSSFWorkbook xworkbook, String fileName, HttpServletResponse response) {
        try {
            response.setContentType("application/vnd.ms-excel");
            response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setCharacterEncoding("UTF-8");
            response.setHeader("content-disposition", "attachment;filename=" + fileName+ ".xlsx");
            xworkbook.write(response.getOutputStream());
            response.getOutputStream().flush();
            response.getOutputStream().close();
        } catch (UnsupportedEncodingException var5) {

        } catch (IOException var6) {

        }

    }
}
