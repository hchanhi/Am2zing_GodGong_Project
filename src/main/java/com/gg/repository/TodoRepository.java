package com.gg.repository;

import com.gg.domain.Diary;
import com.gg.domain.Room;
import com.gg.domain.Todo;
import com.gg.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByUserId(Long userId);
    List<Todo> findAllByUserAndRoom(User user, Room room);
}
