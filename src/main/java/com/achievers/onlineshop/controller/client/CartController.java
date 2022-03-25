package com.achievers.onlineshop.controller.client;

import com.achievers.onlineshop.model.client.Cart;
import com.achievers.onlineshop.service.client.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/api/client/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PutMapping(path = "/save")
    public ResponseEntity saveCart(@RequestBody Cart cart){
        System.out.println(cart.toString());
        cartService.add(cart);
        return ResponseEntity.ok("Created!");
    }

    @GetMapping(path = "/getAll")
    public List<Cart> getCart(){
        List<Cart> cart = cartService.getAll();
        return cart;
    }

    @GetMapping(path = "/getById/{id}")
    public Cart getCartById(@PathVariable("id") long id){
        Cart cart = cartService.getById(id);
        return cart;
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity deleteCartBuId(@PathVariable("id") Long id){
        System.out.println(id);
        cartService.delete(id);
        return ResponseEntity.ok("");
    }
}