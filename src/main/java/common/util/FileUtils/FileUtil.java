package common.util.FileUtils;

import org.apache.commons.io.IOUtils;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

/**
 * Created by TianTianLi on 下午5:31 2017/11/14.
 */

public class FileUtil {
    public static void getTxtFile(byte[] data) throws Exception {
        ZipInputStream zipStream = new ZipInputStream(new ByteArrayInputStream(data));
        ZipEntry entry = null;
        while ((entry = zipStream.getNextEntry()) != null) {
            String entryName = entry.getName();
            FileOutputStream out = new FileOutputStream("/log/111/" + entryName);
            byte[] byteBuff = new byte[4096];
            int bytesRead = 0;
            while ((bytesRead = zipStream.read(byteBuff)) != -1) {
                out.write(byteBuff, 0, bytesRead);
            }
            out.close();
            zipStream.closeEntry();
        }
        zipStream.close();
    }
    public static File getFile(byte[] bfile, String filePath) {
        BufferedOutputStream bos = null;
        FileOutputStream fos = null;
        File file = null;
        try {
            file = new File(filePath);
            if (!file.exists()) {
                file.createNewFile();
            }
            fos = new FileOutputStream(file);
            bos = new BufferedOutputStream(fos);
            IOUtils.write(bfile, bos);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (bos != null) {
                try {
                    bos.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }
            if (fos != null) {
                try {
                    fos.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }
        }

        return file;
    }
    public static String stream2FileByPath(InputStream inputStream, String tempPath){
        String newPath = null;
        BufferedInputStream bin=new BufferedInputStream(inputStream);
        try {
            File file=new File(tempPath);
            if(!file.exists()){
                (new File(file.getParent())).mkdirs();
            }
            FileOutputStream out=new FileOutputStream(file);
            BufferedOutputStream bout=new BufferedOutputStream(out);
            int b;
            while((b=bin.read())!=-1){
                bout.write(b);
            }
            bout.close();
            out.close();
            //获取压缩包中的所有图片信息
            newPath = file.getAbsolutePath();
        } catch (Exception e) {

        }finally{
            try {
                if(bin!=null)bin.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return newPath;
    }
    public static void getZipFile(byte[] data) throws Exception {
        String filename = "/log/111/111.zip";
        FileOutputStream fileOutputStream = new FileOutputStream(filename);
        ZipOutputStream zos = new ZipOutputStream(fileOutputStream);

        ZipInputStream zipStream = new ZipInputStream(new ByteArrayInputStream(data));
        ZipEntry entry;
        while ((entry = zipStream.getNextEntry()) != null) {
            ZipEntry entry1 = new ZipEntry(entry.getName());
            zos.putNextEntry(entry1);
            zipStream.closeEntry();
        }
        zos.write(data);
        zos.flush();
        zos.closeEntry();
        zos.close();
        zipStream.close();
    }
    public static List<String> unzip(InputStream inputStream, String tempPath){
        List<String> listPic = new ArrayList<String>();
        ZipEntry entry =null;
        //接受上传的zip压缩包 解压
        InputStream input = inputStream;
        ZipInputStream zin=new ZipInputStream(input);//输入源zip路径
        BufferedInputStream bin=new BufferedInputStream(zin);
        try {
            while((entry = zin.getNextEntry())!=null && !entry.isDirectory()){
                File file=new File(tempPath,entry.getName());
                if(!file.exists()){
                    (new File(file.getParent())).mkdirs();
                }
                FileOutputStream out=new FileOutputStream(file);
                BufferedOutputStream bout=new BufferedOutputStream(out);
                int b;
                while((b=bin.read())!=-1){
                    bout.write(b);
                }
                bout.close();
                out.close();
                //获取压缩包中的所有图片信息
                listPic.add(file.getAbsolutePath());
            }
        } catch (Exception e) {
            e.getMessage();
        }finally{
            try {
                if(bin!=null)bin.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if(zin!=null)zin.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        return listPic;
    }
    public static Map<String,String> unzip2map(InputStream inputStream, String tempPath){
        Map<String,String> mapPic = new HashMap<>();
        ZipEntry entry =null;
        //接受上传的zip压缩包 解压
        InputStream input = inputStream;
        ZipInputStream zin=new ZipInputStream(input);//输入源zip路径
        BufferedInputStream bin=new BufferedInputStream(zin);
        try {
            while((entry = zin.getNextEntry())!=null && !entry.isDirectory()){
                File file=new File(tempPath,entry.getName());
                if(!file.exists()){
                    (new File(file.getParent())).mkdirs();
                }
                FileOutputStream out=new FileOutputStream(file);
                BufferedOutputStream bout=new BufferedOutputStream(out);
                int b;
                while((b=bin.read())!=-1){
                    bout.write(b);
                }
                bout.close();
                out.close();
                mapPic.put(file.getName(),file.getAbsolutePath());
            }
        } catch (Exception e) {
            e.getMessage();
        }finally{
            try {
                if(bin!=null)bin.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if(zin!=null)zin.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        return mapPic;
    }

    /**
     * 删除文件夹,先删除文件夹里面的所有文件，再删除空的文件夹！
     * @param path
     * @return
     */
    public static boolean deleteFolder(String path) {
        boolean isok = true;
        try {
            deleteAllFiles(path);//删除文件夹里的所有文件！
            File file = new File(path);
            if (file.exists()) {
                file.delete();//删除空的文件夹
            }
        } catch (Exception e) {

            System.out.println("删除文件夹操作有误！");
            isok = false;
            e.printStackTrace();
        }
        return isok;
    }

    /**
     * 删除文件夹下的所有文件
     * @param path
     */
    public static void deleteAllFiles(String path) {

        File file = new File(path);
        if (!file.exists())//文件夹不存在
        {
            return;
        }
        if (!file.isDirectory())//不是文件夹
        {
            return;
        }
        // tempList数组得到的只是该文件夹下所有的相对路径名！
        String[] tempList = file.list();
        File tempfile = null;
        for (int i = 0; i < tempList.length; i++) {
            if (path.endsWith(File.separator)) {
                tempfile = new File(path + tempList[i]);
            } else {
                tempfile = new File(path + File.separator + tempList[i]);
            }
            if (tempfile.isFile()) {
                tempfile.delete();
            }
            if (tempfile.isDirectory()) {
                deleteFolder(tempfile.getAbsolutePath());
            }
        }
    }
}
