package com.bns.api.sys.service;

import com.bns.api.sys.bo.MenuRespBo;
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
public class SysMenuService {
    @Autowired
    private SysUserDao sysUserDao;

    @Autowired
    private SysMenuDao sysMenuDao;

    @Autowired
    private SysResourceService sysResourceService;

    @Autowired
    private SysRoleService sysRoleService;
    public JsonResult queryMenuByUserId(String userNo) throws Exception {
        JsonResult jsonResult = new JsonResult();
        List list = new ArrayList();
        //根据用户id 获取用户角色对应的resource
        List<SysResourceRoleDTO> listRole = findMenuUrlListByUserId(userNo);
        /*
         * 查询系统所有菜单
         */
        List<MenuRespBo> menuAll = searchSysMenu1();
        /**
         * 获取角色所有resourceId
         */
        List<Long> resourceIds = listRole.stream().map(menu -> menu.getResourceId()).collect(toList());
        /**
         * 从所有菜单中获取角色所有menu
         */
        List<MenuRespBo> menuResource = menuAll.stream().filter(menu -> resourceIds.contains(Long.parseLong(menu.getResourceId()+""))).collect(toList());
        /**
         * 从角色menu中获取所有parentsId
         */
        List<String> parents =  menuResource.stream().map(cl->cl.getParentId()).collect(toList());
        /**
         * 从所有菜单中查找角色menu所有父集菜单
         */
        List<MenuRespBo> parentsMenu = menuAll.stream().filter(menu -> parents.contains(menu.getId()+"")).collect(toList());
        /**
         * 循环父集菜单，从角色所有menu中获取所有子集
         */
        parentsMenu.forEach(item -> {
            List<MenuRespBo> childsMenu = menuResource.stream().filter(menu -> menu.getParentId().equals(item.getId()+"")).collect(toList());
            item.setChilds(childsMenu);
        });
        jsonResult.setError(RespCodeCostant.OK);
        jsonResult.setBody(parentsMenu);
        return  jsonResult;
    }

    /***
     * 查詢所有菜單 簡約版
     * @return
     * @throws Exception
     */
    public List<MenuRespBo> searchSysMenu1()
            throws Exception
    {
        List dataList = new ArrayList();
        Map map = new HashMap();
        map.put("level", Integer.valueOf(1));
        List<MenuRespBo> level1List = sysMenuDao.searchSysMenu1(map);
        for (MenuRespBo level1 : level1List) {
            dataList.add(level1);
            map.put("level", Integer.valueOf(2));
            map.put("parentId", level1.getId());
            List<MenuRespBo> level2List = sysMenuDao.searchSysMenu1(map);
            dataList.addAll(level2List);
        }
        return dataList;
    }

    private List<SysResourceRoleDTO> findMenuUrlListByUserId(String userId) throws Exception
    {
        SysRoleDTO role = sysRoleService.queryRoleByUserId(userId);
        List<SysResourceRoleDTO> urlList = this.sysResourceService.getSysResourceUrl(role.getRoleCode());
        return urlList;
    }
}
