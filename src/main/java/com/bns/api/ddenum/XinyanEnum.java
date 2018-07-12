package com.bns.api.ddenum;

/**
 * 订单状态
 * Created by TianTianLi on 下午2:39 2017/11/10.
 */
public enum XinyanEnum {


    xy21160001(21160001,"申请准入分",0,null),
    xy21160002(21160002,"申请准入置信度",1,null),
    xy21160003(21160003,"申请命中查询机构数",2,null),
    xy21160004(21160004,"申请命中消费金融类机构数",3,null),
    xy21160005(21160005,"申请命中网络贷款类机构数",4,null),
    xy21160006(21160006,"机构总查询次数",5,null),
    xy21160007(21160007,"最近一次机构查询时间",6,null),
    xy21160008(21160008,"近1个月贷款类机构总查询笔数",7,null),
    xy21160009(21160009,"近3个月贷款类机构总查询笔数",8,null),
    xy21160010(21160010,"近6个月贷款类机构总查询笔数",9,null),
    xy21160099(21160099,"申请雷达报告",9,null),
    xy21160098(21160098,"申请雷达评分",9,null),
    xy21170001(21170001,"贷款行为分",10,null),
    xy21170002(21170002,"贷款行为置信度",11,null),
    xy21170003(21170003,"贷款放款总订单数",12,null),
    xy21170004(21170004,"贷款已结清订单数",13,null),
    xy21170005(21170005,"贷款逾期订单数（ M1）",14,null),
    xy21170006(21170006,"命中贷款放款机构数",15,null),
    xy21170007(21170007,"命中消费金融类机构数",16,null),
    xy21170008(21170008,"命中网络贷款类机构数",17,null),
    xy21170009(21170009,"近1个月贷款机构放款笔数",18,null),
    xy21170010(21170010,"近3个月贷款机构放款笔数",19,null),
    xy21170011(21170011,"近6个月贷款机构放款笔数",20,null),
    xy21170012(21170012,"历史贷款机构成功扣款笔数",21,null),
    xy21170013(21170013,"历史贷款机构失败扣款笔数",22,null),
    xy21170014(21170014,"近1个月贷款机构成功扣款笔数",23,null),
    xy21170015(21170015,"近1个月贷款机构失败扣款笔数",24,null),
    xy21170016(21170016,"信用贷款时长",25,null),
    xy21170017(21170017,"最近一次贷款放款时间",25,null),
    xy21170099(21170099,"行为雷达报告",25,null),
    xy21170098(21170098,"行为雷达评分",25,null),
    xy21180001(21180001,"建议授信额度",26,null),
    xy21180002(21180002,"建议额度置信度",27,null),
    xy21180003(21180003,"命中在用的网络贷款类机构数",28,null),
    xy21180004(21180004,"命中在用的网络贷款类产品数",29,null),
    xy21180005(21180005,"网络贷款机构最大授信额度",30,null),
    xy21180006(21180006,"网络贷款机构平均授信额度",31,null),
    xy21180007(21180007,"命中在用的消费金融类机构数",32,null),
    xy21180008(21180008,"命中在用的消费金融类产品数",33,null),
    xy21180009(21180009,"消费金融类机构最大授信额度",34,null),
    xy21180010(21180010,"消费金融类机构平均授信额度",35,null),
    xy21180099(21180010,"信用现状报告",35,null),
    xy21180098(21180010,"信用现状额度",35,null),
    xy21180011(21180011,"消金建议授信额度",36,null),
    xy21180012(21180012,"消金建议额度置信度",37,null),
    xy21230099(21230099,"征信报告",37,null);

    //订单状态，
    private int statusCode;
    //订单状态描述
    private String statusValue;
    //页面显示用的大大状态值
    private int displayCode;
    //app描述
    private String statusDesc;
    //排序优先级,用于还款列表
    private int sortLevel;


    XinyanEnum(int statusCode, String statusValue, int displayCode, String statusDesc) {
        this.statusCode = statusCode;
        this.statusValue = statusValue;
        this.displayCode = displayCode;
        this.statusDesc = statusDesc;
    }

    XinyanEnum(int statusCode, String statusValue, int displayCode, String statusDesc, int sortLevel) {
        this.statusCode = statusCode;
        this.statusValue = statusValue;
        this.displayCode = displayCode;
        this.statusDesc = statusDesc;
        this.sortLevel = sortLevel;
    }

    /**
     * @Author: TianTianLi
     * @Description:
     * @Date:下午8:27 2017/11/10
     */
    public static XinyanEnum getStatusValuByCode(int statusCode) {
        for (XinyanEnum loanStatusEnum : XinyanEnum.values()) {
            if (statusCode==loanStatusEnum.getStatusCode()) {
                return loanStatusEnum;
            }

        }
        return null;
    }


    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getStatusValue() {
        return statusValue;
    }

    public void setStatusValue(String statusValue) {
        this.statusValue = statusValue;
    }

    public String getStatusDesc() {
        return statusDesc;
    }

    public void setStatusDesc(String statusDesc) {
        this.statusDesc = statusDesc;
    }

    public int getDisplayCode() {
        return displayCode;
    }

    public void setDisplayCode(int displayCode) {
        this.displayCode = displayCode;
    }

    public int getSortLevel() {
        return sortLevel;
    }

    public void setSortLevel(int sortLevel) {
        this.sortLevel = sortLevel;
    }
}
