package com.bns.api.sys.service;

import com.bns.api.sys.bo.MenuRespBo;
import com.bns.dao.sys.SysEnterpriseDao;
import com.bns.dao.sys.SysMenuDao;
import com.bns.dao.sys.SysUserDao;
import com.bns.model.sys.SysResourceRoleDTO;
import com.bns.model.sys.SysRoleDTO;
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
        List<SysRoleDTO> roleList = sysEnterpriseDao.queryEnterprise();
        jsonResult.setBody(roleList);
        jsonResult.setError(RespCodeCostant.OK);
        return jsonResult;
    }

}
