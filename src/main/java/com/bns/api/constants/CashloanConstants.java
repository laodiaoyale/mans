package com.bns.api.constants;

/**
 * 业务常量类
 * @Author xiangzebing
 */
public class CashloanConstants {


    public static final class Wechat{
        public static final String ACCESS_TOKEN_URL = "access_token_url";

        public static final String USERINFO_URL = "userinfo_url";

        public static final String APPID = "appid";

        public static final String SECRET = "secret";

        public static final int OUTTIME = 60*60*24 ;

    }

    /**
     * 常量int数字类
     */
    public static final class SerialNumber {
        public static final int INT_NUM_3 = 3;
        public static final int bigPageSize = 20000;
        public static final int maxRowsNum = 40000;
        public static final int OUTTIME = 60*60*24 ;
    }

    /**阅信参数key */
    public static final class YXRequestParam {
        /*审核通过*/
        public static final String YX_APPROVED="yx_approved";
        /*审核拒绝*/
        public static final String YX_AUDIT_REFUSED="yx_audit_refused";
        /*预警监控*/
        public static final String YX_INTOINFO_COUNT="yx_intoinfo_count";
        public static final String YX_PASS_RATE="yx_pass_rate";
        public static final String YX_FUND_AMT="yx_fund_amt";
        public static final String YX_DECISION_RESULTS="yx_decision_results";
    }
    /**
     * 调用大数据常量key
     */
    public static final class BigData{
        //风险提示url
        public static final String CALL_URL = "CALL_URL";
        //风险提示详情
        public static final String CALL_MANAGER_URL = "CALL_MANAGER_URL";
        //机主信息
        public static final String OWNER_URL = "OWNER_URL";
        //联系人通话记录
        public static final String RESUTLCALLLOG_URL = "RESUTLCALLLOG_URL";
        //审批通过调用大数据
        public static final String  PASS_URL= "PASS_URL";
        //审批通过调用大数据
        public static final String  REPULSE_URL= "REPULSE_URL";
        //审批通话明细接口调用大数据
        public static final String  RESUTLCALLLOG_MANAGER_URL= "RESUTLCALLLOG_MANAGER_URL";
        //魔蝎征信
        public static final String MOXIE = "moxie";
        //新颜雷达
        public static final String BIG_DATA_2001 = "bigData2001";
        //汇法网
        public static final String BIG_DATA_4001 = "bigData4001";
        //百融白名单信息
        public static final String BIG_DATA_6001 = "bigData6001";
    }

    /**
     * 读取oss文件的key
     */
    public static final class OssParm{
        //图片路径请求头
        public static final String HEAD = "DDY";
        public static final String BACKET_NAME = "backet_name";
        public static final String CONTRACT_FOLDER_NAME_ZIP = "contract_folder_name_zip";
        public static final String TEMPFOLDE = "tempfolde";
        public static final String ENDPOINT = "endpoint";
        public static final String ACCESS_KEY_ID = "access_key_id";
        public static final String ACCESS_KEY_SECRET = "access_key_secret";
    }

    /**
     * 读取system配置文件信息
     */
    public static final class SysParm{

        //没有token的请求Url
        public static final String  NO_TOKEN_REQUEST_URL = "noTokenRequestUrl";
        //是否验证Token
        public static final String HTTP_TOKEN_FLAG = "httpTokenFlag";
        //调用方系统编号
        public static final String SYS_CODE = "sysCode";
    }

    /**
     * 常量String数字类
     */
    public static final class StrNumber{
        public static final String STR_NUM_0 = "0";
        public static final String STR_NUM_1 = "1";
        public static final String STR_NUM_11001 = "11001";
    }

    //调用大数据时的加密信息
    public static final class RequestEsbParams{
        public static final String ESB_USER_NAME = "esb_user_name";

        public static final String ESB_USER_PW = "esb_user_pw";

        public static final String ENCRYPTION_KEY = "encryption_key";

        public static final String ENCRYPTION_BIGDATA_KEY = "encryption_bigdata_key";

        public static final String PTID = "ptid";

        public static final String PTID_BIGDATA = "ptid_bigdata";
    }

    /**
     * 没有token的请求Url
     */
    public static final String  NoTokenRequestUrl = "noTokenRequestUrl";

    /**
     * 配置文件
     *
     */
    public class PropertiesConstants {
        /** 系统配置 **/
        public static final String SYSTEM_PROPERTIES = "system.properties";
        /** 接口配置 **/
        public static final String INTERFACE_PROPERTIES = "interface_url.properties";
        /** 阿里云配置文件 **/
        public static final String OSS_PROPERTIES = "oss.properties";
        /** 短信模板配置文件 **/
        public static final String SMS_MESSAGE_PROPERTIES = "sendMessage.properties";
    }
    /***
     * 是否走大数据 开关
     */
    public static final class LoanSwitchStatus {

        /** 是否调用大数据 */
        public static final String  BIGDATA_SWITCH = "BIGDATA_SWITCH";

        /** 是否调用大数据接口 1-调用*/
        public static final String BIGDATA_SWITCH_OK = "1";

    }
    /**
     * chenyifan
     * 调用大数据路径
     */
    public static final class BigDataUrl{

        //致诚反欺诈
        public static final String   bigData1001="bigData1001";
        //致诚共享
        public static final String bigData1002="bigData1002";
        //新颜雷达
        public static final String bigData2001="bigData2001";
        //前海征信
        public static final String  bigData2002="bigData2002";

        //上海资信
        public static final String bigData3001="bigData3001";
        //汇法网
        public static final String bigData4001="bigData4001";
        //数美多平台借贷服务
        public static final String  bigData5001="bigData5001";
        //数美逾期黑名单
        public static final String   bigData5002="bigData5002";
        //百融白名单信息
        public static final String   bigData6001="bigData6001";

        //征信评分
        public static final String   bigData7001="bigData7001";


        //百度征信分
        public static final String   bigData7002="bigData7002";
        //百融信用分
        public static final String   bigData7003="bigData7003";
        //百融反欺诈分数
        public static final String   bigData7004="bigData7004";
        //腾讯反欺诈
        public static final String   bigData7005="bigData7005";
        //查询同盾反欺诈分数
        public static final String bigData7006="bigData7006";


        //算话共享
        public static final String bigData1005="bigData1005";

        //#机主信息
        public static final String bigData9003="bigData9003";
        //#联系人通话记录
        public static final String bigData9004="bigData9004";
        //审批通话明细接口调用大数据
        public static final String bigData9007="bigData9007";
        //风险策略
        public static final String bigData9001="bigData9001";
        //风险提示详情
        public static final String bigData9002="bigData9002";
        //加入黑名单
        public static final String bigData9006="bigData9006";
        //通过
        public static final String bigData9005="bigData9005";

    }
    /**
     * 常量字段类
     */
    public static final class OperatorData{
        /** 公共 */
        public static final  String DATA = "data";//主体信息

        public static final  String  MESSAGE = "message";
        /**
         * 回执信息 报文节点信息
         */
        public static final String DATASOURCE = "datasource";

        public static final  String  TOKEN = "token";//token

        /**
         * 原始数据 报文节点信息
         */
        public static final  String ERROR_CODE = "error_code";//调用状态码

        public static final  String ERROR_MSG = "error_msg";//调用状态说明

        public static final  String RAW_DATA = "raw_data";//原始数据

        public static final  String MEMBERS = "members";

        public static final  String TRANSACTIONS = "transactions";//交易信息

        public static final  String CALLS = "calls";//呼叫信息

        public static final  String NETS = "nets";//上网信息

        public static final  String SMSES = "smses";//短信信息

        /**
         * 分析数据 报文节点信息
         */
        public static final  String NOTE = "note";//消息提示

        public static final  String REPORT_DATA = "report_data";//手机详单（报文数据）

        public static final  String REPORT = "report";

        public static final String APPLICATION_CHECK = "application_check";

        public static final  String APP_POINT = "app_point";//申请表数据点

        public static final  String CHECK_POINTS = "check_points";//数据检查点

        public static final  String KEY_VALUE = "key_value";//申请表数据值

        public static final  String FINANCIAL_BLACKLIST = "financial_blacklist";//金融服务类机构黑名单
        public static final  String COURT_BLACKLIST = "court_blacklist";//法院黑名单
        public static final  String ARISED = "arised";//是否出现
        public static final  String BLACK_TYPE = "black_type";//黑名单机构类型

        public static final String USER_NO = "userNo";

        //阿里云API的bucket名称
        public static final String BACKET_NAME = "iqianjindai";
    }

    /**
     * 阿里云oss配置文件
     *
     */
    public class OssPropertiesConstants {
        /** 阿里云配置文件 **/
        public static final String OSS_PROPERTIES = "oss.properties";

    }
    public static final class LoanIntoValidateStatus {

        /** 无效 */
        public static final String VALIDATE_STATUS_0 = "0";

        /** 有效 */
        public static final String VALIDATE_STATUS_1 = "1";

    }

}
