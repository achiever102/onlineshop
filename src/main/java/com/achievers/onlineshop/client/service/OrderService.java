package com.achievers.onlineshop.client.service;

import com.achievers.onlineshop.client.model.Cart;
import com.achievers.onlineshop.client.model.Order;

import java.util.List;

public interface OrderService {

    public List<Order> getAll();

    public Order getById(Long id);

    public Order add(Order order);

    public void delete(Long id);

    public void update(Order order);

    public List<Order> getByUserId(long userId);

    public void updateCSVFileDirectory(Order order);

    public List<Order> getOrderByOrderId(String orderId);

    public List<Order> getOrderByClientName(long userId);

    public List<Order> getOrderByDate(String orderDate);

    public List<Order> getByUserIdAndOrderDate(long userId, String orderDate);

    public List<Order> getByUserIdAndOrderId(long userId, String orderId);

}

