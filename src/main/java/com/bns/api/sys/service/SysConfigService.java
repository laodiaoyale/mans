package com.bns.api.sys.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.bns.api.ddenum.CancelLoanStatusEnum;
import com.bns.api.ddenum.FeedbackEnum;
import com.bns.api.sys.vo.CancelLoanStatusVo;
import com.bns.api.sys.vo.FeedbackVo;
import com.bns.api.sys.vo.SysConfigVo;
import com.bns.dao.sys.SysConfigDao;
import com.bns.model.sys.SysConfigDTO;
import common.message.JsonResult;
import common.message.RespCodeCostant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 用于管理系统配置的service层
 * @Author xiangzebing
 */
@Service
public class SysConfigService {
    @Autowired
    private SysConfigDao sysConfigDao;

    /**
     * 显示系统配置信息
     * @param sysConfigVo
     * @return
     */
    public PageInfo selectAll(SysConfigVo sysConfigVo){
        PageHelper.startPage(sysConfigVo.getPageNum(), sysConfigVo.getPageSize());
        List<SysConfigDTO> sysConfigList = sysConfigDao.selectAll(sysConfigVo);
        return new PageInfo(sysConfigList);
    }

    /**
     * 修改指定系统配置
     * @param sysConfigVo
     * @return
     */
    @Transactional(rollbackFor=Exception.class)
    public int updateById(SysConfigVo sysConfigVo){
//        JYJedisCache.set(sysConfigVo.getConfigCode(),sysConfigVo.getConfigValue());
        //修改数据库里面的值
        int num = sysConfigDao.updateById(sysConfigVo);
        return num;
    }

    /**
     * 根据code查询value值
     * @param configCode
     * @return
     */
    public String queryValueByCode(String configCode){
        return sysConfigDao.selectByCode(configCode);
    }

    /**
     * 添加系统配置差数
     * @param sysConfigVo
     * @return
     */
    @Transactional(rollbackFor=Exception.class)
    public int insert(SysConfigVo sysConfigVo){
        //添加到redis中
//        JYJedisCache.set(sysConfigVo.getConfigCode(),sysConfigVo.getConfigValue());
        //添加到数据库中
        return sysConfigDao.insertSelective(sysConfigVo);
    }

    /**
     * 一键刷新redis中的系统配置
     * @return
     */
    @Transactional(rollbackFor=Exception.class)
    public int updateByAll(){
        //获取数据库中所有的配置信息
        int num = 1;
        List<SysConfigDTO> sysConfigList = sysConfigDao.selectAll(new SysConfigVo());
        for (int i = 0; i < sysConfigList.size(); i++) {
            //将数据批量存入redis中
//            JYJedisCache.set(sysConfigList.get(i).getConfigCode(),sysConfigList.get(i).getConfigValue());
        }
        return num;
    }

    /***
     * 业务字典查询
     * @param datatype
     * @return
     */
    public JsonResult judgmentRequest(String datatype) throws Exception {
        JsonResult json = new JsonResult();
        Map<String, List> map=new HashMap<>();
        //获取全部数据
        String[] type = datatype.split(",");
        for(String t : type)
        {
            if(t.equals("0")){//客户反馈
                List feedbackVoList=feedbackdataDiction();
                map.put("feedbackVoList",feedbackVoList);
                //获取联系人2与本人关系
            }
            if(t.equals("1")) {
                List cancelLoanStatusList = cancelLoanStatusdataDiction();
                map.put("cancelLoanStatusList", cancelLoanStatusList);
            }
        }
        json.setError(RespCodeCostant.OK);
        json.setBody(map);
        return json;
    }
    /**
     *意见反馈
     * @throws Exception
     */
    public List  feedbackdataDiction() throws Exception {
        ArrayList<FeedbackVo> feedbackVoList=new ArrayList<>();
        FeedbackEnum[] values=FeedbackEnum.values();
        for (int i=0;i<values.length;i++){
            FeedbackVo feedbackVo=new FeedbackVo(values[i].getFeedbackId(), values[i].getFeedbackmessage());
            feedbackVoList.add(feedbackVo);
        }
        return feedbackVoList;
    }

    public JsonResult appDataDictionary(String datatype) throws Exception {
        JsonResult jsonResult=new JsonResult();
        jsonResult.setError(RespCodeCostant.OK);
        Map<String, List> map=new HashMap<>();
        //获取全部数据
        String[] type = datatype.split(",");
        for(String t : type)
        {
            if(t.equals("1")){
                List cancelLoanStatusList=cancelLoanStatusdataDiction();
                map.put("cancelLoanStatusList",cancelLoanStatusList);
                //订单状态
            }
        }

        jsonResult.setBody(map);
        return jsonResult;
    }

    /**
     * 取消订单原因
     * @throws Exception
     */
    public List cancelLoanStatusdataDiction() throws Exception {
        ArrayList<CancelLoanStatusVo> cancelLoanStatusList=new ArrayList<>();
        CancelLoanStatusEnum[] values= CancelLoanStatusEnum.values();
        for (int i=0;i<values.length;i++){
            CancelLoanStatusVo cancelLoanStatusVo=new CancelLoanStatusVo(values[i].getStatusCode(), values[i].getStatusValue());
            cancelLoanStatusList.add(cancelLoanStatusVo);
        }
        return cancelLoanStatusList;
    }
}
