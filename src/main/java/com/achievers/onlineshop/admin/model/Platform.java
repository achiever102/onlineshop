package com.achievers.onlineshop.admin.model;

import javax.persistence.*;

@Entity
@Table(name = "Platforms")
public class Platform {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "PLATFORM_NAME")
    private String platformName;

    public Platform(String platformName) {
        this.platformName = platformName;
    }

    public Platform() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPlatformName() {
        return platformName;
    }

    public void setPlatformName(String platformName) {
        this.platformName = platformName;
    }
}
