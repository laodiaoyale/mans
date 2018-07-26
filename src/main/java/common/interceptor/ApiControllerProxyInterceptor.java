package common.interceptor;

import com.bns.api.constants.CashloanConstants;
import common.exception.BaseException;
import common.message.ReqHeader;
import common.message.RespCodeCostant;
import common.util.FastJsonUtil;
import common.util.StringUtil;
import common.util.params.AnnotationDealUtil;
import common.util.properties.PropertiesUtil;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.springframework.core.DefaultParameterNameDiscoverer;
import org.springframework.core.MethodParameter;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Map;

import static common.util.gson.JsonUtil.isJson;
import static common.util.gson.JsonUtil.jsonToMap;

/**
 * @author zhaolei
 * @date 2017年11月11日22:56:48
 * 报文拦截、转换
 * 参数校验
 * 记录请求报文、返回报文
 */
public class ApiControllerProxyInterceptor extends HandlerInterceptorAdapter {
    Logger logger= Logger.getLogger(ApiControllerProxyInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof HandlerMethod) {
            String httpData= IOUtils.toString(request.getInputStream(),"UTF-8");
            logger.info("请求地址:"+request.getRequestURI());
            logger.info("请求报文:"+httpData);
            //验证请求报文
            verifyRequestData(httpData);
            Map<String,Object> reqMap = jsonToMap(httpData);
            //验证Token
            verifyToken(request.getRequestURI(),request.getHeader("token"),reqMap);
            //解析成Map
            HandlerMethod handlerMethod=(HandlerMethod)handler;
            //组装参数
            MethodParameter[] methodParameters= handlerMethod.getMethodParameters();
            Object[] params = new Object[methodParameters.length];
            for(int i = 0 ;i < methodParameters.length ; i++){
                //获取参数
                MethodParameter methodParameter = methodParameters[i];
                //获取参数类型
                Class<?> clazz=methodParameter.getParameterType();
                if(clazz == ReqHeader.class){ //退出使用
                    ReqHeader reqHeader = new ReqHeader();
                    reqHeader.setToken(request.getHeader("token"));
                    params[i] = reqHeader;
                }else if(clazz.isAssignableFrom(String.class)  || clazz.isAssignableFrom(int.class)  || clazz.isAssignableFrom(Integer.class)){
                    methodParameter.initParameterNameDiscovery(new DefaultParameterNameDiscoverer());
                    if(clazz==int.class|| clazz == Integer.class){
                        params[i] = ((Integer)reqMap.get(methodParameter.getParameterName())).intValue();
                    }else {
                        params[i] = reqMap.get(methodParameter.getParameterName());
                    }

                }else{
                    Object param = common.util.json.FastJsonUtil.jsonToObj(common.util.json.FastJsonUtil.objToJson(reqMap),clazz);
                    //验证属性上的注解
                    verifyParameterAnnotation(param);
                    params[i] = param;
                }
            }
            try{
                //controller方法调用
                long startTime=System.currentTimeMillis();
                Method method=handlerMethod.getMethod();
                Object data = method.invoke(handlerMethod.getBean(),params);
                long endTime=System.currentTimeMillis();
                String jsonData= FastJsonUtil.objToJson(data);
                logger.info("响应报文:"+jsonData);
                logger.info("请求地址:"+request.getRequestURI()+" 对应controller: "+handlerMethod.getBeanType().getName()+" 方法: "+method.getName()+" 执行时间: "+(endTime-startTime)+"  ms");
                IOUtils.write(jsonData,response.getOutputStream(),"UTF-8");
            }catch(InvocationTargetException ex){
                throw (Exception)ex.getTargetException();
            }
        }
        return false;

    }


    /**
     * 验证请求报文
     * @param httpData
     * @throws BaseException
     */
    private void verifyRequestData(String httpData)throws BaseException {
        if(StringUtil.isEmpty(httpData)){
            throw new BaseException(RespCodeCostant.REQ_MSG_FORMAT_ERR);
        }
        if(!isJson(httpData)){
            throw new BaseException(RespCodeCostant.REQ_MSG_FORMAT_ERR);
        }
    }
    /**
     * 验证参数注解
     */
    private void verifyParameterAnnotation(Object obj)throws BaseException {
        Map<String,Object> map =  AnnotationDealUtil.validate(obj);
        if(map.get("result").equals(false)) {
            throw new BaseException((String) map.get("message"));
        }
    }
    /**
     * 校验Token
     * @param url
     * @param token
     */
    private void verifyToken(String url,String token,Map<String,Object> mapBody) throws BaseException {
        String httpTokenFlag = PropertiesUtil.getStringByKey(CashloanConstants.SysParm.HTTP_TOKEN_FLAG, CashloanConstants.PropertiesConstants.SYSTEM_PROPERTIES);
        if(!Boolean.valueOf(httpTokenFlag)){
            return;
        }
        //判断请求地址是否需要用户编码
        if(!noTokenRequestUrl(url)){
            if(StringUtil.isBlank(token)){
                logger.error("未传入Token"+token);
                throw new BaseException(RespCodeCostant.TOKEN_IS_NULL);
            }
            String userNo = null;
            String roleId = null;
            try{
                Long startTime = System.currentTimeMillis();
                //从Redis获取custCode
//                userNo = JYJedisCache.get(token);
//                roleId = JYJedisCache.get(token+"_roleId");
                logger.info("redis链接时间"+ Long.toString(System.currentTimeMillis() - startTime));
                logger.info("token："+ token);
                logger.info("userNo："+ userNo);
            }catch (Exception e){

            }
            //登录过期
            if(StringUtil.isBlank(userNo)||StringUtil.isBlank(roleId)){
                throw new BaseException(RespCodeCostant.TOKEN_IS_NULL);
            }
            mapBody.put(CashloanConstants.OperatorData.USER_NO,userNo);
        }

    }
    /**
     * 不需要Token返回true
     * @return
     */
    private boolean noTokenRequestUrl(String httpUrl){
        String noTokenUrl = PropertiesUtil.getStringByKey(CashloanConstants.SysParm.NO_TOKEN_REQUEST_URL,CashloanConstants.PropertiesConstants.SYSTEM_PROPERTIES);
        String[] str = noTokenUrl.split(",");
        for(String s :str){
            if(httpUrl.contains(s)){
                return true;
            }
        }
        return false;
    }
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }

}
