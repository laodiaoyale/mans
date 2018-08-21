package com.bns.api.sys.service;

import com.bns.api.sys.bo.MenuRespBo;
import com.bns.api.sys.vo.SysEnterpriseVo;
import com.bns.api.sys.vo.SysRoleVo;
import com.bns.dao.sys.SysEnterpriseDao;
import com.bns.dao.sys.SysMenuDao;
import com.bns.dao.sys.SysUserDao;
import com.bns.model.sys.SysEnterpriseDTO;
import com.bns.model.sys.SysResourceRoleDTO;
import com.bns.model.sys.SysRoleDTO;
import com.bns.model.sys.SysUserDTO;
import com.bns.model.user.BnsUser;
import common.exception.BaseException;
import common.message.JsonResult;
import common.message.RespCodeCostant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

@Service
public class SysEnterpriseService {

    @Autowired
    private SysEnterpriseDao sysEnterpriseDao;

    public JsonResult queryEnterprise() throws Exception {
        JsonResult jsonResult=new JsonResult();
        List<SysEnterpriseDTO> roleList = sysEnterpriseDao.queryEnterprise();
        jsonResult.setBody(roleList);
        jsonResult.setError(RespCodeCostant.OK);
        return jsonResult;
    }

    public JsonResult addOrUpdate(SysEnterpriseDTO sysEnterpriseDTO) {
        JsonResult jsonResult=new JsonResult();
        jsonResult.setError(RespCodeCostant.OK);
        if(sysEnterpriseDTO.getId()==null||sysEnterpriseDTO.getId()==0){
            //估计身份证号查询是否有录入
            sysEnterpriseDao.insert(sysEnterpriseDTO);
        }else{
            sysEnterpriseDTO.setDelFlag((byte)1);
            sysEnterpriseDao.updateByPrimaryKey(sysEnterpriseDTO);
        }
        return jsonResult;
    }

    public void delEnterprise(Integer id) throws BaseException{
        SysEnterpriseDTO sysEnterpriseDTO = sysEnterpriseDao.selectByPrimaryKey(id);//查询员工
        if(sysEnterpriseDTO ==null){
            throw new BaseException("企业不存在");
        }
        sysEnterpriseDTO.setDelFlag((byte) 0);
        int num = sysEnterpriseDao.updateByPrimaryKey(sysEnterpriseDTO);
        if(num==0){
            throw new BaseException("企业删除失败");
        }
    }

    public List<SysEnterpriseVo> getEnterprise(SysUserDTO sysUserDTO) {
        List<SysEnterpriseVo> list= sysEnterpriseDao.queryAllEnterprise();
        return list;
    }
}
