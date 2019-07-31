package common.message;

import org.apache.poi.ss.formula.functions.T;

/**
 * <p>className: ResultGenerator</p>
 * <p>description: 1</p>
 *
 * @author 1
 * @version 1
 * @date 2019-07-30 18:15
 */
public class ResultGenerator {

    public static JsonResult goSuccessResult(Object body){
        JsonResult jsonResult = new JsonResult();
        jsonResult.setError(RespCodeCostant.OK);
        jsonResult.setBody(body);
        return jsonResult;
    }
}