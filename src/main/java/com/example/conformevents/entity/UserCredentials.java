package com.example.conformevents.entity;

public class UserCredentials {
    private String mail;
    private String password;

    public UserCredentials(String mail, String password) {
        this.mail = mail;
        this.password = password;
    }

    public String getMail() {
        return mail;
    }

    public String getPassword() {
        return password;
    }
}
