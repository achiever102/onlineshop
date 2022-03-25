package com.achievers.onlineshop.repository;

import com.achievers.onlineshop.model.Cart;
import com.achievers.onlineshop.model.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemsRepository extends JpaRepository<OrderItems, Long> {
}