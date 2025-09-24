package com.invmanage.springapp.controller;

import com.invmanage.springapp.model.RestockRequest;
import com.invmanage.springapp.repository.RestockRequestRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/admin/requests")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminRequestController {

    private final RestockRequestRepository requestRepository;

    public AdminRequestController(RestockRequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    @GetMapping
    public List<RestockRequest> getAllRequests() {
        return requestRepository.findAll(); // Or only pending: requestRepository.findByStatus("PENDING")
    }
}
