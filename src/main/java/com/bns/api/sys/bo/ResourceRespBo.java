package com.bns.api.sys.bo;

import java.util.List;

public class ResourceRespBo {
    private Long id;

    private String parentId;

    private String resourceName;

    private List childs;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getResourceName() {
        return resourceName;
    }

    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }


    public List getChilds() {
        return childs;
    }

    public void setChilds(List childs) {
        this.childs = childs;
    }
}
