package com.achievers.onlineshop.service;

import com.achievers.onlineshop.model.OrderItems;
import com.achievers.onlineshop.repository.OrderItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemsServiceImpl implements OrderItemsService{

    @Autowired
    private OrderItemsRepository orderItemsRepository;

    @Override
    public List<OrderItems> getAll() {
        return orderItemsRepository.findAll();
    }

    @Override
    public OrderItems getById(Long id) {
        return orderItemsRepository.findById(id).get();
    }

    @Override
    public void add(OrderItems orderItems) {
        orderItemsRepository.save(orderItems);
    }

    @Override
    public void delete(long orderItemsId) {
        orderItemsRepository.delete(orderItemsRepository.getById(orderItemsId));
    }

    @Override
    public void update(OrderItems orderItems) {

    }
}
