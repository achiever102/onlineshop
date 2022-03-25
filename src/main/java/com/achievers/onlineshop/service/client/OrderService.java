package com.achievers.onlineshop.service.client;

import com.achievers.onlineshop.dto.OrderResponse;
import com.achievers.onlineshop.model.client.Orders;

import java.util.List;

public interface OrderService {
    public List<Orders> getAll();

    public Orders getById(Long id);

    public void add(Orders order);

    public void delete(Long orderId);

    public void update(Orders order);

    public long getLength();

    //public List<OrderResponse> getJoin();
}
