package com.achievers.onlineshop.repository.client;

import com.achievers.onlineshop.dto.OrderResponse;
import com.achievers.onlineshop.model.client.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {

    //@Query(value = "SELECT com.achievers.onlineshop.dto.OrderResponse.java (o.ItemId, o.quantity) FROM OrderItems o JOIN o.orderId p", nativeQuery = true)
    //public List<OrderResponse> getJoin();
}
