import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { SubtipoProcesso } from './subtipo-processo.model';
import { SubtipoProcessoService } from './subtipo-processo.service';

@Injectable()
export class SubtipoProcessoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private subtipoProcessoService: SubtipoProcessoService

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
                this.subtipoProcessoService.find(id)
                    .subscribe((subtipoProcessoResponse: HttpResponse<SubtipoProcesso>) => {
                        const subtipoProcesso: SubtipoProcesso = subtipoProcessoResponse.body;
                        this.ngbModalRef = this.subtipoProcessoModalRef(component, subtipoProcesso);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.subtipoProcessoModalRef(component, new SubtipoProcesso());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    subtipoProcessoModalRef(component: Component, subtipoProcesso: SubtipoProcesso): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.subtipoProcesso = subtipoProcesso;
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
