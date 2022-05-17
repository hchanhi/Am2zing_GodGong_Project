package com.gg.controller;

import com.gg.domain.Todo;
import com.gg.dto.ChatMessageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class StompChatController {
    private final SimpMessageSendingOperations simpMessageSendingOperations;

    @MessageMapping("/chat/enter")
    public void enter(ChatMessageDTO message){
        message.setMessage(message.getUserNickname() + "님이 채팅방에 참여하셨습니다.");
        simpMessageSendingOperations.convertAndSend("/sub/room/" + message.getRoomNumber(), message);
    }

    @MessageMapping("/chat/message")
    public void message(ChatMessageDTO message){
        simpMessageSendingOperations.convertAndSend("/sub/room/" + message.getRoomNumber(), message);
    }
}
