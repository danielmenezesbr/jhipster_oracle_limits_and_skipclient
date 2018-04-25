import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { NucleoEtapaSubtipoProcesso } from './nucleo-etapa-subtipo-processo.model';
import { NucleoEtapaSubtipoProcessoService } from './nucleo-etapa-subtipo-processo.service';

@Component({
    selector: 'jhi-nucleo-etapa-subtipo-processo-detail',
    templateUrl: './nucleo-etapa-subtipo-processo-detail.component.html'
})
export class NucleoEtapaSubtipoProcessoDetailComponent implements OnInit, OnDestroy {

    nucleoEtapaSubtipoProcesso: NucleoEtapaSubtipoProcesso;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private nucleoEtapaSubtipoProcessoService: NucleoEtapaSubtipoProcessoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNucleoEtapaSubtipoProcessos();
    }

    load(id) {
        this.nucleoEtapaSubtipoProcessoService.find(id)
            .subscribe((nucleoEtapaSubtipoProcessoResponse: HttpResponse<NucleoEtapaSubtipoProcesso>) => {
                this.nucleoEtapaSubtipoProcesso = nucleoEtapaSubtipoProcessoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNucleoEtapaSubtipoProcessos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'nucleoEtapaSubtipoProcessoListModification',
            (response) => this.load(this.nucleoEtapaSubtipoProcesso.id)
        );
    }
}
