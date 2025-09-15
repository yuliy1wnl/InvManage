package com.invmanage.springapp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.invmanage.springapp.model.InventoryItem;
import com.invmanage.springapp.repository.InventoryItemRepository;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/user")
@Tag(name = "User", description = "Endpoints for user operations")
public class UserController {

    private final InventoryItemRepository inventoryRepository;

    public UserController(InventoryItemRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    @GetMapping("/inventory")
    @Operation(summary = "View user inventory", description = "Returns items accessible to the user")
    public List<InventoryItem> getUserInventory() {
        return inventoryRepository.findAll();
    }
}
