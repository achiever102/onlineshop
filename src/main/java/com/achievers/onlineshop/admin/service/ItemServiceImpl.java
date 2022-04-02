package com.achievers.onlineshop.admin.service;

import com.achievers.onlineshop.admin.model.Item;
import com.achievers.onlineshop.admin.repository.ItemRepository;
import com.achievers.onlineshop.aws.actions.UploadDownloadHandler;
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
public class ItemServiceImpl implements ItemService{

    @Autowired
    private FileStore fileStore;

    @Autowired
    private UploadDownloadHandler uploadDownloadHandler;

    @Autowired
    private BucketConfig bucketConfig;

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public List<Item> getAll() {
        return itemRepository.findAll();
    }

    @Override
    public Item getById(Long id) {
        return itemRepository.findById(id).get();
    }

    @Override
    public void add(String itemName, String itemPrice, String itemQuantity, MultipartFile itemImage, int itemCategory, boolean itemOnSale, float itemSaleValue, String itemDescription, int itemPlatform, String itemStatus) {
        // 1. check if image is not empty
        isEmpty(itemImage);

        // 2. check if file is an image
        isImage(itemImage);

        // 4. grab some metadata from file if any
        Map<String, String> metadata = extractMetadata(itemImage);

        // 5. store the image in S3 and update database with s3 image link for download purposes
        String directoryUUID = UUID.randomUUID().toString();

        String path = String.format("%s/%s", bucketConfig.getBucketName(), directoryUUID); // path in the bucket bucket-name/uuid/
        //String fileName = String.format("%s-%s", directoryUUID, itemImage.getOriginalFilename());
        String fileName = String.format("%s.%s", directoryUUID, FilenameUtils.getExtension(itemImage.getOriginalFilename()));
        try {
            fileStore.save(path, fileName, Optional.of(metadata), itemImage.getInputStream());
            Item item = new Item(itemName, Float.valueOf(itemPrice), Integer.valueOf(itemQuantity), itemOnSale, itemSaleValue, itemDescription, bucketConfig.getBucketUrl() + "/" + directoryUUID + "/" + fileName, itemCategory, itemPlatform, itemStatus);
            //System.out.println(BucketConfig.BUCKET_NAME.getBucketName());
            //user.setProfileImageLink(fileName); // to download the image
            //Item item1 =
            itemRepository.save(item);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    @Override
    public void update(long id, String itemName, String itemPrice, String itemQuantity, MultipartFile itemImage, int itemCategory, boolean itemOnSale, float itemSaleValue, String itemDescription, int itemPlatform, String itemStatus) {
        // 1. check if image is not empty
        isEmpty(itemImage);

        // 2. check if file is an image
        isImage(itemImage);

        // 4. grab some metadata from file if any
        Map<String, String> metadata = extractMetadata(itemImage);

        // 5. store the image in S3 and update database with s3 image link for download purposes
        String directoryUUID = UUID.randomUUID().toString();

        String path = String.format("%s/%s", bucketConfig.getBucketName(), directoryUUID); // path in the bucket bucket-name/uuid/
        //String fileName = String.format("%s-%s", directoryUUID, itemImage.getOriginalFilename());
        String fileName = String.format("%s.%s", directoryUUID, FilenameUtils.getExtension(itemImage.getOriginalFilename()));
        try {
            fileStore.save(path, fileName, Optional.of(metadata), itemImage.getInputStream());
            Item item = new Item(itemName, Float.valueOf(itemPrice), Integer.valueOf(itemQuantity), itemOnSale, itemSaleValue, itemDescription, bucketConfig.getBucketUrl() + "/" + directoryUUID + "/" + fileName, itemCategory, itemPlatform, itemStatus);
            item.setId(id);
            itemRepository.save(item);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    @Override
    public void updateItemStatusOrQuantity(Item item) {
        itemRepository.save(item);
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

    /*public byte[] downloadItemImage(long id) {
        Item item = itemRepository.getById(id);
        String path = String.format("%s/%s", BucketConfig.PROFILE_IMAGE.getBucketName(), item.getId());

        return item.getItemImage()(fileStore.download(path, key));
    }*/
}
