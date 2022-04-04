package com.achievers.onlineshop.admin.controller;

import com.achievers.onlineshop.admin.model.Category;
import com.achievers.onlineshop.admin.model.Coupon;
import com.achievers.onlineshop.admin.service.CategoryService;
import com.achievers.onlineshop.admin.service.CouponService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/admin/category")
public class CategoriesController {

    @Autowired
    private CategoryService categoryService;

    @PutMapping(path = "/save")
    public ResponseEntity saveCategory(@RequestBody Category category){
        List<Category> itemExists = categoryService.getCategoryByName(category.getCategoryName());
        if(itemExists.size() > 0){
            return ResponseEntity.badRequest().body("Category already exists!");
        } else {
            categoryService.add(category);
            return ResponseEntity.ok("Created!");
        }
    }

    @GetMapping(path = "/getAll")
    public List<Category> getCategories(){
        List<Category> categories = categoryService.getAll();
        return categories;
    }

    @GetMapping(path = "/getById/{id}")
    public Category getCategoryById(@PathVariable("id") long id){
        Category category = categoryService.getById(id);
        return category;
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity deleteCategoryById(@PathVariable("id") long id){
        categoryService.delete(id);
        return ResponseEntity.ok("");
    }
}
