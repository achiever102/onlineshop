package com.achievers.onlineshop.client.controller;

import com.achievers.onlineshop.admin.model.Platform;
import com.achievers.onlineshop.client.model.Newsletter;
import com.achievers.onlineshop.client.service.NewsletterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/newsletter")
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class NewsletterController {

    @Autowired
    private NewsletterService newsletterService;

    @PostMapping(path = "/save")
    public ResponseEntity saveEmailAddress(@RequestBody Newsletter newsletter){
        List<Newsletter> itemExists = newsletterService.getRecordByEmail(newsletter.getEmailAddress());
        if(itemExists.size() > 0){
            return ResponseEntity.ok("");
        } else {
            newsletterService.add(newsletter);
            return ResponseEntity.ok("");
        }
    }

}
