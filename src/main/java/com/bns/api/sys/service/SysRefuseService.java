package com.bns.api.sys.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.bns.api.sys.bo.RefuseRespBo;
import com.bns.api.sys.vo.SysPageVo;
import com.bns.api.sys.vo.SysRefuseAddVo;
import com.bns.dao.sys.SysRefuseDao;
import com.bns.model.sys.SysRefuseDTO;
import common.exception.BaseException;
import common.message.JsonResult;
import common.message.RespCodeCostant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
public class SysRefuseService {
    @Autowired
    private SysRefuseDao dao;


    /***
     * 查询所有 决绝代码 列表
     * @return
     */
    public PageInfo queryRefuseAll(SysPageVo pageVo) {
        PageHelper.startPage(pageVo.getPageNum(), pageVo.getPageSize());
        List<RefuseRespBo> list = dao.queryRefuseAll();
        return new PageInfo(list);
    }

    /***
     * 拒绝代码 联动
     * @param parentId
     * @return
     */
    public JsonResult queryRefuseByParent(Integer parentId) {
        JsonResult result = new JsonResult();
        List list = dao.queryRefuseByParent(parentId);
        result.setError(RespCodeCostant.OK);
        result.setBody(list);
        return result;
    }

    /***
     * 拒绝代码添加
     * @param addVo
     * @return
     */
    @Transactional(rollbackFor=Exception.class)
    public JsonResult refuseAdd(SysRefuseAddVo addVo) throws BaseException {
        JsonResult result = new JsonResult();
        List<SysRefuseDTO>  refuseDTOS = addVo.getRefuseDTOList();
        SysRefuseDTO dtoOld = new SysRefuseDTO();
        int parentId = 0;
        for (SysRefuseDTO dto : refuseDTOS){
            if("2".equals(dto.getFlag())){
                if (dto.getLevel()==2){
                    dtoOld = dao.selectByRefuseCode(dto.getRefuseCode());
                    if(dtoOld != null){
                        throw new BaseException("拒绝编码"+dto.getRefuseCode()+"已存在");
                    }
                    dao.insert(dto);
                }
            }else if ("1".equals(dto.getFlag())){
                if (dto.getLevel()==3){
                    dtoOld = dao.selectByRefuseCode(dto.getRefuseCode());
                    if(dtoOld != null){
                        throw new BaseException("拒绝编码"+dto.getRefuseCode()+"已存在");
                    }
                    dao.insert(dto);
                }
            }else if ("0".equals(dto.getFlag())){
                if (dto.getLevel()==2){
                    dtoOld = dao.selectByRefuseCode(dto.getRefuseCode());
                    if(dtoOld != null){
                        throw new BaseException("拒绝编码"+dto.getRefuseCode()+"已存在");
                    }
                    dao.insert(dto);
                    parentId=dto.getId();
                }
            }
        }

        for (SysRefuseDTO dto : refuseDTOS){
            if("0".equals(dto.getFlag())){
                if (dto.getLevel()==3){
                    dtoOld = dao.selectByRefuseCode(dto.getRefuseCode());
                    if(dtoOld != null){
                        throw new BaseException("拒绝编码"+dto.getRefuseCode()+"已存在");
                    }
                    dto.setParentId(parentId);
                    dao.insert(dto);
                }
            }
        }







        /*for(SysRefuseDTO dto : refuseDTOS){
            dto.setCreateUser(addVo.getCreateUser());
            if(dto.getLevel()==2){
                dtoOld = dao.selectByRefuseCode(dto.getRefuseCode());
                if(dtoOld != null){
                    throw new BaseException("拒绝编码"+dto.getRefuseCode()+"已存在");
                }
                dao.insert(dto);
                parentId = dto.getId();
            }
        }
        for(SysRefuseDTO dto : refuseDTOS){
            dto.setCreateUser(addVo.getCreateUser());
            if(dto.getLevel()==3){
                if(dto.getRefuseCode()!=null&&!"".equals(dto.getRefuseCode())&&dto.getRefuseDays()!=null&&dto.getRefuseDays()!=0){
                    if(dto.getParentId()==null){
                        dto.setParentId(parentId);
                    }
                    dao.insert(dto);
                }else {
                    throw new BaseException("三级代码参数异常:"+ JSONObject.toJSONString(dto));
                }
            }
        }*/
        result.setError(RespCodeCostant.OK);
        result.setBody(new HashMap<>());
        return result;
    }

    /***
     * OK
     * 拒绝代码 停用
     * @return
     * @throws Exception
     */
    public JsonResult refuseLose(SysRefuseAddVo addVo) throws BaseException {
        JsonResult result = new JsonResult();
        SysRefuseDTO dto = new SysRefuseDTO();
        dto.setValidateState(addVo.getStatus());
        dto.setId(addVo.getId());
        dto.setUpdateUser(addVo.getUpdateUser());
        int num = dao.updateByPrimaryKey(dto);
        if(num>0)
        {
            result.setError(RespCodeCostant.OK);
            result.setBody(new HashMap<>());
            return result;
        }
        throw new BaseException("修改失败");
    }
}
