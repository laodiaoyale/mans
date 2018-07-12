package common.base;

import common.util.date.DateUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;

import java.net.InetAddress;
import java.util.Date;

public class BigLog {
    private static final String TAB = "\t";
    private static final String ENTER = "\n";
    private static final String NULL_STR = "null";
    private static final String SPACE = " ";
    /**
     * 跟踪ID（用于跟踪用户的一次请求流程）
     */
    private String requestId;
    /**
     * 服务器名，hostName
     */
    private static String serverName;
    /**
     * 服务器IP,hostAddress
     */
    private static String serverIp;
    /**
     * 日志记录时间（格式：yyyy-MM-dd HH:mm:ss SSS）
     */
    private String logTime;
    /**
     * 请求地址
     */
    private String requestUrl;
    /**
     * 请求IP
     */
    private String requestIp;
    /**
     * 请求方式，get/post
     */
    private String method;
    /**
     * 耗时、毫秒数
     */
    private String elapsedTime;

    /**
     * 业务类型
     */
    private String businessType;
    /**
     * 请求加密报文
     */
    private String requestEtData;

    /**
     * 请求报文
     */
    private String requestData;

    /**
     * 返回加密报文
     */
    private String responseEtData;

    /**
     * 返回报文
     */
    private String responseData;

    /**
     * 服务返回码
     */
    private int statusCode;
    /**
     * 返回页面码
     */
    private String responseCode;
    /**
     * 异常的堆栈信息
     */
    private Throwable exception;
    /**
     * exceptionmsg	异常的说明
     */
    private String exceptionMsg;

    /**
     * 初始化服务器基本数据
     */
    static {
        //获取机器名和机器IP
        try {
            InetAddress addr = InetAddress.getLocalHost();
            serverName = addr.getHostName();//获取本机host
            serverIp = addr.getHostAddress();//获得本机IP
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getRequestId() {
        return requestId;
    }

    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getResponseCode() {
        return responseCode;
    }

    public void setResponseCode(String responseCode) {
        this.responseCode = responseCode;
    }

    public static String getServerName() {
        return serverName;
    }

    public static void setServerName(String serverName) {
        BigLog.serverName = serverName;
    }

    public static String getServerIp() {
        return serverIp;
    }

    public static void setServerIp(String serverIp) {
        BigLog.serverIp = serverIp;
    }

    public String getLogTime() {
        return logTime;
    }

    public void setLogTime(String logTime) {
        this.logTime = logTime;
    }

    public String getRequestUrl() {
        return requestUrl;
    }

    public void setRequestUrl(String requestUrl) {
        this.requestUrl = requestUrl;
    }

    public String getRequestIp() {
        return requestIp;
    }

    public void setRequestIp(String requestIp) {
        this.requestIp = requestIp;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getElapsedTime() {
        return elapsedTime;
    }

    public void setElapsedTime(String elapsedTime) {
        this.elapsedTime = elapsedTime;
    }

    public String getRequestEtData() {
        return requestEtData;
    }

    public void setRequestEtData(String requestEtData) {
        this.requestEtData = requestEtData;
    }

    public String getRequestData() {
        return requestData;
    }

    public void setRequestData(String requestData) {
        this.requestData = requestData;
    }

    public String getResponseEtData() {
        return responseEtData;
    }

    public void setResponseEtData(String responseEtData) {
        this.responseEtData = responseEtData;
    }

    public String getResponseData() {
        return responseData;
    }

    public void setResponseData(String responseData) {
        this.responseData = responseData;
    }

    public Throwable getException() {
        return exception;
    }

    public void setException(Throwable exception) {
        this.exception = exception;
    }

    public String getExceptionMsg() {
        return exceptionMsg;
    }

    public void setExceptionMsg(String exceptionMsg) {
        this.exceptionMsg = exceptionMsg;
    }

    public String getBusinessType() {
        return businessType;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    @Override
    public String toString() {
        this.logTime = DateUtils.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss SSS");
        StringBuilder builder = new StringBuilder();
        builder.append(replaceTabAndEnter(this.logTime)).append(TAB);
        builder.append(replaceTabAndEnter(this.requestId)).append(TAB);
        builder.append(replaceTabAndEnter(BigLog.serverName)).append(TAB);
        builder.append(replaceTabAndEnter(BigLog.serverIp)).append(TAB);
        builder.append(replaceTabAndEnter(this.requestUrl)).append(TAB);
        builder.append(replaceTabAndEnter(this.requestIp)).append(TAB);
        builder.append(replaceTabAndEnter(this.method)).append(TAB);
        builder.append(replaceTabAndEnter(this.businessType)).append(TAB);
        builder.append(replaceTabAndEnter(this.elapsedTime)).append(TAB);
        builder.append(replaceTabAndEnter(this.requestData)).append(TAB);
        builder.append(this.statusCode).append(TAB);
        builder.append(replaceTabAndEnter(this.responseCode)).append(TAB);
        builder.append(replaceTabAndEnter(this.responseData)).append(TAB);
        builder.append(replaceTabAndEnter(this.requestEtData)).append(TAB);
        builder.append(replaceTabAndEnter(this.responseEtData)).append(TAB);
        builder.append(replaceTabAndEnter(this.exceptionMsg)).append(TAB);
        String exceptionString = null;
        if (exception != null) {
            exceptionString = ExceptionUtils.getStackTrace(exception);
        }
        builder.append(replaceTabAndEnter(exceptionString)).append(ENTER);

        return builder.toString();
    }

    private static String replaceTabAndEnter(String str) {
        if (str != null && str.length() > 0) {
            if (str.indexOf("\n") > -1 || str.indexOf("\t") > -1) {
                return str.replaceAll("\n|\t", SPACE);
            }
        }
        return StringUtils.isBlank(str) ? NULL_STR : str;
    }
}

