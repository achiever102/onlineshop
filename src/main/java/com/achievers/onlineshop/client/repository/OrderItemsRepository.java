package com.achievers.onlineshop.client.repository;

import com.achievers.onlineshop.client.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemsRepository extends JpaRepository<OrderItem, Long> {

    @Query(value = "SELECT * FROM ORDER_ITEMS WHERE order_id=:orderId", nativeQuery = true)
    List<OrderItem> getOrderItemsByOrderId(@Param("orderId") long orderId);

}
