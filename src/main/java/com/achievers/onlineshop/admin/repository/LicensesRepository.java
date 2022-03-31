package com.achievers.onlineshop.admin.repository;

import com.achievers.onlineshop.admin.model.License;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LicensesRepository extends JpaRepository<License, Long> {

    @Query(value = "select * from licenses where item_id = :gameId", nativeQuery = true)
    public List<License> getGameLicenses(long gameId);

    @Query(value = "select * from licenses where item_id = :gameId and license_id = :licenseId", nativeQuery = true)
    public List<License> getLicenseByLicenseIdAndGameId(long gameId, String licenseId);

    @Query(value = "select * from licenses where item_id = :gameId and status=\"AVAILABLE\" limit :numOfLicences", nativeQuery = true)
    public List<License> getTopNLicences(long gameId, int numOfLicences);

    @Query(value = "select * from licenses where item_id = :gameId and status=\"AVAILABLE\"", nativeQuery = true)
    public List<License> gitAvailableLicences(long gameId);

}
