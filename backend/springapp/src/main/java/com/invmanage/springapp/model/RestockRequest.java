package com.invmanage.springapp.model;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RestockRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long itemId;
    private String itemName;
    private Integer quantity;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING; // Default

    private LocalDateTime requestedAt = LocalDateTime.now();

    private String requestedBy; // username or userId

    @ManyToOne
    @JoinColumn(name = "inventory_item_id")
    private InventoryItem inventoryItem;

    public enum Status {
        PENDING, APPROVED, REJECTED
    }
}
