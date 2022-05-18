package com.gg.service;

import com.gg.domain.Studylog;
import com.gg.domain.User;
import com.gg.repository.StudylogRepository;
import com.gg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class StudylogService {

    @Autowired
    StudylogRepository studylogRepository;

    @Autowired
    UserRepository userRepository;

    //닉네임이랑 공부한시간(초) 받고 저장하기
    public Integer insertStudyTime(String nickname, int time){
        User user = userRepository.findByNickname(nickname);
        Studylog studylog = new Studylog();
        studylog.setStudylogTime(time);
        studylog.setUser(user);
        studylogRepository.save(studylog);
        return studylog.getStudylogTime();
    }

    //총 공부시간
    public Integer totalTime(String nickname){
        Studylog studylog = studylogRepository.findByUserNickname(nickname);
        return studylog.getStudylogTime();
    }

    public Integer oneDayTime(String nickname){
        User user = userRepository.findByNickname(nickname);
        return studylogRepository.oneDayTime(user.getId());
    }

    public Integer oneWeekTime(String nickname){
        User user = userRepository.findByNickname(nickname);
        return studylogRepository.oneWeekTime(user.getId());
    }

    public Integer oneMonthTime(String nickname){
        User user = userRepository.findByNickname(nickname);
        return studylogRepository.oneMonthTime(user.getId());
    }

    public Integer selectDayTime(String nickname, Date date){
        User user = userRepository.findByNickname(nickname);
        return studylogRepository.selectDayTime(user.getId(), date);
    }

    public List<Studylog> Monthtop10Studytime(){
        return studylogRepository.Monthtop10studyTime();
    }

    public List<Studylog> Weektop10Studytime(){
        return studylogRepository.Weektop10studyTime();
    }
    public List<Studylog> Daytop10Studytime(){
        return studylogRepository.Daytop10studyTime();
    }

    public Integer recentStudytime(String nickname){
        User user = userRepository.findByNickname(nickname);
        return studylogRepository.recentStudyTime(user.getId());
    }
}
