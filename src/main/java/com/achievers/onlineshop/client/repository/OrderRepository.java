package com.achievers.onlineshop.client.repository;

import com.achievers.onlineshop.client.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query(value = "SELECT * FROM ORDERS WHERE user_id=:userId", nativeQuery = true)
    List<Order> getByUserId(@Param("userId") long userId);

    @Query(value = "SELECT * FROM ORDERS WHERE user_id=:userId and order_id=:orderId", nativeQuery = true)
    List<Order> getByUserIdAndOrderId(@Param("userId") long userId, @Param("orderId") String orderId);

    @Query(value = "SELECT * FROM ORDERS WHERE user_id=:userId and order_date=:orderDate", nativeQuery = true)
    List<Order> getByUserIdAndOrderDate(@Param("userId") long userId, @Param("orderDate") String orderDate);

    @Query(value = "SELECT * FROM ORDERS WHERE order_date=:orderDate", nativeQuery = true)
    List<Order> getOrderByDate(@Param("orderDate") String orderDate);

    @Query(value = "SELECT * FROM ORDERS WHERE order_id=:orderId", nativeQuery = true)
    List<Order> getOrderByOrderId(@Param("orderId") String orderId);

    @Query(value = "SELECT * FROM ORDERS WHERE user_id=:userId", nativeQuery = true)
    List<Order> getOrderByClientName(@Param("userId") long userId);

}
