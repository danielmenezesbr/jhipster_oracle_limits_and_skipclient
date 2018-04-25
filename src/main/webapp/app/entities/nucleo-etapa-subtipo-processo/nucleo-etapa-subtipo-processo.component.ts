import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { NucleoEtapaSubtipoProcesso } from './nucleo-etapa-subtipo-processo.model';
import { NucleoEtapaSubtipoProcessoService } from './nucleo-etapa-subtipo-processo.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-nucleo-etapa-subtipo-processo',
    templateUrl: './nucleo-etapa-subtipo-processo.component.html'
})
export class NucleoEtapaSubtipoProcessoComponent implements OnInit, OnDestroy {
nucleoEtapaSubtipoProcessos: NucleoEtapaSubtipoProcesso[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private nucleoEtapaSubtipoProcessoService: NucleoEtapaSubtipoProcessoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.nucleoEtapaSubtipoProcessoService.query().subscribe(
            (res: HttpResponse<NucleoEtapaSubtipoProcesso[]>) => {
                this.nucleoEtapaSubtipoProcessos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInNucleoEtapaSubtipoProcessos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: NucleoEtapaSubtipoProcesso) {
        return item.id;
    }
    registerChangeInNucleoEtapaSubtipoProcessos() {
        this.eventSubscriber = this.eventManager.subscribe('nucleoEtapaSubtipoProcessoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
