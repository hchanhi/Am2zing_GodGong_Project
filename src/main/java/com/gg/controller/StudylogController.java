package com.gg.controller;

import com.gg.service.StudylogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Controller
public class StudylogController {

    @Autowired
    StudylogService studylogService;

    //닉네임이랑 공부한시간(초) 받고 저장하기
    @PostMapping("api/studylog/time")
    public Boolean insertStudyTime(String nickname, int time){
        boolean check = true;
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
        System.out.println(studytime);
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
}
