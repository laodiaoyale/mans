package com.bns.dao.report;

import com.bns.api.report.param.UserReportParam;
import com.bns.model.report.BnsUserReport;
import com.bns.model.user.BnsUser;
import common.annotation.MyBatisRepository;

import java.util.List;

@MyBatisRepository
public interface BnsUserReportDao {

    List<BnsUserReport> findPaging(UserReportParam param);

    List<BnsUserReport> findPagingByTime(UserReportParam param);

    int deleteByPrimaryKey(Integer id);

    int insert(BnsUserReport record);

    BnsUserReport selectByPrimaryKey(Integer id);

    List<BnsUserReport> selectAll(UserReportParam param);

    int updateByPrimaryKey(BnsUserReport record);
}