package com.example.conformevents.repository;

import com.example.conformevents.entity.User;
import jdk.dynalink.linker.LinkerServices;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByMailAndPassword(String mail, String password);
    Boolean existsByMailAndPassword(String mail, String password);
}
