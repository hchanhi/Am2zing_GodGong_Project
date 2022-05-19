package com.gg.repository;

import com.gg.domain.Roomlog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomlogRepository extends JpaRepository<Roomlog, Long> {
}
