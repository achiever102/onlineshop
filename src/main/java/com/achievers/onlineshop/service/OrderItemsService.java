package com.achievers.onlineshop.service;

import com.achievers.onlineshop.model.Cart;
import com.achievers.onlineshop.model.OrderItems;

import java.util.List;

public interface OrderItemsService {

    public List<OrderItems> getAll();

    public OrderItems getById(Long id);

    public void add(OrderItems orderItems);

    public void delete(long orderItemsId);

    public void update(OrderItems orderItems);
}
