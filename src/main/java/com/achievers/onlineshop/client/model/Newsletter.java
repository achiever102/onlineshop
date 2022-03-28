package com.achievers.onlineshop.client.model;

import org.springframework.web.bind.annotation.RequestBody;

import javax.persistence.*;

@Entity
@Table(name = "NEWSLETTERS")
public class Newsletter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "EMAIL_ADDRESS")
    private String emailAddress;

    public Newsletter(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public Newsletter() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }
}
