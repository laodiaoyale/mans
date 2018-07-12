package com.bns.api.ddenum;

public enum LoanConstants {

	/**
	 * 审批中
	 */
	APPROVAL(1,"审批中"),
	/**
	 * 去签约
	 */
	GO_SIGN(2,"去签约"),
	/**
	 * 取消签约
	 */
	CANCEL(3,"取消"),
	/**
	 * 已失效
	 */
	INVALID(4,"已失效"),
	/**
	 * 未通过
	 */
	FAIL(5,"未通过"),
	/**
	 * 还款中
	 */
//	REPAYING(6,"还款中"),
	/**
	 * 完成
	 */
	FINISH(6,"已完成");

	private int code;

	private String value;

	public String getValue() {
		return value;
	}
	public int getCode() {
		return code;
	}

	private LoanConstants(int code, String value) {
		this.code = code;
		this.value = value;
	}

	@Override
	public String toString() {
		return "LoanConstants{" +
				"code=" + code +
				", value='" + value + '\'' +
				'}';
	}
}
