package com.achievers.onlineshop.admin.controller;

import com.achievers.onlineshop.admin.model.Carousel;
import com.achievers.onlineshop.admin.model.CustomLicenseObject;
import com.achievers.onlineshop.admin.model.Item;
import com.achievers.onlineshop.admin.model.License;
import com.achievers.onlineshop.admin.service.CarouselService;
import com.achievers.onlineshop.admin.service.ItemService;
import com.achievers.onlineshop.admin.service.LicensesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/admin/carousel")
public class CarouselController {

    @Autowired
    private LicensesService licensesService;

    @Autowired
    private CarouselService carouselService;

    @PostMapping(path = "/save",consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity saveCarouselImage(@RequestParam("imageUrl") MultipartFile imageUrl){
        carouselService.add(imageUrl);
        return ResponseEntity.ok().body("");
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity deleteCarouselImageById(@PathVariable("id") long id){

        carouselService.delete(id);

        return ResponseEntity.ok("Carousel image deleted successfully!");

    }

    @GetMapping("/getAll")
    public List<Carousel> getAllCarouselImages(){
        return carouselService.getAll();
    }
}
