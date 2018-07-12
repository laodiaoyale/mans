package com.bns.api.user.service;

import com.bns.dao.user.ClTMessageDao;
import com.bns.dao.user.ClTSysMsgDao;
import com.bns.model.user.ClTMessageDTO;
import com.bns.model.user.ClTSysMsgDTO;
import com.bns.api.user.param.InnerMailDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.Date;

/**
 * 用户管理用户站内信的service类
 */
@Service
public class ClTMessageService implements Serializable {

    @Autowired
    private ClTMessageDao clTMessageDao;

    @Autowired
    private ClTSysMsgDao clTSysMsgDao;

    /**
     * 插入消息
     * @param
     * @return
     */
    public int insertInnerMail(InnerMailDTO innerMailDTO){
        //判断bisType是否是5（系统公告）
        if("5".equals(innerMailDTO.getBisType())){
            //如果是5,则插入的是系统通知
            ClTSysMsgDTO clTSysMsgDTO = new ClTSysMsgDTO();
            clTSysMsgDTO.setMsgTitle(innerMailDTO.getTitle());
            clTSysMsgDTO.setMsgContent(innerMailDTO.getContext());
            clTSysMsgDTO.setEffectiveTime(new Date());
            clTSysMsgDTO.setCreateTime(new Date());
            clTSysMsgDTO.setMsgType("1");
            return clTSysMsgDao.insertSelective(clTSysMsgDTO);
        }else{
            //否则是用户消息
            ClTMessageDTO clTMessageDTO = new ClTMessageDTO();
            clTMessageDTO.setMsgTitle(innerMailDTO.getTitle());//标题
            clTMessageDTO.setMsgContent(innerMailDTO.getContext());//内容
            clTMessageDTO.setBisType(innerMailDTO.getBisType());//业务类型
            clTMessageDTO.setCustCode(innerMailDTO.getCustCode());//接收人手机号
            clTMessageDTO.setPushType("1");//状态为推送
            clTMessageDTO.setCreateTime(new Date());
            clTMessageDTO.setUpdateTime(new Date());
            return clTMessageDao.insertSelective(clTMessageDTO);
        }
    }

}
