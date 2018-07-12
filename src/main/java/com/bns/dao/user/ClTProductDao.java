package com.bns.dao.user;

import com.bns.model.user.ClTProductDTO;
import common.annotation.MyBatisRepository;

@MyBatisRepository
public interface ClTProductDao {
    ClTProductDTO selectByProductRate(String productRate);
}