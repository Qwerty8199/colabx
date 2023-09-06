package com.example.backend.controller;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.dto.DataEntityRequest;
import com.example.backend.dto.DataEntityResponse;
import com.example.backend.service.DataService;

@RestController
@RequestMapping("/api/data")
@CrossOrigin(origins = "http://localhost:5173")
public class DataController {

    private final DataService dataService;
    private static final Logger logger = LoggerFactory.getLogger(DataController.class);

    @Autowired
    public DataController(DataService dataService) {
        this.dataService = dataService;
    }

    @PostMapping
    public void saveData(@RequestBody DataEntityRequest data) {
        logger.info("got"+data.toString());
        logger.info(data.getUserId()+" "+data.getCategory()+" "+data.getValue()+" "+data.getDate());
        logger.info("POST Endpoint reached");
        dataService.saveData(data);
        return;
    }

    @GetMapping("/{id}")
    public List<DataEntityResponse> getDataById(@PathVariable Long id) {
        logger.info("GET Endpoint reached");
        return dataService.getDataById(id);
    }

    @GetMapping("/")
    public List<DataEntityResponse> getAllRecordData() {
        logger.info("GET Endpoint reached");
        return dataService.getAllRecordData();
    }

    @GetMapping("/retrieve")
    public ResponseEntity<List<DataEntityResponse>> retrieveDataByDateRangeAndUserId(
        @RequestParam("userId") Long userId,
        @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
        @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        List<DataEntityResponse> data = dataService.retrieveDataByDateRangeAndUserId(userId, startDate, endDate);
        return ResponseEntity.ok(data);
    }

    @DeleteMapping("/del")
    public ResponseEntity<String> deleteAllData() {
        dataService.deleteAllData();
        return ResponseEntity.ok("All data deleted successfully.");
    }

    @DeleteMapping("/del/{userId}")
    public ResponseEntity<String> deleteDataByUserId(@RequestParam("userId") Long userId) {
        dataService.deleteByUserId(userId);
        return ResponseEntity.ok("Data deleted successfully.");
    }
}





