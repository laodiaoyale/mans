package common.annotation;

import java.lang.annotation.*;

/**
 * 接口输入参数注解,
 * 输入参数需要此注解绑定, 此注解会自动转换输入参数为绑定类型
 * @author xiao
 * @datetime 2016年11月30日 下午6:15:32
 */
@Documented
@Inherited
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface NotBlank {

	public String message() default "字段不能为空！";
}
