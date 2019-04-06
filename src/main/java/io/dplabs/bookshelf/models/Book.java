package io.dplabs.bookshelf.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;

@Entity(name = "books")
@Data
public class Book extends BaseEntity {
    @NotBlank(message = "Title is mandatory")
    private String title;

    @Column(name = "title_vo")
    private String titleOV;

    @ManyToOne(optional = false)
//    @NotBlank(message = "Category is mandatory")
    private Category category;

    @ManyToOne
    private Collection collection;

    @NotBlank(message = "Author is mandatory")
    private String author;

    private Integer year;

    @NotBlank(message = "Reading date is mandatory")
    private String readingDate;

    private Integer pages;

    private String editorial;

    private String isbn;

    private String url;

    @Column(name = "abstract")
    private String bookAbstract;

    @Lob
    private byte[] cover;



}
