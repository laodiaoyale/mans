package com.bns.model.befloan;

import com.bns.model.user.ClTIntoInfoDTO;

import java.util.Date;

/**
 *@Description:cl_t_into_status
 *@author Administrator
 *@version 1.0,
 *@date 2017-11-04 16:19:01
 */
public class ClTIntoStatusDTO extends ClTIntoInfoDTO {

	private static final long serialVersionUID = 1L;

	/**主键id*/
	//private Long id;

	/**进件编号*/
	//private String intoCode;

	/**实名认证状态 0-未认证 1-已认证 -1 已失效*/
	private String idcardCertState;

	/**活体认证状态 0-未认证 1-已认证 -1 已失效*/
	private String faceCertState;

	/**银行卡认证状态 0-未认证 1-已认证 -1 已失效*/
	private String bankCertState;

	/**基本信息状态 0-未认证 1-已认证 -1 已失效*/
	private String baseCertState;

	/**手机运营商认证状态 0-未认证 1-已认证 -1 已失效*/
	private String mobileCertState;

	/**征信认证状态 0-未认证 1-已认证 -1 已失效*/
	private String creditCertState;

	/**信用卡认证状态 0-未认证 1-已认证 -1 已失效*/
	private String crcardCertState;

	/**实名认证时间*/
	private Date idcardCertTime;

	/**实名认证结果描述*/
	private String idcardCertMsg;

	/**活体认证时间*/
	private Date faceCertTime;

	/**活体认证结果描述*/
	private String faceCertMsg;

	/**银行卡认证时间*/
	private Date bankCertTime;

	/**银行卡认证结果描述*/
	private String bankCertMsg;

	/**基本信息认证时间*/
	private Date baseCertTime;

	/**基本信息认证结果描述*/
	private String baseCertMsg;

	/**手机运营商认证时间*/
	private Date mobileCertTime;

	/**手机运营商认证结果描述*/
	private String mobileCertMsg;

	/**征信认证时间*/
	private Date creditCertTime;

	/**征信认证结果描述*/
	private String creditCertMsg;

	/**信用卡认证时间*/
	private Date crcardCertTime;

	/**信用卡认证结果描述*/
	private String crcardCertMsg;

	/**淘宝认证状态*/
	private String taoBaoCertState ;

	/**淘宝认证时间*/
	private Date taoBaoCertTime ;

	/**淘宝认证结果描述*/
	private String taoBaoCertMsg ;

	/**创建时间*/
	//private Date createTime;

	/**更新时间*/
	//private Date updateTime;

	/**
	 *方法: 获得idcardCertState
	 *@return: java.lang.String  idcardCertState
	 */
	public String getIdcardCertState(){
		return this.idcardCertState;
	}

	/**
	 *方法: 设置idcardCertState
	 *@param: java.lang.String  idcardCertState
	 */
	public void setIdcardCertState(String idcardCertState){
		this.idcardCertState = idcardCertState;
	}

	/**
	 *方法: 获得faceCertState
	 *@return: java.lang.String  faceCertState
	 */
	public String getFaceCertState(){
		return this.faceCertState;
	}

	/**
	 *方法: 设置faceCertState
	 *@param: java.lang.String  faceCertState
	 */
	public void setFaceCertState(String faceCertState){
		this.faceCertState = faceCertState;
	}

	/**
	 *方法: 获得bankCertState
	 *@return: java.lang.String  bankCertState
	 */
	public String getBankCertState(){
		return this.bankCertState;
	}

	/**
	 *方法: 设置bankCertState
	 *@param: java.lang.String  bankCertState
	 */
	public void setBankCertState(String bankCertState){
		this.bankCertState = bankCertState;
	}

	/**
	 *方法: 获得baseCertState
	 *@return: java.lang.String  baseCertState
	 */
	public String getBaseCertState(){
		return this.baseCertState;
	}

	/**
	 *方法: 设置baseCertState
	 *@param: java.lang.String  baseCertState
	 */
	public void setBaseCertState(String baseCertState){
		this.baseCertState = baseCertState;
	}

	/**
	 *方法: 获得mobileCertState
	 *@return: java.lang.String  mobileCertState
	 */
	public String getMobileCertState(){
		return this.mobileCertState;
	}

	/**
	 *方法: 设置mobileCertState
	 *@param: java.lang.String  mobileCertState
	 */
	public void setMobileCertState(String mobileCertState){
		this.mobileCertState = mobileCertState;
	}

	/**
	 *方法: 获得creditCertState
	 *@return: java.lang.String  creditCertState
	 */
	public String getCreditCertState(){
		return this.creditCertState;
	}

	/**
	 *方法: 设置creditCertState
	 *@param: java.lang.String  creditCertState
	 */
	public void setCreditCertState(String creditCertState){
		this.creditCertState = creditCertState;
	}

	/**
	 *方法: 获得crcardCertState
	 *@return: java.lang.String  crcardCertState
	 */
	public String getCrcardCertState(){
		return this.crcardCertState;
	}

	/**
	 *方法: 设置crcardCertState
	 *@param: java.lang.String  crcardCertState
	 */
	public void setCrcardCertState(String crcardCertState){
		this.crcardCertState = crcardCertState;
	}

	/**
	 *方法: 获得idcardCertTime
	 *@return: Date  idcardCertTime
	 */
	public Date getIdcardCertTime(){
		return this.idcardCertTime;
	}

	/**
	 *方法: 设置idcardCertTime
	 *@param: Date  idcardCertTime
	 */
	public void setIdcardCertTime(Date idcardCertTime){
		this.idcardCertTime = idcardCertTime;
	}

	/**
	 *方法: 获得idcardCertMsg
	 *@return: java.lang.String  idcardCertMsg
	 */
	public String getIdcardCertMsg(){
		return this.idcardCertMsg;
	}

	/**
	 *方法: 设置idcardCertMsg
	 *@param: java.lang.String  idcardCertMsg
	 */
	public void setIdcardCertMsg(String idcardCertMsg){
		this.idcardCertMsg = idcardCertMsg;
	}

	/**
	 *方法: 获得faceCertTime
	 *@return: Date  faceCertTime
	 */
	public Date getFaceCertTime(){
		return this.faceCertTime;
	}

	/**
	 *方法: 设置faceCertTime
	 *@param: Date  faceCertTime
	 */
	public void setFaceCertTime(Date faceCertTime){
		this.faceCertTime = faceCertTime;
	}

	/**
	 *方法: 获得faceCertMsg
	 *@return: java.lang.String  faceCertMsg
	 */
	public String getFaceCertMsg(){
		return this.faceCertMsg;
	}

	/**
	 *方法: 设置faceCertMsg
	 *@param: java.lang.String  faceCertMsg
	 */
	public void setFaceCertMsg(String faceCertMsg){
		this.faceCertMsg = faceCertMsg;
	}

	/**
	 *方法: 获得bankCertTime
	 *@return: Date  bankCertTime
	 */
	public Date getBankCertTime(){
		return this.bankCertTime;
	}

	/**
	 *方法: 设置bankCertTime
	 *@param: Date  bankCertTime
	 */
	public void setBankCertTime(Date bankCertTime){
		this.bankCertTime = bankCertTime;
	}

	/**
	 *方法: 获得bankCertMsg
	 *@return: java.lang.String  bankCertMsg
	 */
	public String getBankCertMsg(){
		return this.bankCertMsg;
	}

	/**
	 *方法: 设置bankCertMsg
	 *@param: java.lang.String  bankCertMsg
	 */
	public void setBankCertMsg(String bankCertMsg){
		this.bankCertMsg = bankCertMsg;
	}

	/**
	 *方法: 获得baseCertTime
	 *@return: Date  baseCertTime
	 */
	public Date getBaseCertTime(){
		return this.baseCertTime;
	}

	/**
	 *方法: 设置baseCertTime
	 *@param: Date  baseCertTime
	 */
	public void setBaseCertTime(Date baseCertTime){
		this.baseCertTime = baseCertTime;
	}

	/**
	 *方法: 获得baseCertMsg
	 *@return: java.lang.String  baseCertMsg
	 */
	public String getBaseCertMsg(){
		return this.baseCertMsg;
	}

	/**
	 *方法: 设置baseCertMsg
	 *@param: java.lang.String  baseCertMsg
	 */
	public void setBaseCertMsg(String baseCertMsg){
		this.baseCertMsg = baseCertMsg;
	}

	/**
	 *方法: 获得mobileCertTime
	 *@return: Date  mobileCertTime
	 */
	public Date getMobileCertTime(){
		return this.mobileCertTime;
	}

	/**
	 *方法: 设置mobileCertTime
	 *@param: Date  mobileCertTime
	 */
	public void setMobileCertTime(Date mobileCertTime){
		this.mobileCertTime = mobileCertTime;
	}

	/**
	 *方法: 获得mobileCertMsg
	 *@return: java.lang.String  mobileCertMsg
	 */
	public String getMobileCertMsg(){
		return this.mobileCertMsg;
	}

	/**
	 *方法: 设置mobileCertMsg
	 *@param: java.lang.String  mobileCertMsg
	 */
	public void setMobileCertMsg(String mobileCertMsg){
		this.mobileCertMsg = mobileCertMsg;
	}

	/**
	 *方法: 获得creditCertTime
	 *@return: Date  creditCertTime
	 */
	public Date getCreditCertTime(){
		return this.creditCertTime;
	}

	/**
	 *方法: 设置creditCertTime
	 *@param: Date  creditCertTime
	 */
	public void setCreditCertTime(Date creditCertTime){
		this.creditCertTime = creditCertTime;
	}

	/**
	 *方法: 获得creditCertMsg
	 *@return: java.lang.String  creditCertMsg
	 */
	public String getCreditCertMsg(){
		return this.creditCertMsg;
	}

	/**
	 *方法: 设置creditCertMsg
	 *@param: java.lang.String  creditCertMsg
	 */
	public void setCreditCertMsg(String creditCertMsg){
		this.creditCertMsg = creditCertMsg;
	}

	/**
	 *方法: 获得crcardCertTime
	 *@return: Date  crcardCertTime
	 */
	public Date getCrcardCertTime(){
		return this.crcardCertTime;
	}

	/**
	 *方法: 设置crcardCertTime
	 *@param: Date  crcardCertTime
	 */
	public void setCrcardCertTime(Date crcardCertTime){
		this.crcardCertTime = crcardCertTime;
	}

	/**
	 *方法: 获得crcardCertMsg
	 *@return: java.lang.String  crcardCertMsg
	 */
	public String getCrcardCertMsg(){
		return this.crcardCertMsg;
	}

	/**
	 *方法: 设置crcardCertMsg
	 *@param: java.lang.String  crcardCertMsg
	 */
	public void setCrcardCertMsg(String crcardCertMsg){
		this.crcardCertMsg = crcardCertMsg;
	}

	public String getTaoBaoCertState() {
		return taoBaoCertState;
	}

	public void setTaoBaoCertState(String taoBaoCertState) {
		this.taoBaoCertState = taoBaoCertState;
	}

	public Date getTaoBaoCertTime() {
		return taoBaoCertTime;
	}

	public void setTaoBaoCertTime(Date taoBaoCertTime) {
		this.taoBaoCertTime = taoBaoCertTime;
	}

	public String getTaoBaoCertMsg() {
		return taoBaoCertMsg;
	}

	public void setTaoBaoCertMsg(String taoBaoCertMsg) {
		this.taoBaoCertMsg = taoBaoCertMsg;
	}
}