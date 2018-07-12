package com.bns.api.sys.service;

import com.bns.api.sys.vo.SysRoleVo;
import com.bns.dao.sys.SysAclDao;
import com.bns.dao.sys.SysRoleDao;
import com.bns.model.sys.SysResourceRoleDTO;
import com.bns.model.sys.SysRoleDTO;
import common.exception.BaseException;
import common.message.JsonResult;
import common.message.RespCodeCostant;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class SysRoleService {
    @Autowired
    private SysRoleDao sysRoleDao;

    @Autowired
    private SysAclDao sysAclDao;
    @Autowired
    private SysResourceService sysResourceService;

    public SysRoleDTO queryRoleByUserId(String userNo) throws BaseException {
        Map param = new HashMap<>();
        param.put("userNo",userNo);
        SysRoleDTO role = sysRoleDao.selectRoleByParam(param);
        if(role == null){
            throw new BaseException("用户角色不存在");
        }
        return role;
    }

    /**
     * OK
     * 查询角色
     * @param
     * @return
     */
    public JsonResult selectRole(){
        JsonResult jsonResult=new JsonResult();
        List selectRole=sysRoleDao.selectRole(new HashMap());
        jsonResult.setError(RespCodeCostant.OK);
        jsonResult.setBody(selectRole);
        return jsonResult;
    }

    /***
     * 查詢角色列表
     * @return
     */
    public JsonResult queryRoleList() {
        JsonResult jsonResult=new JsonResult();
        List<SysRoleDTO> roleList = sysRoleDao.queryRoleList();//.selectRole(param);
        List result = new ArrayList();

        for(SysRoleDTO sysRoleDTO : roleList){
            List<SysResourceRoleDTO> urlList = sysResourceService.getSysResourceUrl(sysRoleDTO.getRoleCode());
            StringBuffer resourceName = new StringBuffer();
            StringBuffer resourceIds = new StringBuffer();
            for(SysResourceRoleDTO dto: urlList)
            {
                resourceName.append(dto.getResourceName()+",");
                resourceIds.append(dto.getResourceId()+",");
            }
            Map role = new HashMap();
            role.put("resourceName",resourceName.length()==0 ? "":resourceName.substring(0,resourceName.length()-1));
            role.put("resourceIds",resourceIds.length()==0 ? "":resourceIds.substring(0,resourceIds.length()-1));
            role.put("id",sysRoleDTO.getId());
            role.put("roleName",sysRoleDTO.getRoleName());
            role.put("roleCode",sysRoleDTO.getRoleCode());
            role.put("createTime",sysRoleDTO.getCreateTime());
            result.add(role);
        }
        jsonResult.setBody(result);
        jsonResult.setError(RespCodeCostant.OK);
        return jsonResult;
    }

    /***
     * OK
     * 新增角色
     * @param sysRoleVo
     * @return
     */
    @Transactional(rollbackFor=Exception.class)
    public JsonResult addRole(SysRoleVo sysRoleVo) throws BaseException {
        JsonResult jsonResult=new JsonResult();
        Map param = new HashMap();
        param.put("roleCode",sysRoleVo.getRoleCode());
        SysRoleDTO sysRoleDTO = sysRoleDao.queryRoleDTOByParam(param);
        if(sysRoleDTO != null){
            throw new BaseException("角色编码已存在");
        }
        SysRoleDTO sysRoleDTO1 = new SysRoleDTO();
        BeanUtils.copyProperties(sysRoleVo,sysRoleDTO1);
        sysRoleDTO1.setRoleType("0");
        int num = sysRoleDao.insertSelective(sysRoleDTO1);
        if(num>0){
            String[] resourceId = sysRoleVo.getResourceIds().split(",");
            if(resourceId.length>0){
                List<String> stringB = Arrays.asList(resourceId);
                Map sysacl = new HashMap();
                sysacl.put("roleId",sysRoleDTO1.getId());
                sysacl.put("resourceList",stringB);
                sysacl.put("createUser",sysRoleVo.getCreateUser());
                sysAclDao.insertMore(sysacl);
            }
            jsonResult.setBody(new HashMap<>());
            jsonResult.setError(RespCodeCostant.OK);
            return jsonResult;
        }
        throw new BaseException("添加失败");
    }

    /***
     * 角色修改
     * @param sysRoleVo
     * @return
     */
    public JsonResult updateRole(SysRoleVo sysRoleVo) throws BaseException {
        JsonResult jsonResult=new JsonResult();
        getRoleByID(sysRoleVo.getId());
        SysRoleDTO sysRoleDTO1 = new SysRoleDTO();
        BeanUtils.copyProperties(sysRoleVo,sysRoleDTO1);
        int num = sysRoleDao.updateByPrimaryKey(sysRoleDTO1);
        if(num>0){
            sysAclDao.deleteByParam(sysRoleVo.getId());
            String[] resourceId = sysRoleVo.getResourceIds().split(",");
            if(resourceId.length>0){
                List<String> stringB = Arrays.asList(resourceId);
                Map sysacl = new HashMap();
                sysacl.put("roleId",sysRoleDTO1.getId());
                sysacl.put("resourceList",stringB);
                sysacl.put("updateUser",sysRoleVo.getUpdateUser());
                sysAclDao.insertMore(sysacl);
            }
            jsonResult.setBody(new HashMap<>());
            jsonResult.setError(RespCodeCostant.OK);
            return jsonResult;
        }
        throw new BaseException("修改失败");
    }

    /***
     * 根据id 查询角色是否存在
     *
     */
    public SysRoleDTO getRoleByID(Long id) throws BaseException {
        Map param = new HashMap();
        param.put("id",id);
        SysRoleDTO sysRoleDTO = sysRoleDao.queryRoleDTOByParam(param);
        if(sysRoleDTO == null){
            throw new BaseException("角色不存在");
        }
        return sysRoleDTO;
    }
    /***
     * 角色删除
     * @param sysRoleVo
     * @return
     */
    public JsonResult delRole(SysRoleVo sysRoleVo) throws BaseException {
        JsonResult jsonResult=new JsonResult();
        SysRoleDTO sysRoleDTO = getRoleByID(sysRoleVo.getId());
        SysRoleDTO sysRoleDTO1 = new SysRoleDTO();
        BeanUtils.copyProperties(sysRoleVo,sysRoleDTO1);
        sysRoleDTO1.setValidateState("0");
        List<Map<String, String>> mapList = sysRoleDao.selectUserByRole(sysRoleDTO);
        if(mapList.size()>0){
            jsonResult.setError(RespCodeCostant.ROLE_DEL_FAIL);
            jsonResult.setBody(new HashMap<>());
            return jsonResult;
        }
        int num = sysRoleDao.updateByPrimaryKey(sysRoleDTO1);
        if(num==0){
            throw new BaseException("角色修改失败");
        }
        jsonResult.setError(RespCodeCostant.OK);
        jsonResult.setBody(new HashMap<>());
        return jsonResult;
    }
}
