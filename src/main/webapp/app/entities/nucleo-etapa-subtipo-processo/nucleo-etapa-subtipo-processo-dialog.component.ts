import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { NucleoEtapaSubtipoProcesso } from './nucleo-etapa-subtipo-processo.model';
import { NucleoEtapaSubtipoProcessoPopupService } from './nucleo-etapa-subtipo-processo-popup.service';
import { NucleoEtapaSubtipoProcessoService } from './nucleo-etapa-subtipo-processo.service';
import { SubtipoProcesso, SubtipoProcessoService } from '../subtipo-processo';

@Component({
    selector: 'jhi-nucleo-etapa-subtipo-processo-dialog',
    templateUrl: './nucleo-etapa-subtipo-processo-dialog.component.html'
})
export class NucleoEtapaSubtipoProcessoDialogComponent implements OnInit {

    nucleoEtapaSubtipoProcesso: NucleoEtapaSubtipoProcesso;
    isSaving: boolean;

    subtipoprocessos: SubtipoProcesso[];
    dataInicioDp: any;
    dataFimDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private nucleoEtapaSubtipoProcessoService: NucleoEtapaSubtipoProcessoService,
        private subtipoProcessoService: SubtipoProcessoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.subtipoProcessoService.query()
            .subscribe((res: HttpResponse<SubtipoProcesso[]>) => { this.subtipoprocessos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.nucleoEtapaSubtipoProcesso.id !== undefined) {
            this.subscribeToSaveResponse(
                this.nucleoEtapaSubtipoProcessoService.update(this.nucleoEtapaSubtipoProcesso));
        } else {
            this.subscribeToSaveResponse(
                this.nucleoEtapaSubtipoProcessoService.create(this.nucleoEtapaSubtipoProcesso));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<NucleoEtapaSubtipoProcesso>>) {
        result.subscribe((res: HttpResponse<NucleoEtapaSubtipoProcesso>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: NucleoEtapaSubtipoProcesso) {
        this.eventManager.broadcast({ name: 'nucleoEtapaSubtipoProcessoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSubtipoProcessoById(index: number, item: SubtipoProcesso) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-nucleo-etapa-subtipo-processo-popup',
    template: ''
})
export class NucleoEtapaSubtipoProcessoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private nucleoEtapaSubtipoProcessoPopupService: NucleoEtapaSubtipoProcessoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.nucleoEtapaSubtipoProcessoPopupService
                    .open(NucleoEtapaSubtipoProcessoDialogComponent as Component, params['id']);
            } else {
                this.nucleoEtapaSubtipoProcessoPopupService
                    .open(NucleoEtapaSubtipoProcessoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
