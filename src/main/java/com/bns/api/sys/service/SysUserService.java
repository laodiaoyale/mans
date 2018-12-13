package com.bns.api.sys.service;

import com.bns.dao.sys.SysEnterpriseDao;
import com.bns.model.sys.*;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.bns.api.sys.bo.LoginRespBo;
import com.bns.api.sys.vo.LoginUserVO;
import com.bns.api.sys.vo.SysUserRegisterVO;
import com.bns.api.sys.vo.SysUserVo;
import com.bns.dao.sys.SysRoleDao;
import com.bns.dao.sys.SysRoleUserDao;
import com.bns.dao.sys.SysUserDao;
import common.exception.BaseException;
import common.message.JsonResult;
import common.message.RespCodeCostant;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Service
public class SysUserService {

    private final Logger logger = LogManager.getLogger(this.getClass());

    @Autowired
    private SysUserDao sysUserDao;
    @Autowired
    private SysRoleService sysRoleService;
    @Autowired
    private SysRoleUserDao sysRoleUserDao;
    @Autowired
    private SysEnterpriseDao sysEnterpriseDao;


    /***
     * 登录
     * @param loginUserVO
     * @return
     * @throws Exception
     */
    public JsonResult sysLogin(LoginUserVO loginUserVO) throws Exception {
        JsonResult jsonResult = new JsonResult();
        if (StringUtils.isEmpty(loginUserVO.getUserNo())) {
            throw new BaseException("账号不能为空");
        } else if (StringUtils.isEmpty(loginUserVO.getPassword())) {
            throw new BaseException("密码不能为空");
        }
        // 查询用户表
        SysUserDTO user = getUserByParam(loginUserVO.getUserNo(), loginUserVO.getPassword());
        if(user == null){
            throw new BaseException("您的账号或密码有误，请重新登陆");
        }
        String  uuid = UUID.randomUUID().toString();
//        JYJedisCache.set(user.getUserNo(),uuid, CashloanConstants.Wechat.OUTTIME);
//        JYJedisCache.set(uuid,user.getUserNo(), CashloanConstants.Wechat.OUTTIME);
        SysRoleDTO role = sysRoleService.queryRoleByUserId(loginUserVO.getUserNo());
//        JYJedisCache.set(uuid+"_roleId",role.getId().toString(),CashloanConstants.Wechat.OUTTIME);
        LoginRespBo loginRespBo = new LoginRespBo();
        BeanUtils.copyProperties(user,loginRespBo);
        loginRespBo.setToken(uuid);
        loginRespBo.setRoleId(role.getId());
        loginRespBo.setRoleCode(role.getRoleCode());
        loginRespBo.setRoleName(role.getRoleName());
        loginRespBo.setPassword(loginUserVO.getPassword());

        jsonResult.setError(RespCodeCostant.OK);
        jsonResult.setBody(loginRespBo);
        System.out.println(jsonResult.toString());
        return   jsonResult;
    }

    private SysUserDTO getUserByParam(String userNo, String password) {
        Map userParam = new HashMap();
        userParam.put("userNo",userNo);
        userParam.put("password",password);
        return  sysUserDao.sysUserLogin(userParam);
    }

    /**
     * OK
     * 密码修改
     * @param loginUserVO
     * @return
     */
    public JsonResult passwordUpdate(LoginUserVO loginUserVO)throws Exception {
        JsonResult jsonResult = new JsonResult();
        Map param = new HashMap();
        param.put("userNo",loginUserVO.getUserNo());
        SysUserDTO user = sysUserDao.selectUserParam(param);//查询员工
        if(user ==null){
            throw new BaseException("此员工不存在");
        }
        String newPassword = loginUserVO.getNewPassword();//新
        String confirmPassword = loginUserVO.getConfirmPassword();//确认
        if(!newPassword.equals(confirmPassword)) {//新和确认
            throw new BaseException("抱歉,密码输入不一致");
        }else{
            Map userParam = new HashMap();
            userParam.put("userNo",user.getUserNo());
            userParam.put("password",newPassword);
            int count = sysUserDao.passwordUpdate(userParam);
            if(count == 0){
                throw new BaseException("密码修改失败，请联系管理员");
            }
        }
        jsonResult.setError(RespCodeCostant.OK);
        jsonResult.setBody(new HashMap<>());
        return jsonResult;
    }

    /**
     *
     * 显示用户列表
     */
    public PageInfo selectUserList(SysUserVo sysUserVo){
        PageHelper.startPage(sysUserVo.getPageNum(), sysUserVo.getPageSize());
        List sysUserList = sysUserDao.selectUserList(sysUserVo);
        if(sysUserList!=null&&sysUserList.size()>0){
            for(Object obj :sysUserList){
                Map<String,String > map =(Map) obj;
                String userNo = map.get("user_no");
                map.put("department",sysEnterpriseDao.getEnterPrise(userNo));
            }
        }
        return new PageInfo(sysUserList);
    }


    //运营列表新增
    @Transactional(rollbackFor=Exception.class)
    public JsonResult sysUserRegister(SysUserRegisterVO registerVO) throws BaseException {
        JsonResult jsonResult= null;
        jsonResult = new JsonResult();
//        if(registerVO.getRoleId() ==null ){
//            throw new BaseException("所属角色为空");
//        }
        // 根据员工编号查询是否存在
        Map param = new HashMap();
        param.put("userNo",registerVO.getNewUserNo());
        SysUserDTO user = sysUserDao.selectUserParam(param);//查询员工
        if(user !=null){
            throw new BaseException("员工编号已存在");
        }
        user = new SysUserDTO();
        BeanUtils.copyProperties(registerVO,user);
        if(user.getDepartment()!=null){
            user.getDepartment().replaceAll("，",",");
        }
        int num=sysUserDao.insertUser(user);
        if(num==0){
            throw new BaseException("信息添加失败");
        }
        SysRoleUserDTO  sysRoleUser=new SysRoleUserDTO();
        sysRoleUser.setRoleId(registerVO.getRoleId());
        sysRoleUser.setTargetId(user.getId());
        sysRoleUser.setCreateUser(registerVO.getCreateUser());
        sysRoleUserDao.insertRoleUser(sysRoleUser);
        jsonResult.setError(RespCodeCostant.OK);
        jsonResult.setBody(new HashMap<>());
        return jsonResult;
    }

    /**
     * 修改
     *
     */
    @Transactional(rollbackFor=Exception.class)
    public JsonResult updateUser(SysUserRegisterVO vo) throws BaseException {
        JsonResult jsonResult= new JsonResult();
        // 根据员工编号查询是否存在
        Map param = new HashMap();
        param.put("id",vo.getId());
        SysUserDTO user = sysUserDao.selectUserParam(param);//查询员工
        if(user ==null){
            throw new BaseException("人员不存在");
        }
        SysUserDTO userNew = new SysUserDTO();
        BeanUtils.copyProperties(vo,userNew);
        int num=sysUserDao.updateByIdSelective(userNew);
        if(num==0){
            throw new BaseException("信息修改失败");
        }
        SysRoleUserDTO  sysRoleUser=new SysRoleUserDTO();
        if (vo.getRoleId()!=null && !vo.getRoleId().equals("")){
            sysRoleUser.setRoleId(vo.getRoleId());
            sysRoleUser.setTargetId(userNew.getId());
            sysRoleUser.setUpdateUser(vo.getUpdateUser());
            sysRoleUserDao.updateUserRoleByUserId(sysRoleUser);
        }
        String[] ens = vo.getEnNos();
        if(ens!=null&&ens.length>0){
            //删除之前的记录
            sysEnterpriseDao.deleteByUserNo(user.getUserNo());
            List<SysUserEnterpriseDTO> sysUserEnterpriseDTOS = new ArrayList<>();
            for(String s :ens){
                SysUserEnterpriseDTO dto = new SysUserEnterpriseDTO();
                dto.setUserNo(userNew.getNewUserNo());
                dto.setUserName(userNew.getUserName());
                dto.setEnNo(s);
                SysEnterpriseDTO sysEnterpriseDTO = sysEnterpriseDao.selectByPrimaryKey(Integer.valueOf(s));
                dto.setEnCode(sysEnterpriseDTO.getEnCode());
                sysUserEnterpriseDTOS.add(dto);
            }
            sysEnterpriseDao.batchInsert(sysUserEnterpriseDTOS);
        }
        jsonResult.setError(RespCodeCostant.OK);
        jsonResult.setBody(new HashMap<>());
        return jsonResult;
    }


    /**
     * @param userVO
     * @return
     * 删除
     */
    public JsonResult sysUserDel(SysUserRegisterVO userVO) throws BaseException {
        JsonResult result = new JsonResult();
        Map param = new HashMap();
        param.put("userNo",userVO.getNewUserNo());
        SysUserDTO user = sysUserDao.selectUserParam(param);//查询员工
        if(user ==null){
            throw new BaseException("员工不存在");
        }
        SysUserDTO newUser = new SysUserDTO();
        BeanUtils.copyProperties(userVO,newUser);
        newUser.setId(user.getId());
        newUser.setValidateState("0");
        int num = sysUserDao.updateByIdSelective(newUser);
        if(num==0){
            throw new BaseException("信息修改失败");
        }
        result.setBody(new HashMap<>());
        result.setError(RespCodeCostant.OK);
        return result;
    }

    /***
     * 退出
     * @param userNo
     * @return
     */
    public JsonResult logout(String userNo,String token) {
        JsonResult jsonResult=new JsonResult();
        //根据token获取openid
//        String token = JYJedisCache.get(userNo);
//        JYJedisCache.del(token);
//        JYJedisCache.del(userNo);
        jsonResult.setError(RespCodeCostant.OK);
        return jsonResult;
    }


    public List<String> getEnterprise(SysUserDTO sysUserDTO) {
        sysUserDTO  = sysUserDao.selectUserByParam(sysUserDTO);
        if(!"管理员".equals(sysUserDTO.getJob())){
            return Arrays.asList(sysUserDTO.getDepartment().split(","));
        }else {
            List<String> strs = sysUserDao.selectUserDepartment();
            List<String> newList = new ArrayList();
            for(String str:strs){
                String[] ss = str.split(",");
                for(int i=0;i<ss.length;i++){
                    if("admin".equals(ss[i]))
                        continue;
                    newList.add(ss[i]);
                }
            }
            return  newList;
        }
    }
}
