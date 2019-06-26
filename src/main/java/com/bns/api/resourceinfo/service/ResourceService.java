package com.bns.api.resourceinfo.service;

import com.bns.api.resourceinfo.param.ResourceReqParam;
import com.bns.dao.resourceinfo.ResourceInfoDao;
import com.bns.model.resource.ResourceInfo;
import com.bns.model.user.BnsUser;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import common.exception.BaseException;
import common.message.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author zhaolei
 * @date 2017年11月12日14:35:06
 */
@Service
public class ResourceService extends BaseController{

    @Autowired
    private ResourceInfoDao resourceInfoDao ;

    /**
     * 客户信息展示
     * @param resourceReqParam
     * @return
     */
    public PageInfo pageLite(ResourceReqParam resourceReqParam){
        PageHelper.startPage(resourceReqParam.getPageNum(), resourceReqParam.getPageSize());
        List<BnsUser> pageList = resourceInfoDao.findPaging(resourceReqParam);
        return  new PageInfo(pageList);
    }
    /**
     * @param id
     * @return
     * 删除
     */
    public void delete(Integer id)throws BaseException {
        ResourceInfo info = resourceInfoDao.selectByPrimaryKey(id);//查询员工
        if(info ==null){
            throw new BaseException("用户信息不存在");
        }
        info.setDelFlag((byte) 0);
        int num = resourceInfoDao.updateByPrimaryKey(info);
        if(num==0){
            throw new BaseException("信息删除失败");
        }
    }

    /**
     * 新增或修改用户信息
     * @param info
     */
    public void addOrUpdate(ResourceInfo info) throws BaseException{
        //判断身份证号查询是否有录入
        ResourceReqParam resourceReqParam = new ResourceReqParam();
        resourceReqParam.setNotThisId(info.getId());
        resourceReqParam.setIdCard(info.getIdCard());
        List<BnsUser> bnsUsers = resourceInfoDao.findPaging(resourceReqParam);
        if(bnsUsers!=null&&bnsUsers.size()>0){
            throw  new BaseException("该身份证号已存在");
        }
        if(info.getId()==null||info.getId()==0){
            resourceInfoDao.insert(info);
        }else{
            info.setDelFlag((byte)1);
            resourceInfoDao.updateByPrimaryKey(info);
        }
    }

    public List<String> getCompany(Integer type) {
        List<String> list = resourceInfoDao.getCompany(type);
        return list;
    }

    public List<String> getRegion(Integer type) {
        List<String> list = resourceInfoDao.getRegion(type);
        return list;
    }


}
