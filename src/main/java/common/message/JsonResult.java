package common.message;

import java.io.Serializable;

public class JsonResult implements Serializable {

	private static final long serialVersionUID = 3016236218647866095L;

	// 错误码
	private String rspCode;

	// 错误描述
	private String rspMsg;

	// 输出数据
	private Object body = null;

	// 错误码枚举，不需要序列化
	private transient RespCodeCostant error;

	public JsonResult() {
	}

	public JsonResult(String code, String msg) {
		this.rspCode = code;
		this.rspMsg = msg;
	}
	public static long getSerialVersionUID() {
		return serialVersionUID;
	}

	public String getRspCode() {
		return rspCode;
	}

	public void setRspCode(String rspCode) {
		this.rspCode = rspCode;
	}

	public String getRspMsg() {
		return rspMsg;
	}

	public void setRspMsg(String rspMsg) {
		this.rspMsg = rspMsg;
	}

	public Object getBody() {
		return body;
	}

	public void setBody(Object body) {
		this.body = body;
	}

	public RespCodeCostant getError() {
		return error;
	}

	public void setError(RespCodeCostant error) {
		this.rspCode = error.getCode();
		this.rspMsg = error.getName();
		this.error = error;
	}
}
