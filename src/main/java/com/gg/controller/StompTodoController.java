package com.gg.controller;

import com.gg.domain.Todo;
import com.gg.dto.ChatMessageDTO;
import com.gg.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class StompTodoController {
    private final SimpMessageSendingOperations simpMessageSendingOperations;

    private final TodoService todoService;

    @MessageMapping("/todo/check")
    public void check(Todo todo){
        todoService.checkTodo(todo);
        simpMessageSendingOperations.convertAndSend("/sub/room/" + todo.getRoom().getRoomNumber(), todo);
    }


}
