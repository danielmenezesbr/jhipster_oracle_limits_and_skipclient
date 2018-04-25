/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterOracleLimitsAndSkipclientTestModule } from '../../../test.module';
import { NucleoEtapaSubtipoProcessoDialogComponent } from '../../../../../../main/webapp/app/entities/nucleo-etapa-subtipo-processo/nucleo-etapa-subtipo-processo-dialog.component';
import { NucleoEtapaSubtipoProcessoService } from '../../../../../../main/webapp/app/entities/nucleo-etapa-subtipo-processo/nucleo-etapa-subtipo-processo.service';
import { NucleoEtapaSubtipoProcesso } from '../../../../../../main/webapp/app/entities/nucleo-etapa-subtipo-processo/nucleo-etapa-subtipo-processo.model';
import { SubtipoProcessoService } from '../../../../../../main/webapp/app/entities/subtipo-processo';

describe('Component Tests', () => {

    describe('NucleoEtapaSubtipoProcesso Management Dialog Component', () => {
        let comp: NucleoEtapaSubtipoProcessoDialogComponent;
        let fixture: ComponentFixture<NucleoEtapaSubtipoProcessoDialogComponent>;
        let service: NucleoEtapaSubtipoProcessoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterOracleLimitsAndSkipclientTestModule],
                declarations: [NucleoEtapaSubtipoProcessoDialogComponent],
                providers: [
                    SubtipoProcessoService,
                    NucleoEtapaSubtipoProcessoService
                ]
            })
            .overrideTemplate(NucleoEtapaSubtipoProcessoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NucleoEtapaSubtipoProcessoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NucleoEtapaSubtipoProcessoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new NucleoEtapaSubtipoProcesso(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.nucleoEtapaSubtipoProcesso = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'nucleoEtapaSubtipoProcessoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new NucleoEtapaSubtipoProcesso();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.nucleoEtapaSubtipoProcesso = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'nucleoEtapaSubtipoProcessoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
