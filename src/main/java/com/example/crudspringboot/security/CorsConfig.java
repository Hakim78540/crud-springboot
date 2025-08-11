package com.example.crudspringboot.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")                         // Toutes les routes
                        .allowedOrigins("http://localhost:3000")   // Origine autorisée : ton frontend React
                        .allowedMethods("*")                       // Autoriser GET, POST, PUT, DELETE, etc.
                        .allowedHeaders("*")                       // Tous les headers
                        .allowCredentials(true);                   // Pour transmettre les cookies/token si besoin
            }
        };
    }
}
