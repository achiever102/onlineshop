package com.achievers.onlineshop.client.service;

import com.achievers.onlineshop.client.model.Newsletter;
import com.achievers.onlineshop.client.repository.NewsletterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsletterServiceImpl implements NewsletterService{

    @Autowired
    private NewsletterRepository newsletterRepository;

    @Override
    public ResponseEntity add(Newsletter newsletter) {
        newsletterRepository.save(newsletter);
        return ResponseEntity.ok("");
    }

    @Override
    public List<Newsletter> getRecordByEmail(String emailAddress) {
        return newsletterRepository.getRecordByEmail(emailAddress);
    }
}
