package com.achievers.onlineshop.service.client;


import com.achievers.onlineshop.dto.OrderResponse;
import com.achievers.onlineshop.model.client.Orders;
import com.achievers.onlineshop.repository.client.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{
    @Autowired
    private OrdersRepository orderRepository;

    @Override
    public List<Orders> getAll() {
        return orderRepository.findAll();
    }

    @Override
    public Orders getById(Long id) {
        return orderRepository.findById(id).get();
    }

    @Override
    public void add(Orders order) {
        orderRepository.save(order);
    }

    @Override
    public void delete(Long orderId) {
        orderRepository.delete(orderRepository.getById(orderId));
    }

    @Override
    public void update(Orders order) { }

    @Override
    public long getLength(){
        return orderRepository.count();
    }
}
