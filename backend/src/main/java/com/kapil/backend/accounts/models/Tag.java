package com.kapil.backend.accounts.models;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tags", uniqueConstraints = {
        @UniqueConstraint(columnNames = "tag_name")
})
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tag_name", nullable = false, unique = true)
    private String tagName;

    private String description;

    private LocalDateTime createdDate;

    @PrePersist
    protected void onCreate() {
        this.createdDate = LocalDateTime.now();
    }

    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
