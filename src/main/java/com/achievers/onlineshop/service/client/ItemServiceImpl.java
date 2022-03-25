package com.achievers.onlineshop.service.client;

import com.achievers.onlineshop.model.client.Items;
import com.achievers.onlineshop.repository.client.ItemsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {
    @Autowired
    private ItemsRepository itemRepository;

    @Override
    public List<Items> getAll() {
        System.out.println(itemRepository.count());
        return itemRepository.findAll();
    }

    @Override
    public Items getById(Long id) {
        return itemRepository.findById(id).get();
    }

   // @Override
  //  public Items getByItemId(Long id) {
  //      return itemRepository.findById(id).get();
  //  }

    @Override
    public void add(Items item) {
        itemRepository.save(item);
    }

    @Override
    public void delete(long itemId) {
        itemRepository.delete(itemRepository.getById(itemId));
    }

    @Override
    public void update(Items item) {
    }
}
