package io.dplabs.bookshelf.models;


//CREATE TABLE `books` (
//        `id` int(11) NOT NULL AUTO_INCREMENT,
//        `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
//        `author` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
//        `year` int(11) DEFAULT NULL,
//        `pages` int(11) DEFAULT NULL,
//        `editorial` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
//        `isbn` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
//        `url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
//        `abstract` text COLLATE utf8_unicode_ci,
//        `created_at` datetime NOT NULL,
//        `updated_at` datetime NOT NULL,
//        `category_id` int(11) DEFAULT NULL,
//        `cover` longblob,
//        `reading_date` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
//        `collection_id` int(11) DEFAULT NULL,
//        `title_vo` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
//        PRIMARY KEY (`id`)
//        ) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;

@Entity(name="books")
@Data
public class Book extends BaseEntity {
    @NotBlank(message="Title is mandatory")
    private String title;

    @Column(name="title_vo")
    @NotBlank(message="Reading date is mandatory")
    private String titleOV;

    @NotBlank(message="Author is mandatory")
    private String author;

    private Integer year;

    private Integer pages;

    private String editorial;

    private String isbn;

    private String url;

    @Column(name="abstract")
    private String bookAbstract;

    @NotBlank(message="Reading date is mandatory")
    private String readingDate;

    @Lob
    private byte[] cover;

    @ManyToOne(optional=false)
    @NotBlank(message="Category is mandatory")
    private Category category;

    @ManyToOne
    private Collection collection;

}
