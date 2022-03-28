package com.achievers.onlineshop.client.controller;

import com.achievers.onlineshop.admin.model.*;
import com.achievers.onlineshop.admin.repository.SettingRepository;
import com.achievers.onlineshop.admin.service.CategoryService;
import com.achievers.onlineshop.admin.service.PlatformService;
import com.achievers.onlineshop.client.model.CustomClientCartObject;
import com.achievers.onlineshop.client.model.CustomItem;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.achievers.onlineshop.admin.service.ItemService;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/api/home")
public class HomeController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private SettingRepository settingRepository;

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

    @GetMapping(path = "/getCustomItemById/{id}")
    public CustomItem getCustomItemById(@PathVariable("id") long id){
        Item item = itemService.getById(id);
        CustomItem customItem = new CustomItem(
                item.getId(),
                item.getItemName(),
                item.getItemPrice(),
                item.getItemQuantity(),
                item.isItemOnSale(),
                item.getItemSaleValue(),
                item.getItemDescription(),
                item.getItemImage(),
                categoryService.getById(Long.valueOf(item.getItemCategory())).getCategoryName(),
                platformService.getById(Long.valueOf(item.getItemPlatform())).getPlatformName(),
                item.getItemStatus()
        );
        return customItem;
    }

    @GetMapping(path = "/getById/{id}")
    public Item getItemById(@PathVariable("id") long id){
        Item item = itemService.getById(id);
        return item;
    }

    @PostMapping(path = "/getList")
    public List<CustomClientCartObject> getItemById(@RequestParam("cart") String cartJson){
        List<CustomClientCartObject> customClientCartObjects = new ArrayList<>();
        ObjectMapper objectMapper = new ObjectMapper();
            try {
                //CollectionType listType = objectMapper.getTypeFactory().constructCollectionType(ArrayList.class, CustomClientCartObject.class);
                //customClientCartObjects = objectMapper.readValue(itemsStr, listType);

                JsonNode jsonNode = objectMapper.readTree(cartJson);
                customClientCartObjects = objectMapper.convertValue(jsonNode, new TypeReference<List<CustomClientCartObject>>() {});

            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }

            for(CustomClientCartObject customClientCartObject: customClientCartObjects){
                Item item = itemService.getById(customClientCartObject.getItemId());
                customClientCartObject.setItemCategory(item.getItemCategory());
                customClientCartObject.setItemPrice(item.getItemPrice());
                customClientCartObject.setItemImage(item.getItemImage());
                customClientCartObject.setItemName(item.getItemName());
                customClientCartObject.setItemDescription(item.getItemDescription());
                customClientCartObject.setCartItemTotalAmount(item.getItemPrice()*customClientCartObject.getItemQuantity());
                customClientCartObject.setItemOnSale(item.isItemOnSale());
                customClientCartObject.setItemSaleValue(item.getItemSaleValue());
                customClientCartObject.setItemExistingQuantity(item.getItemQuantity());
                customClientCartObject.setItemStatus(item.getItemStatus());
            }
        return customClientCartObjects;
    }

    @GetMapping("/getParamValueByName/{param}")
    public Setting getParamValueByName(@PathVariable("param") String param){
        return settingRepository.getParamValueByName(param);
    }

}
