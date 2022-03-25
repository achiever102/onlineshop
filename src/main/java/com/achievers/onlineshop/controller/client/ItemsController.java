package com.achievers.onlineshop.controller.client;

import com.achievers.onlineshop.model.client.Items;
import com.achievers.onlineshop.service.client.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/api/client/items")

public class ItemsController {

    @Autowired
    private ItemService itemService;

    @PutMapping(path = "/save")
    public ResponseEntity saveItem(@RequestBody Items item){
        itemService.add(item);
        return ResponseEntity.ok("Item Added!");
    }

    @GetMapping(path = "/getAll")
    public List<Items> getItems(){
        List<Items> items = itemService.getAll();
        return items;
    }

    @GetMapping(path = "/getById/{id}")
    public Items getItemsById(@PathVariable("id") long id){
        Items item = itemService.getById(id);
        return item;
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity deleteItemId(@PathVariable("id") long id){
        System.out.println(id);
        itemService.delete(id);
        return ResponseEntity.ok("");
    }
}
