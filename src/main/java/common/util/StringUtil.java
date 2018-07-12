package common.util;

import org.apache.commons.lang3.StringUtils;

import java.util.Map;
import java.util.Random;

/**
 *
 * Created by zpq on 17/10/30.
 * String工具类
 */
public class StringUtil extends StringUtils {
    /**
     * 左边补齐
     * @param str
     * @param len
     * @param add
     * @return
     * @Author zhangxinchao
     */
    public static String lpad(String str, int len, String add) {
        int relen = str.length();
        if (relen < len) {
            for (int i = 0; i < len - relen; i++) {
                str = add + str;
            }
        }
        return str;
    }



    /**
     * 替换模板
     * @param sourceContent
     * @param data
     * @return
     * @Author zhangxinchao
     */
    public static String replaceStringModel(String sourceContent, Map<String, String> data){
        if(sourceContent==null){
            return null;
        }
        String oldText = "";
        String newValue;
        while (true) {
            oldText = findStrBySplit(sourceContent, 2, "$");
            if (oldText.equals("")) {
                break;
            }
            // 替换变量
            newValue = data.get(oldText);
            if (newValue == null) {
                newValue = "";
            }
            sourceContent = replaceEx(sourceContent, "$" + oldText.trim() + "$", newValue);
        }
        return sourceContent;
    }

    /**
     * 替换变量
     *
     * @param strMain
     * @param strFind
     * @param strReplaceWith
     * @return
     * @Author zhangxinchao
     */
    public static String replaceEx(String strMain, String strFind, String strReplaceWith) {
        StringBuffer tSBql = new StringBuffer();
        String tStrMain = strMain.toLowerCase();
        String tStrFind = strFind.toLowerCase();
        int intStartIndex = 0;
        int intEndIndex = 0;

        if (strMain == null || strMain.equals("")) {
            return "";
        }

        while ((intEndIndex = tStrMain.indexOf(tStrFind, intStartIndex)) > -1) {
            tSBql.append(strMain.substring(intStartIndex, intEndIndex));
            tSBql.append(strReplaceWith);

            intStartIndex = intEndIndex + strFind.length();
        }
        tSBql.append(strMain.substring(intStartIndex, strMain.length()));

        return tSBql.toString();
    }

    /**
     *
     * @param c_Str
     * @param c_i
     * @param c_Split
     * @return
     * @Author zhangxinchao
     */
    public static String findStrBySplit(String c_Str, int c_i, String c_Split) {
        String t_Str1 = "", t_Str2 = "", t_strOld = "";
        int i = 0, i_Start = 0;
        t_Str1 = c_Str;
        t_Str2 = c_Split;
        i = 0;
        try {
            while (i < c_i) {
                i_Start = t_Str1.indexOf(t_Str2, 0);
                if (i_Start >= 0) {
                    i += 1;
                    t_strOld = t_Str1;
                    t_Str1 = t_Str1.substring(i_Start + t_Str2.length(), t_Str1.length());
                } else {
                    if (i != c_i - 1) {
                        t_Str1 = "";
                    }
                    break;
                }
            }

            if (i_Start >= 0) {
                t_Str1 = t_strOld.substring(0, i_Start);
            }
        }
        catch (Exception ex) {
            t_Str1 = "";
        }
        return t_Str1;
    }

    public static String objToStringNotNull(Object s) {
        if (s == null)
            return "";
        try {
            s = s.toString().trim();
        }
        catch (RuntimeException e) {
            return s.toString();
        }
        return s.toString();
    }


    /**
     * 随机生成6位随机验证码
     * @return
     */
    public static String createSMCode(int number){
        //验证码
        String vcode ="" ;
        Random r = new Random();
        for (int i = 0; i < number; i++) {
            // vcode = vcode + (int)(Math.random()*9);
            vcode = vcode + (int)(r.nextInt(10));
        }
        return vcode;
    }
}
