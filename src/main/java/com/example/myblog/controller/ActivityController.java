package com.example.myblog.controller;

import com.example.myblog.models.Activity;
import com.example.myblog.services.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("activity")
public class ActivityController {
    private final ActivityService activityService;
    @GetMapping
    public List<Activity> getActivity() {
        return activityService.findAll();
    }
    @PostMapping
    public ResponseEntity<HttpStatus> create(@RequestBody Activity activity) {
        activityService.save(activity);
        return ResponseEntity.ok(HttpStatus.OK);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Activity activity) {
        activityService.delete(activity);
        return ResponseEntity.ok(HttpStatus.OK);
    }
}
