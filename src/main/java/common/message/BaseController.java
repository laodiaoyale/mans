package common.message;


public class BaseController {

    public JsonResult initJsonResult() {
        JsonResult jsonResult = new JsonResult();
        jsonResult.setError(RespCodeCostant.OK);
        return jsonResult;
    }
}
