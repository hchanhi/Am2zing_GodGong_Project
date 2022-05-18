package com.gg.repository;

import com.gg.domain.Studylog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;


public interface StudylogRepository extends JpaRepository<Studylog, Long> {

    @Query(value= "select studylog_time from studylog where user_id=?1 and date(studylog_created) = date(now()) group by user_id", nativeQuery = true)
    Integer oneDayTime(Long userId);

    @Query(value= "select studylog_time from studylog where user_id=?1 and date(studylog_created) >= DATE_SUB(now(), interval 7 day) group by user_id", nativeQuery = true)
    Integer oneWeekTime(Long userId);

    @Query(value= "select studylog_time from studylog where user_id=?1 and date(studylog_created) >= date_format(now(), '%Y-%m-01') group by user_id", nativeQuery = true)
    Integer oneMonthTime(Long userId);

    @Query(value= "select studylog_time from studylog where user_id=?1 and date(studylog_created) = ?2 group by user_id", nativeQuery = true)
    Integer selectDayTime(Long userId, Date date);

    Studylog findByUserNickname(String nickname);

    @Query(value="select user_id, sum(studylog_time) from studylog where date(studylog_created) >= date_format(now(), '%Y-%m-01')" +
            "group by user_id order by studylog_time DESC limit 10", nativeQuery = true)
    List<Studylog> Monthtop10studyTime();

    @Query(value="select user_id, sum(studylog_time) from studylog where date(studylog_created) >= DATE_SUB(now(), interval 7 day)" +
            "group by user_id order by studylog_time DESC limit 10", nativeQuery = true)
    List<Studylog> Weektop10studyTime();

    @Query(value="select user_id, sum(studylog_time) from studylog where date(studylog_created) >= date(now())" +
            "group by user_id order by studylog_time DESC limit 10", nativeQuery = true)
    List<Studylog> Daytop10studyTime();

    @Query(value="select studylog_time from studylog where user_id=?1 order by studylog_created DESC limit 1", nativeQuery = true)
    Integer recentStudyTime(Long id);
}
