package com.achievers.onlineshop.client.model;

import javax.persistence.*;

@Entity
@Table(name="CART")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="GAME_ID")
    private long gameId;

    @Column(name="USER_ID")
    private long userId;

    @Column(name="QUANTITY")
    private int quantity;

    public Cart(long gameId, long userId, int quantity) {
        this.gameId = gameId;
        this.userId = userId;
        this.quantity = quantity;
    }

    public Cart() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getGameId() {
        return gameId;
    }

    public void setGameId(long gameId) {
        this.gameId = gameId;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
