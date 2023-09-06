package com.example.backend.dto;

import java.sql.Date;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DataEntityRequest {
    private Long userId;
    private LocalDate date;
    private String category;
    private Float value;

}
