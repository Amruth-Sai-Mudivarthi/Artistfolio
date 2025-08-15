package com.artist.Artist.repo;

import com.artist.Artist.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistRepo extends JpaRepository<Artist,Integer> {

}
