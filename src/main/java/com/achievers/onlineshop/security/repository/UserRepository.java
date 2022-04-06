package com.achievers.onlineshop.security.repository;

import com.achievers.onlineshop.security.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @Query(value = "SELECT * FROM users WHERE full_name=:fullName", nativeQuery = true)
    Optional<User> findByFullName(String fullName);

    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);

    @Query(value = "select id, email, username, full_name from users", nativeQuery = true)
    List<User> getAllUsers();

    @Modifying
    @Query(value = "DELETE FROM CART c WHERE c.user_id=:userId", nativeQuery = true)
    void deleteUserCart(@Param("userId") long userId);

    @Modifying
    @Query(value = "DELETE FROM payment_methods c WHERE c.user_id=:userId", nativeQuery = true)
    void deleteUserPaymentMethods(@Param("userId") long userId);



    @Modifying
    @Query(value = "DELETE order_items \n" +
            "FROM orders INNER JOIN order_items \n" +
            "ON order_items.order_Id = orders.id\n" +
            "WHERE orders.user_id=:userId", nativeQuery = true)
    void deleteUserOrderItems(@Param("userId") long userId);

    //@Modifying
    //@Query(value = "DELETE FROM order_items c WHERE c.user_id=:userId", nativeQuery = true)
    //void deleteUserOrderItems(@Param("userId") long userId);

    @Modifying
    @Query(value = "DELETE FROM orders c WHERE c.user_id=:userId", nativeQuery = true)
    void deleteUserOrders(@Param("userId") long userId);

    @Modifying
    @Query(value = "DELETE FROM user_role c WHERE c.user_id=:userId", nativeQuery = true)
    void deleteUserRole(@Param("userId") long userId);

    @Modifying
    @Query(value = "DELETE FROM USER c WHERE c.id=:userId", nativeQuery = true)
    void deleteUser(@Param("userId") long userId);
}
