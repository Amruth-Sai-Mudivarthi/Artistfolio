package com.artist.Artist.controller;

import com.artist.Artist.ArtWorks;
import com.artist.Artist.Artist;
import com.artist.Artist.repo.ArtistRepo;
import com.artist.Artist.service.ArtistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api")
public class ArtistController {

    @Autowired
    private ArtistService service;


    @GetMapping("/")
    public ResponseEntity<Artist> getAll(){
        return new ResponseEntity<>(service.getAllDetails(), HttpStatus.OK);
    }

    @GetMapping("/artworks")
    public ResponseEntity<List<ArtWorks>> getArtWorks(){
        return new ResponseEntity<>(service.getArtWorks(),HttpStatus.OK);
    }

    @GetMapping("/artwork/{id}")
    public ResponseEntity<byte[]> getArtWork(@PathVariable int id){
    ArtWorks artwork=service.getArtWork(id);
    if (artwork != null)
        return new ResponseEntity<>(artwork.getImageData(), HttpStatus.OK);
    else
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }







}
