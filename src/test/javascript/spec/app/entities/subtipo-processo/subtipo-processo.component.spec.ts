/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterOracleLimitsAndSkipclientTestModule } from '../../../test.module';
import { SubtipoProcessoComponent } from '../../../../../../main/webapp/app/entities/subtipo-processo/subtipo-processo.component';
import { SubtipoProcessoService } from '../../../../../../main/webapp/app/entities/subtipo-processo/subtipo-processo.service';
import { SubtipoProcesso } from '../../../../../../main/webapp/app/entities/subtipo-processo/subtipo-processo.model';

describe('Component Tests', () => {

    describe('SubtipoProcesso Management Component', () => {
        let comp: SubtipoProcessoComponent;
        let fixture: ComponentFixture<SubtipoProcessoComponent>;
        let service: SubtipoProcessoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterOracleLimitsAndSkipclientTestModule],
                declarations: [SubtipoProcessoComponent],
                providers: [
                    SubtipoProcessoService
                ]
            })
            .overrideTemplate(SubtipoProcessoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubtipoProcessoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubtipoProcessoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SubtipoProcesso(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.subtipoProcessos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
