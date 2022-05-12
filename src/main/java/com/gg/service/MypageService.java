package com.gg.service;

import com.gg.domain.Studylog;
import com.gg.domain.User;
import com.gg.repository.DiaryRepository;
import com.gg.repository.StudylogRepository;
import com.gg.repository.TodoRepository;
import com.gg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MypageService {

    @Autowired
    DiaryRepository diaryRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    StudylogRepository studylogRepository;

    @Autowired
    TodoRepository todoRepository;

    public Integer oneDayTime(String nickname){
        User user = userRepository.findByNickname(nickname);
        return studylogRepository.oneDayTime(user.getId());
    }

    public Integer oneWeekTime(String nickname){
        User user = userRepository.findByNickname(nickname);
        return studylogRepository.oneWeekTime(user.getId());
    }

    public Integer oneMonthTime(String nickname){
        User user = userRepository.findByNickname(nickname);
        return studylogRepository.oneMonthTime(user.getId());
    }
}
