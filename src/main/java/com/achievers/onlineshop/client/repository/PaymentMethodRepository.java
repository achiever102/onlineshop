package com.achievers.onlineshop.client.repository;

import com.achievers.onlineshop.client.model.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long> {

    @Query(value = "SELECT * FROM PAYMENT_METHODS WHERE user_id=:userId", nativeQuery = true)
    PaymentMethod getByUserId(@Param("userId") long userId);

}
