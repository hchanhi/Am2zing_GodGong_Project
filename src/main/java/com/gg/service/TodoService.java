package com.gg.service;

import com.gg.domain.Todo;
import com.gg.domain.User;
import com.gg.repository.TodoRepository;
import com.gg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    @Autowired
    TodoRepository todoRepository;

    @Autowired
    UserRepository userRepository;

    public List<Todo> findByUserId(String nickname){
        User user = userRepository.findByNickname(nickname);
        return todoRepository.findByUserId(user.getId());
    }

    public void insertTodo(String nickname, String content){
        User user = userRepository.findByNickname(nickname);
        Todo todo = new Todo();
        todo.setUser(user);
        todo.setTodoContent(content);
        todoRepository.save(todo);
    }

    public void checkTodo(Long id, boolean check){
        Todo todo = todoRepository.findById(id).get();
        todo.setTodoCheck(check);
        todoRepository.save(todo);
    }

    public void deleteTodo(Long id){
        todoRepository.deleteById(id);
    }

}
