package com.gg.repository;

import com.gg.domain.Diary;
import com.gg.domain.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {

}
