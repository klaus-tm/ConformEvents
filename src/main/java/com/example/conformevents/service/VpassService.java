package com.example.conformevents.service;

import com.example.conformevents.entity.*;

import java.util.List;
import java.util.Optional;

public interface VpassService {

    Vpass saveVpass(Vpass vpass);

    Optional<List<Vpass>> getVpassesByEvent(Event event);

    Optional<List<Vpass>> getVpassesByVolunteer(Volunteer volunteer);

    Optional<Vpass> getVpassById(Long vpassId);

    void deleteVpassById(Long vpassId);

    Boolean vpassExists(Long vpassId);

}
