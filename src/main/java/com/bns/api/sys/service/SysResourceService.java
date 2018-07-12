package com.bns.api.sys.service;

import com.bns.api.sys.bo.ResourceRespBo;
import com.bns.dao.sys.SysResourceDao;
import com.bns.model.sys.SysResourceRoleDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toList;

@Service
public class SysResourceService {
    @Autowired
    private SysResourceDao dao;

    public List<SysResourceRoleDTO> getSysResourceUrl(String roleCode)
    {
        Map paramMap = new HashMap();
        paramMap.put("resourceType", "url");
        paramMap.put("roleCode", roleCode);
        List resourceIdList = dao.getSysResourceRole(paramMap);
        return resourceIdList;
    }

    /***
     * 查询resourceTree
     * @return
     */
    public List<ResourceRespBo> querySysResourceTree() {

        List<ResourceRespBo> resourceList = dao.querySysResource();
        List<ResourceRespBo> parents = resourceList.stream().filter(resource ->resource.getParentId().equals("0")).collect(toList());
        parents.forEach(item ->{
            List<ResourceRespBo> childs = resourceList.stream().filter(re ->re.getParentId().equals(item.getId()+"")).collect(toList());
            item.setChilds(childs);
        });
        return parents;
    }
}
