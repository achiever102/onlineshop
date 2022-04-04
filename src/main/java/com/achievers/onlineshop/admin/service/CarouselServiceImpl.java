package com.achievers.onlineshop.admin.service;

import com.achievers.onlineshop.admin.model.Carousel;
import com.achievers.onlineshop.admin.model.Item;
import com.achievers.onlineshop.admin.model.License;
import com.achievers.onlineshop.admin.repository.CarouselRepository;
import com.achievers.onlineshop.admin.repository.LicensesRepository;
import com.achievers.onlineshop.aws.bucket.BucketConfig;
import com.achievers.onlineshop.aws.filestore.FileStore;
import org.apache.commons.io.FilenameUtils;
import org.apache.http.entity.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class CarouselServiceImpl implements CarouselService{

    @Autowired
    private CarouselRepository carouselRepository;

    @Autowired
    private BucketConfig bucketConfig;

    @Autowired
    private FileStore fileStore;

    @Override
    public List<Carousel> getAll() {
        return carouselRepository.findAll();
    }

    @Override
    public void add(MultipartFile imageUrl) {
        isEmpty(imageUrl);

        isImage(imageUrl);

        Map<String, String> metadata = extractMetadata(imageUrl);

        String directoryUUID = UUID.randomUUID().toString();

        String path = String.format("%s/carousel", bucketConfig.getBucketName());
        String fileName = String.format("%s.%s", directoryUUID, FilenameUtils.getExtension(imageUrl.getOriginalFilename()));
        try {
            fileStore.save(path, fileName, Optional.of(metadata), imageUrl.getInputStream());
            Carousel carousel = new Carousel(bucketConfig.getBucketUrl() + "/carousel/" + fileName);
            carouselRepository.save(carousel);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    @Override
    public void delete(Long id) {
        carouselRepository.delete(carouselRepository.getById(id));
    }

    private Map<String, String> extractMetadata(MultipartFile file) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));
        return metadata;
    }

    private void isEmpty(MultipartFile file) {
        if(file.isEmpty()){
            throw new IllegalStateException("cannot upload an empty file[" + file.getSize() + "]");
        }
    }

    private void isImage(MultipartFile file) {
        if(!Arrays.asList(ContentType.IMAGE_JPEG.getMimeType(), ContentType.IMAGE_PNG.getMimeType(), ContentType.IMAGE_GIF.getMimeType()).contains(file.getContentType())){
            throw new IllegalStateException("cannot upload file with non image format [" + file.getContentType() + "]");
        }
    }

}
