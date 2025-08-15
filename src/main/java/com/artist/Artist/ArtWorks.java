package com.artist.Artist;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class ArtWorks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String ArtName;
    private String ArtDescription;
    private String ArtType;
    private BigDecimal Cost;
    private String imageName;
    private String imageType;
    @Lob
    private byte[] imageData;


}
