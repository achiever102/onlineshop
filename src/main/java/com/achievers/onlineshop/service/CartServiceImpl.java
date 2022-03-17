package com.achievers.onlineshop.service;

import com.achievers.onlineshop.model.Cart;
import com.achievers.onlineshop.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService{

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
    public void delete(long cartId) {
        cartRepository.delete(cartRepository.getById(cartId));
    }

    @Override
    public void update(Cart cart) {

    }
}
