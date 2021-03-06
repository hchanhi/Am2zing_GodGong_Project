package com.gg.controller;

import com.gg.domain.Diary;
import com.gg.service.DiaryService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
public class DiaryController {

    @Autowired
    DiaryService diaryService;


    @GetMapping("/api/diary/mydiary")
    public List<Diary> findMyDiary(String nickname){
        List<Diary> diary = diaryService.findByUserNickname(nickname);
        return diary;
    }

    @PostMapping("/api/diary/post")
    public Boolean postDiary(@RequestBody HashMap<String, String> param){
        Boolean check = true;
        String content = param.get("content");
        String nickname = param.get("nickname");
        String content2 = content.replaceAll("\n", " ");
        String sentiment = diaryService.sentiment(content2);
        diaryService.postDiary(content,nickname,sentiment);
        if(sentiment.isEmpty()){
            check = false;
        }
        return check;
    }

    @GetMapping("api/diary/edit/{diaryId}")
    public Diary editPage(@PathVariable Long diaryId){
        Diary diary = diaryService.findByDiaryId(diaryId);
        return diary;
    }

    @PostMapping("/api/diary/edit/{diaryId}")
    public Boolean editDiary(@RequestBody HashMap<String, String> param){
        Boolean check = true;
        String content = param.get("content");
        Long diaryId = Long.parseLong(param.get("diaryId"));
        String sentiment = diaryService.sentiment(content);
        diaryService.editDiary(content, diaryId, sentiment);
        if(sentiment.isEmpty()){
            check = false;
        }
        return check;
    }

    @GetMapping("/api/diary/delete/{diaryId}")
    public Boolean deleteDiary(@PathVariable Long diaryId){
        Boolean check = false;
        diaryService.deleteDiary(diaryId);
        if(diaryService.findByDiaryId(diaryId)==null){
            check = true;
        }
        return check;
    }

    @GetMapping("/api/diary/detail/{diaryId}")
    public Diary detail(@PathVariable Long diaryId){
        Diary diary = diaryService.findByDiaryId(diaryId);
        return diary;
    }

    @GetMapping("/api/main/diary/recent")
    public Diary recentDiary(String nickname){
        return diaryService.recentDiary(nickname);
    }
}
