package com.invmanage.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.invmanage.springapp.model.InventoryItem;

public interface InventoryItemRepository extends JpaRepository<InventoryItem, Long> {
    List<InventoryItem> findByCategory(String category);
    List<InventoryItem> findByNameContainingIgnoreCase(String name);
}
