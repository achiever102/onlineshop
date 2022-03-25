package com.achievers.onlineshop.repository.client;

import com.achievers.onlineshop.model.client.Items;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemsRepository extends JpaRepository<Items, Long> {
}
