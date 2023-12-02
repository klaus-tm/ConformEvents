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

public class Vpass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "eventId", updatable = false)
    private Event event;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "volunteerId", updatable = false)
    private Volunteer volunteer;

}
