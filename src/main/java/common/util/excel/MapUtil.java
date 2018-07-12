package common.util.excel;

import org.springframework.cglib.beans.BeanMap;

import java.util.HashMap;
import java.util.Map;

public class MapUtil {

    /***
     * java bean 转map
     * @param bean
     * @param <T>
     * @return
     */
    public static <T> Map<String, Object> beanToMap(T bean) {
                    Map<String, Object> map = new HashMap<>();
                    if (bean != null) {
                        BeanMap beanMap = BeanMap.create(bean);
                        for (Object key : beanMap.keySet()) {
                            map.put(key+"", beanMap.get(key));
                        }
                    }
                    return map;
                }
}
