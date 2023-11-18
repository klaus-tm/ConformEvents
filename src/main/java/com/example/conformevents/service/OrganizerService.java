package com.example.conformevents.service;

import com.example.conformevents.entity.Organizer;
import com.example.conformevents.entity.User;

import java.util.Optional;

public interface OrganizerService {

    Optional<Organizer> getOrganizerByMailAndPassword(String mail, String password);

    Optional<Organizer> getOrganizerById(Long organizerId);

    Organizer saveOrganizer(Organizer organizer);

    Organizer updateOrganizer(Organizer oldOrganizer, Organizer newOrganizer);

    Boolean organizerExists(Long organizerId);

    void deleteOrganizerById(Long organizerId);

}
