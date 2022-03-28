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

}
