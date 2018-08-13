package com.bns.dao.sys;


import com.bns.api.sys.vo.SysUserVo;
import com.bns.model.sys.SysUserDTO;
import common.annotation.MyBatisRepository;

import java.util.List;
import java.util.Map;

@MyBatisRepository
public interface SysUserDao {
    int deleteByPrimaryKey(Long id);


    int insertSelective(SysUserDTO record);

    SysUserDTO selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(SysUserDTO record);

    int updateByPrimaryKey(SysUserDTO record);

    SysUserDTO sysUserLogin(Map userParam);

    //List<SysMenuDTO> menuList(Long roleid);

    Long selectRoleID(Long userId);

    SysUserDTO selectUserByParam(SysUserDTO sysUser);

    /**
     * 列表
     *
     * @param sysUserVo
     * @return
     */
    List selectUserList(SysUserVo sysUserVo);

    /*
     修改密码
     */
    int passwordUpdate(Map userParam);

    /***
     * 查询用户对象
     * @param userParam
     * @return
     */
    SysUserDTO selectUserParam(Map userParam);

    /***
     * 添加用户
     * @param record
     * @return
     */
    int insertUser(SysUserDTO record);

    /***
     * 选择性修改
     * @param newUser
     */
    int updateByIdSelective(SysUserDTO newUser);

    List<String> selectUserDepartment();
}