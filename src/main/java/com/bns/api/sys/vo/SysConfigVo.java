package com.bns.api.sys.vo;

import com.bns.model.sys.SysConfigDTO;

/**
 * 接收页面参数的bean
 */
public class SysConfigVo extends SysConfigDTO {
    private int pageNum;

    private int pageSize;

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }
}
