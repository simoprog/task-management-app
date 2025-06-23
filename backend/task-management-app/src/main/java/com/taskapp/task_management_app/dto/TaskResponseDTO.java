package com.taskapp.task_management_app.dto;

import com.taskapp.task_management_app.enums.Priority;
import com.taskapp.task_management_app.enums.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskResponseDTO {
    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private Priority priority;
    private LocalDate dueDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private boolean isOverdue;
    private boolean isDueSoon;
    private String statusLabel;
    private String priorityLabel;
}
