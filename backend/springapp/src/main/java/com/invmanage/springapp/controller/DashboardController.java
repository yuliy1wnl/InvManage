package com.invmanage.springapp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.invmanage.springapp.model.InventoryItem;
import com.invmanage.springapp.model.InventoryTransaction;
import com.invmanage.springapp.model.Notification;
import com.invmanage.springapp.service.DashboardService;

@CrossOrigin(origins = "http://localhost:4200") // Angular frontend
@RestController
@RequestMapping("/api/employee/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    // -------------------- Summary Metrics --------------------
    @GetMapping("/summary")
    public Map<String, Long> getSummary() {
        Map<String, Long> summary = new HashMap<>();
        summary.put("totalStockItems", dashboardService.getTotalStockItems());
        summary.put("lowStockItems", dashboardService.getLowStockItems());
        summary.put("damagedItems", dashboardService.getDamagedItems());
        summary.put("pendingRestocks", dashboardService.getPendingRestocks());
        return summary;
    }

    // -------------------- Inventory Table --------------------
    @GetMapping("/items")
    public List<InventoryItem> getAllItems() {
        return dashboardService.getAllItems();
    }

    // -------------------- Recent Transactions --------------------
    @GetMapping("/transactions")
    public List<InventoryTransaction> getRecentTransactions() {
        return dashboardService.getRecentTransactions(10); // last 10
    }

    // -------------------- Notifications --------------------
    @GetMapping("/notifications")
    public List<Notification> getNotifications() {
        return dashboardService.getNotifications();
    }
}
