package io.dplabs.bookshelf.models;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@MappedSuperclass
@Data
public abstract class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    private long id;

    @Column(insertable = false, updatable = false)
    @CreationTimestamp
    private Date createdAt;

    @Column(insertable = false, updatable = false)
    @UpdateTimestamp
    private Date updatedAt;
}
