package com.bns.api.user.util;


import com.bns.api.user.vo.RepayPlanVo;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * <p>金额的计算公式
 * <BR>	修改记录
 * <BR>-----------------------------------------------
 * <BR>	修改日期			修改人			修改内容
 * @author weili.chen
 * @version V1.0
 * @date 2017/11/9 13:23
 */
public class CalculationMoneyUtil {

    // 最终计算金额小数点后保留位数
    private static int MONEY_SCALE = 2;
    // 利率小数点后精确位数
    private static int RATE_SCALE = 6;
    // 天数
    private static int TOTAL_DAYS = 360;

    private static BigDecimal ONE = new BigDecimal(1);

    /**
     * 日利率
     * @param monthRate 月利率
     * @return
     */
    public static BigDecimal getDayRate(BigDecimal monthRate) {
        BigDecimal iDayCount = new BigDecimal(30);
        BigDecimal dResult = monthRate.divide(iDayCount,4,BigDecimal.ROUND_UP);
        return dResult;
    }

    /**
     * 年利率
     * @param monthRate 月利率
     * @return
     */
    public static BigDecimal getYearRate(BigDecimal monthRate) {
        BigDecimal dMonths = new BigDecimal(12);
        BigDecimal dResult = monthRate.multiply(dMonths).setScale(4,BigDecimal.ROUND_UP);
        return dResult;
    }

    /**
     * 合计日利率 = 年华综合费率/360
     * @param yearTotalRate 年华综合费率
     * @return
     */
    public static BigDecimal getTotalDayRate(BigDecimal yearTotalRate) {
        BigDecimal totalRate = new BigDecimal(0.0);
        totalRate = yearTotalRate.divide(new BigDecimal(TOTAL_DAYS),4,BigDecimal.ROUND_UP);
        return totalRate;
    }

    /**
     * 月还金额:
     * 月还金额 = 放款金额/期限+放款金额*月综合费率
     * 剩余本金 = 合同金额-月还本金
     * 月还本金 = 月还款额-月还利息
     * 月还利息 = 剩余本金*月利率
     */
    public  static BigDecimal getMonthRepayMoney(BigDecimal amount,int terms,BigDecimal monthTotalRate){
        //月还金额
        BigDecimal monthRepay = (amount.multiply(monthTotalRate)).add(amount.divide(new BigDecimal(terms),MONEY_SCALE,BigDecimal.ROUND_UP)).setScale(MONEY_SCALE,BigDecimal.ROUND_UP) ;
        return monthRepay;
    }

    /**
     * 合同金额
     * @param monthRate 月利率
     * @param term 期限
     * @param monthRepayMoney 月还额
     * @return
     */
    public static double getContractAmt(double monthRate, double term, double monthRepayMoney){
        return pv(monthRate, term, monthRepayMoney, 0.0, 0);
    }
    /**
     * @param rate 月利率
     * @param nper 期限
     * @param pmt 月还额
     * @param fv 未来值
     * @param due 数字 0 或 1，用以指定各期的付款时间是在期初还是期末;
     *            0或省略代表支付时间为期末，1代表支付时间为期初
     * @return
     */
    public static double pv(double rate, double nper, double pmt, double fv, int due){
        double num;
        if (ArithUtil.compare(rate, 0.0) == 0) {
            return ArithUtil.sub(-fv, ArithUtil.multi(pmt, nper));
        }
        //支付时间为期初
        if (due != 0) {
            num = ArithUtil.add(1.0, rate);
        } else {//支付时间为期末
            num = 1.0;
        }
        double x = ArithUtil.add(1.0, rate);
        double num2 = Math.pow(x, nper);
        //取绝对值
        double result = Math.abs(ArithUtil.div(-ArithUtil.add(fv, ArithUtil.multi(ArithUtil.multi(pmt, num), ArithUtil.div(ArithUtil.sub(num2, 1.0), rate))), num2));
        return Math.round(result/100)*100;
    }

    /**
     * 月还本金
     */
    public static double ppmt(double rate, int per, int nper, double pv){
        return ppmt(rate, per, nper, pv, 0.0, 0);
    }

    public static double ppmt(double rate, int per, int nper, double pv, double fv, int due){
        if (ArithUtil.compare(per, 0.0) <= 0 || ArithUtil.compare(per, ArithUtil.add(nper, 1.0)) >= 0) {
            System.out.println("当前期数异常");
        }
        double num2 = pmt_internal(rate, nper, pv, fv, due);
        double num = ipmt(rate, per, nper, pv, fv, due);
        return ArithUtil.sub(num2, num);
    }

    /**
     * 月还利息
     * @param rate 月利率
     * @param per
     * @param nper 借款期限
     * @param pv
     * @param fv
     * @return
     */
    public static double getMonthInst(double rate, int per, int nper, double pv, double fv){
        return ipmt(rate, per, nper, pv, fv, 0);
    }
    public static double ipmt(double rate, int per, int nper, double pv, double fv, int due){
        double num;
        if (due != 0) {
            num = 2.0;
        } else {
            num = 1.0;
        }
        if (ArithUtil.compare(per,0.0) <= 0
                || ArithUtil.compare(per,ArithUtil.add(nper, 1.0)) >= 0) {
            System.out.println("当前期数异常");
        }
        if (due != 0 && ArithUtil.compare(per,1.0) == 0) {
            return 0.0;
        }
        double pmt = pmt_internal(rate, nper, pv, fv, due);
        if (due != 0) {
            pv = ArithUtil.add(pv, pmt);
        }
        return ArithUtil.multi(fv_internal(rate, ArithUtil.sub(per, num), pmt, pv, 0), rate);
    }

    /**
     * @param rate
     * @param nper
     * @param pv
     * @param fv
     * @param due
     * @return
     */
    private static double pmt_internal(double rate, int nper, double pv, double fv, int due){
        double num;
        if (ArithUtil.compare(nper, 0.0) == 0) {
            System.out.println("还款期数异常");
        }
        if (ArithUtil.compare(rate, 0.0) == 0) {
            return ArithUtil.div(ArithUtil.sub(-fv, pv), nper);
        }
        if (due != 0) {
            num = ArithUtil.add(1.0, rate);
        } else {
            num = 1.0;
        }
        double x = ArithUtil.add(rate, 1.0);
        double num2 = Math.pow(x, nper);
        return ArithUtil.multi(ArithUtil.div(ArithUtil.sub(-fv, ArithUtil.multi(pv, num2)), ArithUtil.multi(num, ArithUtil.sub(num2, 1.0))), rate);
    }

    private static double fv_internal(double rate, double nper, double pmt, double pv, int due){
        double num;
        if (ArithUtil.compare(rate,0) == 0) {
            return ArithUtil.sub(-pv, ArithUtil.multi(pmt, nper));
        }
        if (due != 0) {
            num = ArithUtil.add(1.0, rate);
        } else {
            num = 1.0;
        }
        double x = ArithUtil.add(1.0, rate);
        double num2 = Math.pow(x, nper);

        return ArithUtil.multi(-pv, num2) - ArithUtil.multi(ArithUtil.multi(ArithUtil.div(pmt, rate), num), ArithUtil.sub(num2, 1.0));
    }

    /**
     * 计算总利息
     * @param amount 放款金额
     * @param contractMoney 合同金额
     * @param repayDate 还款日期
     * @param terms 贷款期数
     * @param monthTotalRate 月综合费率
     * @return
     */
    public static BigDecimal getTotalInst(BigDecimal amount, BigDecimal contractMoney, LocalDate repayDate, int terms, BigDecimal monthTotalRate){
        List<RepayPlanVo> plans = RepayPlanUtil.genRepayPlans(amount,contractMoney,repayDate,terms,monthTotalRate);
        BigDecimal totalInst = new BigDecimal(0.00);
        for(RepayPlanVo repayPlan : plans){
            //每月应还利息
            totalInst = totalInst.add(new BigDecimal(repayPlan.getMustInst()));
        }
        return totalInst;
    }

    /**
     * 实际月利率法:计算200次，比Excel20次要精确，误差精确到小数点后10位
     * @author weili.chen
     * @param a 现值:合同金额
     * @param b 年金：月还金额
     * @param c 期数：借款期限
     * @param cnt 运算次数
     * @param ina 误差位数
     * @return 利率
     */
    public static double rate(double a,double b,double c,int cnt,int ina){
        double rate = 1,x,jd = 0.1,side = 0.1,i = 1;
        do{
            x = a/b - (Math.pow(1+rate, c)-1)/(Math.pow(rate+1, c)*rate);
            if(x*side>0){side = -side;jd *=10;}
            rate += side/jd;
        }while(i++<cnt&&Math.abs(x)>=1/Math.pow(10, ina));
        if(i>cnt)return Double.NaN;
        return rate;
    }

    /**
     * 测试金额main方法
     * @param args
     */
    public static void main(String[] args) {
        //月还金额
        BigDecimal monthRepayMoney = getMonthRepayMoney(new BigDecimal(10000),18,new BigDecimal(0.0138));
        System.out.println("月还金额："+monthRepayMoney);
        //合同金额
        double aa = getContractAmt(0.0083,18,monthRepayMoney.doubleValue());
        System.out.println("合同金额："+Math.abs(aa));
        //实际月利率
        System.out.println(rate(aa,monthRepayMoney.doubleValue(),18,200,10));
        //年利率
        System.out.println("年利率"+getYearRate(new BigDecimal(0.0083)));
        //日利率
        System.out.println("日利率"+getDayRate(new BigDecimal(0.0083)));

    }

}
