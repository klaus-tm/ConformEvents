package com.example.conformevents.service;

import com.example.conformevents.entity.User;

import java.util.Optional;

public interface UserService {

    Optional<User> getUserByMailAndPassword(String mail, String password);

    Optional<User> getUserById(Long userId);

    User saveUser(User user);

    User updateUser(User oldUser, User newUser);

    Boolean userExists(Long userId);

    void deleteUserById(Long userId);
}
