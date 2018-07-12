package com.bns.model.user;

/**
 * @Author: zl
 * @CreateDate: 2018/6/23
 * @Description:
 **/
public class ClTManagerInfoDTO {

    private int id;
    /**一级部门*/
    private String oneDepartment;
    //二级部门
    private String twoDepartment;
    //三级部门
    private String threeDepartment;
    //四级部门
    private String fourDepartment;
    //五级部门
    private String fiveDepartment;
    //门店级别
    private String storeLevel;
    //OA工号
    private String oaWorkNumber;
    //姓名
    private String name;
    //性别
    private String sex;
    //手机号
    private String mobile;
    //身份证号
    private String idCardNum;
    //岗位
    private String post;
    //直属上级
    private String superior;
    //邮箱
    private String email;
    //员工状态 1-在职  0-离职
    private String staffStatus;
    //入职日期
    private String dateOfEntry;
    //离职日期
    private String leaveDate;
    //导入日期
    private String importTime;
    //二维码
    private String orCode;
    //过期时间
    private String expiredTime;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOneDepartment() {
        return oneDepartment;
    }

    public void setOneDepartment(String oneDepartment) {
        this.oneDepartment = oneDepartment;
    }

    public String getTwoDepartment() {
        return twoDepartment;
    }

    public void setTwoDepartment(String twoDepartment) {
        this.twoDepartment = twoDepartment;
    }

    public String getThreeDepartment() {
        return threeDepartment;
    }

    public void setThreeDepartment(String threeDepartment) {
        this.threeDepartment = threeDepartment;
    }

    public String getFourDepartment() {
        return fourDepartment;
    }

    public void setFourDepartment(String fourDepartment) {
        this.fourDepartment = fourDepartment;
    }

    public String getFiveDepartment() {
        return fiveDepartment;
    }

    public void setFiveDepartment(String fiveDepartment) {
        this.fiveDepartment = fiveDepartment;
    }

    public String getStoreLevel() {
        return storeLevel;
    }

    public void setStoreLevel(String storeLevel) {
        this.storeLevel = storeLevel;
    }

    public String getOaWorkNumber() {
        return oaWorkNumber;
    }

    public void setOaWorkNumber(String oaWorkNumber) {
        this.oaWorkNumber = oaWorkNumber;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getIdCardNum() {
        return idCardNum;
    }

    public void setIdCardNum(String idCardNum) {
        this.idCardNum = idCardNum;
    }

    public String getPost() {
        return post;
    }

    public void setPost(String post) {
        this.post = post;
    }

    public String getSuperior() {
        return superior;
    }

    public void setSuperior(String superior) {
        this.superior = superior;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStaffStatus() {
        return staffStatus;
    }

    public void setStaffStatus(String staffStatus) {
        this.staffStatus = staffStatus;
    }

    public String getDateOfEntry() {
        return dateOfEntry;
    }

    public void setDateOfEntry(String dateOfEntry) {
        this.dateOfEntry = dateOfEntry;
    }

    public String getLeaveDate() {
        return leaveDate;
    }

    public void setLeaveDate(String leaveDate) {
        this.leaveDate = leaveDate;
    }

    public String getImportTime() {
        return importTime;
    }

    public void setImportTime(String importTime) {
        this.importTime = importTime;
    }

    public String getOrCode() {
        return orCode;
    }

    public void setOrCode(String orCode) {
        this.orCode = orCode;
    }

    public String getExpiredTime() {
        return expiredTime;
    }

    public void setExpiredTime(String expiredTime) {
        this.expiredTime = expiredTime;
    }

    @Override
    public String toString() {
        return "ClTManagerInfo{" +
                "id=" + id +
                ", oneDepartment='" + oneDepartment + '\'' +
                ", twoDepartment='" + twoDepartment + '\'' +
                ", threeDepartment='" + threeDepartment + '\'' +
                ", fourDepartment='" + fourDepartment + '\'' +
                ", fiveDepartment='" + fiveDepartment + '\'' +
                ", storeLevel='" + storeLevel + '\'' +
                ", oaWorkNumber='" + oaWorkNumber + '\'' +
                ", name='" + name + '\'' +
                ", sex='" + sex + '\'' +
                ", mobile='" + mobile + '\'' +
                ", idCardNum='" + idCardNum + '\'' +
                ", post='" + post + '\'' +
                ", superior='" + superior + '\'' +
                ", email='" + email + '\'' +
                ", staffStatus='" + staffStatus + '\'' +
                ", dateOfEntry='" + dateOfEntry + '\'' +
                ", leaveDate='" + leaveDate + '\'' +
                ", importTime='" + importTime + '\'' +
                ", orCode='" + orCode + '\'' +
                ", expiredTime='" + expiredTime + '\'' +
                '}';
    }
}
