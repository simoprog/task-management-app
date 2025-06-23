package com.taskapp.task_management_app.dto.mapper;

import com.taskapp.task_management_app.dto.TaskCreateDTO;
import com.taskapp.task_management_app.dto.TaskResponseDTO;
import com.taskapp.task_management_app.entity.Task;
import com.taskapp.task_management_app.enums.Priority;
import com.taskapp.task_management_app.enums.TaskStatus;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;



@Component
public  class TaskMapper {
    public  Task toEntity(TaskCreateDTO dto) {
        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setStatus(dto.getStatus());
        task.setPriority(dto.getPriority());
        task.setDueDate(dto.getDueDate());
        return task;
    }

    public TaskResponseDTO toResponseDTO(Task task) {
        TaskResponseDTO dto = new TaskResponseDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setStatus(task.getStatus());
        dto.setPriority(task.getPriority());
        dto.setDueDate(task.getDueDate());
        dto.setCreatedAt(task.getCreatedAt());
        dto.setUpdatedAt(task.getUpdatedAt());

        dto.setOverdue(isOverdue(task));
        dto.setDueSoon(isDueSoon(task));
        dto.setStatusLabel(getStatusLabel(task.getStatus()));
        dto.setPriorityLabel(getPriorityLabel(task.getPriority()));

        return dto;
    }

    public List<TaskResponseDTO> toResponseDTOList(List<Task> tasks) {
        return tasks.stream()
                .map(this::toResponseDTO)
                .collect(Collectors.toList());
    }

    private boolean isOverdue(Task task) {
        return task.getDueDate() != null
                && task.getDueDate().isBefore(LocalDate.now())
                && task.getStatus() != TaskStatus.COMPLETED;
    }

    private boolean isDueSoon(Task task) {
        if (task.getDueDate() == null || task.getStatus() == TaskStatus.COMPLETED) {
            return false;
        }
        LocalDate threeDaysFromNow = LocalDate.now().plusDays(3);
        return task.getDueDate().isBefore(threeDaysFromNow) || task.getDueDate().isEqual(threeDaysFromNow);
    }

    private String getStatusLabel(TaskStatus status) {
        return switch (status) {
            case TODO -> "To Do";
            case IN_PROGRESS -> "In Progress";
            case COMPLETED -> "Completed";
        };
    }

    private String getPriorityLabel(Priority priority) {
        return switch (priority) {
            case LOW -> "Low";
            case MEDIUM -> "Medium";
            case HIGH -> "High";
        };
    }
}
