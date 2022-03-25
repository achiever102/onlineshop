package com.achievers.onlineshop.repository.client;

import com.achievers.onlineshop.model.client.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    @Query(value = "select * from Cart where owner_id =:ownerId", nativeQuery = true)
    List<Cart> getByUserId(@Param("ownerId") long ownerId);
}