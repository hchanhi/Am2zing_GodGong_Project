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
    public Boolean insertStudyTime(@RequestBody HashMap<String, String> params){    // 리퀘스트바디, 해쉬맵으로 받아옴
        //프론트에서 잘 작동됐는지 확인용 boolean
        boolean check = true;
        //해쉬맵에서 닉네임과 공부시간을 꺼내옴
        String nickname = params.get("nickname");
        int time = Integer.parseInt(params.get("studytime"));
        //스터디로그에 저장
        int studytime = studylogService.insertStudyTime(nickname, time);
        //저장된값이 없으면 리턴false
        if(studytime==0){
            check = false;
        }
        return check;
    }

    //회원의 공부시간 조회
    @PostMapping("/api/mypage/studytime")
    public List<Integer> studyTime(@RequestBody HashMap<String, String> param){ // 리퀘스트바디, 해쉬맵으로 받아옴
        //studytime 라는 리스트생성 (오늘,한주,한달,총)
        List<Integer> studytime = new ArrayList<>();
        // HashMap에서 닉네임 꺼내오기
        String nickname = param.get("nickname");
        // nickname으로 공부시간 각각 할당 (오늘,한주,한달,총)
        int day = studylogService.oneDayTime(nickname);
        int week = studylogService.oneWeekTime(nickname);
        int month = studylogService.oneMonthTime(nickname);
        int total = studylogService.totalTime(nickname);

        // 리스트에 추가 (오늘,한주,한달,총)
        studytime.add(0,day);
        studytime.add(1,week);
        studytime.add(2,month);
        studytime.add(3,total);

        // 리스트 타입 리턴
        return studytime;
    }

    //달력에 선택할 날짜에 따른 공부시간 조회
    @PostMapping("/api/mypage/studytime/calendar")
    public List<String> calendarTime(@RequestBody HashMap<String,String>param){ // 리퀘스트바디, 해쉬맵으로 받아옴
        //HashMap에서 닉네임, 날짜 꺼내기
        String nickname = param.get("nickname");
        String date = param.get("date");
        //공부시간 조회 및 리턴
        return studylogService.calendarTime(nickname, date);
    }

    //랭킹 조회
    @GetMapping("/api/main/studytime/summary")
    public List<List<StudyRankDTO>> Ranking() {
        //List<StudyRankDTO> 타입으로 가진 List 생성
        //랭킹 조회
        List<List<StudyRankDTO>> result = studylogService.Ranking();
        //리턴
        return result;
    }

    //가장 최근 공부한 시간
    @GetMapping("/api/studytime/recent")
    public Integer recentStudyTime(String nickname){
        return studylogService.recentStudytime(nickname);
    }
}
