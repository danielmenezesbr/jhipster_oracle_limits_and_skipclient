package com.mycompany.myapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A NucleoEtapaSubtipoProcesso.
 */
@Entity
@Table(name = "ne_subtipoproc")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class NucleoEtapaSubtipoProcesso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "posicao", nullable = false)
    private Integer posicao;

    @Column(name = "data_inicio")
    private LocalDate dataInicio;

    @Column(name = "data_fim")
    private LocalDate dataFim;

    @Column(name = "status")
    private Boolean status;

    @ManyToOne(optional = false)
    @NotNull
    private SubtipoProcesso subtipoProcesso;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPosicao() {
        return posicao;
    }

    public NucleoEtapaSubtipoProcesso posicao(Integer posicao) {
        this.posicao = posicao;
        return this;
    }

    public void setPosicao(Integer posicao) {
        this.posicao = posicao;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public NucleoEtapaSubtipoProcesso dataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
        return this;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataFim() {
        return dataFim;
    }

    public NucleoEtapaSubtipoProcesso dataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
        return this;
    }

    public void setDataFim(LocalDate dataFim) {
        this.dataFim = dataFim;
    }

    public Boolean isStatus() {
        return status;
    }

    public NucleoEtapaSubtipoProcesso status(Boolean status) {
        this.status = status;
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public SubtipoProcesso getSubtipoProcesso() {
        return subtipoProcesso;
    }

    public NucleoEtapaSubtipoProcesso subtipoProcesso(SubtipoProcesso subtipoProcesso) {
        this.subtipoProcesso = subtipoProcesso;
        return this;
    }

    public void setSubtipoProcesso(SubtipoProcesso subtipoProcesso) {
        this.subtipoProcesso = subtipoProcesso;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        NucleoEtapaSubtipoProcesso nucleoEtapaSubtipoProcesso = (NucleoEtapaSubtipoProcesso) o;
        if (nucleoEtapaSubtipoProcesso.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), nucleoEtapaSubtipoProcesso.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "NucleoEtapaSubtipoProcesso{" +
            "id=" + getId() +
            ", posicao=" + getPosicao() +
            ", dataInicio='" + getDataInicio() + "'" +
            ", dataFim='" + getDataFim() + "'" +
            ", status='" + isStatus() + "'" +
            "}";
    }
}
