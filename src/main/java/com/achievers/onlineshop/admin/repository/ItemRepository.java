package com.achievers.onlineshop.admin.repository;

import com.achievers.onlineshop.admin.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
}
