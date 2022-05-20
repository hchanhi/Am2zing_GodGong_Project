package com.gg.controller;

import com.gg.dto.StudyRankDTO;
import com.gg.service.StudylogService;
import com.gg.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
public class StudylogController {

    @Autowired
    StudylogService studylogService;

    @Autowired
    UserService userService;

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

    @GetMapping("/api/main/studytime/summary")
    public List<StudyRankDTO> Ranking(){
        List<StudyRankDTO> ranks = new ArrayList<>();
        int length = studylogService.Daytop10Studytime().size();
        for(int i=0;i<length;i++) {
            Long id = studylogService.Daytop10Studytime().get(i).getId();
            int day = studylogService.Daytop10Studytime().get(i).getTime();
            int week = studylogService.Weektop10Studytime().get(i).getTime();
            int month = studylogService.Monthtop10Studytime().get(i).getTime();
            String nickname = userService.findNickname(id);
            StudyRankDTO sr = new StudyRankDTO();
            sr.setDay(day);
            sr.setWeek(week);
            sr.setMonth(month);
            sr.setNickname(nickname);
            ranks.add(i, sr);
        }
        return ranks;
    }

    @GetMapping("/api/studytime/recent")
    public Integer recentStudyTime(String nickname){
        return studylogService.recentStudytime(nickname);
    }
}
