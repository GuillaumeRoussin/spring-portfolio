package com.springportfolio.core.repository;

import com.springportfolio.core.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepositoryInterface extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
