package com.filipe.shorty.repository;

import com.filipe.shorty.model.ShortUrl;
import org.springframework.data.repository.CrudRepository;

public interface ShortUrlRepository extends CrudRepository<ShortUrl, String> {
    ShortUrl findByHash(String hash);
}