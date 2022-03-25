package com.achievers.onlineshop.model.client;

import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

//price of items total
//Date of purchase
//list of items
//order number

@Entity
@Table(name = "Orders")
public class Orders implements Serializable
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NaturalId
    @Column(name = "ORDER_NUM")
    private String  orderNum;

    @Column(name = "DATE_OF_PURCHASE")
    private Date dateOfPurchase;

    @Column(name = "TOTAL_PRICE")
    private double totalPrice;

    @OneToMany(fetch=FetchType.EAGER, mappedBy = "order", cascade = CascadeType.PERSIST) //PERSIST
    private List<OrderItems> orderItems;

    public List<OrderItems> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItems> orderItems) {
        this.orderItems = orderItems;
    }

    public Orders(String orderNum, Date dateOfPurchase, double totalPrice) {
        this.orderNum = orderNum;
        this.dateOfPurchase = dateOfPurchase;
        this.totalPrice = totalPrice;
    }

    public Orders() {
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getOrderNum() {
        return orderNum;
    }

    public void setOrderNum(String orderNum) {
        this.orderNum = orderNum;
    }

    public Date getDateOfPurchase() {
        return dateOfPurchase;
    }

    public void setDateOfPurchase(Date dateOfPurchase) {
        this.dateOfPurchase = dateOfPurchase;
    }

    @Override
    public String toString() {
        return "Orders{" +
                "id=" + id +
                ", totalPrice = " + totalPrice + '\'' +
                ", orderNum =" + orderNum +
                ", dateOfPurchase =" + dateOfPurchase +
                '}';
    }
}
