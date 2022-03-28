package com.achievers.onlineshop.admin.service;

import com.achievers.onlineshop.admin.model.Category;
import com.achievers.onlineshop.admin.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getById(Long id) {
        return categoryRepository.findById(id).get();
    }

    @Override
    public void add(Category coupon) {
        categoryRepository.save(coupon);
    }

    @Override
    public void delete(Long id) {
        categoryRepository.delete(categoryRepository.getById(id));
    }

    @Override
    public void update(Category category) {

    }
}
