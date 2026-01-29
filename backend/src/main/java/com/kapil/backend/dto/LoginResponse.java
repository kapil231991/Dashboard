package com.kapil.backend.dto;

public class LoginResponse {

    private String token;
    private String username;
    private String firstName;
    private String lastName;

    public LoginResponse(String token,
                         String username,
                         String firstName,
                         String lastName) {
        this.token = token;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getToken() {
        return token;
    }

    public String getUsername() {
        return username;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }
}
