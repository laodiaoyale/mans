package common.message;


public class BaseController {

    protected JsonResult initJsonResult() {
        JsonResult jsonResult = new JsonResult();
        jsonResult.setError(RespCodeCostant.OK);
        return jsonResult;
    }
}
