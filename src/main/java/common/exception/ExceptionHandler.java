package common.exception;

import com.bns.api.exception.InterfaceBusinessException;
import common.message.JsonResult;
import common.message.JsonView;
import common.message.RespCodeCostant;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Enumeration;
import java.util.HashMap;


/**
 * 统一异常处理，用于将 Exception 转换为共客户端使用的 errorcode
 * @author xiao
 * @datetime 2016年11月7日 下午6:49:04
 */
public class ExceptionHandler implements HandlerExceptionResolver {
	Logger logger= Logger.getLogger(ExceptionHandler.class);
	@Override
	public ModelAndView resolveException(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex) {
		Enumeration<String> enu=request.getParameterNames();
	    StringBuffer buf = new StringBuffer();
	    if(null!=enu){
			while(enu.hasMoreElements()){
				String paraName=enu.nextElement();
				buf.append(paraName+"="+request.getParameter(paraName)+";");
			}
	    }
        JsonResult json = new JsonResult();
	    ex.printStackTrace();
	    if(ex instanceof BaseException || ex instanceof InterfaceBusinessException){
            RespCodeCostant rspCode = ((BaseException) ex).getRespCodeMessage();
			if(rspCode != null){
				json.setError(rspCode);
			}else if(ex.getMessage() != null && !ex.getMessage().trim().equals("")){
				json = new JsonResult("999999",ex.getMessage());
			} else{
				json.setError(RespCodeCostant.SYS_ERR);
			}
		}else{
			json.setError(RespCodeCostant.SYS_ERR);
		}
		json.setBody(new HashMap<>());
		logger.error(" request uri "+request.getRequestURI()+" error ",ex);
	    return new ModelAndView(new JsonView()).addObject("error",json);
	}

}