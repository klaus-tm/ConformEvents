package com.example.conformevents.service.implementation;

import com.example.conformevents.entity.User;
import com.example.conformevents.repository.UserRepository;
import com.example.conformevents.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<User> getUserByMailAndPassword(String mail, String password) {
        return userRepository.findByMailAndPassword(mail, password);
    }

    @Override
    public Boolean userExistsByMail(String mail) {
        return userRepository.existsByMail(mail);
    }

    @Override
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User oldUser, User newUser) {
        if(Objects.nonNull(oldUser.getFirstName()) && !"".equals(newUser.getFirstName()))
            oldUser.setFirstName(newUser.getFirstName());

        if(Objects.nonNull(oldUser.getLastName()) && !"".equals(newUser.getLastName()))
            oldUser.setLastName(newUser.getLastName());

        if(Objects.nonNull(oldUser.getMail()) && !"".equals(newUser.getMail()))
            oldUser.setMail(newUser.getMail());

        if(Objects.nonNull(oldUser.getPassword()) && !"".equals(newUser.getPassword()))
            oldUser.setPassword(newUser.getPassword());

        if(!oldUser.getPhone().equals(newUser.getPhone()))
            oldUser.setPhone(newUser.getPhone());

        return saveUser(oldUser);
    }

    @Override
    public Boolean userExists(Long userId) {
        return userRepository.existsById(userId);
    }

    @Override
    public void deleteUserById(Long userId) {
        userRepository.deleteById(userId);
    }
}
