package com.example.conformevents.repository;

import com.example.conformevents.entity.User;
import com.example.conformevents.entity.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VolunteerRepository extends JpaRepository<Volunteer, Long> {
    Optional<Volunteer> findByMailAndPassword(String mail, String password);
    Boolean existsByMailAndPassword(String mail, String password);
}
