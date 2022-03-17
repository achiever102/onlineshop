package com.achievers.onlineshop.model;

import javax.persistence.*;

@Entity
@Table(name = "Cart")

public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "OWNER_ID")
    private long ownerId;

    @Column(name = "ORDER_ID")
    private long orderId;

    @Column(name = "ITEM_ID")
    private long itemId;

    @Column(name = "QUANTITY")
    private long quantity;

    public Cart(long ownerId, long orderId, long itemId, long quantity) {
        this.ownerId = ownerId;
        this.orderId = orderId;
        this.itemId = itemId;
        this.quantity = quantity;
    }

    public Cart() {
    }

    public long getId() {  return id;  }

    public void setId(long id) {
        this.id = id;
    }

    public long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(long ownerId) {
        this.ownerId = ownerId;
    }

    public long getOrderId() {
        return orderId;
    }

    public void setOrderId(long orderId) {
        this.orderId = orderId;
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
                "id=" + id +
                ", ownerId=" + ownerId + '\'' +
                ", orderId=" + orderId + '\'' +
                ", itemId=" + itemId + '\'' +
                ", quantity=" + quantity + '\'' +
                '}';
    }
}