import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { NucleoEtapaSubtipoProcesso } from './nucleo-etapa-subtipo-processo.model';
import { NucleoEtapaSubtipoProcessoPopupService } from './nucleo-etapa-subtipo-processo-popup.service';
import { NucleoEtapaSubtipoProcessoService } from './nucleo-etapa-subtipo-processo.service';

@Component({
    selector: 'jhi-nucleo-etapa-subtipo-processo-delete-dialog',
    templateUrl: './nucleo-etapa-subtipo-processo-delete-dialog.component.html'
})
export class NucleoEtapaSubtipoProcessoDeleteDialogComponent {

    nucleoEtapaSubtipoProcesso: NucleoEtapaSubtipoProcesso;

    constructor(
        private nucleoEtapaSubtipoProcessoService: NucleoEtapaSubtipoProcessoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.nucleoEtapaSubtipoProcessoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'nucleoEtapaSubtipoProcessoListModification',
                content: 'Deleted an nucleoEtapaSubtipoProcesso'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-nucleo-etapa-subtipo-processo-delete-popup',
    template: ''
})
export class NucleoEtapaSubtipoProcessoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private nucleoEtapaSubtipoProcessoPopupService: NucleoEtapaSubtipoProcessoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.nucleoEtapaSubtipoProcessoPopupService
                .open(NucleoEtapaSubtipoProcessoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
