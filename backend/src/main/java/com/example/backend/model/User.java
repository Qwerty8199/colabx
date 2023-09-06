package com.example.backend.model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

// @Entity
// @Table(name="tUsers")
// @Data
// @Builder
// @NoArgsConstructor
// @AllArgsConstructor
public class User  {
    // @Id
    // @GeneratedValue(strategy = GenerationType.UUID)
    // private Long Id;
    // private String Username;
    // private String EmailId;
    // private String Password;
    
    // @Override
    // public Collection<? extends GrantedAuthority> getAuthorities() {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'getAuthorities'");
    // }
    // @Override
    // public boolean isAccountNonExpired() {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'isAccountNonExpired'");
    // }
    // @Override
    // public boolean isAccountNonLocked() {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'isAccountNonLocked'");
    // }
    // @Override
    // public boolean isCredentialsNonExpired() {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'isCredentialsNonExpired'");
    // }
    // @Override
    // public boolean isEnabled() {
    //     // TODO Auto-generated method stub
    //     throw new UnsupportedOperationException("Unimplemented method 'isEnabled'");
    // }
}
