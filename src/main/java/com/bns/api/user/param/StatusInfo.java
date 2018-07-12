package com.bns.api.user.param;


public class StatusInfo<T>{
	/**
	 * 状态码
	 */
	private String code;
	/**
	 * 相应信息
	 */
	private String msg;
	/**
	 * 结果
	 */
	private T result;
	
	public StatusInfo() {
		super();
	}
	public StatusInfo(String code, String msg) {
		super();
		this.code = code;
		this.msg = msg;
	}
	
	public StatusInfo(String code, String msg, T result) {
		super();
		this.code = code;
		this.msg = msg;
		this.result = result;
	}
	public T getResult() {
		return result;
	}
	public void setResult(T result) {
		this.result = result;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	@Override
	public String toString() {
		return "StatusInfo [code=" + code + ", msg=" + msg + "]";
	}
	
	
}
