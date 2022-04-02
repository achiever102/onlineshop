package com.achievers.onlineshop.admin.repository;

import com.achievers.onlineshop.admin.model.Category;
import com.achievers.onlineshop.admin.model.Platform;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlatformRepository extends JpaRepository<Platform, Long> {

    @Query(value = "select * from Platforms where upper(platform_name) = :platformName", nativeQuery = true)
    public List<Platform> getPlatformByName(String platformName);

}
