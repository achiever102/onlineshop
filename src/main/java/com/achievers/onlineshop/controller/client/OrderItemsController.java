package com.achievers.onlineshop.controller.client;

import com.achievers.onlineshop.model.client.OrderItems;
import com.achievers.onlineshop.service.client.OrderItemsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/api/client/orderItems")
public class OrderItemsController{

    @Autowired
    private OrderItemsService orderItemsService;

    @PutMapping(path = "/save")
    public ResponseEntity saveOrderItem(@RequestBody OrderItems orderItems){
        System.out.println(orderItems.toString());
        orderItemsService.add(orderItems);
        return ResponseEntity.ok("Created!");
    }

    @GetMapping(path = "/getAll")
    public List<OrderItems> getOrderItem(){
        List<OrderItems> orderItems = orderItemsService.getAll();
        return orderItems;
    }

    @GetMapping(path = "/getById/{id}")
    public OrderItems getOrderItemById(@PathVariable("id") long id){
        OrderItems cart = orderItemsService.getById(id);
        return cart;
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity deleteOrderItemBuId(@PathVariable("id") Long id){
        System.out.println(id);
        orderItemsService.delete(id);
        return ResponseEntity.ok("");
    }
}