package com.achievers.onlineshop.admin.model;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="LICENSES")
public class License {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @Column(name = "ITEM_ID")
    private long itemId;

    @NotEmpty
    @Column(name="LICENSE_ID")
    private String licenseId;

    @Column(name="ORDER_ID")
    private String orderId;

    @Column(name="STATUS")
    private String status;

    public License(long itemId, String licenseId, String orderId, String status) {
        this.itemId = itemId;
        this.licenseId = licenseId;
        this.orderId = orderId;
        this.status = status;
    }

    public License() {
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

    public String getLicenseId() {
        return licenseId;
    }

    public void setLicenseId(String licenceId) {
        this.licenseId = licenceId;
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
                ", licenseId='" + licenseId + '\'' +
                ", orderId='" + orderId + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
