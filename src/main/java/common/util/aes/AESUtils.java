/**
 * @Title: AESUtils.java
 * @Package com.jy.modules.platform.ldap.hash.util
 * @Description: AES密码工具类
 * @author luoyr
 * @date 2015年7月22日 下午4:59:57
 * @version V1.0
 */
package common.util.aes;

import common.exception.BaseException;
import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.Provider;
import java.security.SecureRandom;
import java.security.Security;
import java.util.Arrays;


/**
 * @ClassName: AESUtils
 * @Description: aes对称加密解密工具类,注意密钥不能随机生机,不同客户端调用可能需要考虑不同Provider,
 * 考虑安卓与IOS不同平台复杂度,简化不使用Provider
 * @author luoyr
 * @date 2015年7月22日 下午4:59:57
 *
 */
public class AESUtils {

	/***默认向量常量**/
	public static final String IV = "2015030120123456";
	private final static Logger logger = LoggerFactory.getLogger(AESUtils.class);
	/**
	 * 加密 128位
	 * @param content 需要加密的内容
	 * @param pkey 加密密码
	 * @return
	 */
	public static byte[] aesEncrypt(String content, String pkey) {
		try {
			SecretKeySpec key = new SecretKeySpec(pkey.getBytes(), "AES");
			// "算法/模式/补码方式"
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			IvParameterSpec iv = new IvParameterSpec(IV.getBytes());
			cipher.init(Cipher.ENCRYPT_MODE, key, iv);
			byte[] encrypted = cipher.doFinal(content.getBytes("UTF-8"));
			return encrypted;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	/**
	 * 获得密钥
	 * @param secretKey
	 * @return
	 * @throws Exception
	 */
	private static SecretKey  generateKey(String secretKey) throws Exception{
	    //防止linux下 随机生成key
		Provider p=Security.getProvider("SUN");
	    SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG",p);
	    secureRandom.setSeed(secretKey.getBytes());
	    KeyGenerator kg = KeyGenerator.getInstance("AES");
	    kg.init(secureRandom);
	    // 生成密钥
	    return kg.generateKey();
	}
	/**
	 * @Title: aesEncryptStr
	 * @Description: aes对称加密
	 * @param  content
	 * @param  pkey 长度为16个字符,128位
	 * @param @return    设定文件
	 * @return String    返回类型
	 * @throws
	 */
	public static String aesEncryptStr(String content, String pkey){
		byte[] aesEncrypt = aesEncrypt(content, pkey);
		String base64EncodeStr = Base64.encodeBase64String(aesEncrypt);
		return base64EncodeStr;
	}
	/**
	 * @throws Exception
	 * @Title: aesDecodeStr
	 * @Description: 解密 失败将返回NULL
	 * @param  content base64处理过的字符串
	 * @param  pkey
	 * @return String    返回类型
	 * @throws
	 */
	public static String aesDecodeStr(String content, String pkey) throws BaseException {
		try {
			byte[] base64DecodeStr = Base64.decodeBase64(content);
			logger.debug("base64DecodeStr String:"+Arrays.toString(base64DecodeStr));
			byte[] aesDecode = aesDecode(base64DecodeStr, pkey);
			if(aesDecode == null){
				return null;
			}
			String result;

			result = new String(aesDecode,"UTF-8");

			logger.debug("aesDecode result:"+result);
			return result;
		} catch (Exception e) {
			logger.debug("AppException:"+e.getMessage());
			throw new BaseException(e.getMessage());
		}
	}

	/**
	 * 解密 128位
	 *
	 * @param content
	 *            待解密内容
	 * @param pkey
	 *            解密密钥
	 * @return
	 * @throws Exception
	 */
	public static byte[] aesDecode(byte[] content, String pkey) throws Exception {
		SecretKeySpec key = new SecretKeySpec(pkey.getBytes(), "AES");
		IvParameterSpec iv = new IvParameterSpec(IV.getBytes("UTF-8"));
		// 创建密码器
		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
		// 初始化
		cipher.init(Cipher.DECRYPT_MODE, key,iv);
		byte[] result = cipher.doFinal(content);
		return result;


	}

}
