package com.gg.repository;

import com.gg.domain.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    List<Diary> findByUserNickname(String nickname);

    Diary findByDiaryId(Long diaryId);
}
