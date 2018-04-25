package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterOracleLimitsAndSkipclientApp;

import com.mycompany.myapp.domain.NucleoEtapaSubtipoProcesso;
import com.mycompany.myapp.domain.SubtipoProcesso;
import com.mycompany.myapp.repository.NucleoEtapaSubtipoProcessoRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the NucleoEtapaSubtipoProcessoResource REST controller.
 *
 * @see NucleoEtapaSubtipoProcessoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterOracleLimitsAndSkipclientApp.class)
public class NucleoEtapaSubtipoProcessoResourceIntTest {

    private static final Integer DEFAULT_POSICAO = 1;
    private static final Integer UPDATED_POSICAO = 2;

    private static final LocalDate DEFAULT_DATA_INICIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_INICIO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATA_FIM = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_FIM = LocalDate.now(ZoneId.systemDefault());

    private static final Boolean DEFAULT_STATUS = false;
    private static final Boolean UPDATED_STATUS = true;

    @Autowired
    private NucleoEtapaSubtipoProcessoRepository nucleoEtapaSubtipoProcessoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restNucleoEtapaSubtipoProcessoMockMvc;

    private NucleoEtapaSubtipoProcesso nucleoEtapaSubtipoProcesso;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NucleoEtapaSubtipoProcessoResource nucleoEtapaSubtipoProcessoResource = new NucleoEtapaSubtipoProcessoResource(nucleoEtapaSubtipoProcessoRepository);
        this.restNucleoEtapaSubtipoProcessoMockMvc = MockMvcBuilders.standaloneSetup(nucleoEtapaSubtipoProcessoResource)
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
    public static NucleoEtapaSubtipoProcesso createEntity(EntityManager em) {
        NucleoEtapaSubtipoProcesso nucleoEtapaSubtipoProcesso = new NucleoEtapaSubtipoProcesso()
            .posicao(DEFAULT_POSICAO)
            .dataInicio(DEFAULT_DATA_INICIO)
            .dataFim(DEFAULT_DATA_FIM)
            .status(DEFAULT_STATUS);
        // Add required entity
        SubtipoProcesso subtipoProcesso = SubtipoProcessoResourceIntTest.createEntity(em);
        em.persist(subtipoProcesso);
        em.flush();
        nucleoEtapaSubtipoProcesso.setSubtipoProcesso(subtipoProcesso);
        return nucleoEtapaSubtipoProcesso;
    }

    @Before
    public void initTest() {
        nucleoEtapaSubtipoProcesso = createEntity(em);
    }

    @Test
    @Transactional
    public void createNucleoEtapaSubtipoProcesso() throws Exception {
        int databaseSizeBeforeCreate = nucleoEtapaSubtipoProcessoRepository.findAll().size();

        // Create the NucleoEtapaSubtipoProcesso
        restNucleoEtapaSubtipoProcessoMockMvc.perform(post("/api/nucleo-etapa-subtipo-processos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nucleoEtapaSubtipoProcesso)))
            .andExpect(status().isCreated());

        // Validate the NucleoEtapaSubtipoProcesso in the database
        List<NucleoEtapaSubtipoProcesso> nucleoEtapaSubtipoProcessoList = nucleoEtapaSubtipoProcessoRepository.findAll();
        assertThat(nucleoEtapaSubtipoProcessoList).hasSize(databaseSizeBeforeCreate + 1);
        NucleoEtapaSubtipoProcesso testNucleoEtapaSubtipoProcesso = nucleoEtapaSubtipoProcessoList.get(nucleoEtapaSubtipoProcessoList.size() - 1);
        assertThat(testNucleoEtapaSubtipoProcesso.getPosicao()).isEqualTo(DEFAULT_POSICAO);
        assertThat(testNucleoEtapaSubtipoProcesso.getDataInicio()).isEqualTo(DEFAULT_DATA_INICIO);
        assertThat(testNucleoEtapaSubtipoProcesso.getDataFim()).isEqualTo(DEFAULT_DATA_FIM);
        assertThat(testNucleoEtapaSubtipoProcesso.isStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createNucleoEtapaSubtipoProcessoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = nucleoEtapaSubtipoProcessoRepository.findAll().size();

        // Create the NucleoEtapaSubtipoProcesso with an existing ID
        nucleoEtapaSubtipoProcesso.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNucleoEtapaSubtipoProcessoMockMvc.perform(post("/api/nucleo-etapa-subtipo-processos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nucleoEtapaSubtipoProcesso)))
            .andExpect(status().isBadRequest());

        // Validate the NucleoEtapaSubtipoProcesso in the database
        List<NucleoEtapaSubtipoProcesso> nucleoEtapaSubtipoProcessoList = nucleoEtapaSubtipoProcessoRepository.findAll();
        assertThat(nucleoEtapaSubtipoProcessoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPosicaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = nucleoEtapaSubtipoProcessoRepository.findAll().size();
        // set the field null
        nucleoEtapaSubtipoProcesso.setPosicao(null);

        // Create the NucleoEtapaSubtipoProcesso, which fails.

        restNucleoEtapaSubtipoProcessoMockMvc.perform(post("/api/nucleo-etapa-subtipo-processos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nucleoEtapaSubtipoProcesso)))
            .andExpect(status().isBadRequest());

        List<NucleoEtapaSubtipoProcesso> nucleoEtapaSubtipoProcessoList = nucleoEtapaSubtipoProcessoRepository.findAll();
        assertThat(nucleoEtapaSubtipoProcessoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNucleoEtapaSubtipoProcessos() throws Exception {
        // Initialize the database
        nucleoEtapaSubtipoProcessoRepository.saveAndFlush(nucleoEtapaSubtipoProcesso);

        // Get all the nucleoEtapaSubtipoProcessoList
        restNucleoEtapaSubtipoProcessoMockMvc.perform(get("/api/nucleo-etapa-subtipo-processos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nucleoEtapaSubtipoProcesso.getId().intValue())))
            .andExpect(jsonPath("$.[*].posicao").value(hasItem(DEFAULT_POSICAO)))
            .andExpect(jsonPath("$.[*].dataInicio").value(hasItem(DEFAULT_DATA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].dataFim").value(hasItem(DEFAULT_DATA_FIM.toString())))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.booleanValue())));
    }

    @Test
    @Transactional
    public void getNucleoEtapaSubtipoProcesso() throws Exception {
        // Initialize the database
        nucleoEtapaSubtipoProcessoRepository.saveAndFlush(nucleoEtapaSubtipoProcesso);

        // Get the nucleoEtapaSubtipoProcesso
        restNucleoEtapaSubtipoProcessoMockMvc.perform(get("/api/nucleo-etapa-subtipo-processos/{id}", nucleoEtapaSubtipoProcesso.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(nucleoEtapaSubtipoProcesso.getId().intValue()))
            .andExpect(jsonPath("$.posicao").value(DEFAULT_POSICAO))
            .andExpect(jsonPath("$.dataInicio").value(DEFAULT_DATA_INICIO.toString()))
            .andExpect(jsonPath("$.dataFim").value(DEFAULT_DATA_FIM.toString()))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingNucleoEtapaSubtipoProcesso() throws Exception {
        // Get the nucleoEtapaSubtipoProcesso
        restNucleoEtapaSubtipoProcessoMockMvc.perform(get("/api/nucleo-etapa-subtipo-processos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNucleoEtapaSubtipoProcesso() throws Exception {
        // Initialize the database
        nucleoEtapaSubtipoProcessoRepository.saveAndFlush(nucleoEtapaSubtipoProcesso);
        int databaseSizeBeforeUpdate = nucleoEtapaSubtipoProcessoRepository.findAll().size();

        // Update the nucleoEtapaSubtipoProcesso
        NucleoEtapaSubtipoProcesso updatedNucleoEtapaSubtipoProcesso = nucleoEtapaSubtipoProcessoRepository.findOne(nucleoEtapaSubtipoProcesso.getId());
        // Disconnect from session so that the updates on updatedNucleoEtapaSubtipoProcesso are not directly saved in db
        em.detach(updatedNucleoEtapaSubtipoProcesso);
        updatedNucleoEtapaSubtipoProcesso
            .posicao(UPDATED_POSICAO)
            .dataInicio(UPDATED_DATA_INICIO)
            .dataFim(UPDATED_DATA_FIM)
            .status(UPDATED_STATUS);

        restNucleoEtapaSubtipoProcessoMockMvc.perform(put("/api/nucleo-etapa-subtipo-processos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNucleoEtapaSubtipoProcesso)))
            .andExpect(status().isOk());

        // Validate the NucleoEtapaSubtipoProcesso in the database
        List<NucleoEtapaSubtipoProcesso> nucleoEtapaSubtipoProcessoList = nucleoEtapaSubtipoProcessoRepository.findAll();
        assertThat(nucleoEtapaSubtipoProcessoList).hasSize(databaseSizeBeforeUpdate);
        NucleoEtapaSubtipoProcesso testNucleoEtapaSubtipoProcesso = nucleoEtapaSubtipoProcessoList.get(nucleoEtapaSubtipoProcessoList.size() - 1);
        assertThat(testNucleoEtapaSubtipoProcesso.getPosicao()).isEqualTo(UPDATED_POSICAO);
        assertThat(testNucleoEtapaSubtipoProcesso.getDataInicio()).isEqualTo(UPDATED_DATA_INICIO);
        assertThat(testNucleoEtapaSubtipoProcesso.getDataFim()).isEqualTo(UPDATED_DATA_FIM);
        assertThat(testNucleoEtapaSubtipoProcesso.isStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingNucleoEtapaSubtipoProcesso() throws Exception {
        int databaseSizeBeforeUpdate = nucleoEtapaSubtipoProcessoRepository.findAll().size();

        // Create the NucleoEtapaSubtipoProcesso

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restNucleoEtapaSubtipoProcessoMockMvc.perform(put("/api/nucleo-etapa-subtipo-processos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(nucleoEtapaSubtipoProcesso)))
            .andExpect(status().isCreated());

        // Validate the NucleoEtapaSubtipoProcesso in the database
        List<NucleoEtapaSubtipoProcesso> nucleoEtapaSubtipoProcessoList = nucleoEtapaSubtipoProcessoRepository.findAll();
        assertThat(nucleoEtapaSubtipoProcessoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteNucleoEtapaSubtipoProcesso() throws Exception {
        // Initialize the database
        nucleoEtapaSubtipoProcessoRepository.saveAndFlush(nucleoEtapaSubtipoProcesso);
        int databaseSizeBeforeDelete = nucleoEtapaSubtipoProcessoRepository.findAll().size();

        // Get the nucleoEtapaSubtipoProcesso
        restNucleoEtapaSubtipoProcessoMockMvc.perform(delete("/api/nucleo-etapa-subtipo-processos/{id}", nucleoEtapaSubtipoProcesso.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<NucleoEtapaSubtipoProcesso> nucleoEtapaSubtipoProcessoList = nucleoEtapaSubtipoProcessoRepository.findAll();
        assertThat(nucleoEtapaSubtipoProcessoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NucleoEtapaSubtipoProcesso.class);
        NucleoEtapaSubtipoProcesso nucleoEtapaSubtipoProcesso1 = new NucleoEtapaSubtipoProcesso();
        nucleoEtapaSubtipoProcesso1.setId(1L);
        NucleoEtapaSubtipoProcesso nucleoEtapaSubtipoProcesso2 = new NucleoEtapaSubtipoProcesso();
        nucleoEtapaSubtipoProcesso2.setId(nucleoEtapaSubtipoProcesso1.getId());
        assertThat(nucleoEtapaSubtipoProcesso1).isEqualTo(nucleoEtapaSubtipoProcesso2);
        nucleoEtapaSubtipoProcesso2.setId(2L);
        assertThat(nucleoEtapaSubtipoProcesso1).isNotEqualTo(nucleoEtapaSubtipoProcesso2);
        nucleoEtapaSubtipoProcesso1.setId(null);
        assertThat(nucleoEtapaSubtipoProcesso1).isNotEqualTo(nucleoEtapaSubtipoProcesso2);
    }
}
