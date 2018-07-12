package common.util.excel;

public class SelectValue {
    private String text;
    private String value;

    public SelectValue() {
    }

    public String toString() {
        return "SelectValue [text=" + this.text + ", value=" + this.value + "]";
    }

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getValue() {
        return this.value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
