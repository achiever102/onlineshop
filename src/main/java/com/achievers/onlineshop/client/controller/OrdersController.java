package com.achievers.onlineshop.client.controller;

import com.achievers.onlineshop.admin.model.Coupon;
import com.achievers.onlineshop.admin.model.License;
import com.achievers.onlineshop.admin.repository.SettingRepository;
import com.achievers.onlineshop.admin.service.CouponService;
import com.achievers.onlineshop.admin.service.LicensesService;
import com.achievers.onlineshop.client.model.*;
import com.achievers.onlineshop.client.service.*;
import com.achievers.onlineshop.security.model.User;
import com.achievers.onlineshop.security.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.achievers.onlineshop.admin.model.Item;
import com.achievers.onlineshop.admin.service.ItemService;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/orders")
public class OrdersController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ItemService itemService;

    @Autowired
    private CartService cartService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    private SettingRepository settingRepository;

    @Autowired
    private LicensesService licensesService;

    @Autowired
    private CouponService couponsService;

    @Autowired
    private CSVService csvService;

    @Autowired
    private PaymentMethodService paymentMethodService;


    @GetMapping("/getAll")
    public List<Item> getAll(){
        return itemService.getAll();
    }

    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM-dd-YYYY");


    @PostMapping(path = "/placeAnOrder/{userId}")
    public ResponseEntity getItemById(@PathVariable("userId") long userId, @RequestParam("coupons") String couponsJson) {

        //get coupons from the database from received coupons json
        List<Coupon> appliedCoupons = couponsService.getCouponsFromJson(couponsJson);

        float totalCoupons = 0f;
        for(Coupon coupon: appliedCoupons){
            totalCoupons += coupon.getPercentage();
        }

        List<OrderItem> orderItems = new ArrayList<>();
        String orderUuid = UUID.randomUUID().toString();
        List<Cart> cartList = cartService.getByUserId(userId);

        if (cartList.size() == 0)
            return ResponseEntity.badRequest().body("No items were found in your cart!");

        if(paymentMethodService.getByUserId(userId) == null)
            return ResponseEntity.badRequest().body("Add your payment method details!");

        Order order = new Order();
        List<License> licenseList = new ArrayList<>();

        List<Item> items = new ArrayList<>();
        int count = 0;
        float subTotalAmount = 0f;
        float taxValue = settingRepository.getParamValueByName("TaxValue").getValue();

        for(Cart cart: cartList) {
            Item item = itemService.getById(cart.getGameId());
            count = count + cart.getQuantity();

            if(item.isItemOnSale()){
                subTotalAmount = subTotalAmount + (item.getItemPrice() * cart.getQuantity()) - (item.getItemPrice() * cart.getQuantity() * item.getItemSaleValue() / 100);
            } else {
                subTotalAmount = subTotalAmount + (item.getItemPrice() * cart.getQuantity());
            }

            float itemTotalAmount;
            if(item.isItemOnSale()){
                itemTotalAmount = (item.getItemPrice() * cart.getQuantity()) - (item.getItemPrice() * cart.getQuantity() * item.getItemSaleValue() / 100);
            } else {
                itemTotalAmount = (item.getItemPrice() * cart.getQuantity());
            }

            OrderItem orderItem = new OrderItem(cart.getGameId(), order, cart.getQuantity(), itemTotalAmount , item.isItemOnSale(), item.getItemSaleValue(), cart.getUserId());
            orderItems.add(orderItem);

            licenseList.addAll(licensesService.getTopNLicences(orderItem.getGameId(), orderItem.getQuantity()));

            item.setItemQuantity(item.getItemQuantity()-cart.getQuantity());
            items.add(item);
        }

        float subTotalTaxAmount = subTotalAmount * taxValue / 100;

        float totalAmount = totalCoupons == 0f ? subTotalAmount + subTotalTaxAmount : subTotalAmount - subTotalAmount * totalCoupons / 100 + subTotalTaxAmount;

        StringBuilder couponsString = new StringBuilder();
        if(totalCoupons != 0f){
            for(Coupon coupon:appliedCoupons){
                couponsString.append(coupon.getCouponId() + ":" + coupon.getPercentage() + "% " );
            }
        }

        order.setUserId(userId);
        order.setOrderId(orderUuid);
        order.setOrderDate(formatter.format(LocalDate.now()));
        order.setOrderTotalAmount(totalAmount);
        order.setItems(orderItems);
        order.setOrderItemsCount(count);
        order.setOrderAppliedCoupons(couponsString.toString());
        String csvFileUrl = csvService.load(licenseList, order.getOrderId());
        order.setCsvFileDirectory(csvFileUrl);
        Order savedOrder = orderService.add(order);

        for(License license: licenseList){
            license.setOrderId(order.getOrderId());
            license.setStatus("SOLD");
            licensesService.update(license);
        }

        for(int i = 0; i < cartList.size(); i++){
            cartService.delete(cartList.get(i).getId());
        }

        for(Item item: items){
            itemService.updateItemStatusOrQuantity(item);
        }

        return ResponseEntity.ok(savedOrder.getCsvFileDirectory());
    }

    @GetMapping("/getUserOrders/{userId}")
    public List<CustomOrderObject> getUserOrders(@PathVariable("userId") long userId){

        List<CustomOrderObject> customOrderObjects = new ArrayList<>();

        List<Order> orderList = orderService.getByUserId(userId);

        for(int i = 0; i < orderList.size(); i++){
            //List<Item> itemList = new ArrayList<>();
            List<CustomOrderItemObject> customOrderItemObjects = new ArrayList<>();
            List<OrderItem> orderItems = orderItemService.getOrderItemsByOrderId(orderList.get(i).getId());

            for(OrderItem item:orderItems){
                CustomOrderItemObject customOrderItemObject = new CustomOrderItemObject();
                customOrderItemObject.setItemId(item.getGameId());
                customOrderItemObject.setItemImage(itemService.getById(item.getGameId()).getItemImage());
                customOrderItemObject.setItemName(itemService.getById(item.getGameId()).getItemName());
                customOrderItemObject.setItemOnSale(item.isOnSale());
                customOrderItemObject.setItemSaleValue(item.getSaleValue());
                customOrderItemObject.setItemPrice(item.getAmount());
                customOrderItemObject.setItemQuantity(item.getQuantity());
                customOrderItemObject.setItemPlatform(itemService.getById(item.getGameId()).getItemPlatform());
                customOrderItemObjects.add(customOrderItemObject);
                //itemList.add(itemService.getById(item.getGameId()));
            }

            customOrderObjects.add(new CustomOrderObject(orderList.get(i).getOrderId(), userRepository.findById(orderList.get(i).getUserId()).orElse(new User()).getFullName(), customOrderItemObjects, orderList.get(i).getOrderDate(), orderList.get(i).getOrderTotalAmount(), orderList.get(i).getOrderAppliedCoupons(), orderList.get(i).getOrderItemsCount(), orderList.get(i).getCsvFileDirectory()));
        }

        return customOrderObjects;
    }

    @GetMapping("/getAdminOrders")
    public List<CustomOrderObject> getAdminOrders(){

        List<CustomOrderObject> customOrderObjects = new ArrayList<>();

        List<Order> orderList = orderService.getAll();

        for(int i = 0; i < orderList.size(); i++){
            //List<Item> itemList = new ArrayList<>();
            List<OrderItem> orderItems = orderItemService.getOrderItemsByOrderId(orderList.get(i).getId());

            //for(OrderItem item:orderItems){
             //   itemList.add(itemService.getById(item.getGameId()));
            //}

            List<CustomOrderItemObject> customOrderItemObjects = new ArrayList<>();

            for(OrderItem item:orderItems){
                CustomOrderItemObject customOrderItemObject = new CustomOrderItemObject();
                customOrderItemObject.setItemId(item.getGameId());
                customOrderItemObject.setItemImage(itemService.getById(item.getGameId()).getItemImage());
                customOrderItemObject.setItemName(itemService.getById(item.getGameId()).getItemName());
                customOrderItemObject.setItemOnSale(item.isOnSale());
                customOrderItemObject.setItemSaleValue(item.getSaleValue());
                customOrderItemObject.setItemPrice(item.getAmount());
                customOrderItemObject.setItemQuantity(item.getQuantity());
                customOrderItemObject.setItemPlatform(itemService.getById(item.getGameId()).getItemPlatform());
                customOrderItemObjects.add(customOrderItemObject);
                //itemList.add(itemService.getById(item.getGameId()));
            }

            customOrderObjects.add(new CustomOrderObject(orderList.get(i).getOrderId(), userRepository.findById(orderList.get(i).getUserId()).orElse(new User()).getFullName(), customOrderItemObjects, orderList.get(i).getOrderDate(), orderList.get(i).getOrderTotalAmount(), orderList.get(i).getOrderAppliedCoupons(), orderList.get(i).getOrderItemsCount(), orderList.get(i).getCsvFileDirectory()));
        }

        return customOrderObjects;
    }


    @GetMapping("/getAdminOrdersByOrderId/{orderId}")
    public List<CustomOrderObject> getAdminOrdersByOrderId(@PathVariable("orderId") String orderId){

        List<CustomOrderObject> customOrderObjects = new ArrayList<>();

        List<Order> orderList = orderService.getOrderByOrderId(orderId);

        for(int i = 0; i < orderList.size(); i++){
            //List<Item> itemList = new ArrayList<>();
            List<OrderItem> orderItems = orderItemService.getOrderItemsByOrderId(orderList.get(i).getId());

            //for(OrderItem item:orderItems){
            //   itemList.add(itemService.getById(item.getGameId()));
            //}

            List<CustomOrderItemObject> customOrderItemObjects = new ArrayList<>();

            for(OrderItem item:orderItems){
                CustomOrderItemObject customOrderItemObject = new CustomOrderItemObject();
                customOrderItemObject.setItemId(item.getGameId());
                customOrderItemObject.setItemImage(itemService.getById(item.getGameId()).getItemImage());
                customOrderItemObject.setItemName(itemService.getById(item.getGameId()).getItemName());
                customOrderItemObject.setItemOnSale(item.isOnSale());
                customOrderItemObject.setItemSaleValue(item.getSaleValue());
                customOrderItemObject.setItemPrice(item.getAmount());
                customOrderItemObject.setItemQuantity(item.getQuantity());
                customOrderItemObject.setItemPlatform(itemService.getById(item.getGameId()).getItemPlatform());
                customOrderItemObjects.add(customOrderItemObject);
                //itemList.add(itemService.getById(item.getGameId()));
            }

            customOrderObjects.add(new CustomOrderObject(orderList.get(i).getOrderId(), userRepository.findById(orderList.get(i).getUserId()).orElse(new User()).getFullName(), customOrderItemObjects, orderList.get(i).getOrderDate(), orderList.get(i).getOrderTotalAmount(), orderList.get(i).getOrderAppliedCoupons(), orderList.get(i).getOrderItemsCount(), orderList.get(i).getCsvFileDirectory()));
        }

        return customOrderObjects;
    }

    @GetMapping("/getAdminOrdersByClientName/{clientName}")
    public List<CustomOrderObject> getAdminOrdersByClientName(@PathVariable("clientName") String clientName){

        List<CustomOrderObject> customOrderObjects = new ArrayList<>();



        User user = userRepository.findByFullName(clientName).get();

        if(user != null) {

            List<Order> orderList = orderService.getOrderByClientName(user.getId());

            for (int i = 0; i < orderList.size(); i++) {
                List<OrderItem> orderItems = orderItemService.getOrderItemsByOrderId(orderList.get(i).getId());

                List<CustomOrderItemObject> customOrderItemObjects = new ArrayList<>();

                for (OrderItem item : orderItems) {
                    CustomOrderItemObject customOrderItemObject = new CustomOrderItemObject();
                    customOrderItemObject.setItemId(item.getGameId());
                    customOrderItemObject.setItemImage(itemService.getById(item.getGameId()).getItemImage());
                    customOrderItemObject.setItemName(itemService.getById(item.getGameId()).getItemName());
                    customOrderItemObject.setItemOnSale(item.isOnSale());
                    customOrderItemObject.setItemSaleValue(item.getSaleValue());
                    customOrderItemObject.setItemPrice(item.getAmount());
                    customOrderItemObject.setItemQuantity(item.getQuantity());
                    customOrderItemObject.setItemPlatform(itemService.getById(item.getGameId()).getItemPlatform());
                    customOrderItemObjects.add(customOrderItemObject);
                    //itemList.add(itemService.getById(item.getGameId()));
                }

                customOrderObjects.add(new CustomOrderObject(orderList.get(i).getOrderId(), userRepository.findById(orderList.get(i).getUserId()).orElse(new User()).getFullName(), customOrderItemObjects, orderList.get(i).getOrderDate(), orderList.get(i).getOrderTotalAmount(), orderList.get(i).getOrderAppliedCoupons(), orderList.get(i).getOrderItemsCount(), orderList.get(i).getCsvFileDirectory()));
            }
        }
        return customOrderObjects;
    }

    @GetMapping("/getAdminOrdersByDate/{orderDate}")
    public List<CustomOrderObject> getAdminOrdersByDate(@PathVariable("orderDate") String orderDate){

        List<CustomOrderObject> customOrderObjects = new ArrayList<>();

        List<Order> orderList = orderService.getOrderByDate(orderDate);

        for(int i = 0; i < orderList.size(); i++){
            //List<Item> itemList = new ArrayList<>();
            List<OrderItem> orderItems = orderItemService.getOrderItemsByOrderId(orderList.get(i).getId());

            //for(OrderItem item:orderItems){
            //   itemList.add(itemService.getById(item.getGameId()));
            //}

            List<CustomOrderItemObject> customOrderItemObjects = new ArrayList<>();

            for(OrderItem item:orderItems){
                CustomOrderItemObject customOrderItemObject = new CustomOrderItemObject();
                customOrderItemObject.setItemId(item.getGameId());
                customOrderItemObject.setItemImage(itemService.getById(item.getGameId()).getItemImage());
                customOrderItemObject.setItemName(itemService.getById(item.getGameId()).getItemName());
                customOrderItemObject.setItemOnSale(item.isOnSale());
                customOrderItemObject.setItemSaleValue(item.getSaleValue());
                customOrderItemObject.setItemPrice(item.getAmount());
                customOrderItemObject.setItemQuantity(item.getQuantity());
                customOrderItemObject.setItemPlatform(itemService.getById(item.getGameId()).getItemPlatform());
                customOrderItemObjects.add(customOrderItemObject);
                //itemList.add(itemService.getById(item.getGameId()));
            }

            customOrderObjects.add(new CustomOrderObject(orderList.get(i).getOrderId(), userRepository.findById(orderList.get(i).getUserId()).orElse(new User()).getFullName(), customOrderItemObjects, orderList.get(i).getOrderDate(), orderList.get(i).getOrderTotalAmount(), orderList.get(i).getOrderAppliedCoupons(), orderList.get(i).getOrderItemsCount(), orderList.get(i).getCsvFileDirectory()));
        }

        return customOrderObjects;
    }


    @GetMapping("/getUserOrdersByOrderId/{userId}/{orderId}")
    public List<CustomOrderObject> getUserOrdersByOrderId(@PathVariable("userId") long userId, @PathVariable("orderId") String orderId){

        List<CustomOrderObject> customOrderObjects = new ArrayList<>();

        List<Order> orderList = orderService.getByUserIdAndOrderId(userId, orderId);

        for(int i = 0; i < orderList.size(); i++){
            //List<Item> itemList = new ArrayList<>();
            List<CustomOrderItemObject> customOrderItemObjects = new ArrayList<>();
            List<OrderItem> orderItems = orderItemService.getOrderItemsByOrderId(orderList.get(i).getId());

            for(OrderItem item:orderItems){
                CustomOrderItemObject customOrderItemObject = new CustomOrderItemObject();
                customOrderItemObject.setItemId(item.getGameId());
                customOrderItemObject.setItemImage(itemService.getById(item.getGameId()).getItemImage());
                customOrderItemObject.setItemName(itemService.getById(item.getGameId()).getItemName());
                customOrderItemObject.setItemOnSale(item.isOnSale());
                customOrderItemObject.setItemSaleValue(item.getSaleValue());
                customOrderItemObject.setItemPrice(item.getAmount());
                customOrderItemObject.setItemQuantity(item.getQuantity());
                customOrderItemObject.setItemPlatform(itemService.getById(item.getGameId()).getItemPlatform());
                customOrderItemObjects.add(customOrderItemObject);
                //itemList.add(itemService.getById(item.getGameId()));
            }

            customOrderObjects.add(new CustomOrderObject(orderList.get(i).getOrderId(), userRepository.findById(orderList.get(i).getUserId()).orElse(new User()).getFullName(), customOrderItemObjects, orderList.get(i).getOrderDate(), orderList.get(i).getOrderTotalAmount(), orderList.get(i).getOrderAppliedCoupons(), orderList.get(i).getOrderItemsCount(), orderList.get(i).getCsvFileDirectory()));
        }

        return customOrderObjects;
    }

    @GetMapping("/getUserOrdersByDate/{userId}/{orderDate}")
    public List<CustomOrderObject> getUserOrdersByDate(@PathVariable("userId") long userId, @PathVariable("orderDate") String orderDate){

        List<CustomOrderObject> customOrderObjects = new ArrayList<>();

        List<Order> orderList = orderService.getByUserIdAndOrderDate(userId, orderDate);

        for(int i = 0; i < orderList.size(); i++){
            //List<Item> itemList = new ArrayList<>();
            List<CustomOrderItemObject> customOrderItemObjects = new ArrayList<>();
            List<OrderItem> orderItems = orderItemService.getOrderItemsByOrderId(orderList.get(i).getId());

            for(OrderItem item:orderItems){
                CustomOrderItemObject customOrderItemObject = new CustomOrderItemObject();
                customOrderItemObject.setItemId(item.getGameId());
                customOrderItemObject.setItemImage(itemService.getById(item.getGameId()).getItemImage());
                customOrderItemObject.setItemName(itemService.getById(item.getGameId()).getItemName());
                customOrderItemObject.setItemOnSale(item.isOnSale());
                customOrderItemObject.setItemSaleValue(item.getSaleValue());
                customOrderItemObject.setItemPrice(item.getAmount());
                customOrderItemObject.setItemQuantity(item.getQuantity());
                customOrderItemObject.setItemPlatform(itemService.getById(item.getGameId()).getItemPlatform());
                customOrderItemObjects.add(customOrderItemObject);
                //itemList.add(itemService.getById(item.getGameId()));
            }

            customOrderObjects.add(new CustomOrderObject(orderList.get(i).getOrderId(), userRepository.findById(orderList.get(i).getUserId()).orElse(new User()).getFullName(), customOrderItemObjects, orderList.get(i).getOrderDate(), orderList.get(i).getOrderTotalAmount(), orderList.get(i).getOrderAppliedCoupons(), orderList.get(i).getOrderItemsCount(), orderList.get(i).getCsvFileDirectory()));
        }

        return customOrderObjects;
    }
}
