package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ABC;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ABC entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ABCRepository extends JpaRepository<ABC, Long> {

}
