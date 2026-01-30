package com.kapil.backend.accounts.controllers;


import com.kapil.backend.accounts.dto.TagResponse;
import com.kapil.backend.accounts.services.TagService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tags")
public class TagsController {

    private final TagService tagService;

    public TagsController(TagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping
    public List<TagResponse> getAll() {
        return tagService.getAll();
    }
}
