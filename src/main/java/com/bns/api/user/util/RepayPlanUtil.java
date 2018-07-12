package com.bns.api.user.util;


import com.bns.api.user.vo.RepayPlanVo;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * <p>还款明细工具类</p>
 * <BR>	修改记录
 * <BR>-----------------------------------------------
 * <BR>	修改日期			修改人			修改内容
 * </PRE>
 * @author weili.chen
 * @version V1.0
 * @date 2017/11/6  13:08
 */
public class RepayPlanUtil {

    // 最终计算金额小数点后保留位数
    private static int MONEY_SCALE = 2;
    // 利率小数点后精确位数
    private static int RATE_SCALE = 6;

    /**
     * 月还金额 = 放款金额/期限+放款金额*月综合费率
     * 剩余本金 = 合同金额-月还本金
     * 月还利息 = 剩余本金*调整后月利率
     * 月还本金 = 月还款额-月还利息
     * @param amount 放款金额
     * @param contractMoney 合同金额
     * @param repayDate 放款日期
     * @param terms 借款期数
     * @param monthTotalRate 月综合费率
     * @return
     */
    public static List<RepayPlanVo> genRepayPlans(BigDecimal amount, BigDecimal contractMoney, LocalDate repayDate, int terms, BigDecimal monthTotalRate) {
        //月还金额(月供)
        BigDecimal monthRepay = (amount.multiply(monthTotalRate)).add(amount.divide(new BigDecimal(terms),MONEY_SCALE,BigDecimal.ROUND_UP)).setScale(MONEY_SCALE,BigDecimal.ROUND_UP) ;
        //剩余本金(第一次还款之前，剩余本金即为合同金额)
        BigDecimal leftPrincipal = new BigDecimal(contractMoney.doubleValue());
        //反算调整后月利率
        double monthRate = CalculationMoneyUtil.rate(contractMoney.doubleValue(),monthRepay.doubleValue(),terms,200,10);

        List<RepayPlanVo> plan = new ArrayList<>();
        for (int i = 0; i < terms; i++) {
            RepayPlanVo repayPlan = new RepayPlanVo();
            repayPlan.setTerm(String.valueOf(i + 1));//期次
            repayPlan.setRepayMoney(monthRepay.toString());//月供
            repayPlan.setRepayDate(repayDate == null ?  null :String.valueOf(repayDate.plusMonths(i+1)));//还款日期
            //月还利息 = 剩余本金*月利率
            BigDecimal monthInterest = new BigDecimal(0);
            monthInterest = leftPrincipal.multiply(new BigDecimal(monthRate)).setScale(RATE_SCALE,BigDecimal.ROUND_UP);
            repayPlan.setMustInst(monthInterest.toString());
            //月还本金 = 月还金额 - 月还利息
            BigDecimal principal = new BigDecimal(repayPlan.getRepayMoney()).subtract(monthInterest).setScale(RATE_SCALE,BigDecimal.ROUND_UP);
            repayPlan.setMustBase(principal.toString());
            //剩余本金=合同金额-月还本金
            if(i+1 == terms){
                leftPrincipal = new BigDecimal(0.00);
            }else{
                leftPrincipal = leftPrincipal.subtract(principal);
            }
            repayPlan.setLeftPrincipal(leftPrincipal.setScale(MONEY_SCALE,BigDecimal.ROUND_UP).toString());
            plan.add(repayPlan);
        }
        return plan;
    }

    public static void main(String[] args) {
        List<RepayPlanVo> plan = genRepayPlans(new BigDecimal(10000), new BigDecimal(11600.00),LocalDate.now(), 18, new BigDecimal("0.0138"));
        BigDecimal totalInst = new BigDecimal(0.00);
        for (RepayPlanVo repayTask : plan){
            System.out.println(" 还款期数: " + repayTask.getTerm());
            System.out.println(" 还款日期: " + repayTask.getRepayDate());
            System.out.println(" 应还本金: " + repayTask.getMustBase());
            System.out.println(" 月还利息: " + repayTask.getMustInst());
            System.out.println(" 月供: " + repayTask.getRepayMoney());
            System.out.println(" 剩余本金: " + repayTask.getLeftPrincipal());
            //每月应还利息
            totalInst = totalInst.add(new BigDecimal(repayTask.getMustInst()));
        }
        System.out.println("应还总利息："+ totalInst);

    }

}
