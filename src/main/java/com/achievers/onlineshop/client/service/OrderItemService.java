package com.achievers.onlineshop.client.service;

import com.achievers.onlineshop.client.model.OrderItem;

import java.util.List;

public interface OrderItemService {

    public List<OrderItem> getAll();

    public OrderItem getById(Long id);

    public void add(OrderItem orderItem);

    public void delete(Long id);

    public void update(OrderItem orderItem);

    public List<OrderItem> getOrderItemsByOrderId(long orderId);

    public void addAll(List<OrderItem> orderItems);

}

