package com.easyflight.backend.service;

import com.easyflight.backend.dao.UserRepository;
import com.easyflight.backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * If user doesn't exist in DB, create one using Keycloak claims
     * Otherwise, return the existing one
     */
    public User syncUserWithKeycloak(Jwt jwt) {
        String userId = jwt.getSubject();
        return userRepository.findById(userId).orElseGet(() -> {
            User newUser = new User();
            newUser.setId(userId);
            newUser.setUsername(jwt.getClaimAsString("preferred_username"));
            newUser.setFirstName(jwt.getClaimAsString("given_name"));
            newUser.setLastName(jwt.getClaimAsString("family_name"));
            newUser.setEmail(jwt.getClaimAsString("email"));
            // 🔐 Extract roles from realm_access
            Map<String, Object> realmAccess = jwt.getClaim("realm_access");
            if (realmAccess != null && realmAccess.containsKey("roles")) {
                List<String> roles = (List<String>) realmAccess.get("roles");
                newUser.setRoles(roles);
            }

            return userRepository.save(newUser);
        });
    }
}
