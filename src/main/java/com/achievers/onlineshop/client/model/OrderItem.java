package com.achievers.onlineshop.client.model;

import javax.persistence.*;

@Entity
@Table(name = "ORDER_ITEMS")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="GAME_ID")
    private long gameId;

    @ManyToOne
    @JoinColumn(name="order_id", nullable=false)
    private Order order;

    @Column(name="QUANTITY")
    private int quantity;

    @Column(name="AMOUNT")
    private float amount;

    @Column(name="ON_SALE")
    private boolean onSale;

    @Column(name="SALE_VALUE")
    private float saleValue;


    public OrderItem(long gameId, Order order, int quantity, float amount, boolean onSale, float saleValue) {
        this.gameId = gameId;
        this.order = order;
        this.quantity = quantity;
        this.amount = amount;
        this.onSale = onSale;
        this.saleValue = saleValue;
    }

    public boolean isOnSale() {
        return onSale;
    }

    public void setOnSale(boolean onSale) {
        this.onSale = onSale;
    }

    public float getSaleValue() {
        return saleValue;
    }

    public void setSaleValue(float saleValue) {
        this.saleValue = saleValue;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public float getAmount() {
        return amount;
    }

    public void setAmount(float amount) {
        this.amount = amount;
    }

    public OrderItem() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public long getGameId() {
        return gameId;
    }

    public void setGameId(long gameId) {
        this.gameId = gameId;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
