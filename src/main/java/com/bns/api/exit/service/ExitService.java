package com.bns.api.exit.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.bns.api.user.param.UserReqParam;
import com.bns.dao.exit.ExitDao;
import com.bns.model.user.ClWWechatRecord;
import com.bns.model.user.ClWWechatUserDTO;
import common.message.JsonResult;
import common.message.RespCodeCostant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExitService {
    @Autowired
    private ExitDao exitDao;
    public JsonResult deleteToken(String token){
        JsonResult jsonResult=new JsonResult();
        //根据token获取openid
//        String openid= JYJedisCache.get(token);
//        JYJedisCache.del(openid);
//        JYJedisCache.del(token);
        jsonResult.setError(RespCodeCostant.OK);
        return jsonResult;
    }
    public PageInfo showUser(UserReqParam userReqParam){
        PageHelper.startPage(userReqParam.getPageNum(), userReqParam.getPageSize());
        ClWWechatRecord clWWechatRecord=new ClWWechatRecord();
        List<ClWWechatRecord> pageList = exitDao.findUser(clWWechatRecord);
        return new PageInfo(pageList);
    }
    public JsonResult insertUser(ClWWechatRecord clWWechatRecord,ClWWechatUserDTO clWWechatUserDTO){
        JsonResult jsonResult=new JsonResult();
        clWWechatUserDTO.setHeadimgurl(clWWechatRecord.getHeadimgurl());
        clWWechatUserDTO.setNickName(clWWechatRecord.getNickname());
        clWWechatUserDTO.setOpenid(clWWechatRecord.getOpenid());
        clWWechatUserDTO.setUnionid(clWWechatRecord.getUnionid());
        int num=exitDao.insertUser(clWWechatUserDTO);
        if (num!=0){
            clWWechatRecord.setTypes(1);
            exitDao.updateType(clWWechatRecord);
        }
        return jsonResult;
    }

}
