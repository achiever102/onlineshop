package com.achievers.onlineshop.service.client;

import com.achievers.onlineshop.dto.OrderResponse;
import com.achievers.onlineshop.model.client.OrderItems;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderItemsService {

    public List<OrderItems> getAll();

    public OrderItems getById(Long id);

    public void add(OrderItems orderItems);

    public void delete(long orderItemsId);

    public void update(OrderItems orderItems);

}