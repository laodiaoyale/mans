package common.message;


/**
 * @author zhaolei
 * @date 2017-12-8 16:04:42
 */
public class ReqHeader {

    /**
     * 用户token，存在redis七天，有的接口不是必填（注册、登录）
     */
    private String token;

    /**
     * 请求IP
     */
    private String ip;


    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @Override
    public String toString() {
        return "ReqHeader{" +
                ", token='" + token + '\'' +
                ", ip='" + ip + '\'' +
                '}';
    }
}
