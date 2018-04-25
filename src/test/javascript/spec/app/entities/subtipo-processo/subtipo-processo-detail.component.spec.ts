/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterOracleLimitsAndSkipclientTestModule } from '../../../test.module';
import { SubtipoProcessoDetailComponent } from '../../../../../../main/webapp/app/entities/subtipo-processo/subtipo-processo-detail.component';
import { SubtipoProcessoService } from '../../../../../../main/webapp/app/entities/subtipo-processo/subtipo-processo.service';
import { SubtipoProcesso } from '../../../../../../main/webapp/app/entities/subtipo-processo/subtipo-processo.model';

describe('Component Tests', () => {

    describe('SubtipoProcesso Management Detail Component', () => {
        let comp: SubtipoProcessoDetailComponent;
        let fixture: ComponentFixture<SubtipoProcessoDetailComponent>;
        let service: SubtipoProcessoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterOracleLimitsAndSkipclientTestModule],
                declarations: [SubtipoProcessoDetailComponent],
                providers: [
                    SubtipoProcessoService
                ]
            })
            .overrideTemplate(SubtipoProcessoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubtipoProcessoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubtipoProcessoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SubtipoProcesso(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.subtipoProcesso).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
