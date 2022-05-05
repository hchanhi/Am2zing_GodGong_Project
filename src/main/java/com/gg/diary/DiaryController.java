package com.gg.diary;

import com.gg.domain.Diary;
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

    @GetMapping("")
    public String findMyDiary(Long memberId, Model model){
        List<Diary> diary = diaryService.findByMemberId(memberId);
        model.addAttribute("diaries",diary);
        return "";
    }

    @GetMapping("")
    public String postPage(){
        return "";
    }

    @PostMapping("")
    public String postDiary(String content, Long memberId, String sentiment){
        diaryService.postDiary(content,memberId,sentiment);
        return "";
    }

    @GetMapping("")
    public String editPage(){
        return "";
    }

    @PostMapping("/{diaryId}")
    public String editDiary(String content, @PathVariable Long diaryId, String sentiment){
        diaryService.editDiary(content, diaryId, sentiment);
        return "";
    }


}
