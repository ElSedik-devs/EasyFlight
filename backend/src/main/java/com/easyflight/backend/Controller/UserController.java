package com.easyflight.backend.Controller;

import com.easyflight.backend.entity.User;
import com.easyflight.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    //Endpoint to sync logged in users to db
    @PostMapping("sync")
    public ResponseEntity<User> syncUsers(@AuthenticationPrincipal Jwt jwt) {
//        System.out.println(jwt+"");
        User user=userService.syncUserWithKeycloak(jwt);

        return ResponseEntity.ok(user);
    }
}
