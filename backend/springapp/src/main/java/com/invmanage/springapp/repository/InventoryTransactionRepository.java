package com.invmanage.springapp.repository;

import com.invmanage.springapp.model.InventoryTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryTransactionRepository extends JpaRepository<InventoryTransaction, Long> {
    // You can add queries like fetching last N transactions or by type
}
