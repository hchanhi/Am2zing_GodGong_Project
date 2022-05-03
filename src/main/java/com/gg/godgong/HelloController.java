package com.gg.godgong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

//리액트를 위한 컨트롤러
@RestController
public class HelloController {
    @GetMapping("/api/hello")
    public List<String> Hello(){
        return Arrays.asList("서버 포트는 8080", "리액트 포트는 3000");
    }
}