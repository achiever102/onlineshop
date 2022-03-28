package com.achievers.onlineshop.client.controller;

import com.achievers.onlineshop.client.model.Newsletter;
import com.achievers.onlineshop.client.service.NewsletterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/newsletter")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class NewsletterController {

    @Autowired
    private NewsletterService newsletterService;

    @PostMapping(path = "/save")
    public ResponseEntity saveEmailAddress(@RequestBody Newsletter newsletter){
        newsletterService.add(newsletter);
        return ResponseEntity.ok("");
    }

}
