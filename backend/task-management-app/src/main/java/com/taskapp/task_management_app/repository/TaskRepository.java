package com.taskapp.task_management_app.repository;

import com.taskapp.task_management_app.entity.Task;
import com.taskapp.task_management_app.enums.Priority;
import com.taskapp.task_management_app.enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,Long> {

    List<Task> findByStatus(TaskStatus status);

    List<Task> findByPriority(Priority priority);

    List<Task> findByDueDateBefore(LocalDate date);

    List<Task> findByStatusAndPriority(TaskStatus status, Priority priority);

    List<Task> findByTitleContainingIgnoreCase(String keyword);

    @Query("SELECT t FROM Task t WHERE t.dueDate < CURRENT_DATE AND t.status != 'COMPLETED'")
    List<Task> findOverdueTasks();

    @Query("SELECT t FROM Task t WHERE t.createdAt >= :since")
    List<Task> findTasksCreatedSince(@Param("since") LocalDateTime since);
}
