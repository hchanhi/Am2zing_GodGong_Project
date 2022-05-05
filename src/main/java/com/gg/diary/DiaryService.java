package com.gg.diary;

import com.gg.domain.Diary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiaryService {
    @Autowired
    DiaryRepository diaryRepository;

    public List<Diary> findByMemberId(Long memberId){
        List<Diary> diary = diaryRepository.findByMemberId(memberId);
        return diary;
    }

    public void postDiary(String content, Long memberId, String sentiment){
        Diary diary = new Diary();
        diary.setDiaryContent(content);
        diary.setMemberId(memberId);
        diary.setDiarySentiment(sentiment);
        diaryRepository.save(diary);
    }

    public void editDiary(String content, Long diaryId, String sentiment){
        Diary diary = diaryRepository.findByDiaryId(diaryId);
        diary.setDiaryContent(content);
        diary.setDiarySentiment(sentiment);
        diaryRepository.save(diary);
    }

    public void deleteDiary(Long diaryId){
        Diary diary = diaryRepository.findByDiaryId(diaryId);
        diaryRepository.delete(diary);
    }
}
