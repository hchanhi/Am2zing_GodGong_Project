package com.gg.repository;

import com.gg.domain.Diary;
import com.gg.domain.Studylog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudylogRepository extends JpaRepository<Studylog, Long> {
    
}
