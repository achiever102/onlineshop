package com.achievers.onlineshop.controller.client;

import com.achievers.onlineshop.dto.OrderResponse;
import com.achievers.onlineshop.model.client.Items;
import com.achievers.onlineshop.service.client.ItemService;
import com.achievers.onlineshop.model.client.OrderItems;
import com.achievers.onlineshop.model.client.Orders;
import com.achievers.onlineshop.service.client.OrderItemsService;
import com.achievers.onlineshop.service.client.OrderService;
import com.achievers.onlineshop.model.client.Cart;
import com.achievers.onlineshop.service.client.CartService;

import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/api/client/orders")
public class OrdersController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private CartService cartService;

    @Autowired
    private ItemService itemService;

    @PostMapping(path = "/save/{ownerId}")///"save/{userId}"
    public ResponseEntity saveOrder(@PathVariable("ownerId") long ownerId){

        List<Cart> cartItems = cartService.getByUserId(ownerId);
        double totalPrice = 0;

        List<OrderItems> itemsList = new ArrayList<>();
        Orders order = new Orders();

        order.setOrderNum(UUID.randomUUID().toString());

        for(int i = 0; i < cartItems.size(); i++){

            System.out.println(cartItems.get(i).getId());
            OrderItems item = new OrderItems();
            item.setItemId(cartItems.get(i).getItemId());
            item.setAmount((itemService.getById(cartItems.get(i).getItemId()).getItemPrice())*cartItems.get(i).getQuantity());
            item.setQuantity(cartItems.get(i).getQuantity());
            item.setOrder(order);
            itemsList.add(item);
            totalPrice += item.getAmount();
        }
        Date date = new Date(System.currentTimeMillis());
        System.out.println(date);
        order.setOrderItems(itemsList);
        order.setTotalPrice(totalPrice);
        order.setDateOfPurchase(date);

        orderService.add(order);
        /*
        for(Cart cart: cartItems){
            cartService.delete(cart.getId());
        }
        *///uncomment after completing testing

        return ResponseEntity.ok("Created!");
    }

    @GetMapping(path = "/getAll")
    public List<Orders> getOrders(){
        List<Orders> orders = orderService.getAll();
        return orders;
    }

    @GetMapping(path = "/getById/{id}")
    public Orders getOrdersById(@PathVariable("id") long id){
        Orders orders = orderService.getById(id);
        return orders;
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity deleteOrdersBuId(@PathVariable("id") long id){
        System.out.println(id);
        orderService.delete(id);
        return ResponseEntity.ok("");
    }

    @GetMapping(path = "/getCount")
    public long getOrderCount(){
        return orderService.getLength();
    }
/*
    @GetMapping(path = "/getJoin")
    public List<OrderResponse> getJoin(){

        return orderService.getJoin();

    }*/

}
