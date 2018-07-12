package com.bns.api.ddenum;

/**
 * Created by TianTianLi on 上午11:03 2017/12/6.
 */
public enum ContractFileType {
    PDF(1),
    ZIP(2);

    private int fileType;

    ContractFileType(int fileType) {
        this.fileType = fileType;
    }

    public int getFileType() {
        return fileType;
    }

    public void setFileType(int fileType) {
        this.fileType = fileType;
    }
}
