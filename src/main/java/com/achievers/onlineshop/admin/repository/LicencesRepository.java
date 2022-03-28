package com.achievers.onlineshop.admin.repository;

import com.achievers.onlineshop.admin.model.Licence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LicencesRepository extends JpaRepository<Licence, Long> {

    @Query(value = "select * from licences where item_id = :gameId", nativeQuery = true)
    public List<Licence> getGameLicences(long gameId);
}
