package com.gg.controller;

import com.gg.dto.StudyRankDTO;
import com.gg.service.StudylogService;
import com.gg.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/api/mypage/studytime/calendar")
    public List<String> calendarTime(@RequestBody HashMap<String,String>param){
        String nickname = param.get("nickname");
        return studylogService.calendarTime(nickname);
    }

    @GetMapping("/api/main/studytime/summary")
    public List<List<StudyRankDTO>> Ranking() {
        List<List<StudyRankDTO>> result = new ArrayList<>();
        int length = studylogService.Daytop10Studytime().size();
        List<StudyRankDTO> dayranks = new ArrayList<>();
        List<StudyRankDTO> weekranks = new ArrayList<>();
        List<StudyRankDTO> monthranks = new ArrayList<>();
        for (int i = 0; i < length; i++) {
            //하루
            StudyRankDTO daysr = new StudyRankDTO();
            Long id = studylogService.Daytop10Studytime().get(i).getId();
            int day = studylogService.Daytop10Studytime().get(i).getTime();
            String nickname = userService.findNickname(id);
            daysr.setNickname(nickname);
            daysr.setTime(day);
            dayranks.add(i, daysr);
        }
        result.add(0, dayranks);

        length = studylogService.Weektop10Studytime().size();
        for (int i = 0; i < length; i++) {
            //한 주
            StudyRankDTO weeksr = new StudyRankDTO();
            Long id = studylogService.Weektop10Studytime().get(i).getId();
            int week = studylogService.Weektop10Studytime().get(i).getTime();
            String nickname = userService.findNickname(id);
            weeksr.setNickname(nickname);
            weeksr.setTime(week);
            weekranks.add(i, weeksr);
        }
        result.add(1, weekranks);

        length = studylogService.Monthtop10Studytime().size();
        for (int i = 0; i < length; i++) {
            //한 달
            StudyRankDTO monthsr = new StudyRankDTO();
            Long id = studylogService.Monthtop10Studytime().get(i).getId();
            int month = studylogService.Monthtop10Studytime().get(i).getTime();
            String nickname = userService.findNickname(id);
            monthsr.setNickname(nickname);
            monthsr.setTime(month);
            monthranks.add(i, monthsr);
        }
        result.add(2, monthranks);

        return result;
    }

    @GetMapping("/api/studytime/recent")
    public Integer recentStudyTime(String nickname){
        return studylogService.recentStudytime(nickname);
    }
}
