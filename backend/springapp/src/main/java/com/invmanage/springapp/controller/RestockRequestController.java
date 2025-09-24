package com.invmanage.springapp.controller;

import com.invmanage.springapp.model.InventoryItem;
import com.invmanage.springapp.model.RestockRequest;
import com.invmanage.springapp.repository.InventoryItemRepository;
import com.invmanage.springapp.repository.RestockRequestRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "http://localhost:4200")
public class RestockRequestController {

    private final RestockRequestRepository repository;
    private final InventoryItemRepository inventoryItemRepository;

    public RestockRequestController(RestockRequestRepository repository, InventoryItemRepository inventoryItemRepository) {
        this.repository = repository;
        this.inventoryItemRepository = inventoryItemRepository;
    }

    // 🔹 User creates request
    @PostMapping
    public RestockRequest createRequest(@RequestBody RestockRequest request) {
    // Fetch the InventoryItem from DB
    InventoryItem item = inventoryItemRepository.findById(request.getItemId())
            .orElseThrow(() -> new RuntimeException("Item not found"));
    request.setInventoryItem(item);           // link the item
    request.setItemName(item.getName());      // populate the itemName
    request.setStatus(RestockRequest.Status.PENDING);
    request.setRequestedAt(java.time.LocalDateTime.now());

    return repository.save(request);
}


    // 🔹 Admin fetches all requests
    @GetMapping
    public List<RestockRequest> getAllRequests() {
        return repository.findAll();
    }

    // 🔹 Admin updates status (approve/reject)
    @PutMapping("/{id}/status")
    public ResponseEntity<RestockRequest> updateStatus(
            @PathVariable Long id,
            @RequestParam RestockRequest.Status status) {

        RestockRequest req = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        req.setStatus(status);
        return ResponseEntity.ok(repository.save(req));
    }
}
