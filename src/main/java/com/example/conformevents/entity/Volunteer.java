package com.example.conformevents.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor

public class Volunteer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column(nullable = false)
    private String mail;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String phone;
}
