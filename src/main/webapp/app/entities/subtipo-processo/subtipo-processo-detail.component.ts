import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { SubtipoProcesso } from './subtipo-processo.model';
import { SubtipoProcessoService } from './subtipo-processo.service';

@Component({
    selector: 'jhi-subtipo-processo-detail',
    templateUrl: './subtipo-processo-detail.component.html'
})
export class SubtipoProcessoDetailComponent implements OnInit, OnDestroy {

    subtipoProcesso: SubtipoProcesso;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private subtipoProcessoService: SubtipoProcessoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSubtipoProcessos();
    }

    load(id) {
        this.subtipoProcessoService.find(id)
            .subscribe((subtipoProcessoResponse: HttpResponse<SubtipoProcesso>) => {
                this.subtipoProcesso = subtipoProcessoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSubtipoProcessos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'subtipoProcessoListModification',
            (response) => this.load(this.subtipoProcesso.id)
        );
    }
}
