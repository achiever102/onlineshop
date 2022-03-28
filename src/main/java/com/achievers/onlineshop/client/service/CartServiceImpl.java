package com.achievers.onlineshop.client.service;

import com.achievers.onlineshop.client.model.Cart;
import com.achievers.onlineshop.client.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public List<Cart> getAll() {
        return cartRepository.findAll();
    }

    @Override
    public Cart getById(Long id) {
        return cartRepository.findById(id).get();
    }

    @Override
    public void add(Cart cart) {
        cartRepository.save(cart);
    }

    @Override
    public void delete(Long id) {
        cartRepository.delete(cartRepository.getById(id));
    }

    @Override
    public void update(Cart cart) {
        cartRepository.save(cart);
    }

    public List<Cart> getByUserId(long userId){
        return cartRepository.getByUserId(userId);
    }
}
