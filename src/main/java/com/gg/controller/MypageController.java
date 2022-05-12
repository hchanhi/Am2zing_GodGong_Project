package com.gg.controller;

import com.gg.service.MypageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
public class MypageController {

    @Autowired
    MypageService mypageService;

    @GetMapping("/api/mypage/studytime")
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


}
