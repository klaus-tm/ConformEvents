package com.example.conformevents.service;

import com.example.conformevents.entity.Organizer;
import com.example.conformevents.entity.Volunteer;

import java.util.Optional;

public interface VolunteerService {

    Optional<Volunteer> getVolunteerByMailAndPassword(String mail, String password);

    Optional<Volunteer> getVolunteerById(Long volunteerId);

    Volunteer saveVolunteer(Volunteer volunteer);

    Volunteer updateVolunteer(Volunteer oldVolunteer, Volunteer newVolunteer);

    Boolean volunteerExists(Long volunteerId);

    void deleteVolunteerById(Long volunteerId);

}
