package common.util.excel;

public class ExportExcelDto {
    private String display;
    private String code;
    private String type;
    private SelectValue[] value;
    private String isExport = "true";

    public ExportExcelDto() {
    }

    public ExportExcelDto(String display, String code, String type, SelectValue[] value) {
        this.display = display;
        this.code = code;
        this.type = type;
        this.value = value;
    }

    public ExportExcelDto(String display, String code, String type) {
        this.display = display;
        this.code = code;
        this.type = type;
    }

    public String getDisplay() {
        return this.display;
    }

    public void setDisplay(String display) {
        this.display = display;
    }

    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getIsExport() {
        return this.isExport;
    }

    public void setIsExport(String isExport) {
        this.isExport = isExport;
    }

    public SelectValue[] getValue() {
        return this.value;
    }

    public void setValue(SelectValue[] value) {
        this.value = value;
    }
}
