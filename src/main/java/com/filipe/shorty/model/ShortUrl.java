package com.filipe.shorty.model;

import com.google.common.hash.Hashing;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.nio.charset.StandardCharsets;

@Data
@Entity
@EqualsAndHashCode(of = "hash")
public class ShortUrl {

    @Id
    private String hash;
    private String url;

    public ShortUrl() {}

    public void setUrl(String url) {
        this.url = url;
        hash = Hashing.murmur3_32().hashString(url, StandardCharsets.UTF_8).toString();
    }
}
