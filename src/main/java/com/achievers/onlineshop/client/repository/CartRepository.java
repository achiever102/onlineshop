package com.achievers.onlineshop.client.repository;

import com.achievers.onlineshop.client.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    @Query(value = "SELECT * FROM CART WHERE user_id=:userId", nativeQuery = true)
    List<Cart> getByUserId(@Param("userId") long userId);

    @Query(value = "SELECT * FROM CART WHERE user_id=:userId and game_id=:gameId", nativeQuery = true)
    List<Cart> getByUserIdAndGameId(@Param("userId") long userId, @Param("gameId") long gameId);

}
