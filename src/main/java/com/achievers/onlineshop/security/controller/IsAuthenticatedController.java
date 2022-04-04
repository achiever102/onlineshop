package com.achievers.onlineshop.security.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/isAuthenticated")
public class IsAuthenticatedController {

    @GetMapping("/admin")
    public ResponseEntity isAuthenticatedAdmin(){
        return ResponseEntity.ok("");
    }

    @GetMapping("/client")
    public ResponseEntity isAuthenticatedClient(){
        return ResponseEntity.ok("");
    }
}
