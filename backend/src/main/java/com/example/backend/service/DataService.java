package com.example.backend.service;

import java.time.LocalDate;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.dto.DataEntityRequest;
import com.example.backend.dto.DataEntityResponse;
import com.example.backend.model.DataEntity;
import com.example.backend.repository.DataRepository;

@Service
public class DataService {

    private String OVERALL_CATEGORY = "O";
    private static final Logger logger = LoggerFactory.getLogger(DataService.class);

    private final DataRepository dataRepository;

    @Autowired
    public DataService(DataRepository dataRepository) {
        this.dataRepository = dataRepository;
    }

    public void saveData(DataEntityRequest newData) {
        logger.info(newData.toString());
        logger.info("Category"+newData.getCategory()+newData.getUserId());
        String _category = newData.getCategory();
        DataEntity _data = DataEntity.builder()
                                    .userId(newData.getUserId())
                                    .date(newData.getDate())
                                    .category(newData.getCategory())
                                    .value(newData.getValue())
                                    .build();
        
        List<DataEntity> existingData = dataRepository.findByUserIdAndDate(newData.getUserId(), newData.getDate());

        if (existingData.isEmpty()) {
            // No existing data, save the new data
            logger.info("Data empty");
            DataEntity overallData = new DataEntity();
            overallData.setUserId(newData.getUserId());
            overallData.setDate(newData.getDate());
            overallData.setCategory(OVERALL_CATEGORY);
            overallData.setValue(newData.getValue());
            dataRepository.save(overallData);
            dataRepository.save(_data);
            return;
        }
        logger.info("Data Present");
        for (DataEntity data : existingData) {
            if (data.getCategory().equals(_category)) {
                data.setValue((data.getValue()+_data.getValue())/2);
                dataRepository.save(data);
            }
        }

        // Check if "overall" data exists for this category
        DataEntity overallData = dataRepository.findByUserIdAndDateAndCategory(newData.getUserId(), newData.getDate(), OVERALL_CATEGORY);

        // Update the "overall" data with the new average value
        overallData.setValue((overallData.getValue()+newData.getValue())/2);
        dataRepository.save(overallData);

        for (DataEntity data : existingData) {
            // categoryAverages.put(data.getCategory(), categoryAverages.getOrDefault(data.getCategory(), 0.0) + data.getValue());
            if (data.getCategory().equals(_category)) {
                data.setValue((data.getValue()+_data.getValue())/2);
                dataRepository.save(data);
                return;
            }
        }

        dataRepository.save(_data);
        return;
    }

    public List<DataEntityResponse> getAllRecordData(){
        List<DataEntity> datas = dataRepository.findAll();
        return datas.stream().map(_data -> mapToDataResponse(_data)).toList();  
    }

    public List<DataEntityResponse> getDataById(Long id) {
        List<DataEntity> datas = dataRepository.findAllByUserId(id);
        return datas.stream().map(_data -> mapToDataResponse(_data)).toList();
    }

    public List<DataEntityResponse> retrieveDataByDateRangeAndUserId(Long userId, LocalDate startDate, LocalDate endDate) {
        List<DataEntity> datas =  dataRepository.findByUserIdAndDateBetween(userId, startDate, endDate);
        return datas.stream().map(_data -> mapToDataResponse(_data)).toList();
    }

    public void deleteByUserId(Long id){
        dataRepository.deleteByUserId(id);
    }

    public void deleteAllData() {
        dataRepository.deleteAll();
    }

    private DataEntityResponse mapToDataResponse(DataEntity _data){
        return DataEntityResponse.builder()
                .id(_data.getId())
                .userId(_data.getUserId())
                .date(_data.getDate())
                .category(_data.getCategory())
                .value(_data.getValue())
                .build();
    }

    
}