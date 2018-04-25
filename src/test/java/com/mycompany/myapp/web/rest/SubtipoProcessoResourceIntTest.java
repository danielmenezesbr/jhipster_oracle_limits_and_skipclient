package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterOracleLimitsAndSkipclientApp;

import com.mycompany.myapp.domain.SubtipoProcesso;
import com.mycompany.myapp.repository.SubtipoProcessoRepository;
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
 * Test class for the SubtipoProcessoResource REST controller.
 *
 * @see SubtipoProcessoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterOracleLimitsAndSkipclientApp.class)
public class SubtipoProcessoResourceIntTest {

    @Autowired
    private SubtipoProcessoRepository subtipoProcessoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSubtipoProcessoMockMvc;

    private SubtipoProcesso subtipoProcesso;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubtipoProcessoResource subtipoProcessoResource = new SubtipoProcessoResource(subtipoProcessoRepository);
        this.restSubtipoProcessoMockMvc = MockMvcBuilders.standaloneSetup(subtipoProcessoResource)
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
    public static SubtipoProcesso createEntity(EntityManager em) {
        SubtipoProcesso subtipoProcesso = new SubtipoProcesso();
        return subtipoProcesso;
    }

    @Before
    public void initTest() {
        subtipoProcesso = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubtipoProcesso() throws Exception {
        int databaseSizeBeforeCreate = subtipoProcessoRepository.findAll().size();

        // Create the SubtipoProcesso
        restSubtipoProcessoMockMvc.perform(post("/api/subtipo-processos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subtipoProcesso)))
            .andExpect(status().isCreated());

        // Validate the SubtipoProcesso in the database
        List<SubtipoProcesso> subtipoProcessoList = subtipoProcessoRepository.findAll();
        assertThat(subtipoProcessoList).hasSize(databaseSizeBeforeCreate + 1);
        SubtipoProcesso testSubtipoProcesso = subtipoProcessoList.get(subtipoProcessoList.size() - 1);
    }

    @Test
    @Transactional
    public void createSubtipoProcessoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subtipoProcessoRepository.findAll().size();

        // Create the SubtipoProcesso with an existing ID
        subtipoProcesso.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubtipoProcessoMockMvc.perform(post("/api/subtipo-processos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subtipoProcesso)))
            .andExpect(status().isBadRequest());

        // Validate the SubtipoProcesso in the database
        List<SubtipoProcesso> subtipoProcessoList = subtipoProcessoRepository.findAll();
        assertThat(subtipoProcessoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSubtipoProcessos() throws Exception {
        // Initialize the database
        subtipoProcessoRepository.saveAndFlush(subtipoProcesso);

        // Get all the subtipoProcessoList
        restSubtipoProcessoMockMvc.perform(get("/api/subtipo-processos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subtipoProcesso.getId().intValue())));
    }

    @Test
    @Transactional
    public void getSubtipoProcesso() throws Exception {
        // Initialize the database
        subtipoProcessoRepository.saveAndFlush(subtipoProcesso);

        // Get the subtipoProcesso
        restSubtipoProcessoMockMvc.perform(get("/api/subtipo-processos/{id}", subtipoProcesso.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subtipoProcesso.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSubtipoProcesso() throws Exception {
        // Get the subtipoProcesso
        restSubtipoProcessoMockMvc.perform(get("/api/subtipo-processos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubtipoProcesso() throws Exception {
        // Initialize the database
        subtipoProcessoRepository.saveAndFlush(subtipoProcesso);
        int databaseSizeBeforeUpdate = subtipoProcessoRepository.findAll().size();

        // Update the subtipoProcesso
        SubtipoProcesso updatedSubtipoProcesso = subtipoProcessoRepository.findOne(subtipoProcesso.getId());
        // Disconnect from session so that the updates on updatedSubtipoProcesso are not directly saved in db
        em.detach(updatedSubtipoProcesso);

        restSubtipoProcessoMockMvc.perform(put("/api/subtipo-processos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSubtipoProcesso)))
            .andExpect(status().isOk());

        // Validate the SubtipoProcesso in the database
        List<SubtipoProcesso> subtipoProcessoList = subtipoProcessoRepository.findAll();
        assertThat(subtipoProcessoList).hasSize(databaseSizeBeforeUpdate);
        SubtipoProcesso testSubtipoProcesso = subtipoProcessoList.get(subtipoProcessoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingSubtipoProcesso() throws Exception {
        int databaseSizeBeforeUpdate = subtipoProcessoRepository.findAll().size();

        // Create the SubtipoProcesso

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSubtipoProcessoMockMvc.perform(put("/api/subtipo-processos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subtipoProcesso)))
            .andExpect(status().isCreated());

        // Validate the SubtipoProcesso in the database
        List<SubtipoProcesso> subtipoProcessoList = subtipoProcessoRepository.findAll();
        assertThat(subtipoProcessoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSubtipoProcesso() throws Exception {
        // Initialize the database
        subtipoProcessoRepository.saveAndFlush(subtipoProcesso);
        int databaseSizeBeforeDelete = subtipoProcessoRepository.findAll().size();

        // Get the subtipoProcesso
        restSubtipoProcessoMockMvc.perform(delete("/api/subtipo-processos/{id}", subtipoProcesso.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SubtipoProcesso> subtipoProcessoList = subtipoProcessoRepository.findAll();
        assertThat(subtipoProcessoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubtipoProcesso.class);
        SubtipoProcesso subtipoProcesso1 = new SubtipoProcesso();
        subtipoProcesso1.setId(1L);
        SubtipoProcesso subtipoProcesso2 = new SubtipoProcesso();
        subtipoProcesso2.setId(subtipoProcesso1.getId());
        assertThat(subtipoProcesso1).isEqualTo(subtipoProcesso2);
        subtipoProcesso2.setId(2L);
        assertThat(subtipoProcesso1).isNotEqualTo(subtipoProcesso2);
        subtipoProcesso1.setId(null);
        assertThat(subtipoProcesso1).isNotEqualTo(subtipoProcesso2);
    }
}
