package com.bns.model.user;

import java.util.Date;

/**
 *@Description:cl_t_user
 *@author Administrator
 *@version 1.0,
 *@date 2017-11-02 20:45:35
 */
public class ClTUserDTO{

	private static final long serialVersionUID = 1L;

	/**主键id*/
	private Long id;

	/**贷款系统用户编号*/
	private String dkCustCode;

	/**客户统一编号*/
	private String custCode;

	/**手机号*/
	private String mobile;

	/**登录密码*/
	private String password;

	/**姓名*/
	private String name;

	/**身份证号*/
	private String idCard;

	/**性别*/
	private String sex;

	/**民族*/
	private String nation;

	/**出生日期*/
	private String birthday;

	/**身份证住址*/
	private String address;

	/**证件有效期起始日*/
	private String cardStartTime;

	/**证件有效期截止日*/
	private String cardEndTime;

	/**签发机关*/
	private String signDept;

	/**是否实名认证 0-否 1-是*/
	private String authState;

	/**账户密码*/
	private String accountPwd;

	/**是否有效*/
	private String validateState;

	/**运营推广来源*/
	private String promotionSource;

	/**应用市场渠道*/
	private String marketChannel;

	/**终端类型*/
	private String terminalType;

	/**创建时间*/
	private Date createTime;

	/**修改时间*/
	private Date updateTime;

	/**实名认证时间*/
	private Date authTime;

	/**
	 *方法: 获得id
	 *@return: java.lang.Long  id
	 */
	public Long getId(){
		return this.id;
	}

	/**
	 *方法: 设置id
	 *@param: java.lang.Long  id
	 */
	public void setId(Long id){
		this.id = id;
	}

	/**
	 *方法: 获得custCode
	 *@return: java.lang.String  custCode
	 */
	public String getCustCode(){
		return this.custCode;
	}

	/**
	 *方法: 设置custCode
	 *@param: java.lang.String  custCode
	 */
	public void setCustCode(String custCode){
		this.custCode = custCode;
	}

	/**
	 *方法: 获得mobile
	 *@return: java.lang.String  mobile
	 */
	public String getMobile(){
		return this.mobile;
	}

	/**
	 *方法: 设置mobile
	 *@param: java.lang.String  mobile
	 */
	public void setMobile(String mobile){
		this.mobile = mobile;
	}

	/**
	 *方法: 获得password
	 *@return: java.lang.String  password
	 */
	public String getPassword(){
		return this.password;
	}

	/**
	 *方法: 设置password
	 *@param: java.lang.String  password
	 */
	public void setPassword(String password){
		this.password = password;
	}

	/**
	 *方法: 获得name
	 *@return: java.lang.String  name
	 */
	public String getName(){
		return this.name;
	}

	/**
	 *方法: 设置name
	 *@param: java.lang.String  name
	 */
	public void setName(String name){
		this.name = name;
	}

	/**
	 *方法: 获得idCard
	 *@return: java.lang.String  idCard
	 */
	public String getIdCard(){
		return this.idCard;
	}

	/**
	 *方法: 设置idCard
	 *@param: java.lang.String  idCard
	 */
	public void setIdCard(String idCard){
		this.idCard = idCard;
	}

	/**
	 *方法: 获得sex
	 *@return: java.lang.String  sex
	 */
	public String getSex(){
		return this.sex;
	}

	/**
	 *方法: 设置sex
	 *@param: java.lang.String  sex
	 */
	public void setSex(String sex){
		this.sex = sex;
	}

	/**
	 *方法: 获得nation
	 *@return: java.lang.String  nation
	 */
	public String getNation(){
		return this.nation;
	}

	/**
	 *方法: 设置nation
	 *@param: java.lang.String  nation
	 */
	public void setNation(String nation){
		this.nation = nation;
	}

	/**
	 *方法: 获得birthday
	 *@return: java.lang.String  birthday
	 */
	public String getBirthday(){
		return this.birthday;
	}

	/**
	 *方法: 设置birthday
	 *@param: java.lang.String  birthday
	 */
	public void setBirthday(String birthday){
		this.birthday = birthday;
	}

	/**
	 *方法: 获得address
	 *@return: java.lang.String  address
	 */
	public String getAddress(){
		return this.address;
	}

	/**
	 *方法: 设置address
	 *@param: java.lang.String  address
	 */
	public void setAddress(String address){
		this.address = address;
	}

	/**
	 *方法: 获得cardStartTime
	 *@return: java.lang.String  cardStartTime
	 */
	public String getCardStartTime(){
		return this.cardStartTime;
	}

	/**
	 *方法: 设置cardStartTime
	 *@param: java.lang.String  cardStartTime
	 */
	public void setCardStartTime(String cardStartTime){
		this.cardStartTime = cardStartTime;
	}

	/**
	 *方法: 获得cardEndTime
	 *@return: java.lang.String  cardEndTime
	 */
	public String getCardEndTime(){
		return this.cardEndTime;
	}

	/**
	 *方法: 设置cardEndTime
	 *@param: java.lang.String  cardEndTime
	 */
	public void setCardEndTime(String cardEndTime){
		this.cardEndTime = cardEndTime;
	}

	/**
	 *方法: 获得authState
	 *@return: java.lang.String  authState
	 */
	public String getAuthState(){
		return this.authState;
	}

	/**
	 *方法: 设置authState
	 *@param: java.lang.String  authState
	 */
	public void setAuthState(String authState){
		this.authState = authState;
	}

	public String getAccountPwd() {
		return accountPwd;
	}

	public void setAccountPwd(String accountPwd) {
		this.accountPwd = accountPwd;
	}

	/**
	 *方法: 获得validateState
	 *@return: java.lang.String  validateState
	 */
	public String getValidateState(){
		return this.validateState;
	}

	/**
	 *方法: 设置validateState
	 *@param: java.lang.String  validateState
	 */
	public void setValidateState(String validateState){
		this.validateState = validateState;
	}

	/**
	 *方法: 获得createTime
	 *@return: java.sql.Timestamp  createTime
	 */


	/**
	 *方法: 设置createTime
	 *@param: java.sql.Timestamp  createTime
	 */


	/**
	 *方法: 获得updateTime
	 *@return: java.sql.Timestamp  updateTime
	 */


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

	/**
	 *方法: 设置updateTime
	 *@param: java.sql.Timestamp  updateTime
	 */


	public String getSignDept() {
		return signDept;
	}

	public void setSignDept(String signDept) {
		this.signDept = signDept;
	}

	public String getDkCustCode() {
		return dkCustCode;
	}

	public void setDkCustCode(String dkCustCode) {
		this.dkCustCode = dkCustCode;
	}

	/**
	 *方法: promotionSource
	 *@param: java.lang.String  promotionSource
	 */
	public String getPromotionSource() {
		return promotionSource;
	}

	public void setPromotionSource(String promotionSource) {
		this.promotionSource = promotionSource;
	}
	/**
	 *方法: marketChannel
	 *@param: java.lang.String  marketChannel
	 */
	public String getMarketChannel() {
		return marketChannel;
	}

	public void setMarketChannel(String marketChannel) {
		this.marketChannel = marketChannel;
	}
	/**
	 *方法: terminalType
	 *@param: java.lang.String  terminalType
	 */
	public String getTerminalType() {
		return terminalType;
	}

	public void setTerminalType(String terminalType) {
		this.terminalType = terminalType;
	}

	public Date getAuthTime() {
		return authTime;
	}

	public void setAuthTime(Date authTime) {
		this.authTime = authTime;
	}
}