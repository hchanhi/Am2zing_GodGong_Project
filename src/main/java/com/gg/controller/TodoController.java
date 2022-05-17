package com.gg.controller;

import com.gg.domain.Todo;
import com.gg.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TodoController {

    @Autowired
    TodoService todoService;

    @GetMapping("/mypage/todolist")
    public List<Todo> todoList(String nickname){
        return todoService.findByUserId(nickname);
    }

    @PostMapping("/todo/insert")
    public Todo insertTodo(@RequestParam String nickname, @RequestParam String content, @RequestParam String roomNumber){
       return todoService.insertTodo(nickname, content, roomNumber);
    }

    @PostMapping("/todo/delete/{id}")
    public void deleteTodo(@PathVariable Long id){
        todoService.deleteTodo(id);
    }
}
