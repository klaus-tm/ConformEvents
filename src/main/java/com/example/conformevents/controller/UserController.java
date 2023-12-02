package com.example.conformevents.controller;

import com.example.conformevents.entity.User;
import com.example.conformevents.entity.PersonCredentials;
import com.example.conformevents.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public ResponseEntity<User> saveUser(@Validated @RequestBody User user) {
        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
    }

    @GetMapping("/users")
    public ResponseEntity<User> getUserByMailAndPassword(@RequestParam("mail") String mail, @RequestParam("password") String password){
        Optional<User> user = userService.getUserByMailAndPassword(mail, password);
        if(user.isPresent()){
            return new ResponseEntity<>(user.get(), HttpStatus.FOUND);
        }
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/users/{mail}")
    public ResponseEntity<HttpStatus> checkUserByMail(@PathVariable("mail") String userMail){
        if(!userService.userExistsByMail(userMail))
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else return new ResponseEntity<>(HttpStatus.FOUND);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<HttpStatus> deleteUserById(@PathVariable("id") Long userId){
        if(!userService.userExists(userId)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userService.deleteUserById(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser( @Validated @RequestBody User newUser, @PathVariable("id") Long userId){
        Optional<User> oldUser = userService.getUserById(userId);
        if(oldUser.isPresent()){
            return new ResponseEntity<>(userService.updateUser(oldUser.get(), newUser), HttpStatus.FOUND);
        }
        else return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
