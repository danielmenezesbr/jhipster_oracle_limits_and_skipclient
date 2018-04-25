import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SubtipoProcesso } from './subtipo-processo.model';
import { SubtipoProcessoService } from './subtipo-processo.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-subtipo-processo',
    templateUrl: './subtipo-processo.component.html'
})
export class SubtipoProcessoComponent implements OnInit, OnDestroy {
subtipoProcessos: SubtipoProcesso[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private subtipoProcessoService: SubtipoProcessoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.subtipoProcessoService.query().subscribe(
            (res: HttpResponse<SubtipoProcesso[]>) => {
                this.subtipoProcessos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSubtipoProcessos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SubtipoProcesso) {
        return item.id;
    }
    registerChangeInSubtipoProcessos() {
        this.eventSubscriber = this.eventManager.subscribe('subtipoProcessoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
