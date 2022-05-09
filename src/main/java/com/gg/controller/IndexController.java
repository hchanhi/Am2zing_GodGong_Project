package com.gg.controller;


import com.gg.dto.SessionMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor
public class IndexController {
    private final HttpSession httpSession;

    @GetMapping("/")
    public String index(Model model){
        SessionMember member = (SessionMember) httpSession.getAttribute("member");

        if(member != null){
            model.addAttribute("memberNickname", member.getNickname());
        }
        return "index";
    }
}