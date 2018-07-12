package common.util.properties;

import java.io.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public final class ResourceLoader
{
    private static ResourceLoader loader = new ResourceLoader();
    private static Map<String, Properties> loaderMap = new HashMap();

    public static ResourceLoader getInstance()
    {
        return loader;
    }

    public Properties getPropFromProperties(String fileName) throws Exception
    {
        Properties prop = (Properties)loaderMap.get(fileName);
        if (prop != null) {
            return prop;
        }
        String filePath = null;
        String configPath = System.getProperty("confPath");

        if (configPath == null){
            filePath = super.getClass().getClassLoader().getResource(fileName).getPath();
        }else {
            filePath = configPath + "/" + fileName;
        }
        prop = new Properties();
        InputStream in = null;
            in = new BufferedInputStream(new FileInputStream(filePath));
            //prop.load(in);//直接这么写，如果properties文件中有汉子，则汉字会乱码。因为未设置编码格式。
            prop.load(new InputStreamReader(in, "UTF-8"));
            if (in != null) {
                in.close();
            }
        loaderMap.put(fileName, prop);
        return prop;
    }
}