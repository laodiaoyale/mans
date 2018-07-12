package common.util.md5;

import org.apache.commons.codec.digest.DigestUtils;

import java.security.MessageDigest;

public class Md5Util
{
    public static String md5(String rawContext)
    {
        return DigestUtils.md5Hex(rawContext);
    }

    public static String md5(String rawContext, String salt) {
        return DigestUtils.md5Hex(rawContext + salt);
    }

    public static String MD51(String str) {
        MessageDigest md5 = null;
        try {
            md5 = MessageDigest.getInstance("MD5");
        }catch (Exception e) {
            e.printStackTrace();
            return "";
        }
        char[] charArray = str.toCharArray();
        byte[] byteArray = new byte[charArray.length];
        for(int i = 0;i < charArray.length;i++)
            byteArray[i] = (byte) charArray[i];
        byte[] md5Bytes = md5.digest(byteArray);
        StringBuffer hexValue = new StringBuffer();
        for(int i = 0; i < md5Bytes.length;i++) {
            int val = ((int) md5Bytes[i]) & 0xff;
            if(val < 16) {
                hexValue.append("0");
            }
            hexValue.append(Integer.toHexString(val));
        }
        return hexValue.toString();
    }
}