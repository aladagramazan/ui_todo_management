package com.remaladag.todo.controller;

import com.remaladag.todo.dto.TodoDTO;
import com.remaladag.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3006")
@RestController
@RequestMapping("api/v1/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<TodoDTO> createTodo(@RequestBody TodoDTO todoDTO) {
        TodoDTO savedTodo = todoService.createTodo(todoDTO);
        return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping(path = "{id}")
    public ResponseEntity<TodoDTO> getTodoById(@PathVariable("id") Long id) {
        TodoDTO todo = todoService.getTodoById(id);
        return new ResponseEntity<>(todo, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping
    public ResponseEntity<List<TodoDTO>> getAllTodos() {
        List<TodoDTO> todos = todoService.getAllTodos();
        return new ResponseEntity<>(todos, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(path = "{id}")
    public ResponseEntity<TodoDTO> updateTodoById(@PathVariable("id") Long id,
                                                  @RequestBody TodoDTO updatedTodo) {
        TodoDTO todo = todoService.updateTodoById(id, updatedTodo);
        return new ResponseEntity<>(todo, HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping(path = "{id}")
    public ResponseEntity<?> deleteTodoById(@PathVariable("id") Long id) {
        todoService.deleteTodoById(id);
        return ResponseEntity.ok("Todo deleted successfully");
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PatchMapping(path = "{id}/complete")
    public ResponseEntity<TodoDTO> completeTodo(@PathVariable("id") Long id) {
        TodoDTO todo = todoService.completeTodo(id);
        return new ResponseEntity<>(todo, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PatchMapping(path = "{id}/in-complete")
    public ResponseEntity<TodoDTO> inCompleteTodo(@PathVariable("id") Long id) {
        TodoDTO todo = todoService.inCompleteTodo(id);
        return new ResponseEntity<>(todo, HttpStatus.OK);
    }
}
