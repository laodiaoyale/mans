package com.bns.api.exception;

import common.exception.BaseException;
import common.message.RespCodeCostant;

/**
 * 自定义异常处理类
 * @Author xiangzebing
 */
public class InterfaceBusinessException extends BaseException {
    private static final long serialVersionUID = 5131650282166524389L;

    public static String MSG_DEAL_0 = "0";

    public static String MSG_DEAL_1 = "1";

    /** 异常类型 0-不处理自定义的异常信息 1-处理自定义的异常信息 */
    private String type;

    private String processCode;

    public InterfaceBusinessException() {
        super();
    }

    public InterfaceBusinessException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    public InterfaceBusinessException(String message, Throwable cause) {
        super(message, cause);
    }

    public InterfaceBusinessException(String message) {
        super(message);
    }

    public InterfaceBusinessException(Throwable cause) {
        super(cause);
    }

    public InterfaceBusinessException(String code, String message) {
        super(code,message);
    }

    public InterfaceBusinessException(RespCodeCostant respCode) {
        super(respCode);
    }

    public InterfaceBusinessException(String type,String processCode, String msg) {
        super(msg);
        this.processCode = processCode;
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getProcessCode() {
        return processCode;
    }

    public void setProcessCode(String processCode) {
        this.processCode = processCode;
    }
}
