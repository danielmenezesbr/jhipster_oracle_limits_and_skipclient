/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterOracleLimitsAndSkipclientTestModule } from '../../../test.module';
import { SubtipoProcessoDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/subtipo-processo/subtipo-processo-delete-dialog.component';
import { SubtipoProcessoService } from '../../../../../../main/webapp/app/entities/subtipo-processo/subtipo-processo.service';

describe('Component Tests', () => {

    describe('SubtipoProcesso Management Delete Component', () => {
        let comp: SubtipoProcessoDeleteDialogComponent;
        let fixture: ComponentFixture<SubtipoProcessoDeleteDialogComponent>;
        let service: SubtipoProcessoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterOracleLimitsAndSkipclientTestModule],
                declarations: [SubtipoProcessoDeleteDialogComponent],
                providers: [
                    SubtipoProcessoService
                ]
            })
            .overrideTemplate(SubtipoProcessoDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubtipoProcessoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubtipoProcessoService);
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
