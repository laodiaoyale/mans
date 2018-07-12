package common.util.gson;

import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import org.apache.log4j.Logger;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * Created by zpq on 17/11/5.
 */
public class JsonUtil {
    static Logger  logger= Logger.getLogger(JsonUtil.class);

    public static Gson getGson(){
        Gson gson  = new GsonBuilder().serializeNulls().registerTypeAdapterFactory(new NullStringToEmptyAdapterFactory()).create();
        return gson;
    }

    public static boolean isJson(String josnStr){
        try {
            new JsonParser().parse(josnStr);
            return true;
        } catch (Exception ex) {
            logger.error("bad json: ",ex);
            return false;
        }
    }

    public static Map<String,Object> jsonToMap(String json){
        Type type = new TypeToken<Map<?, ?>>() {}.getType();
        return getToMapGson().fromJson(json,type);
    }

    public static Gson getToMapGson(){
        return new GsonBuilder()
                .registerTypeAdapter(
                        new TypeToken<Map<String, Object>>(){}.getType(),
                        new JsonDeserializer<Map<String, Object>>() {
                            @Override
                            public Map<String, Object> deserialize(
                                    JsonElement json, Type typeOfT,
                                    JsonDeserializationContext context) throws JsonParseException {

                                Map<String, Object> treeMap = new HashMap<>();
                                JsonObject jsonObject = json.getAsJsonObject();
                                Set<Map.Entry<String, JsonElement>> entrySet = jsonObject.entrySet();
                                for (Map.Entry<String, JsonElement> entry : entrySet) {
                                    treeMap.put(entry.getKey(), entry.getValue());
                                }
                                return treeMap;
                            }
                        }).create();
    }

}
