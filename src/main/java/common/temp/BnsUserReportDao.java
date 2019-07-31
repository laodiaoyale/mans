package common.temp;

import common.temp.BnsUserReport;
import java.util.List;

public interface BnsUserReportDao {
    int deleteByPrimaryKey(Integer id);

    int insert(BnsUserReport record);

    BnsUserReport selectByPrimaryKey(Integer id);

    List<BnsUserReport> selectAll();

    int updateByPrimaryKey(BnsUserReport record);
}