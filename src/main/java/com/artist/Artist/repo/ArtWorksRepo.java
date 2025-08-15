package com.artist.Artist.repo;

import com.artist.Artist.ArtWorks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtWorksRepo extends JpaRepository<ArtWorks,Integer> {
}
