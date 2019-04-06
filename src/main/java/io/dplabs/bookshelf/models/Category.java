package io.dplabs.bookshelf.models;

import lombok.Data;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;

@Entity(name="categories")
@Data
public class Category extends BaseEntity {
    @NotBlank(message = "Name is mandatory")
    private String name;
}
