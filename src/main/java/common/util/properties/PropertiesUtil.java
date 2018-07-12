package common.util.properties;
import java.util.Properties;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

public class PropertiesUtil {
    private static Logger logger = LogManager.getLogger(PropertiesUtil.class);
    private static ResourceLoader loader = ResourceLoader.getInstance();
    private static ConcurrentMap<String, String> configMap = new ConcurrentHashMap();
    private static Properties prop = null;
    public PropertiesUtil() {
    }

    public static String getStringByKey(String key, String propName) {
        CacheManager cacheManager = CacheManager.create();
        Cache cache = cacheManager.getCache(propName);
        if(null == cache){
            return getValueBykey(key,propName);
        }
        Element element = cache.get(key);
        if (null == element) {
            //如果缓存不存在或者已经失效，则更新缓存
            String value = getValueBykey(key,propName);
            if(value != null) {
                element = new Element(key, value);
                cache.put(element);
                return value;
            }
        }else{
            //从缓存中获取对象
            String value = (String)element.getObjectValue();
            if (value != null) {
                return value;
            }
        }
        return getValueBykey(key,propName);
    }

    public static String getValueBykey(String key,String propName){
        try {
            prop = loader.getPropFromProperties(propName);
        } catch (Exception var3) {
            logger.error("getStringByKey error", var3);
            throw new RuntimeException(var3);
        }

        key = key.trim();
        if (!configMap.containsKey(key) && prop.getProperty(key) != null) {
            configMap.put(key, prop.getProperty(key));
        }

        return (String)configMap.get(key);
    }

}
