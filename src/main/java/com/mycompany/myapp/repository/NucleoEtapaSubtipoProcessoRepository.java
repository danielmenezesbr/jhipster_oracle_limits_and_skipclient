package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.NucleoEtapaSubtipoProcesso;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the NucleoEtapaSubtipoProcesso entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NucleoEtapaSubtipoProcessoRepository extends JpaRepository<NucleoEtapaSubtipoProcesso, Long> {

}
