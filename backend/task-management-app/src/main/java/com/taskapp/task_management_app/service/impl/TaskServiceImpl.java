package com.taskapp.task_management_app.service.impl;

import com.taskapp.task_management_app.entity.Task;
import com.taskapp.task_management_app.service.TaskService;

import java.util.List;

public class TaskServiceImpl implements TaskService {
    @Override
    public Task createTask(Task task) {
        return null;
    }

    @Override
    public Task getTaskById(Long id) {
        return null;
    }

    @Override
    public List<Task> getAllTasks() {
        return List.of();
    }

    @Override
    public Task updateTask(Long id, Task updatedTask) {
        return null;
    }

    @Override
    public void deleteTask(Long id) {

    }
}
