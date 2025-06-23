package com.taskapp.task_management_app.controller;

import com.taskapp.task_management_app.dto.TaskResponseDTO;
import com.taskapp.task_management_app.dto.TaskUpSertDTO;
import com.taskapp.task_management_app.dto.mapper.TaskMapper;
import com.taskapp.task_management_app.entity.Task;
import com.taskapp.task_management_app.enums.Priority;
import com.taskapp.task_management_app.enums.TaskStatus;
import com.taskapp.task_management_app.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
@Slf4j
public class TaskController {
    private final TaskService taskService;
    private final TaskMapper taskMapper;


    /**
     * Get all tasks
     * GET /api/tasks
     */
    @GetMapping
    public ResponseEntity<List<TaskResponseDTO>> getAllTasks() {
        log.info("GET /api/tasks - Fetching all tasks");
        List<Task> tasks = taskService.getAllTasks();
        log.info("Retrieved {} tasks", tasks.size());

        return ResponseEntity.ok(taskMapper.toResponseDTOList(tasks));
    }

    /**
     * Get task by ID
     * GET /api/tasks/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> getTaskById(@PathVariable Long id) {
        log.info("GET /api/tasks/{} - Fetching task by ID", id);
        Task task = taskService.getTaskById(id);
        return ResponseEntity.ok(taskMapper.toResponseDTO(task));
    }

    /**
     * Create new task
     * POST /api/tasks
     */
    @PostMapping
    public ResponseEntity<TaskResponseDTO> createTask(@Valid @RequestBody TaskUpSertDTO task) {
        log.info("POST /api/tasks - Creating new task: {}", task.getTitle());

        Task createdTask = taskService.createTask(taskMapper.toEntity(task));
        return ResponseEntity.status(HttpStatus.CREATED).body(taskMapper.toResponseDTO(createdTask));
    }

    /**
     * Update existing task
     * PUT /api/v1/tasks/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<TaskResponseDTO> updateTask(@PathVariable Long id,
                                                      @Valid @RequestBody TaskUpSertDTO taskUpdateDTO) {
        log.info("PUT /api/v1/tasks/{} - Updating task", id);

        Task taskEntity = taskMapper.toEntity(taskUpdateDTO);

        Task updatedTask = taskService.updateTask(id, taskEntity);

        TaskResponseDTO responseDTO = taskMapper.toResponseDTO(updatedTask);

        return ResponseEntity.ok(responseDTO);
    }

    /**
     * Delete task
     * DELETE /api/tasks/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        log.info("DELETE /api/tasks/{} - Deleting task", id);
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Mark task as in progress
     * PUT /api/v1/tasks/{id}/start
     */
    @PutMapping("/{id}/start")
    public ResponseEntity<TaskResponseDTO> markTaskAsInProgress(@PathVariable Long id) {
        log.info("PUT /api/v1/tasks/{}/start - Marking task as in progress", id);
        Task inProgressTask = taskService.markTaskAsInProgress(id);
        return ResponseEntity.ok(taskMapper.toResponseDTO(inProgressTask));
    }

    /**
     * Mark task as completed
     * PUT /api/v1/tasks/{id}/start
     */
    @PutMapping("/{id}/completed")
    public ResponseEntity<TaskResponseDTO> markTaskAsCompleted(@PathVariable Long id) {
        log.info("PUT /api/v1/tasks/{}/start - Marking task as completed", id);
        Task completedTask = taskService.markTaskAsCompleted(id);
        return ResponseEntity.ok(taskMapper.toResponseDTO(completedTask));
    }


    /**
     * Update task status
     * PUT /api/v1/tasks/{id}/status
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<TaskResponseDTO> updateTaskStatus(@PathVariable Long id,
                                                            @RequestParam TaskStatus status) {
        log.info("PUT /api/v1/tasks/{}/status - Updating status to: {}", id, status);
        Task updatedTask = taskService.updateTaskStatus(id, status);
        return ResponseEntity.ok(taskMapper.toResponseDTO(updatedTask));
    }

    /**
     * Update task priority
     * PUT /api/v1/tasks/{id}/priority
     */
    @PutMapping("/{id}/priority")
    public ResponseEntity<TaskResponseDTO> updateTaskPriority(@PathVariable Long id,
                                                              @RequestParam Priority priority) {
        log.info("PUT /api/v1/tasks/{}/priority - Updating priority to: {}", id, priority);
        Task updatedTask = taskService.updateTaskPriority(id, priority);
        return ResponseEntity.ok(taskMapper.toResponseDTO(updatedTask));
    }

}
