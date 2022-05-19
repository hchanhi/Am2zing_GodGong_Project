package com.gg.controller;

import com.gg.domain.Studylog;
import com.gg.dto.StudylogInterface;
import com.gg.service.StudylogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/api/mypage/studytime")
    public List<Integer> studyTime(@RequestBody HashMap<String, String> param){
        List<Integer> studytime = new ArrayList<>();
        String nickname = param.get("nickname");
        int day = studylogService.oneDayTime(nickname);
        int week = studylogService.oneWeekTime(nickname);
        int month = studylogService.oneMonthTime(nickname);
        int total = studylogService.totalTime(nickname);
        studytime.add(day);
        studytime.add(week);
        studytime.add(month);
        studytime.add(total);
        return studytime;
    }

    @PostMapping("/api/mypage/studytime/select")
    public Integer selectStudyTime(String nickname, Date date){
        int time = studylogService.selectDayTime(nickname, date);
        return time;
    }

    @GetMapping("/api/main/studytime/month")
    public List<StudylogInterface> Monthtop10StudyTime(){
        return studylogService.Monthtop10Studytime();
    }

    @GetMapping("/api/main/studytime/week")
    public List<StudylogInterface> Weektop10StudyTime(){
        return studylogService.Weektop10Studytime();
    }

    @GetMapping("/api/main/studytime/day")
    public List<StudylogInterface> Daytop10StudyTime(){
        return studylogService.Daytop10Studytime();
    }

    @GetMapping("/api/studytime/recent")
    public Integer recentStudyTime(String nickname){
        return studylogService.recentStudytime(nickname);
    }
}
