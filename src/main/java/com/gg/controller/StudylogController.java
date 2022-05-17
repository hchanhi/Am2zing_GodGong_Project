package com.gg.controller;

import com.gg.domain.Studylog;
import com.gg.service.StudylogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class StudylogController {

    @Autowired
    StudylogService studylogService;

    //닉네임이랑 공부한시간(초) 받고 저장하기
    @PostMapping("/api/studylog/time")
    public Boolean insertStudyTime(@RequestBody HashMap<String, String> params){
        boolean check = true;
        String nickname = params.get("nickname");
        int time = Integer.parseInt(params.get("studytime"));
        int studytime = studylogService.insertStudyTime(nickname, time);
        if(studytime==0){
            check = false;
        }
        return check;
    }

    @GetMapping("/api/mypage/studytime")
    public List<Integer> studyTime(String nickname){
        List<Integer> studytime = new ArrayList<>();
        int day = studylogService.oneDayTime(nickname);
        int week = studylogService.oneWeekTime(nickname);
        int month = studylogService.oneMonthTime(nickname);
        studytime.add(day);
        studytime.add(week);
        studytime.add(month);
        return studytime;
    }

    @PostMapping("/api/mypage/studytime/select")
    public Integer selectStudyTime(String nickname, Date date){
        int time = studylogService.selectDayTime(nickname, date);
        return time;
    }

    @PostMapping("/api/mypage/studytime/total")
    public Integer totalStudyTime(String nickname){
        return studylogService.totalTime(nickname);
    }

    @PostMapping("/api/main/studytime/month")
    public List<Studylog> Monthtop10StudyTime(){
        return studylogService.Monthtop10Studytime();
    }

    @PostMapping("/api/main/studytime/week")
    public List<Studylog> Weektop10StudyTime(){
        return studylogService.Weektop10Studytime();
    }

    @PostMapping("/api/main/studytime/day")
    public List<Studylog> Daytop10StudyTime(){
        return studylogService.Daytop10Studytime();
    }
}
