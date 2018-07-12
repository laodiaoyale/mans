package com.bns.model.user;

import java.util.Date;

public class ClTBackCommentsUrlDTO {
    /**
     *
     */
    private Long id;

    /**
     * 意见反馈关联id
     */
    private String backCommentsId;


    /**
     *创建时间
     */
    private Date createTime;


    /**
     *修改时间
     */
    private Date updateTime;

    /**
     * 图片地址
     */
    private String pictureUrl ;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBackCommentsId() {
        return backCommentsId;
    }

    public void setBackCommentsId(String backCommentsId) {
        this.backCommentsId = backCommentsId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }
}