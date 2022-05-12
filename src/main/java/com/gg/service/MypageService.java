package com.gg.service;

import com.gg.domain.Studylog;
import com.gg.repository.DiaryRepository;
import com.gg.repository.StudylogRepository;
import com.gg.repository.TodoRepository;
import com.gg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class MypageService {

    @Autowired
    DiaryRepository diaryRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    StudylogRepository studylogRepository;

    @Autowired
    TodoRepository todoRepository;


}
