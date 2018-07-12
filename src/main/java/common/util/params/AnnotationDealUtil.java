package common.util.params;

import common.annotation.NotBlank;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;


/**
 * 注解验证处理类
 * @author zhaolei
 * @date 2017年11月11日22:56:14
 */
public class AnnotationDealUtil {
    /**
     * @param bean 验证的实体
     * @return
     */
    @SuppressWarnings("unchecked")
    public static Map<String, Object> validate(Object bean) {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("message", "验证通过");
        result.put("result", true);
        Class<?> cls = bean.getClass();
        // 检测field是否存在
        try {
            //循环查询父类
            for (; cls != Object.class; cls = cls.getSuperclass()) {
                // 获取实体字段集合
                Field[] fields = cls.getDeclaredFields();
                for (Field f : fields) {
                    // 通过反射获取该属性对应的值
                    f.setAccessible(true);
                    // 获取字段值
                    Object value = f.get(bean);
                    // 获取字段上的注解集合
                    Annotation[] arrayAno = f.getAnnotations();
                    for (Annotation annotation : arrayAno) {
                        // 获取注解类型（注解类的Class）
                        Class<?> clazz = annotation.annotationType();
                        // 获取注解类中的方法集合
                        Method[] methodArray = clazz.getDeclaredMethods();
                        for (Method method : methodArray) {
                            // 过滤错误提示方法的调用
                            result = isEmpty(value,f);
                            if(result.get("result").equals(false)) {
                                return result;
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 验证是否空值
     *
     * @param value 参数值
     * @param field 字段
     * @return
     */
    public static Map<String, Object> isEmpty(Object value, Field field) {
        Map<String, Object> validateResult = new HashMap<String, Object>();
        NotBlank annotation = field.getAnnotation(NotBlank.class);
        if(value == null || value.equals("")){
            validateResult.put("message", field.getName() + annotation.message());
            validateResult.put("result", false);
        }else if(value instanceof Integer && (int)value==0) {
            validateResult.put("message", field.getName() + annotation.message());
            validateResult.put("result", false);
        } else {
            validateResult.put("message", "验证通过");
            validateResult.put("result", true);
        }
        return validateResult;
    }

}