package com.artist.Artist.service;

import com.artist.Artist.ArtWorks;
import com.artist.Artist.Artist;
import com.artist.Artist.repo.ArtWorksRepo;
import com.artist.Artist.repo.ArtistRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ArtistService {
    @Autowired
    private ArtistRepo repo;

    @Autowired
    private ArtWorksRepo artrepo;

    public Artist getAllDetails() {
       return repo.findById(1).orElse(null);
    }


    public Artist updateArtist(Artist updatedArtist) {
        Artist existing = repo.findById(1).orElseThrow(() -> new RuntimeException("Artist not found"));
        existing.setName(updatedArtist.getName());
        existing.setAbout(updatedArtist.getAbout());
        return repo.save(existing);
    }

    public List<ArtWorks> getArtWorks() {
        return artrepo.findAll();
    }


    public ArtWorks addArtWork(MultipartFile image, ArtWorks artwork) throws IOException {
        ArtWorks art=new ArtWorks();
        art.setArtName(artwork.getArtName());
        art.setArtType(artwork.getArtType());
        art.setArtDescription(artwork.getArtDescription());
        art.setCost(artwork.getCost());
        art.setImageData(image.getBytes());
        art.setImageName(image.getOriginalFilename());
        art.setImageType(image.getContentType());
        return artrepo.save(art);

    }
    public ArtWorks updateArtWork(ArtWorks artworkDetailsFromFrontend, MultipartFile image, int id) throws IOException {
        ArtWorks existingArt = artrepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Artwork not found with ID: " + id));
        existingArt.setArtName(artworkDetailsFromFrontend.getArtName());
        existingArt.setArtType(artworkDetailsFromFrontend.getArtType());
        existingArt.setArtDescription(artworkDetailsFromFrontend.getArtDescription());
        existingArt.setCost(artworkDetailsFromFrontend.getCost());

        if (image != null && !image.isEmpty()) { //
            existingArt.setImageData(image.getBytes());
            existingArt.setImageName(image.getOriginalFilename());
            existingArt.setImageType(image.getContentType());
        }

        return artrepo.save(existingArt);
    }


    public ArtWorks getArtWork(int id) {
        return artrepo.findById(id).orElse(null);
    }


    public void deleteArtWork(int id) {
        artrepo.deleteById(id);
    }
}
