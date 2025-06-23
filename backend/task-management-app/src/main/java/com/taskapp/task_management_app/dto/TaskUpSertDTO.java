package com.taskapp.task_management_app.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.taskapp.task_management_app.enums.Priority;
import com.taskapp.task_management_app.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskUpSertDTO {

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must be less than 255 characters")
    private String title;

    @Size(max = 1000, message = "Description must be less than 1000 characters")
    private String description;

    private TaskStatus status;

    private Priority priority;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dueDate;
}