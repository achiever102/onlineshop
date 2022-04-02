package com.achievers.onlineshop.client.service;

import com.achievers.onlineshop.client.model.Newsletter;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface NewsletterService {

    public ResponseEntity add(Newsletter newsletter);

    public List<Newsletter> getRecordByEmail(String emailAddress);

}
