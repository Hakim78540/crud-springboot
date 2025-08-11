package com.example.crudspringboot.service;

import com.example.crudspringboot.entity.User;
import com.example.crudspringboot.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String register(String username, String password, String role) {
        // Vérifie si l'utilisateur existe déjà
        if (userRepository.findByUsername(username).isPresent()) {
            return "Nom utilisateur déja pris";
        }

        // Crée et enregistre le nouvel utilisateur
        User newUser = new User();
        newUser.setUsername(username);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setRole(role); // Ex : "ROLE_USER" ou "ROLE_ADMIN"

        userRepository.save(newUser);
        return "Utilisateur enregistré avec succès";
    }
}
