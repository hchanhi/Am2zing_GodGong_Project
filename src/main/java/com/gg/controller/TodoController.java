package com.gg.controller;

import com.gg.domain.Todo;
import com.gg.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TodoController {

    private final TodoService todoService;

    @GetMapping("/mypage/todolist")
    public List<Todo> todoList(String nickname){
        return todoService.findByUserId(nickname);
    }

    @PostMapping("/todo/insert")
    public Todo insertTodo(@RequestParam String userNickname, @RequestParam String content, @RequestParam String roomNumber){
       return todoService.insertTodo(userNickname, content, roomNumber);
    }

    @GetMapping("/todo/user_todos")
    public List<Todo> findUserTodos(@RequestParam String userNickname, @RequestParam String roomNumber) {
        return todoService.findUserTodos(userNickname, roomNumber);
    }

    @GetMapping("/todo/room")
    public List<Todo> todoListInRoom(@RequestParam String roomNumber) {
        return todoService.findTodos(roomNumber);
    }
}
