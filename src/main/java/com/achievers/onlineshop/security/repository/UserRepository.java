package com.achievers.onlineshop.security.repository;

import com.achievers.onlineshop.security.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @Query(value = "SELECT * FROM users WHERE full_name=:fullName", nativeQuery = true)
    Optional<User> findByFullName(String fullName);

    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
