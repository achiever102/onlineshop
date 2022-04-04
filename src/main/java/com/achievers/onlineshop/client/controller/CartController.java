package com.achievers.onlineshop.client.controller;

import com.achievers.onlineshop.admin.repository.SettingRepository;
import com.achievers.onlineshop.admin.service.SettingService;
import com.achievers.onlineshop.client.model.Cart;
import com.achievers.onlineshop.client.model.CustomCheckoutObject;
import com.achievers.onlineshop.client.model.CustomClientCartObject;
import com.achievers.onlineshop.client.model.PaymentMethod;
import com.achievers.onlineshop.client.repository.CartRepository;
import com.achievers.onlineshop.client.service.CartService;
import com.achievers.onlineshop.client.service.PaymentMethodService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.achievers.onlineshop.admin.model.Item;
import com.achievers.onlineshop.admin.service.ItemService;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/cart")
public class CartController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private PaymentMethodService paymentMethodService;

    @Autowired
    private SettingRepository settingRepository;

    @GetMapping("/getAll")
    public List<Item> getAll(){
        return itemService.getAll();
    }


    @PostMapping(path = "/createCartRecords")
    public void getItemById(@RequestParam("cart") String cartJson, @RequestParam("userId") String userId) {


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

            //check if received cart item already exists in the DB
            List<Cart> existingCart = cartRepository.getByUserIdAndGameId(Long.parseLong(userId), customClientCartObject.getItemId());
            Cart cart = new Cart();
            if(existingCart.size() > 0){
                int receivedQuantity = customClientCartObject.getItemQuantity();
                int itemExistingQuantity = itemService.getById(customClientCartObject.getItemId()).getItemQuantity();
                int existingCartRecordQuantity = existingCart.get(0).getQuantity();
                cart = existingCart.get(0);
                if((receivedQuantity + existingCartRecordQuantity) > itemExistingQuantity){
                    cart.setGameId(customClientCartObject.getItemId());
                    cart.setUserId(Long.parseLong(userId));
                    cart.setQuantity(itemExistingQuantity);
                } else {
                    cart.setGameId(customClientCartObject.getItemId());
                    cart.setUserId(Long.parseLong(userId));
                    cart.setQuantity(receivedQuantity + existingCartRecordQuantity);
                }


                cartService.update(cart);

            }else{
                cart.setGameId(customClientCartObject.getItemId());
                cart.setUserId(Long.parseLong(userId));
                cart.setQuantity(customClientCartObject.getItemQuantity());
                cartService.add(cart);
            }


        }


    }

    @GetMapping(path = "/getUserCart/{userId}")
    public ResponseEntity getCartByUserId(@PathVariable("userId") long userId){

        List<Cart> cartList = cartRepository.getByUserId(Long.valueOf(userId));

        List<CustomClientCartObject> customClientCartObjects = new ArrayList<>();

        for(Cart cartItem:cartList){
            Item item = itemService.getById(cartItem.getGameId());
            CustomClientCartObject customClientCartObject = new CustomClientCartObject();
            customClientCartObject.setItemCategory(item.getItemCategory());
            customClientCartObject.setItemPrice(item.getItemPrice());
            customClientCartObject.setItemImage(item.getItemImage());
            customClientCartObject.setItemName(item.getItemName());
            customClientCartObject.setItemDescription(item.getItemDescription());
            customClientCartObject.setCartItemTotalAmount(item.getItemPrice()*customClientCartObject.getItemQuantity());
            customClientCartObject.setItemOnSale(item.isItemOnSale());
            customClientCartObject.setItemSaleValue(item.getItemSaleValue());
            customClientCartObject.setItemStatus(item.getItemStatus());
            customClientCartObject.setItemQuantity(cartItem.getQuantity());
            customClientCartObject.setItemId(cartItem.getGameId());
            customClientCartObject.setItemExistingQuantity(item.getItemQuantity());
            customClientCartObjects.add(customClientCartObject);
        }

        Map<String, String> stringStringMap = new HashMap<>();

        return ResponseEntity.ok().body(customClientCartObjects);
    }

    @GetMapping(path = "/checkoutUserCart/{userId}")
    public CustomCheckoutObject checkoutUserCart(@PathVariable("userId") long userId){

        CustomCheckoutObject customCheckoutObject = new CustomCheckoutObject();

        List<CustomClientCartObject> customClientCartObjects = new ArrayList<>();
        List<Cart> cartList = cartRepository.getByUserId(Long.valueOf(userId));

        List<String> updatedItemsMessages = new ArrayList<>();

        for(Cart cart: cartList){
            Item item = itemService.getById(cart.getGameId());


            if(item.getItemQuantity() == 0){
                updatedItemsMessages.add("- " + item.getItemName() + ": Item removed from your cart.");
                cartService.delete(cart.getId());
            } else {

                CustomClientCartObject customClientCartObject = new CustomClientCartObject();
                customClientCartObject.setItemCategory(item.getItemCategory());
                customClientCartObject.setItemPrice(item.getItemPrice());
                customClientCartObject.setItemImage(item.getItemImage());
                customClientCartObject.setItemName(item.getItemName());
                customClientCartObject.setItemDescription(item.getItemDescription());
                customClientCartObject.setCartItemTotalAmount(item.getItemPrice()*customClientCartObject.getItemQuantity());
                customClientCartObject.setItemOnSale(item.isItemOnSale());
                customClientCartObject.setItemSaleValue(item.getItemSaleValue());
                customClientCartObject.setItemStatus(item.getItemStatus());
                customClientCartObject.setItemId(cart.getGameId());
                customClientCartObject.setCartItemTotalAmount(item.getItemPrice() * cart.getQuantity());


                if(item.getItemQuantity() < cart.getQuantity()){
                    customClientCartObject.setItemExistingQuantity(item.getItemQuantity());
                    customClientCartObject.setItemQuantity(item.getItemQuantity());
                    updatedItemsMessages.add("- " + item.getItemName() + ": Quantity updated from " + cart.getQuantity() + " to " + item.getItemQuantity() + ".");
                    cart.setQuantity(item.getItemQuantity());
                    cartService.update(cart);
                } else {
                    customClientCartObject.setItemExistingQuantity(item.getItemQuantity());
                    customClientCartObject.setItemQuantity(cart.getQuantity());
                }

                customClientCartObjects.add(customClientCartObject);
            }

        }

        PaymentMethod paymentMethod = new PaymentMethod();
        paymentMethod = paymentMethodService.getByUserId(userId);

        float taxValue = settingRepository.getParamValueByName("TaxValue").getValue();

        int count = 0;
        float subTotalAmount = 0f;
        for(CustomClientCartObject customClientCartObject: customClientCartObjects){
            count += customClientCartObject.getItemQuantity();
            if(customClientCartObject.isItemOnSale()){
                subTotalAmount = subTotalAmount + (customClientCartObject.getItemPrice() * customClientCartObject.getItemQuantity()) - (customClientCartObject.getItemPrice() * customClientCartObject.getItemQuantity() * customClientCartObject.getItemSaleValue() / 100);
            } else {
                subTotalAmount = subTotalAmount + (customClientCartObject.getItemPrice() * customClientCartObject.getItemQuantity());
            }
        }

        float subTotalTaxAmount = subTotalAmount * taxValue / 100;
        float totalAmount = subTotalAmount + subTotalTaxAmount;

        customCheckoutObject.setItemList(customClientCartObjects);
        customCheckoutObject.setPaymentMethod(paymentMethod);
        customCheckoutObject.setTaxValue(taxValue);
        customCheckoutObject.setTotalAmount(totalAmount);
        customCheckoutObject.setSubTotal(subTotalAmount);
        customCheckoutObject.setItemsCount(count);
        customCheckoutObject.setSubTotalTaxValue(subTotalTaxAmount);
        customCheckoutObject.setUpdatedItems(updatedItemsMessages);

        return customCheckoutObject;
    }

    @DeleteMapping("/deleteCartItem/{userId}/{id}")
    public List<CustomClientCartObject> deleteCartItemById(@PathVariable("userId") long userId, @PathVariable("id") long id) {
        cartService.delete(cartRepository.getByUserIdAndGameId(userId, id).get(0).getId());
        List<Item> itemsList = new ArrayList<>();

        List<CustomClientCartObject> customClientCartObjects = new ArrayList<>();
        List<Cart> cartList = cartRepository.getByUserId(Long.valueOf(userId));

        for(Cart cartItem:cartList){
            Item item = itemService.getById(cartItem.getGameId());
            CustomClientCartObject customClientCartObject = new CustomClientCartObject();
            customClientCartObject.setItemCategory(item.getItemCategory());
            customClientCartObject.setItemPrice(item.getItemPrice());
            customClientCartObject.setItemImage(item.getItemImage());
            customClientCartObject.setItemName(item.getItemName());
            customClientCartObject.setItemDescription(item.getItemDescription());
            customClientCartObject.setCartItemTotalAmount(item.getItemPrice()*customClientCartObject.getItemQuantity());
            customClientCartObject.setItemOnSale(item.isItemOnSale());
            customClientCartObject.setItemSaleValue(item.getItemSaleValue());
            customClientCartObject.setItemStatus(item.getItemStatus());
            customClientCartObject.setItemQuantity(cartItem.getQuantity());
            customClientCartObject.setItemId(cartItem.getGameId());
            customClientCartObject.setItemExistingQuantity(item.getItemQuantity());
            customClientCartObjects.add(customClientCartObject);
        }

        return customClientCartObjects;

    }

    @PostMapping(path = "/createSingleCartRecord/{userId}/{itemId}")
    public List<Cart> getItemById(@PathVariable("userId") long userId, @PathVariable("itemId") long itemId){
        if(cartRepository.getByUserIdAndGameId(userId, itemId).size() == 0){
            Cart cart = new Cart(itemId, userId, 1);
            cartService.add(cart);
        } else {
            List<Cart> carts = cartRepository.getByUserIdAndGameId(userId, itemId);
            Cart cart = carts.get(0);
            cart.setQuantity(cart.getQuantity()+1);
            cartService.add(cart);
        }

        List<Cart> carts = cartRepository.getByUserId(userId);

        return carts;
    }

    @PostMapping(path = "/incCartItemQuantity/{userId}/{itemId}")
    public List<CustomClientCartObject> incCartItemQuantity(@PathVariable("userId") long userId, @PathVariable("itemId") long itemId){

        List<Cart> carts = cartRepository.getByUserIdAndGameId(userId, itemId);
        Cart cart = carts.get(0);
        cart.setQuantity(cart.getQuantity()+1);

        cartService.add(cart);

        List<CustomClientCartObject> customClientCartObjects = new ArrayList<>();
        List<Cart> cartList = cartRepository.getByUserId(Long.valueOf(userId));

        for(Cart cartItem:cartList){
            Item item = itemService.getById(cartItem.getGameId());
            CustomClientCartObject customClientCartObject = new CustomClientCartObject();
            customClientCartObject.setItemCategory(item.getItemCategory());
            customClientCartObject.setItemPrice(item.getItemPrice());
            customClientCartObject.setItemImage(item.getItemImage());
            customClientCartObject.setItemName(item.getItemName());
            customClientCartObject.setItemDescription(item.getItemDescription());
            customClientCartObject.setCartItemTotalAmount(item.getItemPrice()*customClientCartObject.getItemQuantity());
            customClientCartObject.setItemOnSale(item.isItemOnSale());
            customClientCartObject.setItemSaleValue(item.getItemSaleValue());
            customClientCartObject.setItemStatus(item.getItemStatus());
            customClientCartObject.setItemQuantity(cartItem.getQuantity());
            customClientCartObject.setItemId(cartItem.getGameId());
            customClientCartObject.setItemExistingQuantity(item.getItemQuantity());
            customClientCartObjects.add(customClientCartObject);
        }

        return customClientCartObjects;


    }






    @PostMapping(path = "/decCartItemQuantity/{userId}/{itemId}")
    public List<CustomClientCartObject> decCartItemQuantity(@PathVariable("userId") long userId, @PathVariable("itemId") long itemId){

        Cart currentCartItem = cartRepository.getByUserIdAndGameId(userId, itemId).get(0);

        if(currentCartItem.getQuantity() > 1){
            List<Cart> carts = cartRepository.getByUserIdAndGameId(userId, itemId);
            Cart cart = carts.get(0);
            cart.setQuantity(cart.getQuantity()-1);

            cartService.add(cart);

        } else {
            cartService.delete(cartRepository.getByUserIdAndGameId(userId, itemId).get(0).getId());

        }

        List<CustomClientCartObject> customClientCartObjects = new ArrayList<>();
        List<Cart> cartList = cartRepository.getByUserId(Long.valueOf(userId));

        for(Cart cartItem:cartList){
            Item item = itemService.getById(cartItem.getGameId());
            CustomClientCartObject customClientCartObject = new CustomClientCartObject();
            customClientCartObject.setItemCategory(item.getItemCategory());
            customClientCartObject.setItemPrice(item.getItemPrice());
            customClientCartObject.setItemImage(item.getItemImage());
            customClientCartObject.setItemName(item.getItemName());
            customClientCartObject.setItemDescription(item.getItemDescription());
            customClientCartObject.setCartItemTotalAmount(item.getItemPrice()*customClientCartObject.getItemQuantity());
            customClientCartObject.setItemOnSale(item.isItemOnSale());
            customClientCartObject.setItemSaleValue(item.getItemSaleValue());
            customClientCartObject.setItemStatus(item.getItemStatus());
            customClientCartObject.setItemQuantity(cartItem.getQuantity());
            customClientCartObject.setItemId(cartItem.getGameId());
            customClientCartObject.setItemExistingQuantity(item.getItemQuantity());
            customClientCartObjects.add(customClientCartObject);
        }

        return customClientCartObjects;

    }
}
