package com.bns.model.face;

import java.util.Date;

/**
 * 有源对比响应数据
 */
public class ClTVerifyDataInfoDTO {
    /**主键id*/
    private Integer id;
    /**客户编号*/
    private String custCode;
    /**进件编号*/
    private String intoCode;
    /**对比置信度*/
    private Float confidence;
    /**对比置信度阈值le-3*/
    private Float thresholdsLe3;
    /**对比置信度阈值le-4*/
    private Float thresholdsLe4;
    /**对比置信度阈值le-5*/
    private Float thresholdsLe5;
    /**对比置信度阈值le-6*/
    private Float thresholdsLe6;
    /**软件合成脸的置信度*/
    private Float syntheticFaceConfidence;
    /**软件合成脸的置信度阈值*/
    private Float syntheticFaceThreshold;
    /**面具的置信度*/
    private Float maskConfidence;
    /**面具的置信度阈值*/
    private Float maskThreshold;
    /**屏幕翻拍的置信度*/
    private Float screenReplayConfidence;
    /**屏幕翻拍的置信度阈值*/
    private Float screenReplayThreshold;
    /**创建时间*/
    private Date createTime;
    /**修改时间*/
    private Date updateTime;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCustCode() {
        return custCode;
    }

    public void setCustCode(String custCode) {
        this.custCode = custCode == null ? null : custCode.trim();
    }

    public String getIntoCode() {
        return intoCode;
    }

    public void setIntoCode(String intoCode) {
        this.intoCode = intoCode == null ? null : intoCode.trim();
    }

    public Float getConfidence() {
        return confidence;
    }

    public void setConfidence(Float confidence) {
        this.confidence = confidence;
    }

    public Float getThresholdsLe3() {
        return thresholdsLe3;
    }

    public void setThresholdsLe3(Float thresholdsLe3) {
        this.thresholdsLe3 = thresholdsLe3;
    }

    public Float getThresholdsLe4() {
        return thresholdsLe4;
    }

    public void setThresholdsLe4(Float thresholdsLe4) {
        this.thresholdsLe4 = thresholdsLe4;
    }

    public Float getThresholdsLe5() {
        return thresholdsLe5;
    }

    public void setThresholdsLe5(Float thresholdsLe5) {
        this.thresholdsLe5 = thresholdsLe5;
    }

    public Float getThresholdsLe6() {
        return thresholdsLe6;
    }

    public void setThresholdsLe6(Float thresholdsLe6) {
        this.thresholdsLe6 = thresholdsLe6;
    }

    public Float getSyntheticFaceConfidence() {
        return syntheticFaceConfidence;
    }

    public void setSyntheticFaceConfidence(Float syntheticFaceConfidence) {
        this.syntheticFaceConfidence = syntheticFaceConfidence;
    }

    public Float getSyntheticFaceThreshold() {
        return syntheticFaceThreshold;
    }

    public void setSyntheticFaceThreshold(Float syntheticFaceThreshold) {
        this.syntheticFaceThreshold = syntheticFaceThreshold;
    }

    public Float getMaskConfidence() {
        return maskConfidence;
    }

    public void setMaskConfidence(Float maskConfidence) {
        this.maskConfidence = maskConfidence;
    }

    public Float getMaskThreshold() {
        return maskThreshold;
    }

    public void setMaskThreshold(Float maskThreshold) {
        this.maskThreshold = maskThreshold;
    }

    public Float getScreenReplayConfidence() {
        return screenReplayConfidence;
    }

    public void setScreenReplayConfidence(Float screenReplayConfidence) {
        this.screenReplayConfidence = screenReplayConfidence;
    }

    public Float getScreenReplayThreshold() {
        return screenReplayThreshold;
    }

    public void setScreenReplayThreshold(Float screenReplayThreshold) {
        this.screenReplayThreshold = screenReplayThreshold;
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
}