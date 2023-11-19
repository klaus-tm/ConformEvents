package com.example.conformevents.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@Getter
@Setter
@NoArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column
    private String name;

    @Column
    private LocalDate date;

    @Column
    private LocalTime time;

    @Column
    private String type;

    @Column
    private String location;

    @Column
    private byte locationType;

    @Column
    private Integer ticketsNumber;

    @Column
    private Integer volunteersNumber;

    @Column
    private String ticketPrices;

    @Column
    private String ticketTypes;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "organizerId", updatable = false)
    private Organizer organizer;
}
