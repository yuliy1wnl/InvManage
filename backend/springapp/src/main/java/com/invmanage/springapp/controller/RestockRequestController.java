package com.invmanage.springapp.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.invmanage.springapp.model.RestockRequest;
import com.invmanage.springapp.repository.RestockRequestRepository;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "http://localhost:4200")
public class RestockRequestController {

    private final RestockRequestRepository repository;

    public RestockRequestController(RestockRequestRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public RestockRequest createRequest(@RequestBody RestockRequest request) {
        request.setRequestedAt(LocalDateTime.now());
        return repository.save(request);
    }

    @GetMapping
    public List<RestockRequest> getAllRequests() {
        return repository.findAll();
    }
}
