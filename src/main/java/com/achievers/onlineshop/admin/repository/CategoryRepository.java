package com.achievers.onlineshop.admin.repository;

import com.achievers.onlineshop.admin.model.Category;
import com.achievers.onlineshop.admin.model.License;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query(value = "select * from Category where upper(CATEGORY_NAME) = :categoryName", nativeQuery = true)
    public List<Category> getCategoryByName(String categoryName);

}
