package com.taskapp.task_management_app.service.impl;

import com.taskapp.task_management_app.entity.Task;
import com.taskapp.task_management_app.enums.Priority;
import com.taskapp.task_management_app.enums.TaskStatus;
import com.taskapp.task_management_app.exception.TaskNotFoundException;
import com.taskapp.task_management_app.repository.TaskRepository;
import com.taskapp.task_management_app.service.TaskService;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    @Override
    public Task createTask(Task task) {
        log.info("Creating new task with title: {}", task.getTitle());

        if (task.getStatus() == null) {
            task.setStatus(TaskStatus.TODO);
        }
        if (task.getPriority() == null) {
            task.setPriority(Priority.MEDIUM);
        }

        Task savedTask = taskRepository.save(task);
        log.info("Task created successfully with ID: {}", savedTask.getId());
        return savedTask;
    }

    @Override
    @Transactional(readOnly = true)
    public Task getTaskById(Long id) {
        log.debug("Fetching task with ID: {}", id);
        return taskRepository.findById(id)
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Task> getAllTasks() {
        log.debug("Fetching all tasks");
        return taskRepository.findAll();
    }

    @Override
    public Task updateTask(Long id, Task updatedTask) {
        log.info("Updating task with ID: {}", id);

        Task existingTask = getTaskById(id);

        if (updatedTask.getTitle() != null) {
            existingTask.setTitle(updatedTask.getTitle());
        }
        if (updatedTask.getDescription() != null) {
            existingTask.setDescription(updatedTask.getDescription());
        }
        if (updatedTask.getStatus() != null) {
            existingTask.setStatus(updatedTask.getStatus());
        }
        if (updatedTask.getPriority() != null) {
            existingTask.setPriority(updatedTask.getPriority());
        }
        if (updatedTask.getDueDate() != null) {
            existingTask.setDueDate(updatedTask.getDueDate());
        }

        Task savedTask = taskRepository.save(existingTask);
        log.info("Task updated successfully with ID: {}", savedTask.getId());
        return savedTask;
    }


    @Override
    public void deleteTask(Long id) {
        log.info("Deleting task with ID: {}", id);

        if (!taskRepository.existsById(id)) {
            throw new TaskNotFoundException(id);
        }

        taskRepository.deleteById(id);
        log.info("Task deleted successfully with ID: {}", id);
    }
    @Override
    public Task markTaskAsCompleted(Long id) {
        log.info("Marking task as completed: {}", id);
        return updateTaskStatus(id, TaskStatus.COMPLETED);
    }

    @Override
    public Task markTaskAsInProgress(Long id) {
        log.info("Marking task as in progress: {}", id);
        return updateTaskStatus(id, TaskStatus.IN_PROGRESS);
    }

    @Override
    public Task updateTaskStatus(Long id, TaskStatus status) {
        log.info("Updating task {} status to: {}", id, status);
        Task task = getTaskById(id);
        task.setStatus(status);
        return taskRepository.save(task);
    }

    @Override
    public Task updateTaskPriority(Long id, Priority priority) {
        log.info("Updating task {} priority to: {}", id, priority);
        Task task = getTaskById(id);
        task.setPriority(priority);
        return taskRepository.save(task);
    }


}
