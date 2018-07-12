package common.message;


import common.util.StringUtil;

/**
 * 2017年12月7日21:07:46
 * xzb
 */
public enum RespCodeCostant {
    BIGOK                               ("0000","成功"),
    BIGOK_PT                               ("200","成功"),
    BIGOK_NULL                              ("1006","成功"),
    MOXIENODATA                               ("600012","暂无报告"),
    OK                               ("000000","成功"),
    TOKEN_AUTH                       ("100001","认证错误"),
    TOKEN_EXPIRED                    ("100002","认证失效"),
    INVALID_RES                      ("100003","无效资源访问"),
    USER_LOGIN_ERR                   ("100004","用户登陆失败"),
    USER_REG_ERR                     ("100005","用户注册失败"),
    TOKEN_IS_NULL                  ("-999999","您的登录已过期，请重新登录"),
    USER_MANAGER_NO                 ("100006","用户自述信息不存在"),
    ACCOUNTMANAGEMENT               ("200100","未查询到该账户"),
    USER_NO                         ("200199", "用户不存在"),
    THE_REPORT_IS_NO_LONGER             ("200198","报告暂无"),
    NO_PERMISSION                          ("200200","您没有权限登录"),
    DOES_PERMISSION                          ("200201","您已经登录"),
    INNER_MAIL_FAIL                  ("300000","消息/通知插入失败！"),
    BANK_INTO_FAIL                   ("400000","进件编号错误"),
    BIG_DATA_RESULT_FAIL             ("400001","大数据返回结果错误"),
    BIG_DATA_FAIL                    ("400002","调用大数据失败"),
    ORDER_ON_FAIL                   ("400003","审批失败"),
    ORDER_ON_STATUS_BACKOUT        ("400004","订单已撤销"),
    APP_VERSION_FAIL_200601   ("200601","发送短信失败"),
    REPLY_FAIL                       ("200200","反馈处理失败,已处理的反馈"),
    ROLE_DEL_FAIL                       ("200300","角色删除失败,已有关联的角色"),
    /*大数据回调*/
    BIG_DATA_6001("6001","风控返回数据非法"),
    ORDER_NOT_FIND("2000101","未找到订单"),
    ORDER_ON_ERROR        ("400005","此记录已被审批"),
    ACCOUNTNUMBER_ERROR             ("400007","账户信息错误"),
    SYS_CONFIG_UPDATE_FAIL         ("500000","修改系统配置失败！"),
    SYS_CONFIG_INSERT_FAIL         ("500001","添加系统配置失败！"),
    SYS_CONFIG_UPDATE_REDIS_FAIL   ("500002","刷新系统配置失败！"),
    SIGN_ERR                         ("900000","签名失败"),
    REQ_MSG_FORMAT_ERR              ("700001","请求报文格式非法"),
    REQUESTPARAMETERDELETION       ("700004","参数缺失"),
    SYS_ERR                          ("999999","系统错误"),
    DOWNLOAD                    ("50000066","合同下载失败"),
    TIMEGOBEYOND                    ("600011","时间不能大于30天"),
    TIMEBADFORMAT                   ("600012","时间格式错误"),
    QUERY_APPROVE_AMOUNT_FAIL_210302  ("210302","不符合撤销申请的条件");
    RespCodeCostant(String code, String name) {
        this.code = code;
        this.name = name;
    }
    private String code;
    private String name;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public common.message.RespCodeCostant getByName(String name)
    {
        RespCodeCostant[] arry= RespCodeCostant.values();
        for(RespCodeCostant respCodeCostant:arry){
            if(respCodeCostant.getName().equals(name)){
                return respCodeCostant;
            }
        }
        return null;
    }

    public common.message.RespCodeCostant getByCode(String code)
    {
        RespCodeCostant[] arry= RespCodeCostant.values();
        for(RespCodeCostant respCodeCostant:arry){
            if(respCodeCostant.getCode().equals(code)){
                return respCodeCostant;
            }
        }
        return null;
    }

    /**
     * @description: 根据key获取对应的value
     * @return
     */
    public static String getValueByKey(String code) {
        String value = null;

        if (StringUtil.isEmpty(code)) {
            return value;
        }

        for (RespCodeCostant s : values()) {
            if (s.getCode().equals(code)) {
                value = s.getName();
                break;
            }
        }
        return value;
    }
}
