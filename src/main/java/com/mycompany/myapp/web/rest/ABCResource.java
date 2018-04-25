package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.ABC;

import com.mycompany.myapp.repository.ABCRepository;
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
 * REST controller for managing ABC.
 */
@RestController
@RequestMapping("/api")
public class ABCResource {

    private final Logger log = LoggerFactory.getLogger(ABCResource.class);

    private static final String ENTITY_NAME = "aBC";

    private final ABCRepository aBCRepository;

    public ABCResource(ABCRepository aBCRepository) {
        this.aBCRepository = aBCRepository;
    }

    /**
     * POST  /abcs : Create a new aBC.
     *
     * @param aBC the aBC to create
     * @return the ResponseEntity with status 201 (Created) and with body the new aBC, or with status 400 (Bad Request) if the aBC has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/abcs")
    @Timed
    public ResponseEntity<ABC> createABC(@RequestBody ABC aBC) throws URISyntaxException {
        log.debug("REST request to save ABC : {}", aBC);
        if (aBC.getId() != null) {
            throw new BadRequestAlertException("A new aBC cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ABC result = aBCRepository.save(aBC);
        return ResponseEntity.created(new URI("/api/abcs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /abcs : Updates an existing aBC.
     *
     * @param aBC the aBC to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated aBC,
     * or with status 400 (Bad Request) if the aBC is not valid,
     * or with status 500 (Internal Server Error) if the aBC couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/abcs")
    @Timed
    public ResponseEntity<ABC> updateABC(@RequestBody ABC aBC) throws URISyntaxException {
        log.debug("REST request to update ABC : {}", aBC);
        if (aBC.getId() == null) {
            return createABC(aBC);
        }
        ABC result = aBCRepository.save(aBC);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, aBC.getId().toString()))
            .body(result);
    }

    /**
     * GET  /abcs : get all the aBCS.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of aBCS in body
     */
    @GetMapping("/abcs")
    @Timed
    public List<ABC> getAllABCS() {
        log.debug("REST request to get all ABCS");
        return aBCRepository.findAll();
        }

    /**
     * GET  /abcs/:id : get the "id" aBC.
     *
     * @param id the id of the aBC to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the aBC, or with status 404 (Not Found)
     */
    @GetMapping("/abcs/{id}")
    @Timed
    public ResponseEntity<ABC> getABC(@PathVariable Long id) {
        log.debug("REST request to get ABC : {}", id);
        ABC aBC = aBCRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(aBC));
    }

    /**
     * DELETE  /abcs/:id : delete the "id" aBC.
     *
     * @param id the id of the aBC to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/abcs/{id}")
    @Timed
    public ResponseEntity<Void> deleteABC(@PathVariable Long id) {
        log.debug("REST request to delete ABC : {}", id);
        aBCRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
