package io.dplabs.bookshelf.repositories;

import io.dplabs.bookshelf.models.Collection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectionsRepository extends CrudRepository<Collection, Long> {
}
