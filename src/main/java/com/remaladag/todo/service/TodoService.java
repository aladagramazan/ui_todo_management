package com.remaladag.todo.service;

import com.remaladag.todo.dto.TodoDTO;

import java.util.List;

public interface TodoService {

    TodoDTO createTodo(TodoDTO todoDTO);

    TodoDTO getTodoById(Long id);

    List<TodoDTO> getAllTodos();

    TodoDTO updateTodoById(Long id, TodoDTO updatedTodo);

    void deleteTodoById(Long id);

    TodoDTO completeTodo(Long id);

    TodoDTO inCompleteTodo (Long id);
}
