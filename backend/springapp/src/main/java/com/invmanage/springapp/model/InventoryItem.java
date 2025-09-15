package com.invmanage.springapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;          // e.g. RTX 3080
    private String category;      // CPU or GPU
    private String description;   // extra details
    private Double unitPrice;
    private Integer quantity;     // current stock
    @Builder.Default
    private Integer minThreshold = 5;  // minimum stock before alert
    @Builder.Default
    private Integer damaged = 0;       // damaged or returned units
    private String supplier;
    private String imageUrl;
}
