package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.SubtipoProcesso;

import com.mycompany.myapp.repository.SubtipoProcessoRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SubtipoProcesso.
 */
@RestController
@RequestMapping("/api")
public class SubtipoProcessoResource {

    private final Logger log = LoggerFactory.getLogger(SubtipoProcessoResource.class);

    private static final String ENTITY_NAME = "subtipoProcesso";

    private final SubtipoProcessoRepository subtipoProcessoRepository;

    public SubtipoProcessoResource(SubtipoProcessoRepository subtipoProcessoRepository) {
        this.subtipoProcessoRepository = subtipoProcessoRepository;
    }

    /**
     * POST  /subtipo-processos : Create a new subtipoProcesso.
     *
     * @param subtipoProcesso the subtipoProcesso to create
     * @return the ResponseEntity with status 201 (Created) and with body the new subtipoProcesso, or with status 400 (Bad Request) if the subtipoProcesso has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/subtipo-processos")
    @Timed
    public ResponseEntity<SubtipoProcesso> createSubtipoProcesso(@RequestBody SubtipoProcesso subtipoProcesso) throws URISyntaxException {
        log.debug("REST request to save SubtipoProcesso : {}", subtipoProcesso);
        if (subtipoProcesso.getId() != null) {
            throw new BadRequestAlertException("A new subtipoProcesso cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubtipoProcesso result = subtipoProcessoRepository.save(subtipoProcesso);
        return ResponseEntity.created(new URI("/api/subtipo-processos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /subtipo-processos : Updates an existing subtipoProcesso.
     *
     * @param subtipoProcesso the subtipoProcesso to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated subtipoProcesso,
     * or with status 400 (Bad Request) if the subtipoProcesso is not valid,
     * or with status 500 (Internal Server Error) if the subtipoProcesso couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/subtipo-processos")
    @Timed
    public ResponseEntity<SubtipoProcesso> updateSubtipoProcesso(@RequestBody SubtipoProcesso subtipoProcesso) throws URISyntaxException {
        log.debug("REST request to update SubtipoProcesso : {}", subtipoProcesso);
        if (subtipoProcesso.getId() == null) {
            return createSubtipoProcesso(subtipoProcesso);
        }
        SubtipoProcesso result = subtipoProcessoRepository.save(subtipoProcesso);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, subtipoProcesso.getId().toString()))
            .body(result);
    }

    /**
     * GET  /subtipo-processos : get all the subtipoProcessos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of subtipoProcessos in body
     */
    @GetMapping("/subtipo-processos")
    @Timed
    public List<SubtipoProcesso> getAllSubtipoProcessos() {
        log.debug("REST request to get all SubtipoProcessos");
        return subtipoProcessoRepository.findAll();
        }

    /**
     * GET  /subtipo-processos/:id : get the "id" subtipoProcesso.
     *
     * @param id the id of the subtipoProcesso to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the subtipoProcesso, or with status 404 (Not Found)
     */
    @GetMapping("/subtipo-processos/{id}")
    @Timed
    public ResponseEntity<SubtipoProcesso> getSubtipoProcesso(@PathVariable Long id) {
        log.debug("REST request to get SubtipoProcesso : {}", id);
        SubtipoProcesso subtipoProcesso = subtipoProcessoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(subtipoProcesso));
    }

    /**
     * DELETE  /subtipo-processos/:id : delete the "id" subtipoProcesso.
     *
     * @param id the id of the subtipoProcesso to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/subtipo-processos/{id}")
    @Timed
    public ResponseEntity<Void> deleteSubtipoProcesso(@PathVariable Long id) {
        log.debug("REST request to delete SubtipoProcesso : {}", id);
        subtipoProcessoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
