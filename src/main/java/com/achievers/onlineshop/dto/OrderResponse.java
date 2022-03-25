package com.achievers.onlineshop.dto;


public class OrderResponse {

    private long itemId;
    private long quantity;

    public OrderResponse(long orderId, long itemId, long quantity) {
        this.itemId = itemId;
        this.quantity = quantity;
    }

    public OrderResponse() {
    }

    public long getItemId() {
        return itemId;
    }

    public void setItemId(long itemId) {
        this.itemId = itemId;
    }

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) { this.quantity = quantity; }

    @Override
    public String toString() {
        return "Profile{" +
                ", itemId=" + itemId + '\'' +
                ", quantity=" + quantity + '\'' +
                '}';
    }
}