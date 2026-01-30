package com.kapil.backend.accounts.services;

import com.kapil.backend.accounts.dto.TagResponse;
import com.kapil.backend.accounts.models.Tag;
import com.kapil.backend.accounts.repositery.TagRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagService {

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public List<TagResponse> getAll() {
        return tagRepository.findAll()
                .stream()
                .map(this::map)
                .collect(Collectors.toList());
    }

    private TagResponse map(Tag tag) {
        TagResponse r = new TagResponse();
        r.setId(tag.getId());
        r.setTagName(tag.getTagName());
        r.setDescription(tag.getDescription());
        return r;
    }
}
