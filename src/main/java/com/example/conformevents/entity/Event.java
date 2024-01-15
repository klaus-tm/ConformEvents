package com.example.conformevents.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

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
    private String startHours;

    @Column
    private String cityRegion;

    @Column
    private Date registerLimit;

    @Column
    private String raceMap;

    @Column
    private Integer volunteersNumber;

    @Column
    private String racePrices;

    @Column
    private String raceTypes;

    @Column(length = 9999999)
    private String description;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "organizerId", updatable = false)
    private Organizer organizer;
}
