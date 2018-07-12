package common.exception;

import common.message.RespCodeCostant;

/***
 * @author: TianTianLi
 * @Description: app端异常信息转换
 * @Date:  下午 4:28 2017/11/3 0003
 *
 */
public class AppException extends BaseException {
    /**
     *
     */
    private static final long serialVersionUID = 5131650282166524389L;

    public static String MSG_DEAL_0 = "0";

    public static String MSG_DEAL_1 = "1";

    /** 异常类型 0-不处理自定义的异常信息 1-处理自定义的异常信息 */
    private String type;

    private String processCode;

    public AppException() {
        super();
    }

    public AppException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    public AppException(String message, Throwable cause) {
        super(message, cause);
    }

    public AppException(String message) {
        super(message);
    }

    public AppException(Throwable cause) {
        super(cause);
    }

    public AppException(String code, String message) {
        super(code,message);
    }

    public AppException(RespCodeCostant respCode) {
        super(respCode);
    }

    public AppException(String type, String processCode, String msg) {
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
