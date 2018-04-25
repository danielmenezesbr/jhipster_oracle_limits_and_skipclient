/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterOracleLimitsAndSkipclientTestModule } from '../../../test.module';
import { SubtipoProcessoDialogComponent } from '../../../../../../main/webapp/app/entities/subtipo-processo/subtipo-processo-dialog.component';
import { SubtipoProcessoService } from '../../../../../../main/webapp/app/entities/subtipo-processo/subtipo-processo.service';
import { SubtipoProcesso } from '../../../../../../main/webapp/app/entities/subtipo-processo/subtipo-processo.model';

describe('Component Tests', () => {

    describe('SubtipoProcesso Management Dialog Component', () => {
        let comp: SubtipoProcessoDialogComponent;
        let fixture: ComponentFixture<SubtipoProcessoDialogComponent>;
        let service: SubtipoProcessoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterOracleLimitsAndSkipclientTestModule],
                declarations: [SubtipoProcessoDialogComponent],
                providers: [
                    SubtipoProcessoService
                ]
            })
            .overrideTemplate(SubtipoProcessoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubtipoProcessoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubtipoProcessoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SubtipoProcesso(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.subtipoProcesso = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'subtipoProcessoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SubtipoProcesso();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.subtipoProcesso = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'subtipoProcessoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
