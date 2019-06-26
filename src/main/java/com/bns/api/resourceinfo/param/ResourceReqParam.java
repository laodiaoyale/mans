package com.bns.api.resourceinfo.param;

/**
 * Created by zhaolei on 2019/5/3.
 */
public class ResourceReqParam {

    /**
     * 姓名
     */
    private String name;

    /**
     * 身份证号
     */
    private String idCard;

    /**
     * 0-男/1-女
     */
    private Byte sex;


    /**
     * 区域
     */
    private String region;

    /**
     * 公司
     */
    private String company;

    /**
     * 人员
     */
    private String distribution;

    private int pageNum = 1;

    private int pageSize = 10;


    private Integer id;

    private Byte type;

    public Byte getType() {
        return type;
    }

    public void setType(Byte type) {
        this.type = type;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getNotThisId() {
        return notThisId;
    }

    public void setNotThisId(Integer notThisId) {
        this.notThisId = notThisId;
    }

    private Integer notThisId;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public Byte getSex() {
        return sex;
    }

    public void setSex(Byte sex) {
        this.sex = sex;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getDistribution() {
        return distribution;
    }

    public void setDistribution(String distribution) {
        this.distribution = distribution;
    }
}
