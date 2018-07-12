package com.bns.model.sys;

/**
 * 参数信息
 * @Author xiangzebing
 */
public class SysConfigDTO {
    private static final long serialVersionUID = 1L;

    private Long id;

    private String configName;

    private String configCode;

    private String configValue;

    private String configType;

    private String validateState;

    private Long version;

    public Long getId()
    {
        return this.id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public String getConfigName()
    {
        return this.configName;
    }

    public void setConfigName(String configName)
    {
        this.configName = configName;
    }

    public String getConfigCode()
    {
        return this.configCode;
    }

    public void setConfigCode(String configCode)
    {
        this.configCode = configCode;
    }

    public String getConfigValue()
    {
        return this.configValue;
    }

    public void setConfigValue(String configValue)
    {
        this.configValue = configValue;
    }

    public String getConfigType()
    {
        return this.configType;
    }

    public void setConfigType(String configType)
    {
        this.configType = configType;
    }

    public String getValidateState()
    {
        return this.validateState;
    }

    public void setValidateState(String validateState)
    {
        this.validateState = validateState;
    }

    public Long getVersion()
    {
        return this.version;
    }

    public void setVersion(Long version)
    {
        this.version = version;
    }
}
