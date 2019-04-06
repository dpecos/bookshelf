package io.dplabs.bookshelf.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;

@Entity(name = "collections")
@Data
public class Collection extends BaseEntity {
    @NotBlank(message = "Name is mandatory")
    private String name;

    private String description;

    private String link;
}
