package com.gg.controller;

import com.gg.domain.Diary;
import com.gg.domain.Member;
import com.gg.service.DiaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class DiaryController {

    @Autowired
    DiaryService diaryService;

    @GetMapping("api/diary/mydiary")
    public String findMyDiary(Member member, Model model){
        List<Diary> diary = diaryService.findByMemberId(member.getId());
        model.addAttribute("diaries",diary);
        return "";
    }

    @GetMapping("api/diary/post")
    public String postPage(){
        return "";
    }

    @PostMapping("api/diary/post")
    public String postDiary(String content, Member member){
        String sentiment = diaryService.sentiment(content);
        diaryService.postDiary(content,member,sentiment);
        return "";
    }

    @GetMapping("api/diary/edit/{diaryId}")
    public String editPage(@PathVariable Long diaryId, Model model){
        Diary diary = diaryService.findByDiaryId(diaryId);
        model.addAttribute("diary", diary);
        return "";
    }

    @PostMapping("api/diary/edit/{diaryId}")
    public String editDiary(String content, @PathVariable Long diaryId){
        String sentiment = diaryService.sentiment(content);
        diaryService.editDiary(content, diaryId, sentiment);
        return "";
    }

    @GetMapping("api/diary/delete/{diaryId}")
    public String deleteDiary(@PathVariable Long diaryId, Member member, Model model){
        diaryService.deleteDiary(diaryId);
        List<Diary> diaries = diaryService.findByMemberId(member.getId());
        model.addAttribute("diaries", diaries);
        return "";
    }

}
