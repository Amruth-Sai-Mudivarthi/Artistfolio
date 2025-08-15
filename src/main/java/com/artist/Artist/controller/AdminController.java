package com.artist.Artist.controller;

import com.artist.Artist.ArtWorks;
import com.artist.Artist.Artist;
import com.artist.Artist.service.ArtistService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private ArtistService service;

    @GetMapping("/profile")
    public ResponseEntity<Artist> getProfile(){
        return new ResponseEntity<>(service.getAllDetails(),HttpStatus.OK);
    }

    @PutMapping("/profile/update")
    public ResponseEntity<Artist> updateAboutMe(@RequestBody Artist artist) {
        return new ResponseEntity<>(service.updateArtist(artist), HttpStatus.OK);
    }

    @PostMapping("/artwork")
    public ResponseEntity<?> addWork(@RequestPart MultipartFile image,@RequestPart ArtWorks artwork){
        ArtWorks art=null;
        try{
            art=service.addArtWork(image,artwork);
            return new ResponseEntity<>(art,HttpStatus.OK);
        }catch(IOException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/artwork/{id}")
    public ResponseEntity<?> updateArtWork(
            @PathVariable int id,
            @RequestPart(value = "image", required = false) MultipartFile image,
            @RequestPart("artwork") ArtWorks artwork) {
        try {

            ArtWorks art = service.updateArtWork(artwork, image, id);
            return new ResponseEntity<>(art, HttpStatus.OK);
        } catch(RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch(IOException e) {
            return new ResponseEntity<>("Error processing image data: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch(Exception e) {
            return new ResponseEntity<>("Error updating artwork: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/artwork/{id}")
    public ResponseEntity<?> deleteArtWork(@PathVariable int id){
        ArtWorks art= service.getArtWork(id);
     if(art!=null){
         service.deleteArtWork(id);
         return new ResponseEntity<>("Deleted",HttpStatus.OK);
     }else{
         return new ResponseEntity<>("Not Deleted", HttpStatus.INTERNAL_SERVER_ERROR);
     }
    }




}
