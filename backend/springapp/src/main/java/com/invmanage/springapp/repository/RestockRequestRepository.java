package com.invmanage.springapp.repository;

import com.invmanage.springapp.model.RestockRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RestockRequestRepository extends JpaRepository<RestockRequest, Long> {

    // Custom query to find pending requests by itemId
    List<RestockRequest> findByItemIdAndStatus(Long itemId, RestockRequest.Status status);
}
