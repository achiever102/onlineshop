package com.achievers.onlineshop.admin.controller;

import com.achievers.onlineshop.admin.model.*;
import com.achievers.onlineshop.admin.service.CategoryService;
import com.achievers.onlineshop.admin.service.PlatformService;
import com.achievers.onlineshop.aws.actions.UploadDownloadHandler;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.achievers.onlineshop.admin.service.ItemService;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/admin/item")
public class ItemController {

    @Autowired
    private UploadDownloadHandler uploadDownloadHandler;

    @Autowired
    private ItemService itemService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private PlatformService platformService;

    @GetMapping("/getAll")
    public CustomItemsObject getAll(){
        List<Item> items = itemService.getAll();
        List<Category> categories = categoryService.getAll();
        List<Platform> platforms = platformService.getAll();

        CustomItemsObject customItemsObject = new CustomItemsObject(items, platforms, categories);

        return customItemsObject;
    }

    @PostMapping(path = "/save",consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void saveItem(@RequestParam("itemImage") MultipartFile itemImage, @RequestParam("itemName") String itemName
            , @RequestParam("itemPrice") String itemPrice, @RequestParam("itemQuantity") String itemQuantity, @RequestParam("itemCategory") int itemCategory,
                    @RequestParam("itemOnSale") boolean itemOnSale,@RequestParam("itemSaleValue") float itemSaleValue,@RequestParam("itemDescription") String itemDescription
            , @RequestParam("itemPlatform") int itemPlatform){

        itemService.add(itemName, itemPrice, itemQuantity, itemImage, itemCategory, itemOnSale, itemSaleValue, itemDescription, itemPlatform, "ACTIVE");
    }


    @PutMapping(path = "/save",consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void updateItem(@RequestParam("id") long id, @RequestParam("itemImage") MultipartFile itemImage, @RequestParam("itemName") String itemName
            , @RequestParam("itemPrice") String itemPrice, @RequestParam("itemQuantity") String itemQuantity, @RequestParam("itemCategory") int itemCategory,
                           @RequestParam("itemOnSale") boolean itemOnSale,@RequestParam("itemSaleValue") float itemSaleValue,@RequestParam("itemDescription") String itemDescription
            , @RequestParam("itemPlatform") int itemPlatform){

        itemService.update(id, itemName, itemPrice, itemQuantity, itemImage, itemCategory, itemOnSale, itemSaleValue, itemDescription, itemPlatform, "ACTIVE");
    }

    @PutMapping(path = "/delete/{id}")
    public ResponseEntity updateItemToDeleted(@PathVariable("id") long id){
        Item item = itemService.getById(id);
        item.setItemStatus("DELETED");
        itemService.updateItemStatusOrQuantity(item);
        return ResponseEntity.ok("");
    }

    @PutMapping(path = "/activate/{id}")
    public ResponseEntity updateItemToActive(@PathVariable("id") long id){
        Item item = itemService.getById(id);
        item.setItemStatus("ACTIVE");
        itemService.updateItemStatusOrQuantity(item);
        return ResponseEntity.ok("");
    }

    @GetMapping(path = "/getById/{id}")
    public Item getItemById(@PathVariable("id") long id){
        Item item = itemService.getById(id);
        return item;
    }

    /*@GetMapping("{id}/image/download")
    public byte[] downloadUserProfileImage(@PathVariable("id") long id) {
        return itemService.downloadItemImage(id);
    }*/

    @PostMapping("/getAll")
    public CustomItemsObject getFilteredItems(@RequestParam("selectedCategories") String selectedCategoriesJson,
                                              @RequestParam("selectedPlatforms") String selectedPlatformsJson, @RequestParam("showAvailableItemsOnly") String showAvailableItemsOnly ){

        List<String> selectedCategories = new ArrayList<>();
        ObjectMapper objectMapper1 = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper1.readTree(selectedCategoriesJson);
            selectedCategories = objectMapper1.convertValue(jsonNode, new TypeReference<List<String>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        List<String> selectedPlatforms = new ArrayList<>();
        ObjectMapper objectMapper2 = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper2.readTree(selectedPlatformsJson);
            selectedPlatforms = objectMapper2.convertValue(jsonNode, new TypeReference<List<String>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        List<Item> allItems = itemService.getAll();
        List<Item> filteredItems = new ArrayList<>();

        if(selectedPlatforms.size() > 0 && selectedCategories.size() > 0) {
            for (Item item : allItems) {
                for (String x : selectedPlatforms) {
                    for (String y : selectedCategories) {
                        if (Integer.parseInt(x) == item.getItemPlatform() && Integer.parseInt(y) == item.getItemCategory()) {
                            filteredItems.add(item);
                        }
                    }
                }
            }
        } else if(selectedCategories.size() > 0) {
            for (Item item : allItems) {
                for (String y : selectedCategories) {
                    if (Integer.parseInt(y) == item.getItemCategory()) {
                        filteredItems.add(item);
                    }
                }
            }
        } else if(selectedPlatforms.size() > 0) {
            for (Item item : allItems) {
                for (String y : selectedPlatforms) {
                    if (Integer.parseInt(y) == item.getItemPlatform()) {
                        filteredItems.add(item);
                    }
                }
            }
        } else {
            filteredItems = allItems;
        }

        List<Item> availableItems = new ArrayList<>();
        if(Boolean.valueOf(showAvailableItemsOnly)){
            for(Item item: filteredItems){
                if(item.getItemQuantity() > 0){
                    availableItems.add(item);
                }
            }
        } else {
            availableItems = filteredItems;
        }


        List<Category> categories = categoryService.getAll();
        List<Platform> platforms = platformService.getAll();

        CustomItemsObject customItemsObject = new CustomItemsObject(availableItems, platforms, categories);

        return customItemsObject;

    }

}
