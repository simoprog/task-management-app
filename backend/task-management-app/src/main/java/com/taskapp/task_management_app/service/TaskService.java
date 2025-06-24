package com.taskapp.task_management_app.service;

import com.taskapp.task_management_app.entity.Task;
import com.taskapp.task_management_app.enums.Priority;
import com.taskapp.task_management_app.enums.TaskStatus;

import java.util.List;

public interface TaskService {
    Task createTask(Task task);

    Task getTaskById(Long id);

    List<Task> getAllTasks();

    Task updateTask(Long id, Task updatedTask);

    void deleteTask(Long id);

    Task markTaskAsCompleted(Long id);

    Task markTaskAsInProgress(Long id);

    Task updateTaskStatus(Long id, TaskStatus status);

    Task updateTaskPriority(Long id, Priority priority);

}
