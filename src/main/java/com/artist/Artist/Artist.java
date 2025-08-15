package com.artist.Artist;



import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Artist {
    @Id
    private int id;
    private String name;
    private String about;
}
