package com.example.conformevents.entity;

public class PersonCredentials {
    private String mail;
    private String password;

    public PersonCredentials(String mail, String password) {
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
