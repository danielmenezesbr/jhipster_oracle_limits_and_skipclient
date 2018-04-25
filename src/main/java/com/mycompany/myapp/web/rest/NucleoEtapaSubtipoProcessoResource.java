package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.NucleoEtapaSubtipoProcesso;

import com.mycompany.myapp.repository.NucleoEtapaSubtipoProcessoRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing NucleoEtapaSubtipoProcesso.
 */
@RestController
@RequestMapping("/api")
public class NucleoEtapaSubtipoProcessoResource {

    private final Logger log = LoggerFactory.getLogger(NucleoEtapaSubtipoProcessoResource.class);

    private static final String ENTITY_NAME = "nucleoEtapaSubtipoProcesso";

    private final NucleoEtapaSubtipoProcessoRepository nucleoEtapaSubtipoProcessoRepository;

    public NucleoEtapaSubtipoProcessoResource(NucleoEtapaSubtipoProcessoRepository nucleoEtapaSubtipoProcessoRepository) {
        this.nucleoEtapaSubtipoProcessoRepository = nucleoEtapaSubtipoProcessoRepository;
    }

    /**
     * POST  /nucleo-etapa-subtipo-processos : Create a new nucleoEtapaSubtipoProcesso.
     *
     * @param nucleoEtapaSubtipoProcesso the nucleoEtapaSubtipoProcesso to create
     * @return the ResponseEntity with status 201 (Created) and with body the new nucleoEtapaSubtipoProcesso, or with status 400 (Bad Request) if the nucleoEtapaSubtipoProcesso has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/nucleo-etapa-subtipo-processos")
    @Timed
    public ResponseEntity<NucleoEtapaSubtipoProcesso> createNucleoEtapaSubtipoProcesso(@Valid @RequestBody NucleoEtapaSubtipoProcesso nucleoEtapaSubtipoProcesso) throws URISyntaxException {
        log.debug("REST request to save NucleoEtapaSubtipoProcesso : {}", nucleoEtapaSubtipoProcesso);
        if (nucleoEtapaSubtipoProcesso.getId() != null) {
            throw new BadRequestAlertException("A new nucleoEtapaSubtipoProcesso cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NucleoEtapaSubtipoProcesso result = nucleoEtapaSubtipoProcessoRepository.save(nucleoEtapaSubtipoProcesso);
        return ResponseEntity.created(new URI("/api/nucleo-etapa-subtipo-processos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /nucleo-etapa-subtipo-processos : Updates an existing nucleoEtapaSubtipoProcesso.
     *
     * @param nucleoEtapaSubtipoProcesso the nucleoEtapaSubtipoProcesso to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated nucleoEtapaSubtipoProcesso,
     * or with status 400 (Bad Request) if the nucleoEtapaSubtipoProcesso is not valid,
     * or with status 500 (Internal Server Error) if the nucleoEtapaSubtipoProcesso couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/nucleo-etapa-subtipo-processos")
    @Timed
    public ResponseEntity<NucleoEtapaSubtipoProcesso> updateNucleoEtapaSubtipoProcesso(@Valid @RequestBody NucleoEtapaSubtipoProcesso nucleoEtapaSubtipoProcesso) throws URISyntaxException {
        log.debug("REST request to update NucleoEtapaSubtipoProcesso : {}", nucleoEtapaSubtipoProcesso);
        if (nucleoEtapaSubtipoProcesso.getId() == null) {
            return createNucleoEtapaSubtipoProcesso(nucleoEtapaSubtipoProcesso);
        }
        NucleoEtapaSubtipoProcesso result = nucleoEtapaSubtipoProcessoRepository.save(nucleoEtapaSubtipoProcesso);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, nucleoEtapaSubtipoProcesso.getId().toString()))
            .body(result);
    }

    /**
     * GET  /nucleo-etapa-subtipo-processos : get all the nucleoEtapaSubtipoProcessos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of nucleoEtapaSubtipoProcessos in body
     */
    @GetMapping("/nucleo-etapa-subtipo-processos")
    @Timed
    public List<NucleoEtapaSubtipoProcesso> getAllNucleoEtapaSubtipoProcessos() {
        log.debug("REST request to get all NucleoEtapaSubtipoProcessos");
        return nucleoEtapaSubtipoProcessoRepository.findAll();
        }

    /**
     * GET  /nucleo-etapa-subtipo-processos/:id : get the "id" nucleoEtapaSubtipoProcesso.
     *
     * @param id the id of the nucleoEtapaSubtipoProcesso to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the nucleoEtapaSubtipoProcesso, or with status 404 (Not Found)
     */
    @GetMapping("/nucleo-etapa-subtipo-processos/{id}")
    @Timed
    public ResponseEntity<NucleoEtapaSubtipoProcesso> getNucleoEtapaSubtipoProcesso(@PathVariable Long id) {
        log.debug("REST request to get NucleoEtapaSubtipoProcesso : {}", id);
        NucleoEtapaSubtipoProcesso nucleoEtapaSubtipoProcesso = nucleoEtapaSubtipoProcessoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(nucleoEtapaSubtipoProcesso));
    }

    /**
     * DELETE  /nucleo-etapa-subtipo-processos/:id : delete the "id" nucleoEtapaSubtipoProcesso.
     *
     * @param id the id of the nucleoEtapaSubtipoProcesso to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/nucleo-etapa-subtipo-processos/{id}")
    @Timed
    public ResponseEntity<Void> deleteNucleoEtapaSubtipoProcesso(@PathVariable Long id) {
        log.debug("REST request to delete NucleoEtapaSubtipoProcesso : {}", id);
        nucleoEtapaSubtipoProcessoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
