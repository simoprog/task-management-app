package com.taskapp.task_management_app.exception;
/**
 * Custom exception thrown when a task is not found in the database.
 * This provides more meaningful error messages than generic exceptions.
 */
public class TaskNotFoundException extends RuntimeException {
    public TaskNotFoundException(String message) {
        super(message);
    }
    public TaskNotFoundException(Long id) {
        super("Task not found with id: " + id);
    }
}
