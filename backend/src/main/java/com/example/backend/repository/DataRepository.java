package com.example.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.model.DataEntity;

public interface DataRepository extends JpaRepository<DataEntity, Long> {

    List<DataEntity> findAllByUserId(Long userId);

    List<DataEntity> findByUserIdAndDate(Long userId, LocalDate date);

    DataEntity findByUserIdAndDateAndCategory(Long userId, LocalDate date, String category);

    List<DataEntity> findByUserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate);

    void deleteByUserId(Long userId);
   
}