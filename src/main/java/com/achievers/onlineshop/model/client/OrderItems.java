package com.achievers.onlineshop.model.client;

//import com.achievers.onlineshop.model.client.Orders;

import javax.persistence.*;

@Entity
@Table(name = "OrderItems")

public class OrderItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "ORDER_NUM",referencedColumnName = "ORDER_NUM", nullable = false/*referencedColumnName = "id"*/)
    private Orders order;

    @Column(name = "ITEM_ID")
    private long itemId;

    @Column(name = "QUANTITY")
    private long quantity;

    @Column(name = "AMOUNT")
    private long amount;

    public OrderItems(Orders order, long itemId, long quantity, long amount) {
        this.order = order;
        this.itemId = itemId;
        this.quantity = quantity;
        this.amount = amount;
    }

    public OrderItems() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Orders getOrder() {
        return order;
    }

    public void setOrder(Orders order) {
        this.order = order;
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

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "OrderItems{" +
                "id=" + id +
                ", order=" + order +
                ", itemId=" + itemId +
                ", quantity=" + quantity +
                ", amount=" + amount +
                '}';
    }
}