package com.bns.api.sys.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.bns.api.constants.CashloanConstants;
import com.bns.api.ddenum.FeedbackEnum;
import com.bns.api.user.bo.BackCommentsRespBO;
import com.bns.api.user.param.BackCommentParam;
import com.bns.dao.user.ClTBackCommentsDao;
import com.bns.dao.user.ClTBackCommentsReplyDao;
import com.bns.dao.user.ClTBackCommentsUrlDao;
import com.bns.model.user.ClTBackCommentsReplyDTO;
import common.exception.BaseException;
import common.message.JsonResult;
import common.message.RespCodeCostant;
import common.util.ExcelHelper;
import common.util.ListPageUtil;
import common.util.excel.SelectValue;
import org.apache.commons.lang3.time.StopWatch;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.util.*;

@Service
public class BackCommentsService {
    org.apache.log4j.Logger logger= org.apache.log4j.Logger.getLogger(BackCommentsService.class);
    @Autowired
    private ClTBackCommentsDao dao;

    @Autowired
    private ClTBackCommentsReplyDao replyDao;

    @Autowired
    private ClTBackCommentsUrlDao urlDao;
    public JsonResult excelExport(BackCommentParam param, HttpServletResponse response) throws BaseException {
        if(param.getType() != null && !param.getType().equals("")){
            param.setType(FeedbackEnum.getFeedbackEnumByCode(Integer.valueOf(param.getType())).getFeedbackmessage());
        }
        List<BackCommentsRespBO> data = dao.queryListExcel(param);
        String[] headers = param.getHeaders().split(",");
        String[] fileds = param.getFileds().split(",");
        Map<String, SelectValue[]> comboxColumn = new HashMap();

        List<String> attributesOfDateType = new ArrayList();
        attributesOfDateType.add("createTime");
        logger.debug("##################导出EXCEl##########################");
        logger.debug("标题：" + Arrays.toString(headers));
        logger.debug("字段：" + Arrays.toString(fileds));
        try {
            int totalRows = data.size();
            SXSSFWorkbook wb = new SXSSFWorkbook(10000);
            StopWatch watch = new StopWatch();
            String exportExcelFile = param.getExportPath() + param.getFileName() + ".xlsx";
            logger.debug("excel全部导出，共：" + data.size() + " 条数据");
            int totalPage = totalRows / CashloanConstants.SerialNumber.bigPageSize;
            if (totalRows % CashloanConstants.SerialNumber.maxRowsNum > 0 || totalRows < 1) {
                ++totalPage;
            }
            logger.debug("数据分页，共：" + totalPage + "页");
            watch.start();
            Map mapList = new HashMap();
            int j;
            for(j = 1; j <= totalPage; ++j) {
                logger.debug("数据查询，第 " + j + " 页");
                if(data.size() ==0){
                    mapList.put(j,data);
                }else {
                    ListPageUtil<BackCommentsRespBO> listPageUtil = new ListPageUtil<BackCommentsRespBO>(data,j, CashloanConstants.SerialNumber.bigPageSize);
                    List<BackCommentsRespBO> pagedList = listPageUtil.getPagedList();
                    mapList.put(j,pagedList);
                }

            }
            for(j = 1; j < mapList.size() + 1; ++j) {
                List<BackCommentsRespBO> tempList = ( List<BackCommentsRespBO>)mapList.get(j);
                wb = ExcelHelper.ExcelHelper("意见反馈", headers, null, tempList, fileds, attributesOfDateType, comboxColumn, wb, j,"true");
            }
            watch.stop();
            logger.debug("数据处理完成,所耗时间：" + watch.getTime());
            if (totalRows > CashloanConstants.SerialNumber.maxRowsNum) {
                logger.debug("数据过大，写入文件：" + exportExcelFile);
                FileOutputStream out = new FileOutputStream(exportExcelFile);
                wb.write(out);
                out.close();
                wb.dispose();
                logger.debug("读取Excel文件放入response");
                ExcelHelper.downloadFile(new File(exportExcelFile), response);
            } else {
                logger.debug("把excel对象放入response");
                String strFileName="客户反馈";
                strFileName=new String(strFileName.getBytes("utf-8"),"iso8859-1");
                ExcelHelper.write(wb, strFileName, response);
            }
        } catch (Exception var45) {
            logger.error("导出EXCEL异常", var45);
            throw new BaseException(var45.getMessage());
        }
        return null;
    }

    /***
     * 查询列表 分页
     * @param param
     * @return
     */
    public PageInfo queryListByPage(BackCommentParam param) {
        if(param.getType() != null && !param.getType().equals("")){
            param.setType(FeedbackEnum.getFeedbackEnumByCode(Integer.valueOf(param.getType())).getFeedbackmessage());
        }
        PageHelper.startPage(param.getPageNum(), param.getPageSize());
        List resultList = dao.queryListByPage(param);
        return new PageInfo(resultList);
    }

    /***
     * 意见反馈 处理意见添加
     * @param dto
     * @return
     * @throws BaseException
     */
    public JsonResult backCommentsReplyAdd(ClTBackCommentsReplyDTO dto) {
        JsonResult json = new JsonResult();
        ClTBackCommentsReplyDTO clTBackCommentsReplyDTO = replyDao.selectByCommentId(dto.getCommentsId());
        if(clTBackCommentsReplyDTO!=null){
            json.setError(RespCodeCostant.REPLY_FAIL);
            json.setBody(new HashMap<>());
            return json;
        }
        replyDao.insert(dto);
        replyDao.updateStatusByCommentId(dto);
        json.setError(RespCodeCostant.OK);
        json.setBody(new HashMap<>());
        return json;
    }

    /***
     * 意见反馈 查看内容（图片、处理意见）
     * @param id
     * @return
     * @throws BaseException
     */
    public JsonResult queryDetailById(Integer id) throws BaseException {
        JsonResult json = new JsonResult();
        BackCommentsRespBO clTBackCommentsDTO = dao.selectByPrimaryKey(Long.valueOf(id+""));
        if(clTBackCommentsDTO == null){
            throw new BaseException("意见不存在");
        }
        List image = urlDao.selectImageByCommentId(String.valueOf(id));
        ClTBackCommentsReplyDTO dto  = replyDao.selectByCommentId(id);
        Map result = new HashMap();
        result.put("backComments",clTBackCommentsDTO);
        result.put("image",image);
        result.put("reply", dto);
        json.setBody(result);
        json.setError(RespCodeCostant.OK);
        return json;
    }
}
