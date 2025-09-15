package com.invmanage.springapp.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")  // table name in DB
@Data                  // generates getters, setters, toString, equals, hashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    // PRIMARY KEY, auto-increment in DB
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;   // login username

    @Column(nullable = false)
    private String password;   // will be stored encrypted

    @Column(nullable = false, unique = true)
    private String email;      // must be unique

    private String phoneNumber;

    private String fullName;

    private String address;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;         // USER or ADMIN
}
