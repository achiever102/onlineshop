package com.achievers.onlineshop.admin.model;

import javax.persistence.*;

@Entity
@Table(name="LICENCES")
public class Licence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "ITEM_ID")
    private long itemId;

    @Column(name="LICENCE_ID")
    private String licenceId;

    @Column(name="ORDER_ID")
    private String orderId;

    @Column(name="STATUS")
    private String status;

    public Licence(long itemId, String licenceId, String orderId, String status) {
        this.itemId = itemId;
        this.licenceId = licenceId;
        this.orderId = orderId;
        this.status = status;
    }

    public Licence() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getItemId() {
        return itemId;
    }

    public void setItemId(long itemId) {
        this.itemId = itemId;
    }

    public String getLicenceId() {
        return licenceId;
    }

    public void setLicenceId(String licenceId) {
        this.licenceId = licenceId;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Licence{" +
                "id=" + id +
                ", itemId=" + itemId +
                ", licenceId='" + licenceId + '\'' +
                ", orderId='" + orderId + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
