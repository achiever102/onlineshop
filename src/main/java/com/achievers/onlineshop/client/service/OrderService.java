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

}

