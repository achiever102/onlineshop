package com.achievers.onlineshop.admin.repository;

import com.achievers.onlineshop.admin.model.Setting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SettingRepository extends JpaRepository<Setting, Long> {

    @Query(value = "SELECT * FROM SETTINGS WHERE NAME=:param", nativeQuery = true)
    Setting getParamValueByName(@Param("param") String param);

}
