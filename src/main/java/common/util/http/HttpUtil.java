package common.util.http;
import common.exception.BaseException;
import common.message.JsonResult;
import common.message.RespCodeCostant;
import common.util.FastJsonUtil;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

public class HttpUtil {
    private static Logger logger = LoggerFactory.getLogger(HttpUtil.class);     //日志记录
    private static int REQUEST_TIMEOUT = 30 * 1000; // 设置请求超时30秒钟
    private static int TIMEOUT         = 60 * 1000; // 连接超时时间
    private static int SO_TIMEOUT      = 60 * 1000; // 数据传输超时

    //static HttpClient httpClient;
    /****
     * 阅信 发送请求
     * @param url
     * @param params
     * @return
     */
    public static String sendYueXinPost(String url,Map<String,String> params) {
        //构建请求参数
        StringBuffer sb = new StringBuffer();
        if(params != null) {
            for(Map.Entry<String,String> e : params.entrySet()) {
                sb.append(e.getKey()).append("=").append(e.getValue()).append("&");
            }
            sb.substring(0,sb.length() - 1);
        }
        URL u = null;
        HttpURLConnection con = null;
        //尝试发送请求
        try {
            con = getConnection(url,6000);
            OutputStreamWriter osw = new OutputStreamWriter(con.getOutputStream(),"UTF-8");
            osw.write(sb.toString());
            osw.flush();
            osw.close();
        }catch(Exception e) {
            e.printStackTrace();
        }finally {
            if(con != null) {
                con.disconnect();
            }
        }
        //读取返回内容
        StringBuffer buffer = new StringBuffer();
        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(),"UTF-8"));
            String temp;
            while ((temp = br.readLine()) != null) {
                buffer.append(temp).append("\n");
            }
        }catch (Exception e) {
            e.printStackTrace();
        }
        return buffer.toString();
    }


    public static HttpURLConnection getConnection(String url,int timeOut) throws IOException {
        HttpURLConnection connection = null;
        URL paostUrl = new URL(url);
        //参数配置
        connection = (HttpURLConnection) paostUrl.openConnection();
        connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
        connection.setRequestMethod("POST");
        connection.setDoOutput(true);
        connection.setDoInput(true);
        connection.setUseCaches(false);
        connection.setInstanceFollowRedirects(true);
        connection.setConnectTimeout(timeOut);
        connection.setReadTimeout(5000);

        return connection;
    }

    /**
     * InputStream转换成Byte
     *
     *@paramin
     *@return byte
     *@throwsException
     */

    public static byte[] inputStreamToByte(InputStream in) {
        ByteArrayOutputStream out = null;
        try {
            int BUFFER_SIZE = 4096;
            out = new ByteArrayOutputStream();
            byte[] data = new byte[BUFFER_SIZE];
            int count = -1;
            while ((count = in.read(data, 0, BUFFER_SIZE)) != -1) {
                out.write(data, 0, count);
            }
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            try {
                in.close();
                out.close();
            } catch (IOException e) {
            }
        }
    }

    /**
     * 调用大数据接口的Http工具
     * @param url
     * @param params
     * @return
     */
    public static String doPosts(String url , Map<String,Object> params) {
        HttpClient httpClient = null;
        HttpPost httpPost = null;
        String result = null;
       String resultString = FastJsonUtil.objToJson(params);
        try {
            httpClient = new DefaultHttpClient();
            httpPost = new HttpPost(url);
            StringEntity entity = new StringEntity(resultString, "utf-8");// 解决中文乱码问题
            entity.setContentType("application/json;charset=utf-8");
            httpPost.setEntity(entity);

            HttpResponse response = httpClient.execute(httpPost);
            if (response != null) {
                HttpEntity resEntity = response.getEntity();
                if (resEntity != null) {
                    result = EntityUtils.toString(resEntity);
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return result;
    }

    /***
     * wujinfeng
     * get 请求
     * @param url
     * @param params
     * @return
     * @throws IOException
     */
    public static String executeJsonGet(String url,Map<String, String> params) throws IOException, BaseException {
        String result = "";
        if (params != null && !params.isEmpty()) {
            url += "?";
            Set<Map.Entry<String, String>> set = params.entrySet();
            List<Map.Entry<String, String>> list = new ArrayList<Map.Entry<String, String>>();
            list.addAll(set);
            for (int i = 0; i < list.size(); i++) {
                Map.Entry<String, String> en = list.get(i);
                if (i == list.size() - 1) {
                    url += en.getKey() + "=" + en.getValue();
                } else {
                    url += en.getKey() + "=" + en.getValue() + "&";
                }
            }
        }
        HttpClient client = HttpClients.createDefault();
        HttpGet httpGet = new HttpGet(url);
        httpGet.setHeader("Content-type", "application/json; charset=utf-8");
        RequestConfig requestConfig = RequestConfig.custom()
                .setSocketTimeout(SO_TIMEOUT).setConnectTimeout(TIMEOUT)
                .setConnectionRequestTimeout(REQUEST_TIMEOUT)
                .setExpectContinueEnabled(false).build();
        httpGet.setConfig(requestConfig);
        HttpResponse response = client.execute(httpGet);
        HttpEntity entity = response.getEntity();
        result = EntityUtils.toString(entity, "utf-8");
        if (response.getStatusLine().getStatusCode() == 200) {
            return result;
        } else {
            logger.error("get请求失败");
            throw new BaseException("100001","get请求失败");
        }
    }

}
