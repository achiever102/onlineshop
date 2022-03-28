package com.achievers.onlineshop.admin.service;

import com.achievers.onlineshop.admin.model.Category;

import java.util.List;

public interface CategoryService {

    public List<Category> getAll();

    public Category getById(Long id);

    public void add(Category coupon);

    public void delete(Long id);

    public void update(Category coupon);

}

