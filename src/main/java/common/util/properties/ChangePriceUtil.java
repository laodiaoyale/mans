package common.util.properties;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * 金额类型转换的工具类
 * Created by TianTianLi on 上午11:27 2017/11/10.
 */

public class ChangePriceUtil {
    public static String ChangePriceForInteger(Integer price){
        String priceStr = null;
        if(price==null || price==0){
            priceStr = "0.00";
        }else{
            double doubleValue = price.doubleValue();
            BigDecimal bd = new BigDecimal(doubleValue);
            BigDecimal divide = bd.divide(new BigDecimal(100));
            bd = divide.setScale(2, RoundingMode.HALF_UP);
            priceStr = bd.toString();
        }
        return priceStr;
    }

    public static String ChangePrice2Str(Double price){
        String pricStr = "0.00";
        Integer pric = 0;
        if(price!=null){
            //BigDecimal bd = new BigDecimal(price*100);//也会精度会丢失
            //BigDecimal multiply = bd.multiply(new BigDecimal(100));//精度会丢失

            BigDecimal priceBdc = new BigDecimal(price+"");
            BigDecimal bd = priceBdc.multiply(new BigDecimal(100));
            pric = bd.intValue();
            pricStr = ChangePriceForInteger(pric);
        }
        return pricStr;
    }
    public static Integer ChangePrice(Double price){
        Integer pric = 0;
        if(price!=null){
            //BigDecimal bd = new BigDecimal(price*100);//也会精度会丢失
            //BigDecimal multiply = bd.multiply(new BigDecimal(100));//精度会丢失

            BigDecimal priceBdc = new BigDecimal(price+"");
            BigDecimal bd = priceBdc.multiply(new BigDecimal(100));

            pric = bd.intValue();
        }
        return pric;
    }
    public static Integer ChangePrice(BigDecimal price){
        Integer pric = 0;
        if(price!=null){
            BigDecimal bd = price.multiply(new BigDecimal(100));
            pric = bd.intValue();
        }
        return pric;
    }

    public static void main(String[] args) {

        Integer tt  = 20134500;
        String changePriceForInteger = ChangePriceUtil.ChangePriceForInteger(tt);
        System.out.println(changePriceForInteger);
        //Double.parseDouble(changePriceForInteger);
        System.out.println(Double.valueOf(changePriceForInteger));



        double aa = 34.8;
        Integer changePrice = ChangePrice(aa);
        String bb = ChangePrice2Str(aa);
        System.out.println(changePrice);
        System.out.println(bb);


//		BigDecimal b = new BigDecimal("34.8");
        BigDecimal b = new BigDecimal(aa+"");
        BigDecimal r = b.multiply(new BigDecimal(100));

        System.out.println(r.doubleValue());
        System.out.println(r.intValue());
        System.out.println(r.toPlainString());

    }
}
