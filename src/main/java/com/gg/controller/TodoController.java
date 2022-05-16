package com.gg.controller;

import com.gg.domain.Todo;
import com.gg.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class TodoController {

    @Autowired
    TodoService todoService;

    @GetMapping("/api/mypage/todolist")
    public List<Todo> todoList(String nickname){
        return todoService.findByUserId(nickname);
    }

    @PostMapping("/api/todo/insert")
    public void insertTodo(String nickname, String content){
       todoService.insertTodo(nickname, content);
    }

    @PostMapping("/api/todo/complete/{id}")
    public void checkTodo(@PathVariable Long id, boolean check){
        todoService.checkTodo(id, check);
    }

    @PostMapping("/api/todo/delete/{id}")
    public void deleteTodo(@PathVariable Long id){
        todoService.deleteTodo(id);
    }
}
