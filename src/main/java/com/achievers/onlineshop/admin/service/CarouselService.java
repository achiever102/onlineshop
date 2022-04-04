package com.achievers.onlineshop.admin.service;

import com.achievers.onlineshop.admin.model.Carousel;
import com.achievers.onlineshop.admin.model.License;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CarouselService {

    public List<Carousel> getAll();

    public void add(MultipartFile imageUrl);

    public void delete(Long id);
}

