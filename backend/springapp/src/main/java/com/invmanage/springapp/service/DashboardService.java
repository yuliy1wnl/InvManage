package com.invmanage.springapp.service;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.invmanage.springapp.model.InventoryItem;
import com.invmanage.springapp.model.InventoryTransaction;
import com.invmanage.springapp.model.Notification;
import com.invmanage.springapp.model.RestockRequest;
import com.invmanage.springapp.repository.InventoryItemRepository;
import com.invmanage.springapp.repository.InventoryTransactionRepository;
import com.invmanage.springapp.repository.NotificationRepository;
import com.invmanage.springapp.repository.RestockRequestRepository;

@Service
public class DashboardService {

    private final InventoryItemRepository itemRepo;
    private final RestockRequestRepository restockRepo;
    private final InventoryTransactionRepository transactionRepo;
    private final NotificationRepository notificationRepo;

    public DashboardService(InventoryItemRepository itemRepo,
                            RestockRequestRepository restockRepo,
                            InventoryTransactionRepository transactionRepo,
                            NotificationRepository notificationRepo) {
        this.itemRepo = itemRepo;
        this.restockRepo = restockRepo;
        this.transactionRepo = transactionRepo;
        this.notificationRepo = notificationRepo;
    }

    // -------------------- Summary Metrics --------------------
    public long getTotalStockItems() {
        return itemRepo.findAll().stream()
                .mapToLong(InventoryItem::getQuantity)
                .sum();
    }

    public long getLowStockItems() {
        return itemRepo.findAll().stream()
                .filter(item -> item.getQuantity() != null
                && item.getMinThreshold() != null
                && item.getQuantity() < item.getMinThreshold())
                .count();
    }

    public long getDamagedItems() {
        return itemRepo.findAll().stream()
                .mapToLong(item -> item.getDamaged() != null ? item.getDamaged() : 0)
                .sum();
    }

    public long getPendingRestocks() {
    return restockRepo.findAll().stream()
            .filter(r -> RestockRequest.Status.PENDING.equals(r.getStatus()))
            .count();
}


    // -------------------- Full Data Lists --------------------
    public List<InventoryItem> getAllItems() {
        return itemRepo.findAll();
    }

    // ✅ Recent Transactions: type-safe, sorted by transactionDate desc, limit applied
    public List<InventoryTransaction> getRecentTransactions(int limit) {
        return transactionRepo.findAll(PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "transactionDate")))
                .getContent();
    }

    // ✅ Notifications: type-safe, sorted by createdAt desc
    public List<Notification> getNotifications() {
        return notificationRepo.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }
}
