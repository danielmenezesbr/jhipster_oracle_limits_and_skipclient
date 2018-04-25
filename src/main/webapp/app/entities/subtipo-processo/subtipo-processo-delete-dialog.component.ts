import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SubtipoProcesso } from './subtipo-processo.model';
import { SubtipoProcessoPopupService } from './subtipo-processo-popup.service';
import { SubtipoProcessoService } from './subtipo-processo.service';

@Component({
    selector: 'jhi-subtipo-processo-delete-dialog',
    templateUrl: './subtipo-processo-delete-dialog.component.html'
})
export class SubtipoProcessoDeleteDialogComponent {

    subtipoProcesso: SubtipoProcesso;

    constructor(
        private subtipoProcessoService: SubtipoProcessoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.subtipoProcessoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'subtipoProcessoListModification',
                content: 'Deleted an subtipoProcesso'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-subtipo-processo-delete-popup',
    template: ''
})
export class SubtipoProcessoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subtipoProcessoPopupService: SubtipoProcessoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.subtipoProcessoPopupService
                .open(SubtipoProcessoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
