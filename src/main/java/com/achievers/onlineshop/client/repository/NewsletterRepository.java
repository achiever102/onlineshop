package com.achievers.onlineshop.client.repository;

import com.achievers.onlineshop.admin.model.Platform;
import com.achievers.onlineshop.client.model.Newsletter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsletterRepository extends JpaRepository<Newsletter, Long> {

    @Query(value = "select * from NEWSLETTERS where upper(email_address) = :emailAddress", nativeQuery = true)
    public List<Newsletter> getRecordByEmail(String emailAddress);

}
