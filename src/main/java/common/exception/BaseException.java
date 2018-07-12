package common.exception;

import common.message.RespCodeCostant;

public class BaseException extends Exception  {

	private static final long serialVersionUID = -5008720177368489411L;

	private String code;

	private RespCodeCostant respCode;

	public BaseException() {
		super();
	}

	public BaseException(String message, Throwable cause,
                         boolean enableSuppression, boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public BaseException(String message, Throwable cause) {
		super(message, cause);
	}

	public BaseException(String message) {
		super(message);
	}

	public BaseException(String code,String message) {
		super(message);
		this.code = code;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public BaseException(Throwable cause) {
		super(cause);
	}

	public BaseException(RespCodeCostant respCode) {
		this.respCode = respCode;
	}
	public RespCodeCostant getRespCodeMessage(){
		return respCode;
	}

}
