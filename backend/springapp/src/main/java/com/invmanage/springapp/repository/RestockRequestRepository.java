package com.invmanage.springapp.repository;

import com.invmanage.springapp.model.RestockRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestockRequestRepository extends JpaRepository<RestockRequest, Long> {
}
