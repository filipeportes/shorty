package com.filipe.shorty.controller;

import com.filipe.shorty.model.ShortUrl;
import com.filipe.shorty.repository.ShortUrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;

@Controller
public class ShortyController {

    @Autowired
    private ShortUrlRepository repository;

    @RequestMapping(value = "/")
    public String index() {
        return "index.html";
    }

    @RequestMapping(value = "/{hash}", method = RequestMethod.GET)
    public void redirectToUrl(@PathVariable String hash, HttpServletResponse resp) throws Exception {
        final ShortUrl shortUrl = repository.findByHash(hash);
        System.out.println(shortUrl);
        if (shortUrl == null) {
            resp.sendError(HttpServletResponse.SC_NOT_FOUND);
            return;
        }

        resp.addHeader("Location", shortUrl.getUrl());
        resp.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY);
    }
}
