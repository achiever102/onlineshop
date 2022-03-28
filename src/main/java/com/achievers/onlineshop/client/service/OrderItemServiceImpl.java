package com.achievers.onlineshop.client.service;

import com.achievers.onlineshop.client.model.Order;
import com.achievers.onlineshop.client.model.OrderItem;
import com.achievers.onlineshop.client.repository.OrderItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemServiceImpl implements OrderItemService {

    @Autowired
    private OrderItemsRepository orderItemsRepository;

    @Override
    public List<OrderItem> getAll() {
        return orderItemsRepository.findAll();
    }

    @Override
    public OrderItem getById(Long id) {
        return orderItemsRepository.findById(id).get();
    }

    @Override
    public void add(OrderItem orderItem) {
        orderItemsRepository.save(orderItem);
    }

    @Override
    public void delete(Long id) {
        orderItemsRepository.delete(orderItemsRepository.getById(id));
    }

    @Override
    public void update(OrderItem orderItem) {
    }

    public List<OrderItem> getOrderItemsByOrderId(long orderId){
        return orderItemsRepository.getOrderItemsByOrderId(orderId);
    }

    public void addAll(List<OrderItem> orderItems){
        orderItemsRepository.saveAll(orderItems);
    }
}
