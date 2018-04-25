import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SubtipoProcesso } from './subtipo-processo.model';
import { SubtipoProcessoPopupService } from './subtipo-processo-popup.service';
import { SubtipoProcessoService } from './subtipo-processo.service';

@Component({
    selector: 'jhi-subtipo-processo-dialog',
    templateUrl: './subtipo-processo-dialog.component.html'
})
export class SubtipoProcessoDialogComponent implements OnInit {

    subtipoProcesso: SubtipoProcesso;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private subtipoProcessoService: SubtipoProcessoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.subtipoProcesso.id !== undefined) {
            this.subscribeToSaveResponse(
                this.subtipoProcessoService.update(this.subtipoProcesso));
        } else {
            this.subscribeToSaveResponse(
                this.subtipoProcessoService.create(this.subtipoProcesso));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SubtipoProcesso>>) {
        result.subscribe((res: HttpResponse<SubtipoProcesso>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SubtipoProcesso) {
        this.eventManager.broadcast({ name: 'subtipoProcessoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-subtipo-processo-popup',
    template: ''
})
export class SubtipoProcessoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subtipoProcessoPopupService: SubtipoProcessoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.subtipoProcessoPopupService
                    .open(SubtipoProcessoDialogComponent as Component, params['id']);
            } else {
                this.subtipoProcessoPopupService
                    .open(SubtipoProcessoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
