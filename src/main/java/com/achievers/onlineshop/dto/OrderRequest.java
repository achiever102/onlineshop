package com.achievers.onlineshop.dto;

import org.hibernate.criterion.Order;


public class OrderRequest {

    private Order order;

    public OrderRequest(Order order){
        this.order = order;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    @Override
    public String toString() {
        return "orderRequest{" +
                "order=" + order +
                '}';
    }
}
