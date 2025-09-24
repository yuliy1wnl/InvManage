package com.invmanage.springapp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.invmanage.springapp.model.InventoryItem;
import com.invmanage.springapp.model.RestockRequest;
import com.invmanage.springapp.repository.InventoryItemRepository;
import com.invmanage.springapp.repository.RestockRequestRepository;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "http://localhost:4200")
public class InventoryController {

    private final InventoryItemRepository repository;
    private final RestockRequestRepository restockRequestRepository;

    public InventoryController(InventoryItemRepository repository, RestockRequestRepository restockRequestRepository) {
        this.repository = repository;
        this.restockRequestRepository = restockRequestRepository;
    }

    // GET ALL INVENTORY ITEMS

    @GetMapping
    public List<InventoryItem> getAllItems() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public InventoryItem getItemById(@PathVariable Long id) {
        return repository.findById(id).orElse(null);
    }

    @PostMapping
    public InventoryItem addItem(@RequestBody InventoryItem item) {
        return repository.save(item);
    }
    // Bulk insert endpoint
    @PostMapping("/bulk")
    public List<InventoryItem> addItems(@RequestBody List<InventoryItem> items) {
        return repository.saveAll(items);
    }
    @PutMapping("/{id}")
    public InventoryItem updateItem(@PathVariable Long id, @RequestBody InventoryItem item) {
        item.setId(id);
        return repository.save(item);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        repository.deleteById(id);
    }

    // 🔍 Search by name
    @GetMapping("/search")
    public List<InventoryItem> search(@RequestParam String query) {
        return repository.findByNameContainingIgnoreCase(query);
    }

    // 📂 Filter by category (CPU/GPU)
    @GetMapping("/category/{category}")
    public List<InventoryItem> filterByCategory(@PathVariable String category) {
        return repository.findByCategory(category);
    }
       // ----------------------
    // Add stock to an item
    // ----------------------
    @PutMapping("/{id}/add-stock")
    public ResponseEntity<InventoryItem> addStock(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> requestBody) {

        InventoryItem item = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        int quantityToAdd = requestBody.get("quantity");
        item.setQuantity(item.getQuantity() + quantityToAdd);

        InventoryItem updated = repository.save(item);

        // ✅ Automatically approve pending restock requests for this item
        List<RestockRequest> pendingRequests = restockRequestRepository.findByItemIdAndStatus(id, RestockRequest.Status.PENDING);
        pendingRequests.forEach(req -> {
            req.setStatus(RestockRequest.Status.APPROVED);
            restockRequestRepository.save(req);
        });

        return ResponseEntity.ok(updated);
    }
}
