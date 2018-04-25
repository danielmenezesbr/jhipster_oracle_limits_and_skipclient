/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterOracleLimitsAndSkipclientTestModule } from '../../../test.module';
import { NucleoEtapaSubtipoProcessoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/nucleo-etapa-subtipo-processo/nucleo-etapa-subtipo-processo-delete-dialog.component';
import { NucleoEtapaSubtipoProcessoService } from '../../../../../../main/webapp/app/entities/nucleo-etapa-subtipo-processo/nucleo-etapa-subtipo-processo.service';

describe('Component Tests', () => {

    describe('NucleoEtapaSubtipoProcesso Management Delete Component', () => {
        let comp: NucleoEtapaSubtipoProcessoDeleteDialogComponent;
        let fixture: ComponentFixture<NucleoEtapaSubtipoProcessoDeleteDialogComponent>;
        let service: NucleoEtapaSubtipoProcessoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterOracleLimitsAndSkipclientTestModule],
                declarations: [NucleoEtapaSubtipoProcessoDeleteDialogComponent],
                providers: [
                    NucleoEtapaSubtipoProcessoService
                ]
            })
            .overrideTemplate(NucleoEtapaSubtipoProcessoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NucleoEtapaSubtipoProcessoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NucleoEtapaSubtipoProcessoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
