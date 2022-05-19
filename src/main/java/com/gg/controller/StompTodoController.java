package com.gg.controller;

import com.gg.domain.Todo;
import com.gg.dto.EnterRoomDTO;
import com.gg.dto.ResultDTO;
import com.gg.service.RoomlogService;
import com.gg.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class StompTodoController {
    private final SimpMessageSendingOperations simpMessageSendingOperations;

    private final TodoService todoService;

    @MessageMapping("/todo/add")
    public void addTodo(Todo todo){
        simpMessageSendingOperations.convertAndSend("/sub/room/" + todo.getRoom().getRoomNumber(), todo);
    }

    @MessageMapping("/todo/check")
    public void check(Todo todo){
        todoService.checkTodo(todo);
        ResultDTO resultDTO = new ResultDTO();
        resultDTO.setResult("done");
        simpMessageSendingOperations.convertAndSend("/sub/room/" + todo.getRoom().getRoomNumber(), resultDTO);
    }


}
