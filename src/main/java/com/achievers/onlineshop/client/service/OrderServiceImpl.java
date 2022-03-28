package com.achievers.onlineshop.client.service;

import com.achievers.onlineshop.client.model.Cart;
import com.achievers.onlineshop.client.model.Order;
import com.achievers.onlineshop.client.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    @Override
    public Order getById(Long id) {
        return orderRepository.findById(id).get();
    }

    @Override
    public Order add(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public void delete(Long id) {
        orderRepository.delete(orderRepository.getById(id));
    }

    @Override
    public void update(Order order) {
    }

    public List<Order> getByUserId(long userId){
        return orderRepository.getByUserId(userId);
    }
}
