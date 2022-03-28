package com.achievers.onlineshop.client.service;

import com.achievers.onlineshop.client.model.Newsletter;
import org.springframework.http.ResponseEntity;

public interface NewsletterService {

    public ResponseEntity add(Newsletter newsletter);

}
