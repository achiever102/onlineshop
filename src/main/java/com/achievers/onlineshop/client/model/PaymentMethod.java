package com.achievers.onlineshop.client.model;

import javax.persistence.*;

@Entity
@Table(name="PAYMENT_METHODS")
public class PaymentMethod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="USER_ID")
    private long userId;

    @Column(name="card_name")
    private String cardName;

    @Column(name = "card_number")
    private String cardNumber;

    @Column(name = "card_exp_date")
    private String cardExpDate;

    @Column(name = "card_ccv")
    private String cardCcv;

    public PaymentMethod(long userId, String cardName, String cardNumber, String cardExpDate, String cardCcv) {
        this.userId = userId;
        this.cardName = cardName;
        this.cardNumber = cardNumber;
        this.cardExpDate = cardExpDate;
        this.cardCcv = cardCcv;
    }

    public PaymentMethod() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getCardName() {
        return cardName;
    }

    public void setCardName(String cardName) {
        this.cardName = cardName;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCardExpDate() {
        return cardExpDate;
    }

    public void setCardExpDate(String cardExpDate) {
        this.cardExpDate = cardExpDate;
    }

    public String getCardCcv() {
        return cardCcv;
    }

    public void setCardCcv(String cardCcv) {
        this.cardCcv = cardCcv;
    }
}
