package com.example.myblog.services;

import com.example.myblog.models.Activity;
import com.example.myblog.repository.ActivityRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityService {
    private final ActivityRepository activityRepository;

    public List<Activity> findAll() {
        return activityRepository.findAll();
    }
    @Transactional
    public void save(Activity activity) {
        activityRepository.save(activity);
    }
}
