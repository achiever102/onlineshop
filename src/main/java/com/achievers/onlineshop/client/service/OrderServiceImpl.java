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

    @Override
    public void updateCSVFileDirectory(Order order) {
        orderRepository.save(order);
    }

    @Override
    public List<Order> getOrderByOrderId(String orderId) {
        return orderRepository.getOrderByOrderId(orderId);
    }

    @Override
    public List<Order> getOrderByClientName(long userId) {
        return orderRepository.getOrderByClientName(userId);
    }

    @Override
    public List<Order> getOrderByDate(String orderDate) {
        return orderRepository.getOrderByDate(orderDate);
    }

    @Override
    public List<Order> getByUserIdAndOrderDate(long userId, String orderDate) {
        return orderRepository.getByUserIdAndOrderDate(userId, orderDate);
    }

    @Override
    public List<Order> getByUserIdAndOrderId(long userId, String orderId) {
        return orderRepository.getByUserIdAndOrderId(userId, orderId);
    }
}
