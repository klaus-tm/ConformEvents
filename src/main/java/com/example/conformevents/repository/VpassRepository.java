package com.example.conformevents.repository;

import com.example.conformevents.entity.Event;
import com.example.conformevents.entity.Volunteer;
import com.example.conformevents.entity.Vpass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VpassRepository extends JpaRepository<Vpass, Long> {
    Optional<List<Vpass>> findVpassesByEvent(Event event);
    Optional<List<Vpass>> findVpassesByVolunteer(Volunteer volunteer);
}
