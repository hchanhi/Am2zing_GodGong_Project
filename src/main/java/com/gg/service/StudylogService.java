package com.gg.service;

import com.gg.domain.Studylog;
import com.gg.domain.User;
import com.gg.dto.StudylogInterface;
import com.gg.repository.StudylogRepository;
import com.gg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        User user = userRepository.findByNickname(nickname);
        int studylog = studylogRepository.totalStudyTime(user.getId());
        return studylog;
    }

    //마이페이지용
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

    public List<String> calendarTime(String nickname){
        User user = userRepository.findByNickname(nickname);
        return studylogRepository.calendarTime(user.getId());
    }

    //메인페이지 랭킹용
    public List<StudylogInterface> Monthtop10Studytime(){
        return studylogRepository.Monthtop10studyTime();
    }

    public List<StudylogInterface> Weektop10Studytime(){
        return studylogRepository.Weektop10studyTime();
    }
    public List<StudylogInterface> Daytop10Studytime(){
        return studylogRepository.Daytop10studyTime();
    }

    public Integer recentStudytime(String nickname){
        User user = userRepository.findByNickname(nickname);
        return studylogRepository.recentStudyTime(user.getId());
    }
}
