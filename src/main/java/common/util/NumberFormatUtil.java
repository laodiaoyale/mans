package common.util;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;
import org.apache.commons.lang3.StringUtils;

/**
 * 数字转换工具类
 * Created by TianTianLi on 上午11:18 2017/11/10.
 */

public class NumberFormatUtil {
    public static final  String First = "1";
    public static final  String Second = "2";
    public static final  String Third = "3";

    /**
     *将小数转化为百分数形式的字符串     比如：0.85 → 85.00% [最优的方法]
     * @param num    待转化的数字
     * @param parten 转化为百分数后，小数点后保留的位数，最大保留三位，  如："2",保留两位小数。
     * @return
     */
    public static String  getPercentInstance(Number num,String parten){

        String str =null;
        if(First.equals(parten)){
            parten="0.0%";
        }else if(Second.equals(parten)){
            parten="0.00%";
        }else if(Third.equals(parten)){
            parten="0.000%";
        }else{
            parten=null;
        }
        if(StringUtils.isNotEmpty(parten)){
            DecimalFormat decimal = new DecimalFormat(parten);
            decimal.setRoundingMode(RoundingMode.HALF_UP);
            str = decimal.format(num!=null ? num :0);
        }
        return str;
    }


    /**
     * String类型数字后面始终保留小数
     * @param str   String类型的数字
     * @param mark  小数点后保留的位数，最大保留三位，  如："2",保留两位小数。
     * @return
     */
    public static String makeStringFormat(String str,String mark){
        DecimalFormat format = null;
        if(First.equals(mark)){
            format = new DecimalFormat("0.0");
        }else if(Second.equals(mark)){
            format = new DecimalFormat("0.00");
        }else if(Third.equals(mark)){
            format = new DecimalFormat("0.000");
        }
        if(format!=null&&isNumber(str)){
            str=format.format(new BigDecimal(str));
        }
        return str;
    }



    /**
     *  判断字符串是否是整数
     */
    public static boolean isInteger(String value) {
        try {
            Integer.parseInt(value);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    /**
     *  判断字符串是否是浮点数
     */
    public static boolean isDouble(String value) {
        try {
            Double.parseDouble(value);
            if (value.contains("."))
                return true;
            return false;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    /**
     *  判断字符串是否是数字
     */
    public static boolean isNumber(String value) {
        return isInteger(value) || isDouble(value);
    }


    /**
     * 将long类型转化为浮点float类型
     */
    public static float makeLongToFloat(long value) {
        //Long的静态方法取得Long对象，再以 float 形式返回此 Long 的值
        return  Long.valueOf(value).floatValue();

    }
}
