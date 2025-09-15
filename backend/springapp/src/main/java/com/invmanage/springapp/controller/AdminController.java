package com.invmanage.springapp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.invmanage.springapp.model.InventoryItem;
import com.invmanage.springapp.repository.InventoryItemRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/admin")
@Tag(name = "Admin", description = "Endpoints for admin operations")
public class AdminController {

    private final InventoryItemRepository inventoryRepository;

    public AdminController(InventoryItemRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @GetMapping("/inventory")
    @Operation(summary = "View all inventory", description = "Returns the complete inventory for admin")
    public List<InventoryItem> getAllInventory() {
        return inventoryRepository.findAll();
    }

    @PostMapping("/inventory")
    @Operation(summary = "Add inventory item", description = "Allows admin to add a new item to inventory")
    public InventoryItem addInventoryItem(@RequestBody InventoryItem item) {
        return inventoryRepository.save(item);
    }
}
