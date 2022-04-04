package com.achievers.onlineshop.admin.repository;

import com.achievers.onlineshop.admin.model.Carousel;
import com.achievers.onlineshop.admin.model.License;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CarouselRepository extends JpaRepository<Carousel, Long> {

}
