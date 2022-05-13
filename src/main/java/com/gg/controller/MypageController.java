package com.gg.controller;

import com.gg.service.MypageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

@Controller
public class MypageController {

    @Autowired
    MypageService mypageService;

    @PostMapping("/api/mypage/studytime")
    public List<Integer> studyTime(String nickname){
        List<Integer> studytime = new ArrayList<>();
        int day = mypageService.oneDayTime(nickname);
        int week = mypageService.oneWeekTime(nickname);
        int month = mypageService.oneMonthTime(nickname);
        studytime.add(day);
        studytime.add(week);
        studytime.add(month);
        System.out.println(studytime);
        return studytime;
    }

    @PostMapping("/api/mypage/studytime/select")
    public Integer selectStudyTime(String nickname, Date date){
        int time = mypageService.selectDayTime(nickname, date);
        return time;
    }


}
