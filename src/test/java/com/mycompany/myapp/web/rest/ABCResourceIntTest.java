package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterOracleLimitsAndSkipclientApp;

import com.mycompany.myapp.domain.ABC;
import com.mycompany.myapp.repository.ABCRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ABCResource REST controller.
 *
 * @see ABCResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterOracleLimitsAndSkipclientApp.class)
public class ABCResourceIntTest {

    @Autowired
    private ABCRepository aBCRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restABCMockMvc;

    private ABC aBC;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ABCResource aBCResource = new ABCResource(aBCRepository);
        this.restABCMockMvc = MockMvcBuilders.standaloneSetup(aBCResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ABC createEntity(EntityManager em) {
        ABC aBC = new ABC();
        return aBC;
    }

    @Before
    public void initTest() {
        aBC = createEntity(em);
    }

    @Test
    @Transactional
    public void createABC() throws Exception {
        int databaseSizeBeforeCreate = aBCRepository.findAll().size();

        // Create the ABC
        restABCMockMvc.perform(post("/api/abcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aBC)))
            .andExpect(status().isCreated());

        // Validate the ABC in the database
        List<ABC> aBCList = aBCRepository.findAll();
        assertThat(aBCList).hasSize(databaseSizeBeforeCreate + 1);
        ABC testABC = aBCList.get(aBCList.size() - 1);
    }

    @Test
    @Transactional
    public void createABCWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = aBCRepository.findAll().size();

        // Create the ABC with an existing ID
        aBC.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restABCMockMvc.perform(post("/api/abcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aBC)))
            .andExpect(status().isBadRequest());

        // Validate the ABC in the database
        List<ABC> aBCList = aBCRepository.findAll();
        assertThat(aBCList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllABCS() throws Exception {
        // Initialize the database
        aBCRepository.saveAndFlush(aBC);

        // Get all the aBCList
        restABCMockMvc.perform(get("/api/abcs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aBC.getId().intValue())));
    }

    @Test
    @Transactional
    public void getABC() throws Exception {
        // Initialize the database
        aBCRepository.saveAndFlush(aBC);

        // Get the aBC
        restABCMockMvc.perform(get("/api/abcs/{id}", aBC.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(aBC.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingABC() throws Exception {
        // Get the aBC
        restABCMockMvc.perform(get("/api/abcs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateABC() throws Exception {
        // Initialize the database
        aBCRepository.saveAndFlush(aBC);
        int databaseSizeBeforeUpdate = aBCRepository.findAll().size();

        // Update the aBC
        ABC updatedABC = aBCRepository.findOne(aBC.getId());
        // Disconnect from session so that the updates on updatedABC are not directly saved in db
        em.detach(updatedABC);

        restABCMockMvc.perform(put("/api/abcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedABC)))
            .andExpect(status().isOk());

        // Validate the ABC in the database
        List<ABC> aBCList = aBCRepository.findAll();
        assertThat(aBCList).hasSize(databaseSizeBeforeUpdate);
        ABC testABC = aBCList.get(aBCList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingABC() throws Exception {
        int databaseSizeBeforeUpdate = aBCRepository.findAll().size();

        // Create the ABC

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restABCMockMvc.perform(put("/api/abcs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aBC)))
            .andExpect(status().isCreated());

        // Validate the ABC in the database
        List<ABC> aBCList = aBCRepository.findAll();
        assertThat(aBCList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteABC() throws Exception {
        // Initialize the database
        aBCRepository.saveAndFlush(aBC);
        int databaseSizeBeforeDelete = aBCRepository.findAll().size();

        // Get the aBC
        restABCMockMvc.perform(delete("/api/abcs/{id}", aBC.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ABC> aBCList = aBCRepository.findAll();
        assertThat(aBCList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ABC.class);
        ABC aBC1 = new ABC();
        aBC1.setId(1L);
        ABC aBC2 = new ABC();
        aBC2.setId(aBC1.getId());
        assertThat(aBC1).isEqualTo(aBC2);
        aBC2.setId(2L);
        assertThat(aBC1).isNotEqualTo(aBC2);
        aBC1.setId(null);
        assertThat(aBC1).isNotEqualTo(aBC2);
    }
}
