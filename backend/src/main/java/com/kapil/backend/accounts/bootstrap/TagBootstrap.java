package com.kapil.backend.accounts.bootstrap;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kapil.backend.accounts.models.Tag;
import com.kapil.backend.accounts.repositery.TagRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.List;

@Component
public class TagBootstrap implements CommandLineRunner {

    private final TagRepository tagRepository;
    private final ObjectMapper objectMapper;

    public TagBootstrap(TagRepository tagRepository, ObjectMapper objectMapper) {
        this.tagRepository = tagRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {

        InputStream inputStream =
                getClass().getClassLoader().getResourceAsStream("tags.json");

        if (inputStream == null) {
            return; // no file, nothing to load
        }

        List<Tag> tags = objectMapper.readValue(
                inputStream,
                new TypeReference<List<Tag>>() {}
        );

        for (Tag tag : tags) {
            tagRepository.findByTagName(tag.getTagName())
                    .orElseGet(() -> tagRepository.save(tag));
        }
    }
}
