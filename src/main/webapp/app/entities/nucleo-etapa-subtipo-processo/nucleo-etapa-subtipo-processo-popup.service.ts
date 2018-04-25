import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { NucleoEtapaSubtipoProcesso } from './nucleo-etapa-subtipo-processo.model';
import { NucleoEtapaSubtipoProcessoService } from './nucleo-etapa-subtipo-processo.service';

@Injectable()
export class NucleoEtapaSubtipoProcessoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private nucleoEtapaSubtipoProcessoService: NucleoEtapaSubtipoProcessoService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.nucleoEtapaSubtipoProcessoService.find(id)
                    .subscribe((nucleoEtapaSubtipoProcessoResponse: HttpResponse<NucleoEtapaSubtipoProcesso>) => {
                        const nucleoEtapaSubtipoProcesso: NucleoEtapaSubtipoProcesso = nucleoEtapaSubtipoProcessoResponse.body;
                        if (nucleoEtapaSubtipoProcesso.dataInicio) {
                            nucleoEtapaSubtipoProcesso.dataInicio = {
                                year: nucleoEtapaSubtipoProcesso.dataInicio.getFullYear(),
                                month: nucleoEtapaSubtipoProcesso.dataInicio.getMonth() + 1,
                                day: nucleoEtapaSubtipoProcesso.dataInicio.getDate()
                            };
                        }
                        if (nucleoEtapaSubtipoProcesso.dataFim) {
                            nucleoEtapaSubtipoProcesso.dataFim = {
                                year: nucleoEtapaSubtipoProcesso.dataFim.getFullYear(),
                                month: nucleoEtapaSubtipoProcesso.dataFim.getMonth() + 1,
                                day: nucleoEtapaSubtipoProcesso.dataFim.getDate()
                            };
                        }
                        this.ngbModalRef = this.nucleoEtapaSubtipoProcessoModalRef(component, nucleoEtapaSubtipoProcesso);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.nucleoEtapaSubtipoProcessoModalRef(component, new NucleoEtapaSubtipoProcesso());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    nucleoEtapaSubtipoProcessoModalRef(component: Component, nucleoEtapaSubtipoProcesso: NucleoEtapaSubtipoProcesso): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.nucleoEtapaSubtipoProcesso = nucleoEtapaSubtipoProcesso;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
