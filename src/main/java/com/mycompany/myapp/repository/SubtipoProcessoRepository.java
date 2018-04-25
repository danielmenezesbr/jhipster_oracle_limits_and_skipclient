package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.SubtipoProcesso;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the SubtipoProcesso entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubtipoProcessoRepository extends JpaRepository<SubtipoProcesso, Long> {

}
