package common.message;

import common.util.gson.JsonUtil;
import org.springframework.web.servlet.view.AbstractView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.Map;


/**
 * json试图解析器,自动转换为json数据返回
 */
public class JsonView extends AbstractView {

	@Override
	protected void renderMergedOutputModel(Map<String, Object> arg0,
			HttpServletRequest arg1, HttpServletResponse arg2) throws Exception {
		arg2.setHeader("Access-Control-Allow-Origin", "*");
		arg2.setCharacterEncoding("UTF-8");
		arg2.setContentType("text/json; charset=UTF-8");
        JsonResult json ;
		if(arg0 != null && arg0.containsKey("error")){
			json = (JsonResult) arg0.get("error");
		}else{
			json = new JsonResult();
			json.setError(RespCodeCostant.SYS_ERR);
		}
		PrintWriter out = arg2.getWriter();
		out.write(JsonUtil.getGson().toJson(json));
		out.flush();
		out.close();
	}

}
