package com.kapil.backend.security;

import com.kapil.backend.services.CustomUserDetailsService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Main security configuration
     */


    private final CustomUserDetailsService customUserDetailsService;

    public SecurityConfig(CustomUserDetailsService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // Disable CSRF for REST APIs
                .cors(cors -> {})

                // Disable CSRF for REST APIs
                .csrf(csrf -> csrf.disable())
                // Stateless session (JWT-ready)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // 🔴 THIS IS THE IMPORTANT PART (401 instead of 403)
                .exceptionHandling(exception ->
                        exception.authenticationEntryPoint(
                                (request, response, authException) ->
                                        response.sendError(
                                                HttpServletResponse.SC_UNAUTHORIZED,
                                                "Unauthorized"
                                        )
                        )
                )

                // Authorization rules
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/auth/**").permitAll()
//                        .anyRequest().authenticated()
//                )

                .authorizeHttpRequests(auth -> auth
                        // allow authentication endpoints
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/accounts/**").permitAll()
                        // everything else secured
                        .anyRequest().authenticated()
                )

                // Disable default login mechanisms
                .formLogin(form -> form.disable())
                .httpBasic(basic -> basic.disable());

        http.addFilterBefore(
                jwtAuthenticationFilter(customUserDetailsService),
                UsernamePasswordAuthenticationFilter.class
        );


        return http.build();
    }

    /**
     * Password encoder (BCrypt)
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * AuthenticationManager required for login
     */
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(
            CustomUserDetailsService userDetailsService) {
        return new JwtAuthenticationFilter(userDetailsService);
    }

    @Bean
    public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
        org.springframework.web.cors.CorsConfiguration config = new org.springframework.web.cors.CorsConfiguration();
        config.setAllowedOrigins(java.util.List.of("http://localhost:4200"));
        config.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(java.util.List.of("*"));
        config.setAllowCredentials(true);

        org.springframework.web.cors.UrlBasedCorsConfigurationSource source =
                new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

}
