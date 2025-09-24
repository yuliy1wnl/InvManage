package com.invmanage.springapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.invmanage.springapp.model.InventoryItem;
import com.invmanage.springapp.repository.InventoryItemRepository;
import com.invmanage.springapp.repository.UserRepository;
import com.invmanage.springapp.dto.UserDto;
import com.invmanage.springapp.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/user")
@Tag(name = "User", description = "Endpoints for user operations")
public class UserController {

    private final InventoryItemRepository inventoryRepository;
    private final UserRepository userRepository;

    public UserController(InventoryItemRepository inventoryRepository, UserRepository userRepository) {
        this.inventoryRepository = inventoryRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/inventory")
    @Operation(summary = "View user inventory", description = "Returns items accessible to the user")
    public List<InventoryItem> getUserInventory() {
        return inventoryRepository.findAll();
    }

    @GetMapping("/profile")
    @Operation(summary = "Get user profile", description = "Returns authenticated user or guest fallback")
    public UserDto getUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Handle unauthenticated users
        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
            return new UserDto(0L, "Guest", "", "https://i.pravatar.cc/150");
        }

        // Extract username
        Object principal = authentication.getPrincipal();
        String username = (principal instanceof UserDetails)
                ? ((UserDetails) principal).getUsername()
                : principal.toString();

        // Lookup user safely
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isEmpty()) {
            return new UserDto(0L, "Unknown", "", "https://i.pravatar.cc/150");
        }

        User user = optionalUser.get();
        String avatar = user.getAvatarUrl() != null ? user.getAvatarUrl() : "https://i.pravatar.cc/150";

        return new UserDto(user.getId(), user.getUsername(), user.getEmail(), avatar);
    }
}
