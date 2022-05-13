package com.gg.repository;

import com.gg.domain.Studylog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;


public interface StudylogRepository extends JpaRepository<Studylog, Long> {

    @Query(value= "select studylog_time from studylog where user_id=?1 and date(studylog_created) = date(now()) group by user_id", nativeQuery = true)
    Integer oneDayTime(Long userId);

    @Query(value= "select studylog_time from studylog where user_id=?1 and date(studylog_created) >= DATE_SUB(now(), interval 7 day) group by user_id", nativeQuery = true)
    Integer oneWeekTime(Long userId);

    @Query(value= "select studylog_time from studylog where user_id=?1 and date(studylog_created) >= date_format(now(), '%Y-%m-01') group by user_id", nativeQuery = true)
    Integer oneMonthTime(Long userId);

    @Query(value= "select studylog_time from studylog where user_id=?1 and date(studylog_created) = ?2 group by user_id", nativeQuery = true)
    Integer selectDayTime(Long userId, Date date);
}
